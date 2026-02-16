# Portfolio - DevStudio

## Overview

This is a full-stack portfolio website and service ordering platform for a web development team called "DevStudio." It showcases projects, services, team members, and allows clients to submit service orders through a contact form. The app features a modern dark-themed UI with animations, built as a monorepo with a React frontend and Express backend sharing types and validation schemas.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure
The project is organized into three main directories:
- **`client/`** — React SPA (Single Page Application)
- **`server/`** — Express API server
- **`shared/`** — Shared TypeScript types, Zod schemas, and API route contracts used by both client and server

### Frontend (`client/src/`)
- **Framework:** React with TypeScript, bundled by Vite
- **Routing:** Wouter (lightweight client-side router) — NOT React Router or Next.js
- **Styling:** Tailwind CSS with CSS variables for theming (dark theme by default)
- **Component Library:** Shadcn/UI (new-york style) with Radix UI primitives
- **Animations:** Framer Motion for page transitions and scroll-triggered effects
- **State Management:** TanStack React Query for server state; no global client state library
- **Forms:** React Hook Form with Zod resolvers for validation
- **Pages:** Home, Services, Portfolio, About, Contact, and a 404 page
- **Custom Hooks:** Located in `client/src/hooks/` — separate hooks for projects, services, team members, orders, and toast notifications. Each hook wraps React Query mutations/queries against the shared API contract.

### Backend (`server/`)
- **Framework:** Express 5 running on Node.js with TypeScript (via tsx)
- **API Pattern:** RESTful JSON API under `/api/` prefix. Routes defined in `server/routes.ts` using the shared API contract from `shared/routes.ts`.
- **Storage Layer:** `server/storage.ts` implements an `IStorage` interface with a `DatabaseStorage` class using Drizzle ORM. This abstraction makes it possible to swap storage implementations.
- **Static Serving:** In production, the built Vite output is served from `dist/public`. In development, Vite dev server middleware is used with HMR.

### Database
- **ORM:** Drizzle ORM with PostgreSQL dialect
- **Schema:** Defined in `shared/schema.ts` with four tables:
  - `projects` — portfolio projects with title, description, technologies, image, URLs, category, featured flag
  - `services` — offered services with features array, pricing, delivery time, category
  - `team_members` — team bios with skills array and social links (JSONB)
  - `orders` — client service requests with status tracking and priority
- **Migrations:** Drizzle Kit with `drizzle-kit push` command for schema sync
- **Connection:** PostgreSQL via `pg` Pool, configured through `DATABASE_URL` environment variable

### Shared Layer (`shared/`)
- **`schema.ts`** — Drizzle table definitions plus Zod insert schemas (via `drizzle-zod`)
- **`routes.ts`** — Typed API contract object defining method, path, input schema, and response schemas for every endpoint. This ensures type safety between client hooks and server routes.

### Build System
- **Development:** `tsx server/index.ts` with Vite dev middleware for HMR
- **Production Build:** Custom `script/build.ts` that runs Vite build for the client and esbuild for the server, outputting to `dist/`
- **Path Aliases:** `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

### Authentication (Partial/Planned)
- Firebase Auth context exists in `client/src/context/AuthContext.tsx` but is not yet wired into the app's main component tree
- The attached planning documents reference Firebase for auth and Firestore, but the actual implementation uses PostgreSQL with Drizzle
- No authentication middleware is currently enforced on server routes

## External Dependencies

### Required Services
- **PostgreSQL Database** — Required. Connected via `DATABASE_URL` environment variable. Used by Drizzle ORM for all data storage.

### Key npm Packages
- **Drizzle ORM + drizzle-zod** — Database ORM and schema-to-Zod conversion
- **Express 5** — HTTP server
- **Vite + @vitejs/plugin-react** — Frontend build tool and dev server
- **TanStack React Query** — Async server state management
- **Shadcn/UI + Radix UI** — Component library (many Radix primitives installed)
- **Framer Motion** — Animation library
- **Zod** — Runtime validation for API inputs and responses
- **React Hook Form + @hookform/resolvers** — Form handling with Zod integration
- **Wouter** — Client-side routing
- **Lucide React** — Icon library

### Planned/Referenced Integrations (from attached_assets)
- **Firebase** — Auth and potentially Firestore (context file exists but not fully integrated)
- **Cloudinary** — Referenced for image uploads in Phase 2
- These are mentioned in planning docs but the current codebase primarily uses PostgreSQL

### Fonts
- Outfit (sans-serif, primary body font)
- Space Grotesk (display font for headings)
- Loaded via Google Fonts in both `index.html` and `index.css`