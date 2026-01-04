# 📋 Environment Variables untuk Vercel (Copy-Paste)

## Cara Pakai:
1. Buka **Vercel Dashboard** → Project kamu → **Settings** → **Environment Variables**
2. Copy-paste key dan value di bawah ini satu per satu
3. Set untuk **Production**, **Preview**, dan **Development** (centang semua)
4. Setelah semua, **Redeploy** aplikasi

---

## 🔑 Key-Value Pairs:

### 1. API Key
**Key:**
```
NEXT_PUBLIC_FIREBASE_API_KEY
```

**Value:**
```
AIzaSyB4Hl5taZRO-8LMqHpnEUo2NgTYoU5vQkU
```

---

### 2. Auth Domain
**Key:**
```
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
```

**Value:**
```
portfolios-36e7e.firebaseapp.com
```

---

### 3. Project ID
**Key:**
```
NEXT_PUBLIC_FIREBASE_PROJECT_ID
```

**Value:**
```
portfolios-36e7e
```

---

### 4. Storage Bucket
**Key:**
```
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
```

**Value:**
```
portfolios-36e7e.firebasestorage.app
```

---

### 5. Messaging Sender ID
**Key:**
```
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
```

**Value:**
```
757349267140
```

---

### 6. App ID
**Key:**
```
NEXT_PUBLIC_FIREBASE_APP_ID
```

**Value:**
```
1:757349267140:web:961401cd493e0008387b91
```

---

### 7. Measurement ID (Optional - untuk Analytics)
**Key:**
```
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

**Value:**
```
G-QN48BRWBST
```

---

## 📝 Cara Dapatkan Value dari Firebase:

1. Buka [Firebase Console](https://console.firebase.google.com)
2. Pilih project kamu
3. Klik **Settings (⚙️)** → **Project settings**
4. Scroll ke bagian **"Your apps"**
5. Klik ikon **Web (</>)** atau **"Add app"** jika belum ada
6. Copy semua nilai dari Firebase config object
7. Paste ke VALUE di atas

**Contoh Firebase Config yang akan kamu lihat:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop",
  measurementId: "G-XXXXXXXXXX"
};
```

---

## ⚠️ Penting:

- **Jangan** share file ini ke publik setelah diisi dengan value asli
- Pastikan semua variable dimulai dengan `NEXT_PUBLIC_`
- Set semua untuk **Production**, **Preview**, dan **Development**
- **Redeploy** setelah menambah semua variables

