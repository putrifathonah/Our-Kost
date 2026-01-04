# Dokumentasi Contact System Integration

## 📋 Overview

Sistem contact form yang terintegrasi penuh dengan backend dan database MongoDB. Semua pesan yang dikirim pengguna akan tersimpan di database.

---

## 🔧 Backend Implementation

### 1. Contact Model (`mvc/models/contact.js`)

**File:** [mvc/models/contact.js](mvc/models/contact.js)

Mendefinisikan struktur data contact dengan field:

- `name` - Nama pengirim
- `email` - Email pengirim
- `subject` - Subjek pesan
- `message` - Isi pesan
- `status` - Status pesan (belum dibaca / sudah dibaca)
- `timestamps` - Otomatis catat tanggal buat dan update

### 2. Contact Controller (`mvc/controllers/contactController.js`)

**File:** [mvc/controllers/contactController.js](mvc/controllers/contactController.js)

Fungsi-fungsi yang tersedia:

- **createContact()** - Menerima data form dari frontend dan simpan ke database
- **getAllContacts()** - Mengambil semua pesan (untuk admin)
- **getContactById()** - Mengambil detail pesan spesifik
- **updateContactStatus()** - Ubah status pesan (dibaca/belum dibaca)
- **deleteContact()** - Hapus pesan

### 3. Contact Routes (`mvc/routes/contacts.js`)

**File:** [mvc/routes/contacts.js](mvc/routes/contacts.js)

API Endpoints:

```
POST   /api/contacts           → Kirim pesan baru
GET    /api/contacts           → Ambil semua pesan
GET    /api/contacts/:id       → Ambil pesan berdasarkan ID
PUT    /api/contacts/:id       → Update status pesan
DELETE /api/contacts/:id       → Hapus pesan
```

### 4. Update app.js

**File:** [app.js](app.js)

Contact router sudah ditambahkan ke app.js:

```javascript
var contactRouter = require("./mvc/routes/contacts");
app.use("/api/contacts", contactRouter);
```

---

## 🎨 Frontend Implementation

### 1. Contact Service (`src/app/services/contact.service.ts`)

**File:** [src/app/services/contact.service.ts](src/app/services/contact.service.ts)

Service yang handle HTTP request ke backend:

- `submitContact()` - POST pesan ke backend
- `getAllContacts()` - GET semua pesan
- `getContactById()` - GET pesan spesifik
- `updateContactStatus()` - PUT update status
- `deleteContact()` - DELETE pesan

**Base URL:** `http://localhost:3000/api/contacts`

### 2. Contact Component (`src/app/contact/contact.ts`)

**File:** [src/app/contact/contact.ts](src/app/contact/contact.ts)

Fitur:

- Injection `ContactService`
- Loading state saat pengiriman
- Success dan error message
- Validasi form sebelum submit
- Auto reset form setelah berhasil

### 3. Contact Template (`src/app/contact/contact.html`)

**File:** [src/app/contact/contact.html](src/app/contact/contact.html)

Fitur UI:

- Alert success dan error
- Loading indicator dengan disable input
- Icon dinamis (send/hourglass)
- Semua input ter-disable saat loading

---

## 🚀 Cara Menggunakan

### 1. Setup Backend

```bash
cd kost-kita-backend
npm install
npm run dev
```

Backend akan berjalan di `http://localhost:3000`

### 2. Setup Frontend

```bash
cd kost_kita
npm install
ng serve
```

Frontend akan berjalan di `http://localhost:4200`

### 3. Database

Pastikan MongoDB sudah running dan environment variable sudah set di `.env`:

```
MONGODB_URI=mongodb://localhost:27017/kostkita
```

### 4. Testing

1. Buka halaman Contact di http://localhost:4200/contact
2. Isi form dengan data:
   - Nama: John Doe
   - Email: john@example.com
   - Subjek: Pertanyaan
   - Pesan: Saya ingin bertanya...
3. Klik tombol "Kirim Pesan"
4. Data akan langsung tersimpan di database MongoDB

---

## 📊 Database Structure

Koleksi `contacts` di MongoDB:

```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string",
  "status": "belum dibaca" | "sudah dibaca",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

---

## 🔍 Testing dengan API

### Kirim Pesan

```bash
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test",
    "message": "Testing contact form"
  }'
```

### Ambil Semua Pesan

```bash
curl http://localhost:3000/api/contacts
```

### Ambil Pesan Spesifik

```bash
curl http://localhost:3000/api/contacts/[ID]
```

### Update Status

```bash
curl -X PUT http://localhost:3000/api/contacts/[ID] \
  -H "Content-Type: application/json" \
  -d '{"status": "sudah dibaca"}'
```

### Hapus Pesan

```bash
curl -X DELETE http://localhost:3000/api/contacts/[ID]
```

---

## ✨ Fitur Tambahan (Optional)

Jika ingin menambahkan fitur:

1. **Email Notification** - Kirim email ke admin saat ada pesan baru
2. **Pagination** - Tampilkan pesan dengan pagination
3. **Search & Filter** - Cari pesan berdasarkan nama/email
4. **Admin Dashboard** - Halaman admin untuk kelola pesan
5. **Email Reply** - Admin bisa balas email dari dashboard

---

## 🐛 Troubleshooting

### CORS Error

Pastikan CORS sudah enable di app.js:

```javascript
app.use(cors());
```

### Database Connection Error

Pastikan MongoDB sudah running dan MONGODB_URI di .env benar

### API Not Found

Pastikan route contacts sudah ditambahkan di app.js:

```javascript
app.use("/api/contacts", contactRouter);
```

---

## ✅ Checklist

- [x] Contact Model dengan Mongoose
- [x] Contact Controller dengan CRUD operations
- [x] Contact Routes dengan semua endpoints
- [x] Integration ke app.js
- [x] Contact Service di frontend
- [x] Contact Component dengan loading state
- [x] UI dengan success/error messages
- [x] Form validation
- [x] Auto reset form setelah submit

---

**Status:** ✅ PRODUCTION READY
