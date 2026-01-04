# 📸 Cara Upload Gambar Project ke Firebase

## 🎯 Lokasi Upload

**Gambar yang di-upload akan disimpan di:**
- **Firebase Storage** 
- **Path**: `projects/{timestamp}_{filename}`
- **Contoh**: `projects/1704067200000_project-screenshot.jpg`

## 📋 Langkah-langkah Upload

### 1. Pastikan Firebase Storage Sudah Di-Enable

1. Buka: https://console.firebase.google.com/project/portfolios-36e7e/storage
2. Jika belum ada, klik **"Get started"**
3. Pilih **"Start in test mode"** (untuk development)
4. Pilih lokasi yang sama dengan Firestore
5. Klik **"Done"**

### 2. Setup Storage Security Rules

Buka **Storage > Rules**, paste ini:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow read access to all files
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Allow write access only to authenticated users
    match /{allPaths=**} {
      allow write: if request.auth != null;
    }
  }
}
```

Klik **"Publish"**

### 3. Upload Gambar via CMS

1. Buka `/admin/projects`
2. Klik **"Add Project"** atau **"Edit"** project yang sudah ada
3. Di bagian **"Image/Video Source"**, klik tombol **"☁️ Upload (Bayar)"**
4. Pilih file gambar/video dari komputer
5. Isi form lainnya (Title, Subtitle, URL, Order)
6. Klik **"Save"**
7. Tunggu sampai upload selesai (akan muncul loading "Saving...")

### 4. Cek Upload di Firebase Console

1. Buka: https://console.firebase.google.com/project/portfolios-36e7e/storage
2. Lihat folder `projects/`
3. File yang di-upload akan muncul di sana

## 💡 Alternatif Gratis (Tidak Pakai Storage)

Jika tidak mau pakai Firebase Storage (berbayar), bisa pakai **URL langsung**:

1. Klik tombol **"📎 URL (Gratis)"**
2. Masukkan URL gambar:
   - **File di folder `/public`**: `/nama-file.jpg`
   - **Imgur**: `https://i.imgur.com/xxx.jpg`
   - **Cloudinary**: `https://res.cloudinary.com/xxx.jpg`
   - **URL lain**: URL lengkap ke gambar

## 🔍 Cara Cek Apakah Upload Berhasil

1. **Di CMS**: Setelah save, refresh halaman. Project akan muncul dengan gambar
2. **Di Firebase Console**: Buka Storage, cek folder `projects/`
3. **Di Portfolio**: Buka homepage, scroll ke section Projects, gambar harus muncul

## ⚠️ Troubleshooting

### Error "Permission denied"
- Pastikan Storage Rules sudah di-setup dengan benar
- Pastikan user sudah login di CMS

### Error "Storage not initialized"
- Pastikan Firebase Storage sudah di-enable di Firebase Console
- Pastikan `.env.local` sudah diisi dengan benar
- Restart dev server: `npm run dev`

### Gambar tidak muncul di portfolio
- Cek apakah URL gambar valid (bisa diakses)
- Cek console browser untuk error
- Pastikan format gambar didukung (jpg, png, gif, webp, mp4, webm)

### Upload lambat
- File terlalu besar? Kompres dulu gambar/video
- Koneksi internet lambat? Tunggu sampai selesai

## 📊 Info Storage

- **Lokasi**: Firebase Storage
- **Path**: `projects/{timestamp}_{filename}`
- **Format**: URL otomatis dari Firebase Storage
- **Contoh URL**: `https://firebasestorage.googleapis.com/v0/b/portfolios-36e7e.firebasestorage.app/o/projects%2F1704067200000_image.jpg?alt=media&token=xxx`

## 💰 Biaya

- **Firebase Storage**: $0.026/GB/month + $0.12/GB download
- **Rekomendasi**: Untuk portfolio kecil, pakai **URL (Gratis)** lebih hemat!

---

**Tips**: Untuk portfolio, lebih baik pakai **URL (Gratis)** dengan upload gambar ke folder `/public` atau Imgur. Firebase Storage hanya perlu jika benar-benar diperlukan.

