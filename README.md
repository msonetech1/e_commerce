<div align="center">

# 📱 KENNSON MATELEPHONE

**Certified Mobile Hardware, Regional Trust &amp; Community Connectivity Platform**

[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

*Connecting Tanzanian communities with 100% authentic mobile technology, transparent pricing, and local technical warranty support.*

[Live Demo](https://kennson.vercel.app/) • [Overview](#-overview) • [Key Features](#-key-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Routes](#-api-endpoints)

---

</div>

## 📖 Overview

**Kennson Matelephone** is a modern full-stack web platform built for a mission-driven Tanzanian consumer electronics initiative and certified mobile hardware distributor. Founded in 2015 in Dar es Salaam, Kennson bridges the regional digital divide by offering factory-original smartphones, transparent pricing in Tanzanian Shillings (TZS), verifiable IMEI certificates, and dedicated local customer care.

The platform was designed with an **editorial, foundation-grade aesthetic**—focusing on human trust, clarity, accessibility, and high performance rather than generic AI landing page templates.

---

## ✨ Key Features

### 🛍️ Client-Facing Experience
* **Curated Hardware Catalog**: Browse smartphones categorised by Flagship, Foldable, Mid-range, and Budget with real-time item counts.
* **Authenticity Assurance**: Every device is tagged with official 1-year warranty coverage, IMEI verification, and factory seal inspection policies.
* **Instant Keyboard Search**: Accessible search modal with keyboard shortcuts (`/` to open, `ESC` to close), live category suggestions, and auto-complete.
* **Transparent Checkout Flow**: Numbered two-step checkout tailored for East African payment networks:
  * **Vodacom M-Pesa**
  * **Airtel Money**
  * **Mix by Yas (Tigo)**
  * **Halotel HaloPesa**
  * **TTCL T-Pesa**
  * **Visa / Mastercard**
* **Customer Order Tracking**: Real-time order progress timeline (Pending &rarr; Shipping &rarr; Delivered &rarr; Cancelled) with itemized breakdown and warranty certificates.
* **Dual Theme Engine**: Seamless light and dark mode support synchronized with system preferences and persisted across sessions.
* **Support & Service Center**: Direct coordinates for the physical counter at Career House, Dar es Salaam, plus integrated WhatsApp and phone assistance.

### 🛡️ Back-Office Administration
* **Executive Metrics Dashboard**: Real-time sales revenue, completed order volume, inventory count, and registered customer tallies.
* **Inventory CRUD Console**: Create, edit, inspect, and remove devices with live image URL previews, price controls, and category selectors.
* **Order Status Management**: Inspect customer shipping coordinates, verify payment methods, and update order fulfillment statuses.
* **User Management**: Review registered customer directory and administrative roles.

---

## 🛠️ Tech Stack

### Frontend (`/frontend`)
* **Framework**: React 19 + Vite 7
* **Routing**: React Router DOM 7
* **Styling**: Tailwind CSS 3.4 (with customized design tokens & Plus Jakarta Sans typography)
* **Icons**: React Icons (FontAwesome)
* **Notifications**: React Hot Toast
* **HTTP Client**: Axios

### Backend (`/backend`)
* **Runtime**: Node.js
* **Framework**: Express 5
* **Database**: MongoDB with Mongoose ODM
* **Authentication**: JSON Web Tokens (JWT) + BCryptJS password hashing
* **Email / Inquiries**: Nodemailer
* **CORS**: Cross-Origin Resource Sharing enabled

---

## 📁 Repository Structure

```text
e_commerce/
├── backend/                        # Node.js & Express REST API
│   ├── config/                     # Database connection (db.js)
│   ├── controllers/                # Business logic & request controllers
│   ├── middleware/                 # JWT Auth & Admin authorization
│   ├── models/                     # Mongoose Schemas (User, Product, Order, Message)
│   ├── routes/                     # API endpoint definitions
│   ├── utils/                      # Helper utilities & token generators
│   ├── seed.js                     # Sample database seed script
│   ├── server.js                   # Application entry point
│   └── package.json
│
├── frontend/                       # React 19 + Vite application
│   ├── public/                     # Static assets & public images
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Navbar.jsx          # Foundation header & accessible mobile drawer
│   │   │   ├── Footer.jsx          # Trust assurance footer & newsletter
│   │   │   ├── ProductCard.jsx     # Editorial product card with warranty badge
│   │   │   └── SearchModal.jsx     # Accessible search modal dialog
│   │   ├── context/                # React Contexts (AuthContext, CartContext, ThemeContext)
│   │   ├── pages/                  # Views (Home, Products, ProductDetails, Cart, Checkout, etc.)
│   │   ├── services/               # Axios API client functions
│   │   ├── App.jsx                 # Routing & global providers
│   │   ├── index.css               # Design tokens, focus rings & custom scrollbars
│   │   └── main.jsx
│   ├── index.html                  # Metadata, Plus Jakarta Sans typography & SEO
│   ├── tailwind.config.js          # Palette, elevation shadows & font rules
│   └── package.json
│
├── .vscode/                        # IDE settings (CSS lint configuration)
├── package.json                    # Root monorepo orchestration script
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **MongoDB**: A running local MongoDB instance or a free MongoDB Atlas connection string.

---

### 1. Installation

Clone the repository and install dependencies for both the frontend and backend from the root directory:

```bash
git clone https://github.com/your-username/e_commerce.git
cd e_commerce
npm run install:all
```

---

### 2. Environment Configuration

#### Backend (`/backend/.env`)
Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/kennson_ecommerce
JWT_SECRET=your_super_secret_jwt_key_here
```

#### Frontend (`/frontend/.env`)
Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

---

### 3. Database Seeding (Optional)

Populate your database with initial smartphones and an administrator account:

```bash
cd backend
node seed.js
cd ..
```

---

### 4. Running the Application

You can launch both the backend API and frontend dev server simultaneously using the root script:

```bash
npm run dev
```

Or run them individually:

```bash
# Terminal 1: Backend API (runs on http://localhost:5000)
npm run dev:backend

# Terminal 2: Frontend client (runs on http://localhost:5173)
npm run dev:frontend
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new customer account | Public |
| `POST` | `/api/auth/login` | Authenticate user &amp; return JWT token | Public |
| `GET` | `/api/products` | Retrieve all hardware products | Public |
| `GET` | `/api/products/:id` | Retrieve single product specifications | Public |
| `POST` | `/api/products` | Create a new hardware product | Admin |
| `PUT` | `/api/products/:id` | Update product details | Admin |
| `DELETE` | `/api/products/:id` | Delete product from catalog | Admin |
| `POST` | `/api/orders` | Place a new customer order | Authenticated |
| `GET` | `/api/orders/myorders` | Retrieve current user's order history | Authenticated |
| `GET` | `/api/orders` | Retrieve all orders across the system | Admin |
| `PUT` | `/api/orders/:id/status`| Update order status (Shipping, Completed, etc.) | Admin |
| `GET` | `/api/stats` | Retrieve metrics summary (revenue, counts) | Admin |
| `GET` | `/api/users` | List all registered user accounts | Admin |
| `DELETE` | `/api/users/:id` | Delete user account | Admin |
| `POST` | `/api/contact` | Submit support inquiry or newsletter subscription | Public |

---

## 🎨 Design System

* **Primary Font**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (weights: 400, 500, 600, 700, 800)
* **Color Palette**:
  * **Slate Neutrals**: `#020617` (Deep Slate / Dark), `#0f172a` (Card Dark), `#f8fafc` (Surface Light), `#ffffff` (Card Light)
  * **Brand Rose / Ruby**: `#e11d48` (Primary 600), `#be123c` (Primary 700), `#fff1f2` (Light 50)
  * **Assurance Emerald**: `#059669` (Warranty / In Stock indicator)
* **Accessibility**: Fully keyboard-navigable (`:focus-visible` ring tokens, ARIA attributes, semantic HTML5 tags).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with care for authentic technology &amp; community empowerment in Tanzania.</sub>
</div>
