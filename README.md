# SaifCraft — Portfolio & Freelance Dev Site

**Author:** Saif Khan
**Live site:** https://portfolio-wheat-iota-47.vercel.app/

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
- **Dark Mode** — System-preference aware, persisted across sessions
- **SEO Ready** — Meta tags, Open Graph, Twitter Card, JSON-LD Person schema, sitemap, robots.txt
- **Error Boundary** — Graceful crash recovery with a friendly fallback UI

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite 7 |
| Styling | Tailwind CSS, shadcn/ui, Framer Motion |
| Routing | wouter |
| Data Fetching | TanStack React Query v5 |
| Forms | React Hook Form + Zod |
| Auth | Firebase Authentication |
| Database | Firebase Firestore |
| AI Chatbot | Groq API (multi-key rotation, model fallback) |
| Media | Cloudinary (unsigned preset) |
| Deployment | Vercel |

---

## Project Structure

```
client/
  index.html             - HTML shell with SEO meta tags, OG tags, JSON-LD schema
  public/
    logo.png             - Favicon
    logo-light.png       - Light mode logo (Header, Footer)
    logo-dark.png        - Dark mode logo (Header, Footer)
    favicon.png          - Browser tab icon
    robots.txt           - Search engine crawl rules
    sitemap.xml          - All public page URLs for indexing
    404.html             - SPA fallback for Vercel routing
  src/
    App.tsx              - Root router (public + admin branches)
    main.tsx             - Entry point, wrapped in ErrorBoundary
    index.css            - Global styles & CSS variables
    components/
      ErrorBoundary.tsx  - React error boundary (graceful crash fallback)
      Header.tsx         - Top nav with dark mode toggle and auth menu
      Footer.tsx         - Footer with links and social icons
      Hero.tsx           - Home page hero section
      ChatBot.tsx        - Floating AI chatbot widget
      ContactForm.tsx    - Reusable contact/lead form
      ProjectCard.tsx    - Portfolio project card
      ProjectsGallery.tsx- Filterable portfolio grid
      ServiceCard.tsx    - Service package card
      ServicesSection.tsx- Services overview section
    components/ui/       - shadcn/ui component library
    context/
      AuthContext.tsx    - Firebase auth state provider
    hooks/
      use-dark-mode.ts   - Dark mode state hook
      use-image-upload.ts- Cloudinary upload hook
      use-mobile.tsx     - Mobile breakpoint hook
      use-orders.ts      - Firestore orders hook
      use-projects.ts    - Firestore projects hook
      use-services.ts    - Firestore services hook
      use-toast.ts       - Toast notification hook
    lib/
      firebase/
        config.ts        - Firebase app init
        auth.ts          - signIn, signOut, isAdmin helpers
        firestore.ts     - Firestore CRUD + service fallbacks
      ai.ts              - Groq chatbot logic + site knowledge base
      cloudinary.ts      - Cloudinary upload helper
      queryClient.ts     - TanStack React Query client setup
      utils.ts           - Utility functions (cn, etc.)
    pages/
      Home.tsx           - Landing page
      Services.tsx       - Services & pricing page
      Portfolio.tsx      - Portfolio gallery
      ProjectDetail.tsx  - Single project case study
      About.tsx          - About Saif Khan
      Contact.tsx        - Contact / hire page
      FAQ.tsx            - Frequently asked questions
      PrivacyPolicy.tsx  - Privacy policy
      TermsOfService.tsx - Terms of service
      ClientProfile.tsx  - Client inquiry history (/profile)
      not-found.tsx      - 404 page
      admin/
        Login.tsx        - Admin login
        AdminLayout.tsx  - Admin shell layout
        Dashboard.tsx    - Admin overview
        Orders.tsx       - Manage incoming orders
        Projects.tsx     - Manage portfolio projects
        Services.tsx     - Manage service packages
    types/
      index.ts           - Project, Service, Order TypeScript interfaces
api/
  chat.ts                - Vercel serverless function — Groq API proxy
vite.config.ts           - Vite config (port 5000, /api/chat dev middleware, code splitting)
vercel.json              - Vercel deploy config (SPA fallback + serverless routes)
firestore.rules          - Firestore security rules
.env.example             - Required environment variables template
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Firebase project with Firestore and Authentication enabled
- Cloudinary account (unsigned upload preset)
- Groq API key (get one free at console.groq.com)

### Install

```bash
npm install
```

### Environment Variables

Copy `.env.example` and fill in your values, or add them via the Replit Secrets tab.

```env
# Firebase (client-side — safe to prefix with VITE_)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Admin access (comma-separated emails)
VITE_ADMIN_EMAILS=

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=

# Groq — server-side only, never prefix with VITE_
GROQ_API_KEY=
GROQ_API_KEY_2=   # optional extra keys for rate-limit rotation
```

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

The admin dashboard is at `/admin`. Access is restricted to users whose email appears in `VITE_ADMIN_EMAILS` (comma-separated) or have `role: "admin"` in the Firestore `users` collection.

Admins can:
- View and respond to incoming orders in real time
- Add, edit, and delete portfolio projects (with image upload)
- Manage service packages and pricing

---

## AI Chatbot

Uses Groq with llama models and a built-in site knowledge base (`client/src/lib/ai.ts`). Implements:
- Multi-key rotation across `GROQ_API_KEY` through `GROQ_API_KEY_5` on 429 rate-limit
- Automatic model fallback (tries up to 3 models per key before giving up)
- In dev: handled by a Vite middleware. In production: handled by `api/chat.ts` Vercel function

---

## Deployment

Configured for Vercel. Set all environment variables in **Vercel → Project Settings → Environment Variables**.

The `vercel.json` routes `/api/chat` to the serverless function and falls back to the SPA for all other routes.

---

## License

Private. All rights reserved — Saif Khan / SaifCraft.
