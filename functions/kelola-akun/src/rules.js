// Aturan izin sisi server untuk data servis Business Center TBSM.
// Fungsi murni (tanpa akses jaringan) supaya mudah diuji.

export const ST = ['Menunggu', 'Dikerjakan', 'Selesai', 'Diambil'];

// Sama dengan ROLE_DEF di aplikasi.
export const ROLES = {
  admin: { create: 1, edit: 1, status: 1, del: 1 },
  pembimbing: { create: 0, edit: 1, status: 1, del: 0 },
  advisor: { create: 1, edit: 1, status: 1, del: 0 },
  mekanik: { create: 0, edit: 0, status: 1, del: 0 },
};

export function roleOf(labels) {
  for (const k of Object.keys(ROLES)) if ((labels || []).includes(k)) return k;
  return null;
}

function canon(v) {
  if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';
  if (v && typeof v === 'object')
    return '{' + Object.keys(v).sort().map((k) => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}';
  return JSON.stringify(v === undefined ? null : v);
}

const no = (code, error) => ({ ok: false, code, error });
const yes = (extra) => Object.assign({ ok: true }, extra || {});

/**
 * @param {{role:string|null,k:'c'|'u'|'d',old:object|null,neu:object|null}} a
 *  old = isi data lama di server (null bila belum ada), neu = isi data baru.
 */
export function decide({ role, k, old, neu }) {
  const R = role && ROLES[role];
  if (!R) return no(403, 'Akun belum punya peran.');
  const isAdmin = role === 'admin';

  if (k === 'd') {
    if (!R.del) return no(403, 'Hanya admin yang boleh menghapus data.');
    if (!old) return no(404, 'Data tidak ditemukan.');
    return yes();
  }

  if (!neu || typeof neu !== 'object' || Array.isArray(neu)) return no(400, 'Isi data tidak valid.');

  // Catatan penghapusan audit trail (au:1): hanya admin, dan tidak boleh diubah.
  if (neu.au || (old && old.au)) {
    if (!isAdmin) return no(403, 'Catatan audit hanya boleh dibuat oleh admin.');
    if (k === 'u') return yes({ noop: true });
    return yes();
  }

  if (neu.status !== undefined && !ST.includes(neu.status)) return no(400, 'Status tidak dikenal.');

  if (k === 'c') {
    if (!R.create) return no(403, 'Peran ini tidak boleh membuat pendaftaran.');
    if (neu.arsip && !isAdmin) return no(403, 'Hanya admin yang boleh mengarsipkan.');
    return yes();
  }

  if (k === 'u') {
    if (!old) return no(404, 'Data tidak ditemukan.');
    if (isAdmin) return yes();
    if (old.status === 'Diambil' || old.arsip) return no(403, 'Data sudah diambil dan dikunci. Hanya admin yang bisa mengubahnya.');
    if (!!neu.arsip !== !!old.arsip) return no(403, 'Hanya admin yang boleh mengarsipkan.');
    if (!R.edit) {
      const keep = (x) => canon({ no: x.no, ts: x.ts, d: x.d, arsip: !!x.arsip });
      if (keep(old) !== keep(neu)) return no(403, 'Peran ini hanya boleh mengubah status.');
      if (neu.status === 'Diambil') return no(403, 'Peran ini tidak boleh menandai Sudah diambil.');
    }
    if (!R.status && !R.edit) return no(403, 'Tidak punya izin mengubah data.');
    return yes();
  }

  return no(400, 'Aksi tidak dikenal.');
}
