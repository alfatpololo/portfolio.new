# 📍 Penjelasan: Gambar Tampil Tapi Tidak Ada di Firebase Storage

## ✅ Ini Normal dan Benar!

Gambar yang tampil di web **TIDAK HARUS** ada di Firebase Storage. Ada 2 cara:

### 1. 📁 Folder `/public` (Yang Anda Pakai Sekarang - GRATIS)

**Lokasi gambar:**
- Di folder: `public/fiverr.mp4`, `public/Kanakadashboard.png`, dll
- **TIDAK** masuk ke Firebase Storage
- File ikut ter-deploy bersama project

**Cara kerja:**
- Path di Firebase: `/fiverr.mp4` atau `/Kanakadashboard.png`
- Browser ambil dari: `http://localhost:3000/fiverr.mp4`
- File di-serve langsung dari server Next.js

**Keuntungan:**
- ✅ **GRATIS** - tidak pakai Firebase Storage
- ✅ File ikut ter-deploy
- ✅ Cepat - tidak perlu download dari Storage

### 2. ☁️ Firebase Storage (Berbayar)

**Lokasi gambar:**
- Di Firebase Storage: `projects/timestamp_filename.jpg`
- URL: `https://firebasestorage.googleapis.com/...`

**Cara kerja:**
- Upload via CMS dengan mode "☁️ Upload (Bayar)"
- File masuk ke Firebase Storage
- Browser ambil dari URL Firebase Storage

**Kapan pakai:**
- Kalau mau upload file baru via CMS
- Kalau file terlalu besar untuk `/public`

## 🔍 Cara Cek Gambar dari Mana

### Cek di Browser (F12 → Network):

**Jika dari `/public`:**
```
Request URL: http://localhost:3000/fiverr.mp4
Status: 200 OK
```

**Jika dari Firebase Storage:**
```
Request URL: https://firebasestorage.googleapis.com/v0/b/portfolios-36e7e.firebasestorage.app/o/projects%2F...
Status: 200 OK
```

### Cek di Code:

Di `pages/Project.tsx` line 77:
```tsx
<img src={project.imgSrc || '/placeholder.png'} />
```

Jika `project.imgSrc` = `/fiverr.mp4` → ambil dari `/public`
Jika `project.imgSrc` = `https://firebasestorage...` → ambil dari Storage

## 📊 Perbandingan

| Aspek | Folder `/public` | Firebase Storage |
|-------|------------------|-----------------|
| **Lokasi** | `public/fiverr.mp4` | `projects/timestamp_file.jpg` |
| **URL** | `/fiverr.mp4` | `https://firebasestorage...` |
| **Biaya** | ✅ GRATIS | ❌ Berbayar |
| **Upload via CMS** | ❌ Manual (copy file) | ✅ Bisa upload |
| **Deploy** | ✅ Ikut ter-deploy | ❌ Terpisah |

## ✅ Kesimpulan

**Gambar yang tampil di web itu dari folder `/public` - ini benar dan normal!**

- ✅ Tidak perlu masuk ke Firebase Storage
- ✅ File ada di: `public/fiverr.mp4`, `public/Kanakadashboard.png`, dll
- ✅ Path di Firebase: `/fiverr.mp4`, `/Kanakadashboard.png`
- ✅ Browser ambil dari: `http://localhost:3000/fiverr.mp4`

**Firebase Storage hanya perlu kalau:**
- Mau upload file baru via CMS (mode "☁️ Upload")
- File terlalu besar untuk `/public`

**Untuk portfolio, pakai folder `/public` adalah pilihan terbaik!** ✅

---

**Note**: Saat deploy ke production (Vercel/Netlify), file di `/public` akan ikut ter-deploy dan bisa diakses langsung. Tidak perlu setup tambahan!

