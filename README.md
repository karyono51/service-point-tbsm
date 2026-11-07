# Service Point TBSM – SMKS Darul Fatwa × AHASS Daya Anugrah Mandiri Jatinangor

Aplikasi web statis (HTML + JavaScript) untuk pencatatan servis di bengkel sekolah, dengan cetak PDF Form Service Advisor.
Hosting: **Appwrite Sites** (dari repo **GitHub**). Data & login: **Appwrite** (Auth + Database).

```
service-point-tbsm/
├─ public/
│  ├─ index.html   ← aplikasi (logo sudah tertanam)
│  └─ config.js    ← diisi ID proyek Appwrite
├─ README.md       ← panduan ini
└─ .gitignore
```

## Alur singkat

1. Siapkan akun GitHub dan Appwrite (cloud.appwrite.io)
2. Appwrite: buat Project → Auth user → Database + Table
3. Isi `public/config.js`
4. Push ke GitHub
5. Appwrite Sites: hubungkan repo → deploy
6. Daftarkan domain situs sebagai platform Web di Project
7. Uji coba, lalu pakai

---

## Langkah 1 – Backend Appwrite

1. Console Appwrite → **Create project** (mis. `service-point-tbsm`). Pilih region terdekat.
2. Buka **Settings** proyek → catat **Project ID** dan **API Endpoint**
   (bentuk: `https://<REGION>.cloud.appwrite.io/v1`).
3. **Auth → Users → Create user**: buat akun untuk guru/petugas (email + kata sandi).
   Aplikasi tidak punya form pendaftaran; akun dibuat dari Console.
4. **Databases → Create database** (mis. `servis`) → catat **Database ID**.
5. Di database itu **Create table** (mis. `servis_point`) → catat **Table ID**.
6. Di table: **Columns → Create column** → tipe **Text** (atau Longtext), key **`payload`**, **Required**.
7. Di table: **Settings → Permissions** → tambahkan role **Users** dengan izin **Create, Read, Update, Delete**.
   Biarkan *Row security* mati. Artinya semua akun yang sudah login bisa melihat semua data servis.

> Catatan privasi: data berisi nama dan no. HP pelanggan. Batasi akun hanya untuk petugas yang perlu,
> dan cek pengaturan Auth proyek agar pendaftaran publik tidak terbuka.

## Langkah 2 – Isi config.js

Edit `public/config.js`:

```js
window.SP_CONFIG = {
  endpoint: 'https://<REGION>.cloud.appwrite.io/v1',
  projectId: 'ISI_PROJECT_ID',
  databaseId: 'ISI_DATABASE_ID',
  tableId: 'ISI_TABLE_ID'
};
```

Nilai ini bukan rahasia (dipakai di sisi peramban). **Jangan pernah** menaruh API Key Appwrite di repo ini.

## Langkah 3 – Push ke GitHub

Lewat komputer:

```bash
cd service-point-tbsm
git init
git add .
git commit -m "Service Point TBSM"
git branch -M main
git remote add origin https://github.com/USERNAME/service-point-tbsm.git
git push -u origin main
```

Lewat HP/tanpa Git: buat repo baru di github.com → **Add file → Upload files** → unggah seluruh isi folder
(pertahankan folder `public/`) → **Commit changes**.

## Langkah 4 – Deploy di Appwrite Sites

1. Console → **Sites → Create site → Connect Git repository** → izinkan GitHub → pilih repo `service-point-tbsm`, branch `main`.
2. Pengaturan build:
   - **Framework:** Other (situs statis)
   - **Root directory:** `./`
   - **Install command:** kosongkan
   - **Build command:** kosongkan (jika wajib diisi: `echo "static"`)
   - **Output directory:** `./public`
3. Klik **Deploy**. Tunggu status *Ready*, lalu catat domain situs (menu **Domains**).

Hanya isi folder output (`public`) yang tampil di situs, jadi `index.html` harus ada di dalamnya.

## Langkah 5 – Izinkan domain di Project

Tanpa langkah ini login akan gagal (error origin/CORS).

1. Project → **Overview → Platforms → Add platform → Web**.
2. **Hostname** = domain situs dari Langkah 4 (tanpa `https://`). Jika memakai domain sendiri, tambahkan juga.
3. Simpan.

Domain sendiri (opsional): Sites → situs Anda → **Domains → Add domain**, lalu atur DNS sesuai petunjuk Appwrite.

## Langkah 6 – Uji coba

1. Buka domain situs → muncul layar **Masuk** → login dengan akun dari Langkah 1.3.
2. **Pendaftaran** → isi data → **Daftarkan** → cek di **Antrian**.
3. Buka dari perangkat lain: data harus sama (tekan **Muat ulang** bila perlu).
4. Tekan **PDF** pada salah satu unit → cek kop dan isi formulir.

## Update aplikasi

Ubah file → commit → push ke `main`. Appwrite membuat deployment baru otomatis.

## Mode lokal (tanpa Appwrite)

Jika `projectId` di `config.js` kosong, aplikasi berjalan tanpa login dan menyimpan data di peramban perangkat.
Berguna untuk uji coba cepat: buka `public/index.html`.

## Pemecahan masalah

| Gejala | Penyebab / solusi |
|---|---|
| Situs kosong / 404 | `index.html` tidak ada di output directory. Pastikan **Output directory = `./public`** lalu deploy ulang |
| "Login gagal … origin" | Domain belum didaftarkan di Platforms (Langkah 5) |
| 401 / "not authorized" saat memuat data | Izin table belum memberi role **Users** akses CRUD (Langkah 1.7) |
| "Invalid document structure / attribute" | Kolom `payload` belum dibuat, bukan Text, atau tidak Required |
| Teks panjang terpotong / gagal simpan | Perbesar ukuran kolom `payload` atau pakai Longtext |
| PDF tidak muncul | Butuh internet untuk memuat pustaka jsPDF dan Appwrite dari CDN |
| Data tidak sama antar perangkat | Tekan **Muat ulang**; pastikan `projectId` terisi (bukan mode lokal) |

## Pengembangan lanjutan (opsional)

- Peran (admin / guru / siswa praktik) memakai Teams atau label Appwrite, dengan izin table per peran
- Foto kondisi motor ke Appwrite Storage
- Salin unduh Excel/CSV laporan bulanan
