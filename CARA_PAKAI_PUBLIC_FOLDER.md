# 📁 Cara Pakai Folder `/public` untuk Gambar (GRATIS)

Karena Imgur di-block, cara **paling mudah dan gratis** adalah pakai folder `/public` di project Anda.

## 🎯 Keuntungan Pakai `/public`

- ✅ **100% GRATIS** - tidak pakai Firebase Storage
- ✅ **Tidak perlu upload** ke mana-mana
- ✅ **File langsung bisa diakses** via URL
- ✅ **Tidak ada limit** storage
- ✅ **Cepat** - file di-serve langsung dari server

## 📋 Langkah-langkah

### 1. Buat Folder untuk Projects

Di root project Anda, buat folder:
```
public/
  └── projects/
```

**Cara cepat via terminal:**
```bash
mkdir public\projects
```

Atau manual:
- Buka folder `public/`
- Buat folder baru bernama `projects`

### 2. Taruh File Gambar/Video

Copy file gambar atau video project Anda ke folder:
```
public/projects/nama-file.jpg
```

**Contoh:**
- `public/projects/project1.jpg`
- `public/projects/project2.png`
- `public/projects/project3.mp4`

### 3. Masukkan Path di CMS

1. Buka `/admin/projects`
2. Klik "Add Project" atau "Edit"
3. Pastikan tombol **"📎 URL (Gratis)"** aktif (hijau)
4. Di field "Image/Video Source", masukkan path:
   ```
   /projects/nama-file.jpg
   ```

**Contoh:**
- File: `public/projects/my-project.png`
- Path di CMS: `/projects/my-project.png`

- File: `public/projects/video-demo.mp4`
- Path di CMS: `/projects/video-demo.mp4`

### 4. Save Project

Klik "Save" dan gambar akan muncul di portfolio!

## 📝 Contoh Lengkap

**Struktur folder:**
```
portfolio.new/
  ├── public/
  │   ├── projects/
  │   │   ├── project1.jpg
  │   │   ├── project2.png
  │   │   └── project3.mp4
  │   └── ...
  └── ...
```

**Di CMS, masukkan:**
- Project 1: `/projects/project1.jpg`
- Project 2: `/projects/project2.png`
- Project 3: `/projects/project3.mp4`

## 🔍 Cara Cek Apakah Path Benar

1. File ada di: `public/projects/nama-file.jpg`
2. Path di CMS: `/projects/nama-file.jpg` (awal dengan `/`)
3. Buka browser: `http://localhost:3000/projects/nama-file.jpg`
4. Jika gambar muncul = path benar! ✅

## ⚠️ Tips Penting

1. **Path harus mulai dengan `/`**: `/projects/file.jpg` ✅ (bukan `projects/file.jpg` ❌)
2. **Nama file case-sensitive**: `Project.jpg` ≠ `project.jpg`
3. **Gunakan nama file tanpa spasi**: `my-project.jpg` ✅ (bukan `my project.jpg` ❌)
4. **Format yang didukung**: jpg, png, gif, webp, svg, mp4, webm, ogg

## 🎨 Alternatif Lain (Jika Tidak Mau Pakai /public)

### 1. Cloudinary (Free Tier)
- Daftar: https://cloudinary.com
- Upload gambar
- Copy URL
- Paste di CMS

### 2. GitHub
- Upload ke GitHub repo (public)
- Pakai raw.githubusercontent.com URL
- Contoh: `https://raw.githubusercontent.com/username/repo/main/images/file.jpg`

### 3. Firebase Storage (Berbayar)
- Klik tombol "☁️ Upload (Bayar)"
- Upload langsung via CMS
- Akan masuk ke Firebase Storage

## ✅ Kesimpulan

**Untuk portfolio, pakai folder `/public` adalah pilihan terbaik:**
- Gratis
- Mudah
- Tidak perlu setup tambahan
- File langsung bisa diakses

**Cara pakai:**
1. Taruh file di `public/projects/`
2. Masukkan path `/projects/nama-file.jpg` di CMS
3. Done! ✅

---

**Note**: File di folder `/public` akan ikut ter-deploy saat build. Pastikan file tidak terlalu besar agar build cepat.

