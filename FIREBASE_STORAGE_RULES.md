# Firebase Storage Rules - Copy Paste Ini

## ✅ Rules yang Benar (Copy paste ke Firebase Console)

Buka: https://console.firebase.google.com/project/portfolios-36e7e/storage/rules

Paste rules ini:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow read access to all files (untuk portfolio bisa tampil gambar)
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Allow write access only to authenticated users (hanya admin yang login bisa upload)
    match /{allPaths=**} {
      allow write: if request.auth != null;
    }
  }
}
```

## 📝 Penjelasan Rules

- **`allow read: if true`** → Semua orang bisa baca file (gambar bisa tampil di portfolio)
- **`allow write: if request.auth != null`** → Hanya user yang sudah login (admin) yang bisa upload

## 🔒 Rules Lebih Ketat (Opsional - untuk Production)

Jika mau lebih aman, bisa pakai ini:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow read untuk semua
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Allow write hanya untuk authenticated users dan hanya di folder projects/
    match /projects/{fileName} {
      allow write: if request.auth != null 
                   && request.resource.size < 10 * 1024 * 1024  // Max 10MB
                   && request.resource.contentType.matches('image/.*|video/.*');
    }
  }
}
```

Rules ini:
- ✅ Read: semua bisa baca
- ✅ Write: hanya authenticated users
- ✅ Hanya di folder `projects/`
- ✅ Max file size: 10MB
- ✅ Hanya image/video

## 🚀 Cara Update Rules

1. Buka: https://console.firebase.google.com/project/portfolios-36e7e/storage/rules
2. Copy paste rules di atas
3. Klik **"Publish"**
4. Done! ✅

## ⚠️ Rules Saat Ini (Masalah)

Rules yang Anda tunjukkan:
```javascript
allow read, write: if false;
```

Ini berarti:
- ❌ Tidak ada yang bisa read (gambar tidak bisa tampil)
- ❌ Tidak ada yang bisa write (tidak bisa upload)

**Harus di-update!**

