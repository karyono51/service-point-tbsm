// Appwrite Function "kelola-akun":
//  1. CRUD akun pengguna untuk dashboard (khusus admin).
//  2. Aksi "job": menulis data servis dengan pemeriksaan peran dan status di server
//     (dipanggil semua peran yang sudah login; aturannya ada di rules.js).
//  3. Aksi "foto": simpan dan ambil foto kondisi motor di Google Drive (lihat foto.js).
// Dipanggil lewat Functions.createExecution (header x-appwrite-user-id diisi Appwrite).
// Kunci API dinamis dari header x-appwrite-key.
// Scope: users.read, users.write, rows.read, rows.write (atau documents.read/write).
import * as SDK from 'node-appwrite';
import { decide, roleOf } from './rules.js';
import { fotoAction } from './foto.js';

const { Client, Users, Query, ID, Permission, Role } = SDK;

const ROLES = ['admin', 'pembimbing', 'advisor', 'mekanik', 'kepsek', 'wakahubin'];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DB = process.env.DATABASE_ID || '6aeecb910016e43805e4';
const TB = process.env.TABLE_ID || '6aeee0fb002814b990b1';
const MAXP = 200 * 1024;
const clean = (u) => ({
  id: u.$id, name: u.name, email: u.email, labels: u.labels || [],
  status: u.status, joined: u.registration, last: u.accessedAt,
});

function rowsApi(client) {
  if (SDK.TablesDB) {
    const t = new SDK.TablesDB(client);
    return {
      get: (id) => t.getRow({ databaseId: DB, tableId: TB, rowId: id }),
      create: (id, p) => t.createRow({ databaseId: DB, tableId: TB, rowId: id, data: { payload: p }, permissions: [Permission.read(Role.users())] }),
      update: (id, p) => t.updateRow({ databaseId: DB, tableId: TB, rowId: id, data: { payload: p } }),
      del: (id) => t.deleteRow({ databaseId: DB, tableId: TB, rowId: id }),
    };
  }
  const d = new SDK.Databases(client);
  return {
    get: (id) => d.getDocument({ databaseId: DB, collectionId: TB, documentId: id }),
    create: (id, p) => d.createDocument({ databaseId: DB, collectionId: TB, documentId: id, data: { payload: p }, permissions: [Permission.read(Role.users())] }),
    update: (id, p) => d.updateDocument({ databaseId: DB, collectionId: TB, documentId: id, data: { payload: p } }),
    del: (id) => d.deleteDocument({ databaseId: DB, collectionId: TB, documentId: id }),
  };
}

async function jobAction({ b, res, client, users, callerId, log, error }) {
  const k = b.k, id = String(b.id || ''), p = b.p;
  if (!['c', 'u', 'd'].includes(k) || !/^[A-Za-z0-9_][A-Za-z0-9_.-]{0,35}$/.test(id))
    return res.json({ ok: false, error: 'Permintaan tidak valid.' }, 400);
  if (k !== 'd' && (typeof p !== 'string' || p.length > MAXP))
    return res.json({ ok: false, error: 'Isi data tidak valid atau terlalu besar.' }, 400);
  try {
    const user = await users.get({ userId: callerId });
    if (user.status === false) return res.json({ ok: false, error: 'Akun dinonaktifkan.' }, 403);
    // Kepala sekolah dan Wakasek Hubin hanya melihat: tidak boleh menulis data servis.
    if ((user.labels || []).some((l) => l === 'kepsek' || l === 'wakahubin')) return res.json({ ok: false, error: 'Peran ini hanya dapat melihat data.' }, 403);
    const role = roleOf(user.labels);
    const rows = rowsApi(client);

    let old = null, exists = false;
    try {
      const row = await rows.get(id);
      exists = true;
      try { old = JSON.parse(row.payload); } catch (e) { old = {}; }
    } catch (e) {
      if (Number(e && e.code) !== 404) throw e;
    }
    if (k === 'c' && exists) return res.json({ ok: false, error: 'Data sudah ada.' }, 409);

    let neu = null;
    if (k !== 'd') {
      try { neu = JSON.parse(p); } catch (e) { return res.json({ ok: false, error: 'Isi data bukan JSON.' }, 400); }
    }
    const d = decide({ role, k, old: exists ? old : null, neu });
    if (!d.ok) {
      log('TOLAK ' + k + ' ' + id + ' oleh ' + user.email + ' (' + role + '): ' + d.error);
      return res.json({ ok: false, error: d.error }, d.code);
    }
    if (d.noop) return res.json({ ok: true });

    if (k === 'c') await rows.create(id, p);
    else if (k === 'u') await rows.update(id, p);
    else await rows.del(id);
    return res.json({ ok: true });
  } catch (e) {
    error(String((e && e.message) || e));
    const c = Number(e && e.code);
    // 401/403 dari Appwrite biasanya berarti scope function kurang; jangan dikira sesi habis.
    if (c === 401 || c === 403) return res.json({ ok: false, error: 'Function belum punya izin tabel (scope rows.read/rows.write).' }, 424);
    if (c === 404) return res.json({ ok: false, error: 'Data tidak ditemukan.' }, 404);
    return res.json({ ok: false, error: 'Kesalahan server.' }, 500);
  }
}

