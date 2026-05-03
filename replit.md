# DevStudio - Digital Agency Website

## Overview
A portfolio website for a digital development studio called "DevStudio". Built with React, Vite, and Tailwind CSS. Features pages for Home, Services, Portfolio, About, and Contact, plus a Firebase-backed admin dashboard.

## Project Architecture
- **Frontend**: React 18 with Vite, TypeScript, Tailwind CSS, shadcn/ui components
- **Routing**: wouter for client-side routing
- **State Management**: TanStack React Query
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Auth**: Firebase Auth (email/password + Google) for admin login
- **Database**: Firebase Firestore (projects, services, team, orders)
- **Image Uploads**: Cloudinary (direct unsigned uploads from the frontend)
- **Dev Server**: Vite on port 5000 (`npx vite`)
- **Deployment**: Static frontend build (`npm run build` → `dist/public`)

## Project Structure
```
client/
  index.html
  src/
    App.tsx              - Main app with routing
    main.tsx             - Entry point
    index.css            - Global styles
    components/          - Reusable components (Header, Footer, ProjectCard, ServiceCard)
    components/ui/       - shadcn/ui components
    context/             - AuthContext for Firebase auth
    hooks/               - Custom hooks (use-orders, use-projects, use-services, use-team)
    lib/firebase/        - Firebase config, auth, firestore helpers
    lib/cloudinary.ts    - Cloudinary upload helper
    lib/queryClient.ts   - TanStack React Query client
    lib/utils.ts         - Utility functions
    pages/               - Page components (Home, Services, Portfolio, About, Contact)
    pages/admin/         - Admin dashboard pages (Dashboard, Orders, Projects, Services)
    types/               - TypeScript type definitions
vite.config.ts           - Vite configuration (port 5000, allowedHosts: true)
tailwind.config.ts       - Tailwind configuration
postcss.config.js        - PostCSS configuration
```

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
