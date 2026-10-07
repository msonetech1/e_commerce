<!-- HEADER BANNER -->
<div align="center">

![Kennson Matelephone Banner](1771337103791_image.png)

# KENNSON MATELEPHONE

**`Premium Smartphones & Accessories — Online Shopping Redefined`**

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-kennson.vercel.app-FF007F?style=for-the-badge&logoColor=white)](https://kennson.vercel.app/)
[![Status](https://img.shields.io/badge/Status-Live-00FF88?style=for-the-badge)](https://kennson.vercel.app/)
[![Made With](https://img.shields.io/badge/Made_With-❤️_&_Code-FF007F?style=for-the-badge)](https://kennson.vercel.app/)

</div>

---

## ✨ Overview

**Kennson Matelephone** is a modern, high-performance e-commerce platform specializing in **premium smartphones and mobile accessories**. Built with a bold, futuristic aesthetic — dark gradients, vibrant magenta accents, and seamless UX — it delivers an elevated online shopping experience that matches the cutting-edge technology it sells.

> *"Discover the ultimate collection of premium smartphones and accessories. Elevate your mobile lifestyle today with cutting-edge technology."*

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🛍️ **Shop** | Browse a curated collection of premium smartphones |
| 🎨 **Modern UI** | Dark-mode first design with magenta/pink accent palette |
| 🔍 **Search** | Instant product search functionality |
| 🛒 **Cart** | Real-time shopping cart with item count badge |
| 👤 **Account** | User authentication & profile management |
| 📱 **Responsive** | Fully optimized for mobile, tablet, and desktop |
| 🌙 **Dark Mode** | Elegant dark theme with theme toggle support |

---

## 🎨 Design System

```
Color Palette
─────────────────────────────────────────
Background    →  #0D0D1A  (Deep Dark)
Primary       →  #FF007F  (Hot Magenta)
Accent        →  #CC00FF  (Electric Purple)
Text Primary  →  #FFFFFF  (White)
Text Muted    →  #AAAACC  (Soft Lavender)
```

---

## 🌐 Live Demo

🔗 **[https://kennson.vercel.app/](https://kennson.vercel.app/)**

---

## 🗂️ Pages

- **Home** — Hero section with featured banner and CTAs
- **Products** — Full product catalog with filters
- **About** — Brand story and mission
- **Contact** — Get in touch form

---

## 🛠️ Tech Stack

- **Frontend** — React 19, Vite, Tailwind CSS, React Router, React Hot Toast
- **Backend** — Node.js, Express, MongoDB (Mongoose), JWT, Nodemailer
- **Architecture** — Monorepo (Clean separation into `/frontend` and `/backend`)

---

## 📁 Project Structure

```text
e_commerce/
├── backend/                # Express & Node.js API
│   ├── config/             # DB & server configuration
│   ├── controllers/        # Request handlers & logic
│   ├── middleware/         # Auth & validation middleware
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── utils/              # Helper utilities
│   ├── server.js           # Express app entry point
│   ├── .env.example        # Backend environment variables template
│   └── package.json
│
├── frontend/               # React & Vite application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context (Auth, Cart, Theme)
│   │   ├── pages/          # Application views/pages
│   │   ├── services/       # Axios API client
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example        # Frontend environment variables template
│   ├── vite.config.js
│   └── package.json
│
├── package.json            # Root scripts to run both apps
└── README.md
```

---

## 📦 Getting Started

### 1. Install Dependencies
Install all dependencies for both backend and frontend from the root:
```bash
npm run install:all
```

### 2. Configure Environment Variables
- In `backend/`: copy `.env.example` to `.env` and add your MongoDB URI and JWT Secret.
- In `frontend/`: copy `.env.example` to `.env` and configure `VITE_API_URL`.

### 3. Run the Project

- **Run both Backend and Frontend together**:
  ```bash
  npm run dev
  ```

- **Run Backend only**:
  ```bash
  npm run dev:backend
  ```

- **Run Frontend only**:
  ```bash
  npm run dev:frontend
  ```

---

## 📸 Preview

> Hero section showcasing the flagship shopping experience with bold typography and neon accents.

---

<div align="center">

**© 2025 Kennson Matelephone — All Rights Reserved**

[![Visit Site](https://img.shields.io/badge/Visit-kennson.vercel.app-FF007F?style=for-the-badge)](https://kennson.vercel.app/)

</div>
