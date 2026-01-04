# CMS Setup Guide - Portfolio dengan Firebase

## 📋 Langkah-langkah Setup dari Awal sampai Akhir

### 1. Setup Firebase Project

1. **Buka Firebase Console**: https://console.firebase.google.com/
2. **Buat Project Baru** atau gunakan project yang sudah ada
3. **Enable Services yang diperlukan**:
   - **Firestore Database**: 
     - Buka Firestore Database di sidebar
     - Klik "Create database"
     - Pilih "Start in test mode" (untuk development) atau "Start in production mode"
     - Pilih lokasi database (pilih yang terdekat dengan user Anda)
   
   - **Storage**:
     - Buka Storage di sidebar
     - Klik "Get started"
     - Pilih "Start in test mode" atau setup security rules sesuai kebutuhan
   
   - **Authentication**:
     - Buka Authentication di sidebar
     - Klik "Get started"
     - Enable "Email/Password" sign-in method

4. **Dapatkan Firebase Config**:
   - Buka Project Settings (ikon gear) > General
   - Scroll ke bawah ke bagian "Your apps"
   - Klik ikon web (</>) untuk menambahkan web app
   - Copy config values yang diberikan

**💡 TIPS MENGHEMAT BIAYA**: 
- Firebase Storage **TIDAK WAJIB** digunakan!
- Di CMS, Anda bisa pilih antara:
  - **URL (Gratis)**: Masukkan URL langsung dari Imgur, Cloudinary, atau file di folder `/public`
  - **Upload (Bayar)**: Upload ke Firebase Storage (hanya jika diperlukan)
- Default mode adalah **URL (Gratis)** untuk menghemat biaya!
- Lihat `TIPS_MENGHEMAT_BIAYA.md` untuk detail lengkap

### 2. Setup Environment Variables

1. **Copy `.env.example` ke `.env.local`**:
   ```bash
   cp .env.example .env.local
   ```

2. **Isi `.env.local` dengan Firebase config Anda**:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Setup Firestore Security Rules

Buka Firebase Console > Firestore Database > Rules, dan update dengan:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents
    match /{document=**} {
      allow read: if true;
    }
    
    // Allow write access only to authenticated users
    match /{document=**} {
      allow write: if request.auth != null;
    }
  }
}
```

**Catatan**: Untuk production, sebaiknya setup rules yang lebih ketat sesuai kebutuhan.

### 5. Setup Storage Security Rules

Buka Firebase Console > Storage > Rules, dan update dengan:

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

### 6. Buat Admin User

1. Buka Firebase Console > Authentication
2. Klik "Add user"
3. Masukkan email dan password untuk admin
4. Simpan credentials ini untuk login ke CMS

### 7. Jalankan Development Server

```bash
npm run dev
```

### 8. Akses CMS Admin Panel

1. Buka browser dan akses: `http://localhost:3000/admin/login`
2. Login dengan email dan password admin yang sudah dibuat
3. Anda akan diarahkan ke dashboard CMS

### 9. Setup Data Awal via CMS

Setelah login, Anda bisa mulai mengisi data:

1. **Hero Section** (`/admin/hero`):
   - Name: Nama Anda
   - Role: Posisi/jabatan
   - Description: Deskripsi singkat
   - Available Status: Toggle untuk status "Available for roles"

2. **About Section** (`/admin/about`):
   - Name: Nama lengkap
   - Role: Posisi/jabatan
   - Description: Deskripsi lengkap tentang Anda
   - Experiences: Tambahkan pengalaman kerja (Company, Position, Period, Order)

3. **Projects** (`/admin/projects`):
   - Klik "Add Project"
   - Isi Title, Subtitle, URL
   - **Pilih mode Image/Video**:
     - **URL (Gratis)**: Masukkan URL langsung (contoh: `https://imgur.com/xxx.jpg` atau `/image.png` untuk file di public folder)
     - **Upload (Bayar)**: Upload file ke Firebase Storage (opsional, hanya jika diperlukan)
   - Set Order untuk mengatur urutan tampilan

4. **Contact** (`/admin/contact`):
   - Setup contact links (CV, LinkedIn, Email)
   - Isi URL untuk masing-masing link
   - Set Order untuk mengatur urutan tampilan

### 10. Struktur Data di Firestore

Setelah setup, Firestore akan memiliki struktur berikut:

```
firestore/
├── projects/          # Collection untuk projects
│   └── {projectId}/   # Document dengan fields: title, subtitle, imgSrc, url, order
├── hero/              # Collection untuk hero section
│   └── data/          # Single document dengan fields: name, role, description, availableStatus
├── about/             # Collection untuk about section
│   └── data/          # Single document dengan fields: name, role, description, experiences[]
└── contact/            # Collection untuk contact
    └── data/          # Single document dengan fields: links[]
```

### 11. Build untuk Production

```bash
npm run build
npm start
```

## 🔐 Security Notes

- **Development**: Rules di atas memungkinkan read untuk semua, write hanya untuk authenticated users
- **Production**: Sebaiknya setup rules yang lebih ketat, misalnya:
  - Hanya allow read untuk specific domains
  - Setup role-based access control jika diperlukan

## 📝 Catatan Penting

1. **File Upload (OPSIONAL)**: 
   - **Default mode adalah URL (GRATIS)** - tidak pakai Firebase Storage
   - Upload ke Firebase Storage hanya jika benar-benar diperlukan (akan berbayar)
   - **Rekomendasi**: Gunakan URL dari:
     - File di folder `/public` (contoh: `/image.png`)
     - Imgur (gratis, unlimited)
     - Cloudinary (free tier)
     - Atau hosting gambar gratis lainnya

2. **Order Field**: Gunakan field `order` untuk mengatur urutan tampilan (angka lebih kecil = tampil lebih dulu)

3. **Image URLs**: 
   - **Cara Gratis**: Masukkan URL langsung (tidak pakai storage)
   - **Cara Bayar**: Upload file ke Firebase Storage (opsional)

## 🐛 Troubleshooting

- **Error "Firebase app not initialized"**: Pastikan `.env.local` sudah diisi dengan benar
- **Error "Permission denied"**: Check Firestore dan Storage security rules
- **Login tidak berfungsi**: Pastikan Email/Password authentication sudah di-enable di Firebase Console
- **File tidak terupload**: Check Storage rules dan pastikan user sudah login

## 🎉 Selesai!

Setelah semua setup selesai, portfolio Anda sekarang sudah terhubung dengan CMS. Anda bisa update konten kapan saja melalui `/admin` tanpa perlu edit code!

