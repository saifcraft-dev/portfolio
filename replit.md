# DevStudio - Digital Agency Website

## Overview
A portfolio website for a digital development studio called "DevStudio". Built with React, Vite, and Tailwind CSS. Features pages for Home, Services, Portfolio, About, Contact, and FAQ, plus a Firebase-backed admin dashboard.

## Project Architecture
- **Frontend**: React 18 with Vite, TypeScript, Tailwind CSS, shadcn/ui components
- **Routing**: wouter for client-side routing
- **State Management**: TanStack React Query
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Auth**: Firebase Auth (email/password + Google) for admin login
- **Database**: Firebase Firestore (projects, services, team, orders)
- **Image Uploads**: Cloudinary (direct unsigned uploads from the frontend)
- **Dev Server**: Vite on port 5000 (`npx vite`)
- **Deployment**: Static frontend build (`npm run build` → `dist/public`) on Vercel

## Project Structure
```
client/
  index.html           - Entry HTML with meta tags, OG tags, only 2 fonts (Outfit + Space Grotesk)
  src/
    App.tsx            - Main app with routing; ChatBot is lazy-loaded
    main.tsx           - Entry point
    index.css          - Global styles (no @import, fonts loaded via <link>)
    components/        - Reusable components (Hero, Header, Footer, ProjectCard, ChatBot)
    components/ui/     - shadcn/ui components
    context/           - AuthContext for Firebase auth
    hooks/             - Custom hooks (use-orders, use-projects, use-services, use-team)
    lib/firebase/      - Firebase config, auth, firestore helpers
    lib/cloudinary.ts  - Cloudinary upload helper
    lib/queryClient.ts - TanStack React Query client
    lib/utils.ts       - Utility functions
    pages/             - Page components (Home, Services, Portfolio, About, Contact, FAQ)
    pages/admin/       - Admin dashboard pages (Dashboard, Orders, Projects, Services)
    types/             - TypeScript type definitions
vite.config.ts         - Vite config (port 5000, code-splitting with manualChunks)
tailwind.config.ts     - Tailwind config (includes display font family)
vercel.json            - Vercel config with caching and security headers
```

## Performance Optimizations Applied
- **Font loading**: Reduced from 30+ Google Font families → only Outfit + Space Grotesk (used by the app)
- **CLS fixes**: Added explicit width/height to all images, fixed layout shifts
- **TBT reduction**: Replaced Framer Motion infinite animations (blobs, floating cards) with pure CSS `@keyframes`
- **Lazy loading**: ChatBot component lazy-loaded with Suspense boundary
- **Code splitting**: Vite `manualChunks` splits vendor code (react, firebase, framer-motion, icons)
- **Hero blobs**: CSS-only animations with `will-change: transform, opacity`
- **SEO**: Full OG/Twitter meta tags, JSON-LD structured data, canonical URL, per-page descriptions
- **Security**: Caching headers and security headers in vercel.json

## Running the Project
- Development: `npx vite` (Vite dev server on port 5000)
- Build: `npm run build` (outputs frontend to dist/public)

## Environment Variables
All configured in `.replit` under `[userenv.shared]`:

### Firebase Configuration
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_ADMIN_EMAILS` - Comma-separated list of admin email addresses

### Cloudinary Configuration
- `VITE_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

> **Note**: All `VITE_` prefixed variables are accessible in the React frontend via `import.meta.env`.
