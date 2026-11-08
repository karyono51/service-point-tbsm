import { Client, Users } from 'node-appwrite';

// Function foto-drive: simpan dan ambil foto kondisi motor di Google Drive.
// Variabel lingkungan (Settings > Environment variables):
//   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN
//   DRIVE_FOLDER_ID (opsional; kalau kosong, folder dibuat otomatis)
// Scope function: users.read

const FOLDER_NAME = 'Foto Servis Business Center TBSM';
const ROLES = ['admin', 'pembimbing', 'advisor', 'mekanik'];
const CAN_DELETE = ['admin', 'pembimbing', 'advisor'];
const MAX_BYTES = 3 * 1024 * 1024;

let tok = { v: '', exp: 0 };
let folderId = process.env.DRIVE_FOLDER_ID || '';

async function accessToken() {
  if (tok.v && Date.now() < tok.exp - 60000) return tok.v;
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN || '',
      grant_type: 'refresh_token',
    }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.access_token) {
    throw new Error('Google menolak token (' + (j.error_description || j.error || r.status) + ')');
  }
  tok = { v: j.access_token, exp: Date.now() + (j.expires_in || 3600) * 1000 };
  return tok.v;
}

async function gfetch(url, opt = {}) {
  const t = await accessToken();
  const r = await fetch(url, { ...opt, headers: { Authorization: 'Bearer ' + t, ...(opt.headers || {}) } });
  return r;
}

async function gjson(url, opt) {
  const r = await gfetch(url, opt);
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error('Google Drive: ' + ((j.error && j.error.message) || r.status));
  return j;
}

async function getFolder() {
  if (folderId) return folderId;
  const q = encodeURIComponent("name='" + FOLDER_NAME + "' and mimeType='application/vnd.google-apps.folder' and trashed=false");
  const f = await gjson('https://www.googleapis.com/drive/v3/files?fields=files(id)&pageSize=1&q=' + q);
  if (f.files && f.files.length) { folderId = f.files[0].id; return folderId; }
  const c = await gjson('https://www.googleapis.com/drive/v3/files?fields=id', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: FOLDER_NAME, mimeType: 'application/vnd.google-apps.folder' }),
  });
  folderId = c.id;
  return folderId;
}

// Pastikan file ada di folder foto kita dan belum dibuang.
async function assertOurs(id) {
  const fid = await getFolder();
  const m = await gjson('https://www.googleapis.com/drive/v3/files/' + id + '?fields=parents,trashed');
  if (m.trashed || !(m.parents || []).includes(fid)) throw new Error('Foto tidak ditemukan');
}

async function upload(name, b64) {
  const buf = Buffer.from(b64, 'base64');
  if (!buf.length || buf.length > MAX_BYTES) throw new Error('Ukuran foto tidak valid');
  if (!(buf[0] === 0xff && buf[1] === 0xd8)) throw new Error('Foto harus berformat JPEG');
  const fid = await getFolder();
  const bd = 'bc' + Date.now().toString(36);
  const meta = JSON.stringify({ name, parents: [fid], mimeType: 'image/jpeg' });
  const body = Buffer.concat([
    Buffer.from('--' + bd + '\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n' + meta + '\r\n--' + bd + '\r\nContent-Type: image/jpeg\r\n\r\n'),
    buf,
    Buffer.from('\r\n--' + bd + '--'),
  ]);
  const j = await gjson('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/related; boundary=' + bd },
    body,
  });
  return j.id;
}

async function download(id) {
  await assertOurs(id);
  const r = await gfetch('https://www.googleapis.com/drive/v3/files/' + id + '?alt=media');
  if (!r.ok) throw new Error('Foto tidak bisa dibuka (' + r.status + ')');
  return Buffer.from(await r.arrayBuffer()).toString('base64');
}

async function trash(id) {
  await assertOurs(id);
  await gjson('https://www.googleapis.com/drive/v3/files/' + id + '?fields=id', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ trashed: true }),
  });
}

async function roleOf(req) {
  const uid = req.headers['x-appwrite-user-id'];
  const key = req.headers['x-appwrite-key'];
  if (!uid) return '';
  const c = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(key);
  const u = await new Users(c).get(uid);
  if (u.status === false) return '';
  const l = u.labels || [];
  return ROLES.find((r) => l.includes(r)) || '';
}

export default async ({ req, res, error }) => {
  try {
    const role = await roleOf(req);
    if (!role) return res.json({ ok: false, error: 'Akun belum punya peran' }, 403);
    let b = {};
    try { b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.bodyJson || req.body || {}); } catch (e) { b = {}; }
    const idOk = (v) => /^[A-Za-z0-9_-]{10,100}$/.test(String(v || ''));

    if (b.op === 'up') {
      const k = b.k === 'sesudah' ? 'sesudah' : 'sebelum';
      const nm = String(b.no || 'servis').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 30) || 'servis';
      const id = await upload(nm + '_' + k + '_' + Date.now() + '.jpg', String(b.data || ''));
      return res.json({ ok: true, id });
    }
    if (b.op === 'get') {
      if (!idOk(b.id)) return res.json({ ok: false, error: 'ID foto tidak valid' }, 400);
      return res.json({ ok: true, data: await download(b.id) });
    }
    if (b.op === 'del') {
      if (!CAN_DELETE.includes(role)) return res.json({ ok: false, error: 'Peran ini tidak boleh menghapus foto' }, 403);
      if (!idOk(b.id)) return res.json({ ok: false, error: 'ID foto tidak valid' }, 400);
      await trash(b.id);
      return res.json({ ok: true });
    }
    return res.json({ ok: false, error: 'Aksi tidak dikenal' }, 400);
  } catch (e) {
    error(String((e && e.message) || e));
    return res.json({ ok: false, error: String((e && e.message) || e) }, 500);
  }
};
