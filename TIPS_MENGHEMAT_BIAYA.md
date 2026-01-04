# 💰 Tips Menghemat Biaya Firebase

## 🎯 Strategi Gratis untuk Portfolio CMS

### ✅ Yang GRATIS (Firebase Free Tier)

1. **Firestore Database** - 1GB storage, 50K reads/day, 20K writes/day
   - ✅ Cukup untuk portfolio kecil-menengah
   - ✅ Data portfolio tidak besar (hanya text + URLs)

2. **Authentication** - Unlimited
   - ✅ Login admin tidak terbatas

3. **Hosting** - 10GB storage, 360MB/day bandwidth
   - ✅ Cukup untuk Next.js app

### ⚠️ Yang BAYAR (Firebase Storage)

- **Storage**: $0.026/GB/month + $0.12/GB download
- **Masalah**: Video dan gambar besar bisa cepat habiskan quota

## 💡 Solusi: Pakai URL Langsung (GRATIS)

### Opsi 1: File di Folder `/public` (Paling Mudah)

1. Taruh file gambar/video di folder `public/`
2. Di CMS, masukkan path: `/nama-file.jpg`
3. **GRATIS** - tidak pakai Firebase Storage!

**Contoh:**
```
public/
  ├── project1.jpg
  ├── project2.mp4
  └── project3.png
```

Di CMS: Masukkan `/project1.jpg`

### Opsi 2: Imgur (Gratis, Unlimited)

1. Upload gambar ke https://imgur.com
2. Copy direct link (klik kanan gambar > Copy image address)
3. Paste URL di CMS
4. **GRATIS** - tidak pakai Firebase Storage!

**Contoh URL:**
```
https://i.imgur.com/abc123.jpg
```

### Opsi 3: Cloudinary (Free Tier)

1. Daftar di https://cloudinary.com (free tier)
2. Upload gambar/video
3. Copy URL
4. Paste di CMS
5. **GRATIS** - 25GB storage + 25GB bandwidth/month

### Opsi 4: GitHub (Gratis)

1. Upload file ke GitHub repo
2. Gunakan raw.githubusercontent.com URL
3. **GRATIS** - unlimited untuk public repo

**Contoh:**
```
https://raw.githubusercontent.com/username/repo/main/images/project.jpg
```

### Opsi 5: Vercel Blob (Gratis untuk Next.js)

Jika deploy di Vercel, bisa pakai Vercel Blob Storage (free tier)

## 🎨 Cara Pakai di CMS

1. Buka `/admin/projects`
2. Klik "Add Project" atau "Edit"
3. Di bagian "Image/Video Source", pilih **"📎 URL (Gratis)"**
4. Masukkan URL atau path file
5. Save

**Default mode sudah URL (Gratis)** - tidak perlu ubah apapun!

## 📊 Perbandingan Biaya

| Metode | Biaya | Storage | Bandwidth |
|--------|-------|---------|-----------|
| Firebase Storage | $0.026/GB/month | Terbatas | $0.12/GB |
| Folder `/public` | **GRATIS** | Unlimited* | Unlimited* |
| Imgur | **GRATIS** | Unlimited | Unlimited |
| Cloudinary | **GRATIS** | 25GB | 25GB/month |
| GitHub | **GRATIS** | Unlimited | Unlimited |

*Tergantung hosting provider (Vercel/Netlify biasanya gratis untuk static files)

## 🚀 Rekomendasi

**Untuk Portfolio:**
1. ✅ **Gunakan folder `/public`** untuk file yang tidak berubah
2. ✅ **Gunakan Imgur** untuk file yang perlu di-update sering
3. ✅ **Gunakan Cloudinary** jika perlu image optimization
4. ❌ **Hindari Firebase Storage** kecuali benar-benar diperlukan

## ⚙️ Setup Folder `/public`

1. Taruh semua gambar/video project di folder `public/`
2. Di CMS, masukkan path relatif: `/nama-file.jpg`
3. File akan di-serve langsung oleh Next.js
4. **Tidak pakai Firebase Storage sama sekali!**

**Contoh struktur:**
```
public/
  ├── projects/
  │   ├── project1.jpg
  │   ├── project2.mp4
  │   └── project3.png
```

Di CMS: Masukkan `/projects/project1.jpg`

## ✅ Kesimpulan

**Firebase Storage TIDAK WAJIB digunakan!**

- Default mode CMS sudah **URL (Gratis)**
- Upload ke Firebase Storage hanya **opsional**
- Portfolio bisa 100% gratis dengan pakai URL langsung

---

**Total Biaya Portfolio dengan strategi ini: $0/month** 🎉

