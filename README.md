# 🍬 Bikaner Misthan Bhandar (BMB) — Civil Lines, Bijnor

> **Official Digital Ordering Platform & Hybrid Mobile App for Bikaner Misthan Bhandar, Civil Lines, Bijnor (U.P.)**  
> *Authentic Pure Desi Ghee Traditional Mithai, Samosas, Dhokla, and Celebration Treat Boxes.*

---

## 🌟 Key Features

### 1. 📜 Tularam-Style Single-Page Menu
- **All 49 Traditional Items on One Page:** Seamless browsing without page reloads.
- **Dual-Language Typography:** English & authentic Hindi Devanagari titles (*Kaju Katli / काजू कतली*, *Desi Samosa / देसी समोसा*, *Spongy Rasgulla / स्पंजी रसगुल्ला*).
- **Inline Portion Selector:** Switch between `250g`, `500g`, `1kg`, or piece quantities right on the card with real-time price updates.
- **Effortless 1-Tap Add:** Tap `ADD` to immediately add to cart; the button morphs into an active `[-] Qty [+]` counter.
- **Floating Cart Bar:** Slides up whenever items are added, showing total item count, live subtotal, and a 1-tap checkout button.

### 2. ⚡ Counter & Dine-in QR Code System
- **Frictionless QR Ordering (`/qr-order`):** Customers scan the counter acrylic stand with any smartphone camera (iPhone, Android, Google Lens, Paytm, PhonePe) to order directly without installing an app.
- **Automatic Handover Mode:** QR scans automatically default to **Free Store Takeaway** and skip long address forms.
- **Table Service Support:** Supports Dine-in Table Tent numbers (`?table=3`) printed directly on kitchen receipts.
- **Printable QR Stand Generator (`/admin/qr-stands`):** 1-click printable A5 counter stands and table tents with BMB royal crest.

### 3. 👑 Customer Loyalty & 10% VIP Returning Patron Engine
- Automatically detects returning customers and applies **10% BMB Elite Club VIP discount** on cart totals.
- Live coupon code validation engine (`BIJNOR10`, `SWEET50`, `PREMIUM10`).

### 4. 🛡️ Password-Protected Kitchen Admin Panel
- **URL:** `/admin/login`
- **Credentials:** `admin@bmb.com` / `BmbBijnor@2026`
- **Capabilities:** Live revenue metrics, real-time incoming orders list, order status dispatch (`CONFIRMED` ➔ `PREPARING` ➔ `READY_FOR_PICKUP` ➔ `DELIVERED`), and sweet catalog editor.

### 5. 📱 Android APK Native App
- Built with **Capacitor Android**.
- Direct APK download available at `/bmb-misthan-bijnor.apk`.

---

## 🚀 Quick Start Guide

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Officialshivam136/bmb-civil-lines-bijnor.git
cd bmb-civil-lines-bijnor
npm install
```

### 2. Database Setup (Prisma SQLite)
```bash
npx prisma db push
node prisma/seed-full.js
node prisma/clean-bakery.js
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) or [http://192.168.1.20:3000](http://192.168.1.20:3000) for mobile on local Wi-Fi.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router & Server Actions)
- **UI & Animation:** React 19, Tailwind CSS v4, Framer Motion, Lucide Icons
- **Database & ORM:** SQLite via Prisma ORM (Supabase / PostgreSQL production ready)
- **Mobile Runtime:** Capacitor 8 Android SDK
- **QR Generation:** High-resolution vector QR with SVG/canvas rendering
- **Authentication:** NextAuth.js & HTTP-only secure cookie sessions

---

## 📍 Store Information
- **Outlet:** Bikaner Misthan Bhandar, Civil Lines (Opp. Classic Bar, Punjabi Colony, Nai Basti), Bijnor, Uttar Pradesh 246701
- **Orders & Support:** +91 89791 64646
- **Hours:** 10:00 AM – 10:00 PM Daily
