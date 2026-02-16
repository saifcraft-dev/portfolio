# DevStudio - Digital Agency Website

## Overview
A portfolio website for a digital development studio called "DevStudio". Built with React, Vite, and Tailwind CSS. Features pages for Home, Services, Portfolio, About, and Contact.

## Project Architecture
- **Frontend**: React 18 with Vite, TypeScript, Tailwind CSS, shadcn/ui components
- **Routing**: wouter for client-side routing
- **State Management**: TanStack React Query
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Firebase**: Used for Firestore data (projects, services, team, orders)
- **Deployment**: Static site deployment (builds to `dist/public`)

## Project Structure
```
client/
  index.html
  src/
    App.tsx              - Main app with routing
    main.tsx             - Entry point
    index.css            - Global styles
    components/          - Reusable components (Navbar, Footer, ProjectCard, ServiceCard)
    components/ui/       - shadcn/ui components
    context/             - AuthContext for Firebase auth
    hooks/               - Custom hooks (use-orders, use-projects, use-services, use-team)
    lib/firebase/        - Firebase config, auth, firestore helpers
    lib/                 - queryClient, utils
    pages/               - Page components (Home, Services, Portfolio, About, Contact)
    types/               - TypeScript type definitions
vite.config.ts           - Vite configuration (port 5000, allowedHosts: true)
tailwind.config.ts       - Tailwind configuration
postcss.config.js        - PostCSS configuration
```

## Running the Project
- Development: `npm run dev` (runs Vite dev server on port 5000)
- Build: `npm run build` (outputs to dist/public)

## Recent Changes
- Configured Vite to serve on port 5000 with `host: "0.0.0.0"` and `allowedHosts: true`
- Set up static deployment configuration

## Environment Variables
The following environment variables are required for the application to function:

### Firebase Configuration
- `VITE_FIREBASE_API_KEY`: Your Firebase project's API key.
- `VITE_FIREBASE_AUTH_DOMAIN`: Your Firebase project's auth domain.
- `VITE_FIREBASE_PROJECT_ID`: Your Firebase project's ID.
- `VITE_FIREBASE_STORAGE_BUCKET`: Your Firebase project's storage bucket.
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase project's messaging sender ID.
- `VITE_FIREBASE_APP_ID`: Your Firebase project's app ID.
- `VITE_FIREBASE_MEASUREMENT_ID`: Your Firebase project's measurement ID (optional).

### Cloudinary Configuration
- `VITE_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
- `VITE_CLOUDINARY_UPLOAD_PRESET`: Your Cloudinary upload preset (for unsigned uploads).

> **Note**: These variables must be prefixed with `VITE_` to be accessible in the React frontend.
