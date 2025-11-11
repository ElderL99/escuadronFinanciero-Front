# Escuadrón Financiero Frontend

A modern **React + Vite** frontend for the **Escuadrón Financiero** platform — a system that allows military personnel to apply for loans, upload required documents, digitally sign contracts, and track payment plans.  
It connects directly to the Escuadrón Financiero REST API.

---

## ✨ Features

- **React 19 + Vite 7** for fast, modular development
- **React Router v6** for nested and protected routes
- **Authentication Context (JWT-based)** for User and Admin roles
- **TailwindCSS** and **Framer Motion** for a responsive and modern UI
- **Custom hooks** for API requests and form logic
- **Admin & User dashboards** with dynamic routes
- **Toast notifications** using `react-hot-toast`
- **Signature Pad** integration for digital contracts
- **Privacy Policy** and **Terms & Conditions** pages included
- **Contact form** integrated with the backend SendGrid service

---

## 🏗️ Project Structure

```
src/
│
├── api/              # Axios configuration and API utilities
├── components/       # Reusable UI components (buttons, cards, modals, etc.)
├── context/          # Global contexts (AuthContext, etc.)
├── hooks/            # Custom hooks for fetching data and handling logic
├── layout/           # Layouts for Main, User, and Admin dashboards
├── lib/              # Helpers and utilities (formatters, date tools, etc.)
├── pages/            # All app pages (public, user, admin)
│   ├── homePage/
│   ├── User/
│   ├── admin/
│   ├── contact/
│   ├── PrivacyPolicy/
│   └── TermsConditions/
│
├── router/           # Private routes and role-based route guards
├── svg/              # SVG icons and graphic assets
│
├── index.css         # Global TailwindCSS styles
├── main.jsx          # Entry point (Router + Providers)
│
└── public/           # Static assets
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```bash
VITE_API_URL=https://escuadron-financiero-back-end.onrender.com
```

---

## 💻 Installation

```bash
# Clone the repository
git clone git@github.com:ElderL99/escuadronFinanciero-Front.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🔐 Authentication Flow

- **Login** and **Registration** connect to the API (`/auth/login`, `/auth/sign`)
- JWT tokens are decoded client-side using `jwt-decode`
- Auth state is stored in `AuthContext` and synced with `localStorage`
- Protected routes use custom wrappers:
  - `UserPrivateRoute`
  - `AdminPrivateRoute`

---

## 📚 Routing Overview

| Path                 | Description                 |
| -------------------- | --------------------------- |
| `/`                  | Home Page                   |
| `/login`             | User login                  |
| `/register`          | User registration           |
| `/recover-password`  | Request password reset      |
| `/auth/verify-email` | Email verification callback |
| `/contacto`          | Public contact form         |
| `/privacy-policy`    | Privacy policy page         |
| `/terms-conditions`  | Terms and conditions page   |

**User Area (`/user`)**

- `/user/dashboard` — Dashboard overview
- `/user/perfil` — Profile page
- `/user/create-solicitud` — Create new loan application
- `/user/solicitudes` — View submitted applications
- `/user/solicitud/:id/firma` — Sign contract digitally
- `/user/creditos` — View active credits and payments

**Admin Area (`/admin`)**

- `/admin/dashboard` — Admin dashboard overview
- `/admin/applications/:id` — Review user applications
- `/admin/signed-contracts` — Manage signed contracts
- `/admin/active-credits` — Monitor active credits and payments

---

## 🎨 UI Stack

- **TailwindCSS v4**
- **Lucide Icons**
- **Framer Motion** for animations
- **clsx + tailwind-merge** for clean conditional styling
- **toast notifications** via react-hot-toast

---

## 🧠 Tech Stack

| Category           | Technology                |
| ------------------ | ------------------------- |
| Frontend Framework | React 19 + Vite           |
| Styling            | TailwindCSS + AnimateCSS  |
| Routing            | React Router v6           |
| State Management   | React Context API         |
| Animations         | Framer Motion             |
| Forms              | React Hook Form           |
| Notifications      | React Hot Toast           |
| Auth               | JWT (via AuthContext)     |
| API                | Axios (with custom hooks) |

---

## 📘 License

Licensed under the **ISC License**  
© 2025 Escuadrón Financiero. All rights reserved.

---

## 👤 Author

**Adán Lugo Barrientos**  
_Full-Stack Developer — Escuadrón Financiero_  
[GitHub @ElderL99](https://github.com/ElderL99)