export default async ({ req, res, log, error }) => {
  const callerId = req.headers['x-appwrite-user-id'];
  if (!callerId) return res.json({ ok: false, error: 'Harus login.' }, 401);

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] || '');
  const users = new Users(client);

  let b = {};
  try { b = JSON.parse(req.bodyRaw || req.bodyText || '{}'); } catch (e) {
    return res.json({ ok: false, error: 'Permintaan tidak valid.' }, 400);
  }

  if (b.action === 'foto') return fotoAction({ b, res, users, callerId, roleOf, error });
  if (b.action === 'job') return jobAction({ b, res, client, users, callerId, log: log || (() => {}), error });

  try {
    const me = await users.get({ userId: callerId });
    if (!me.status || !(me.labels || []).includes('admin')) {
      return res.json({ ok: false, error: 'Hanya admin yang boleh mengelola akun.' }, 403);
    }

    const fail = (msg, code = 400) => res.json({ ok: false, error: msg }, code);
    const roleOk = (r) => r === '' || ROLES.includes(r);

    switch (b.action) {
      case 'list': {
        const r = await users.list({ queries: [Query.limit(100), Query.orderDesc('$createdAt')] });
        return res.json({ ok: true, users: r.users.map(clean) });
      }
      case 'create': {
        const name = String(b.name || '').trim(), email = String(b.email || '').trim();
        const password = String(b.password || ''), role = b.role || '';
        if (!name) return fail('Nama wajib diisi.');
        if (!EMAIL.test(email)) return fail('Email tidak valid.');
        if (password.length < 8) return fail('Kata sandi minimal 8 karakter.');
        if (!roleOk(role)) return fail('Peran tidak dikenal.');
        const u = await users.create({ userId: ID.unique(), email, password, name });
        if (role) await users.updateLabels({ userId: u.$id, labels: [role] });
        return res.json({ ok: true, id: u.$id });
      }
      case 'update': {
        const id = String(b.id || '');
        if (!id) return fail('ID akun kosong.');
        const self = id === callerId;
        if (b.role !== undefined && !roleOk(b.role)) return fail('Peran tidak dikenal.');
        if (self && b.role !== undefined && b.role !== 'admin') return fail('Tidak dapat mengubah peran akun sendiri.');
        if (self && b.status === false) return fail('Tidak dapat menonaktifkan akun sendiri.');
        const cur = await users.get({ userId: id });
        // Hanya kirim ke Appwrite bila memang berubah. Mengirim email yang sama
        // memicu galat "A target with the same ID already exists".
        if (b.name && String(b.name).trim() !== cur.name) await users.updateName({ userId: id, name: String(b.name).trim() });
        if (b.email) {
          const em = String(b.email).trim();
          if (!EMAIL.test(em)) return fail('Email tidak valid.');
          if (em.toLowerCase() !== String(cur.email || '').toLowerCase()) await users.updateEmail({ userId: id, email: em });
        }
        if (b.password) {
          if (String(b.password).length < 8) return fail('Kata sandi minimal 8 karakter.');
          await users.updatePassword({ userId: id, password: String(b.password) });
        }
        if (b.role !== undefined) await users.updateLabels({ userId: id, labels: b.role ? [b.role] : [] });
        if (typeof b.status === 'boolean' && b.status !== cur.status) await users.updateStatus({ userId: id, status: b.status });
        return res.json({ ok: true });
      }
      case 'delete': {
        const id = String(b.id || '');
        if (!id) return fail('ID akun kosong.');
        if (id === callerId) return fail('Tidak dapat menghapus akun sendiri.');
        await users.delete({ userId: id });
        return res.json({ ok: true });
      }
      default:
        return fail('Aksi tidak dikenal.');
    }
  } catch (e) {
    error(String(e && e.message));
    return res.json({ ok: false, error: (e && e.message) || 'Terjadi kesalahan.' }, 400);
  }
};
