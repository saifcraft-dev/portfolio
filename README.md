# SaifCraft — Portfolio & Freelance Dev Site

A public portfolio and service site for Saif Khan (SaifCraft), a senior full-stack developer. Features a Firebase-backed project and service catalog, a contact/lead form, a secure admin dashboard, and an AI chatbot powered by Groq.

---

## Features

- **Portfolio Gallery** — Filterable project showcase with detail pages
- **Services & Pricing** — Fixed-scope service packages with pricing and timelines
- **AI Chatbot** — Powered by Groq (llama models); answers questions about services, pricing, and delivery
- **Contact Form** — Validated lead capture that saves inquiries to Firestore
- **Client Profile** — Clients can view their submitted inquiries at `/profile`
- **Admin Dashboard** — Firebase-protected area to manage projects, services, and orders
- **Image Uploads** — Cloudinary integration for portfolio asset management

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui, Framer Motion |
| Routing | wouter |
| Data Fetching | TanStack React Query v5 |
| Forms | React Hook Form + Zod |
| Auth | Firebase Authentication |
| Database | Firebase Firestore |
| AI Chatbot | Groq API (multi-key rotation) |
| Media | Cloudinary (unsigned preset) |
| Deployment | Vercel |

---

## Project Structure

```
client/
  index.html
  public/              - Static assets (favicon, logo)
  src/
    App.tsx            - Root router (public + admin branches)
    main.tsx           - Entry point
    index.css          - Global styles & CSS variables
    components/        - Shared UI (Header, Footer, Hero, ChatBot, etc.)
    components/ui/     - shadcn/ui component library
    context/           - AuthContext (Firebase auth state)
    hooks/             - Custom hooks (use-projects, use-services, use-orders, use-dark-mode, etc.)
    lib/
      firebase/        - Firebase config, auth helpers, Firestore CRUD
      ai.ts            - Groq chatbot logic + site knowledge base
      cloudinary.ts    - Cloudinary upload helper
      queryClient.ts   - TanStack React Query client
      utils.ts         - Utility functions
    pages/             - Public pages (Home, Services, Portfolio, About, Contact, FAQ)
    pages/admin/       - Admin pages (Dashboard, Orders, Projects, Services)
    types/             - TypeScript interface definitions
api/
  chat.ts              - Vercel serverless function — Groq API proxy
attached_assets/       - Logo images used by Header and Footer
vite.config.ts         - Vite config (port 5000, /api/chat dev middleware)
vercel.json            - Vercel deploy config (SPA fallback + serverless routes)
firestore.rules        - Firestore security rules
.env.example           - Required environment variables (copy to .env or set in Replit Secrets)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Firebase project with Firestore and Authentication enabled
- Cloudinary account (unsigned upload preset)
- Groq API key

### Install

```bash
npm install
```

### Environment Variables

Copy `.env.example` and fill in your values, or add them via the Replit Secrets tab. See `.env.example` for all required keys.

**Important:** `GROQ_API_KEY` and siblings are server-only — never prefix them with `VITE_`. `VITE_*` vars are embedded into the client bundle at build time.

### Development

```bash
npm run dev
```

App runs at port 5000. The `/api/chat` endpoint is handled by a Vite middleware in dev and by `api/chat.ts` on Vercel in production.

### Build

```bash
npm run build
```

Output goes to `dist/public`.

### Type Check

```bash
npm run check
```

---

## Admin Access

The admin dashboard is at `/admin`. Only users whose emails appear in `VITE_ADMIN_EMAILS` (comma-separated) or have `role: "admin"` in the Firestore `users` collection can access it.

---

## AI Chatbot

Uses Groq with llama models and a built-in site knowledge base (`client/src/lib/ai.ts`). Implements:
- Multi-key rotation across `GROQ_API_KEY` through `GROQ_API_KEY_5` on 429 rate-limit
- Automatic model fallback (tries up to 3 models per key before giving up)

---

## Deployment

Configured for Vercel. Set all environment variables in Vercel Project Settings → Environment Variables. The `vercel.json` routes `/api/chat` to the serverless function and falls back to the SPA for all other routes.

---

## License

Private. All rights reserved — Saif Khan / SaifCraft.
