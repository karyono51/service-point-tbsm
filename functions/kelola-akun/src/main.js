// Appwrite Function "kelola-akun": CRUD akun pengguna untuk dasbor admin.
// Hanya akun berlabel "admin" yang boleh memanggil. Dipanggil lewat Functions.createExecution
// (header x-appwrite-user-id diisi Appwrite). Kunci API dinamis dari header x-appwrite-key
// (scope: users.read, users.write).
import { Client, Users, Query, ID } from 'node-appwrite';

const ROLES = ['admin', 'pembimbing', 'advisor', 'mekanik'];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (u) => ({
  id: u.$id, name: u.name, email: u.email, labels: u.labels || [],
  status: u.status, joined: u.registration, last: u.accessedAt,
});

export default async ({ req, res, error }) => {
  const callerId = req.headers['x-appwrite-user-id'];
  if (!callerId) return res.json({ ok: false, error: 'Harus login.' }, 401);

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] || '');
  const users = new Users(client);

  try {
    const me = await users.get({ userId: callerId });
    if (!me.status || !(me.labels || []).includes('admin')) {
      return res.json({ ok: false, error: 'Hanya admin yang boleh mengelola akun.' }, 403);
    }

    let b = {};
    try { b = JSON.parse(req.bodyRaw || '{}'); } catch (e) {
      return res.json({ ok: false, error: 'Permintaan tidak valid.' }, 400);
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
        if (b.name) await users.updateName({ userId: id, name: String(b.name).trim() });
        if (b.email) {
          if (!EMAIL.test(String(b.email).trim())) return fail('Email tidak valid.');
          await users.updateEmail({ userId: id, email: String(b.email).trim() });
        }
        if (b.password) {
          if (String(b.password).length < 8) return fail('Kata sandi minimal 8 karakter.');
          await users.updatePassword({ userId: id, password: String(b.password) });
        }
        if (b.role !== undefined) await users.updateLabels({ userId: id, labels: b.role ? [b.role] : [] });
        if (typeof b.status === 'boolean') await users.updateStatus({ userId: id, status: b.status });
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
