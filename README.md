# DevStudio — Portfolio & Services Platform

A modern, AI-powered personal portfolio and client services platform built for **Saif Khan**, Senior Fullstack Developer & AI Integration Specialist.

---

## Overview

DevStudio is a full-stack serverless web application that serves as both a professional portfolio and a business portal. Clients can explore service packages, view completed projects, and submit project inquiries — all enhanced by an AI chatbot assistant powered by Google Gemini.

---

## Features

- **AI Chatbot** — Floating assistant powered by Gemini 1.5/2.0 Flash with a detailed knowledge base about services, pricing, and process
- **Project Portfolio** — Filterable gallery of completed projects with detailed case study pages
- **Service Packages** — 5 structured tiers: Landing Page, Business Website, Custom Web App, AI Feature Add-On, Monthly Retainer
- **Contact / Lead Intake** — Client inquiry form for new project requests
- **Admin Dashboard** — Protected area to manage orders, portfolio projects, and services
- **Firebase Authentication** — Secure admin-only login
- **Cloudinary Image Management** — Upload and host portfolio images
- **Responsive Design** — Mobile-first with smooth Framer Motion animations

---

## Pages

### Public
| Route | Page |
|---|---|
| `/` | Home — Hero, skills, testimonials, service overview |
| `/portfolio` | Portfolio — Filterable project gallery |
| `/portfolio/:id` | Project Detail — In-depth case study view |
| `/services` | Services — Pricing and process breakdown |
| `/about` | About — Bio and professional background |
| `/contact` | Contact — New project intake form |
| `/faq` | FAQ — Frequently asked questions |
| `/privacy-policy` | Privacy Policy |
| `/terms-of-service` | Terms of Service |

### Admin (Protected)
| Route | Page |
|---|---|
| `/admin/login` | Login |
| `/admin/dashboard` | Dashboard overview |
| `/admin/orders` | Manage client orders |
| `/admin/projects` | CRUD for portfolio items |
| `/admin/services` | Manage service offerings |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| Routing | Wouter |
| State / Data | TanStack Query v5 |
| UI Components | Shadcn UI (Radix UI), Lucide React |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Database | Firebase Firestore |
| Auth | Firebase Authentication |
| AI | Google Gemini API (1.5 / 2.0 Flash) |
| Images | Cloudinary |

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Google Gemini AI
VITE_GEMINI_API_KEY=
VITE_GEMINI_API_KEY_B=        # Optional fallback
VITE_GEMINI_API_KEY_C=        # Optional fallback

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=devstudio_uploads

# Admin
VITE_ADMIN_EMAILS=
```

---

## Getting Started

**1. Clone the repository**
```bash
git clone <repo-url>
cd devstudio
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Copy the template above into a `.env` file and fill in your credentials.

**4. Start the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

**5. Build for production**
```bash
npm run build
```

Output goes to the `dist/` directory, ready for deployment to Vercel.

---

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/       # Shared UI components (ChatBot, Navbar, Footer, etc.)
│   │   ├── pages/            # Route-level page components
│   │   │   └── admin/        # Admin-only pages
│   │   ├── lib/              # Utilities (Firebase, Gemini, Cloudinary, queryClient)
│   │   └── hooks/            # Custom React hooks
├── server/                   # Express server (image upload endpoint)
├── shared/                   # Shared types and schema
└── vercel.json               # Vercel deployment config
```

---

## Deployment

This project is optimized for **Vercel**. Push to your connected repository and Vercel will handle the build automatically using the configuration in `vercel.json`.

---

## Author

**Saif Khan** — Senior Fullstack Developer & AI Integration Specialist

> Building fast, custom web apps that deliver results.
