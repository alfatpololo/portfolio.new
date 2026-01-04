# 🚀 Panduan Setup Portfolio di Vercel (Production)

Setelah push ke Vercel, ikuti langkah-langkah berikut untuk setup lengkap:

## 📋 Checklist Setup

### 1. ✅ Setup Environment Variables di Vercel

1. Buka **Vercel Dashboard** → Pilih project kamu
2. Pergi ke **Settings** → **Environment Variables**
3. Tambahkan semua environment variables berikut (ambil dari `.env.local` kamu):

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX (optional)
```

4. Set semua variables untuk **Production**, **Preview**, dan **Development**
5. Klik **Save**
6. **Redeploy** aplikasi (Settings → Deployments → klik 3 dots → Redeploy)

### 2. ✅ Setup Firebase Security Rules

#### Firestore Rules
Buka **Firebase Console** → **Firestore Database** → **Rules**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Projects collection - public read, authenticated write
    match /projects/{projectId} {
      allow read: if true; // Semua orang bisa baca
      allow write: if request.auth != null; // Hanya yang login bisa write
    }
  }
}
```

#### Storage Rules
Buka **Firebase Console** → **Storage** → **Rules**

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{allPaths=**} {
      allow read: if true; // Semua orang bisa baca
      allow write: if request.auth != null; // Hanya yang login bisa upload
    }
  }
}
```

### 3. ✅ Buat Admin User (Pertama Kali)

**Opsi A: Via Website (Paling Mudah)**
1. Buka website kamu di Vercel: `https://your-domain.vercel.app`
2. Pergi ke: `https://your-domain.vercel.app/admin/login`
3. Klik **"Belum punya akun? Register"**
4. Isi email dan password
5. Klik **Register**
6. Setelah berhasil, login dengan email dan password tersebut

**Opsi B: Via Firebase Console**
1. Buka **Firebase Console** → **Authentication** → **Users**
2. Klik **Add user**
3. Masukkan email dan password
4. Klik **Add user**

### 4. ✅ Test CMS di Production

1. Login di: `https://your-domain.vercel.app/admin/login`
2. Setelah login, kamu akan diarahkan ke dashboard: `https://your-domain.vercel.app/admin`
3. Klik **"Manage Projects"**
4. Coba **tambah project baru**:
   - Isi semua field (title, description, tech stack, dll)
   - Upload gambar/video ke Firebase Storage
   - Klik **Create Project**
5. Cek apakah project muncul di halaman utama: `https://your-domain.vercel.app/Project`

### 5. ✅ Setup Custom Domain (Optional)

1. Di **Vercel Dashboard** → **Settings** → **Domains**
2. Tambahkan domain kamu (misal: `portfolio.com`)
3. Ikuti instruksi untuk setup DNS
4. Tunggu sampai domain aktif (biasanya beberapa menit)

### 6. ✅ Verifikasi Semua Fitur

- [ ] Halaman utama bisa diakses
- [ ] Hero section tampil (hardcoded)
- [ ] About section tampil (hardcoded)
- [ ] Contact section tampil (hardcoded)
- [ ] Projects section bisa fetch dari Firebase
- [ ] Admin login berfungsi
- [ ] Bisa create project baru
- [ ] Bisa edit project
- [ ] Bisa delete project
- [ ] Gambar/video dari Firebase Storage tampil dengan benar
- [ ] Order project bekerja (project baru jadi order 0)

## 🔧 Troubleshooting

### Problem: Environment variables tidak terbaca
**Solusi:**
- Pastikan semua variable dimulai dengan `NEXT_PUBLIC_`
- Redeploy setelah menambah environment variables
- Cek di Vercel logs apakah ada error

### Problem: Firebase Auth error
**Solusi:**
- Pastikan Firebase Authentication sudah di-enable di Firebase Console
- Cek apakah email provider sudah di-enable (Email/Password)
- Pastikan environment variables sudah benar

### Problem: Gambar tidak tampil
**Solusi:**
- Cek Firebase Storage Rules (harus allow read: if true)
- Cek apakah gambar sudah ter-upload ke Storage
- Cek console browser untuk error CORS atau 403

### Problem: Tidak bisa login
**Solusi:**
- Pastikan sudah buat user admin (via register atau Firebase Console)
- Cek Firebase Authentication → Users apakah user sudah ada
- Cek browser console untuk error detail

### Problem: Build error di Vercel
**Solusi:**
- Cek build logs di Vercel
- Pastikan semua dependencies terinstall
- Pastikan TypeScript tidak ada error (sudah fix di local)

## 📝 Next Steps Setelah Setup

1. **Upload Project Pertama:**
   - Login ke admin panel
   - Tambah project portfolio kamu
   - Upload gambar/video
   - Test di halaman utama

2. **Optimize Images:**
   - Gunakan format WebP untuk gambar
   - Compress gambar sebelum upload
   - Gunakan resolusi yang sesuai (tidak terlalu besar)

3. **Monitor Firebase Usage:**
   - Cek Firebase Console → Usage untuk monitor storage dan bandwidth
   - Setup billing alerts jika perlu

4. **Backup Data:**
   - Export Firestore data secara berkala
   - Simpan backup Firebase Storage

## 🎉 Selesai!

Portfolio kamu sekarang sudah live dan siap digunakan! 

**URL penting:**
- Website: `https://your-domain.vercel.app`
- Admin Login: `https://your-domain.vercel.app/admin/login`
- Admin Dashboard: `https://your-domain.vercel.app/admin`

**Tips:**
- Simpan email dan password admin dengan aman
- Jangan share URL admin ke publik
- Update portfolio secara berkala via CMS

