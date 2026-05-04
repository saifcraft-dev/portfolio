# DevStudio — Saif Khan's Portfolio & Service Site

## Overview
A serverless fullstack portfolio and service studio site for developer Saif Khan. Built with React + TypeScript + Vite, backed by Firebase (Firestore + Auth) for data storage and admin authentication.

## Architecture
- **Frontend only** — no Node.js backend server. All data comes from Firebase Firestore directly.
- **Entry point**: `client/index.html` → `client/src/main.tsx` → `client/src/App.tsx`
- **Dev server**: Vite on port 5000

## Tech Stack
- **Framework**: React 18 + TypeScript
- **Build tool**: Vite 7
- **Styling**: Tailwind CSS v3 + shadcn/ui (Radix UI primitives)
- **Routing**: wouter (lightweight React Router alternative)
- **State / data fetching**: TanStack Query (React Query v5)
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Database**: Firebase Firestore (NoSQL)
- **Auth**: Firebase Auth (email/password + Google)
- **AI Chatbot**: Google Gemini API (multi-key fallback: gemini-2.5-flash → 2.5-flash-lite → 2.0-flash)
- **Image uploads**: Cloudinary (unsigned upload preset)

## Key Files & Directories
```
client/
  src/
    App.tsx              # Root component + routing
    pages/               # Page components (Home, Portfolio, Services, About, Contact, FAQ, admin/*)
    components/          # Shared UI components (Header, Footer, ChatBot, etc.)
    context/AuthContext.tsx  # Firebase auth state provider
    lib/
      firebase/config.ts     # Firebase initialization
      firebase/auth.ts       # Auth helpers (signIn, signOut, isAdmin)
      firebase/firestore.ts  # Firestore CRUD helpers + local fallbacks
      gemini.ts              # Gemini AI chatbot logic + site knowledge base
      cloudinary.ts          # Image upload helper
    hooks/               # Custom hooks (use-projects, use-services, use-orders, use-team)
    types/index.ts       # TypeScript interfaces (Project, Service, Order, TeamMember)
vite.config.ts           # Vite config — root: client/, port: 5000, host: 0.0.0.0
```

## Routes
| Path | Description |
|------|-------------|
| `/` | Homepage — hero, stats, testimonials, tech stack |
| `/services` | Service packages with pricing |
| `/portfolio` | Project gallery with filters |
| `/portfolio/:id` | Individual project detail |
| `/about` | Bio and story |
| `/contact` | Contact form |
| `/faq` | 40+ Q&A accordion |
| `/privacy-policy` | Privacy policy |
| `/terms-of-service` | Terms of service |
| `/profile` | Client profile page (requires login) — view orders, edit name, account details |
| `/admin/login` | Firebase admin login |
| `/admin/dashboard` | Admin dashboard (protected) |
| `/admin/orders` | Orders management (protected) |
| `/admin/projects` | Projects management (protected) |
| `/admin/services` | Services management (protected) |

## Environment Variables (shared)
All configured in Replit environment:

| Key | Purpose |
|-----|---------|
| `VITE_FIREBASE_API_KEY` | Firebase project API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_ADMIN_EMAILS` | Comma-separated admin email whitelist |
| `VITE_GEMINI_API_KEY` | Primary Gemini API key |
| `VITE_GEMINI_API_KEY_B` | Fallback Gemini key #2 |
| `VITE_GEMINI_API_KEY_C` | Fallback Gemini key #3 |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name (server-side ref) |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

## Running the App
```bash
npm run dev      # Start dev server (port 5000)
npm run build    # Build for production → dist/public
npm run check    # TypeScript type check
```

## Admin Access
- Navigate to `/admin/login`
- Sign in with a Firebase account whose email is in `VITE_ADMIN_EMAILS` or has `role: "admin"` in Firestore `users` collection
- Admin can manage Projects, Services, and Orders via the dashboard

## Firebase Firestore Collections
- `projects` — portfolio projects
- `services` — service offerings
- `orders` — client orders
- `team` — team members
- `users` — user records (used for admin role check)

## Notes
- Firestore has local fallback data for `services` and `team` if the collections are empty
- Gemini chatbot uses a multi-key/multi-model fallback strategy for reliability
- All `VITE_` prefixed env vars are embedded into the client bundle by Vite at build time
