# SaifCraft — Saif Khan's Portfolio & Freelance Dev Site

A public portfolio and service site for Saif Khan (SaifCraft), a senior fullstack developer. Includes marketing pages, a Firebase-backed project/service catalog, a contact form (saves to Firestore), an admin dashboard, and an AI chatbot powered by Groq.

## Run & Operate
```bash
npm run dev      # Start dev server on port 5000
npm run build    # Build for production → dist/public
npm run check    # TypeScript type check
```
Required env vars: see Replit Secrets tab — `GROQ_API_KEY` (chatbot), `VITE_FIREBASE_*` (auth + data), `VITE_ADMIN_EMAILS`, `VITE_CLOUDINARY_CLOUD_NAME`.

## Stack
- **Frontend:** React 18, TypeScript, Vite 7
- **Routing:** wouter
- **Styling:** Tailwind CSS v3, shadcn/ui (Radix UI)
- **Data fetching:** TanStack React Query v5
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion
- **Auth & DB:** Firebase Auth + Firestore
- **AI chatbot:** Groq API (via Vite server middleware at `/api/chat`)
- **Image uploads:** Cloudinary (unsigned preset)

## Where things live
```
client/src/
  App.tsx                    # Root + wouter routing
  pages/                     # Page components (Home, Portfolio, Services, About, Contact, FAQ, admin/*)
  components/                # Shared UI (Header, Footer, ChatBot, AdminProtectedRoute, etc.)
  context/AuthContext.tsx    # Firebase auth state provider
  lib/
    firebase/config.ts       # Firebase init
    firebase/auth.ts         # signIn, signOut, isAdmin helpers
    firebase/firestore.ts    # Firestore CRUD + local fallbacks
    gemini.ts                # Chatbot logic + site knowledge base (calls /api/chat)
    cloudinary.ts            # Image upload helper
  hooks/                     # use-projects, use-services, use-orders, use-team
  types/index.ts             # Project, Service, Order, TeamMember interfaces
vite.config.ts               # Vite config — port 5000, /api/chat Groq middleware
```
Firestore collections: `projects`, `services`, `orders`, `team`, `users`

## Architecture decisions
- **No separate backend** — all server logic lives in Vite dev middleware (`/api/chat`); Firebase SDKs run client-side
- **Groq replaces Gemini** at the server level: frontend calls `/api/chat`, Vite middleware proxies to Groq with model fallback chain
- **Admin auth** via Firebase email/password; admin whitelist via `VITE_ADMIN_EMAILS` env var or Firestore `users` collection `role: "admin"`
- **Firestore local fallbacks** for `services` and `team` if collections are empty

## Product
- Public pages: Home, Services (with pricing), Portfolio (filterable gallery + detail pages), About, FAQ, Contact
- Contact form saves leads as Firestore "orders" for admin review
- Client profile page (`/profile`) shows their submitted inquiries
- Admin dashboard (`/admin/*`) — manage projects, services, orders (Firebase-protected)
- AI chatbot with full site knowledge base, responds via Groq LLM

## User preferences
- Keep Firebase Auth for admin login (not replacing with Replit Auth — intentional)
- Fixed-scope pricing model, no hourly billing

## Gotchas
- `npm run dev` uses local `vite` binary (not `npx vite`) to avoid interactive upgrade prompts
- `VITE_*` env vars are embedded into the client bundle at build time — never put true secrets in `VITE_` vars
- `GROQ_API_KEY` is server-only (used in Vite middleware), never exposed to the client
- Cloudinary uses unsigned upload preset — no server-side secret needed for uploads
- The `env` file at root is cleared; all secrets live in Replit Secrets

## Gotchas
- Build output goes to `dist/public` (configured in vite.config.ts)
- Deployment run command: `node ./dist/index.cjs` (needs a server wrapper if deploying — currently static-only via `dist/public`)
