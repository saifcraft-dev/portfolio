# DevStudio - Digital Agency Website

A professional portfolio and service website for a digital agency. Built with React, Firebase, and an AI-powered chatbot to showcase services, manage portfolios, and handle client inquiries.

---

## Features

- **Public Portfolio** — Browse past projects with filtering by category and detailed case study pages
- **Service Packages** — Interactive service tiers with pricing, timelines, and feature breakdowns
- **AI Chatbot** — Powered by Google Gemini; answers questions about pricing, tech stacks, and delivery times
- **Contact & Intake Forms** — Validated lead generation forms that save inquiries directly to Firestore
- **Meet the Team** — Dynamic team section with fallback support
- **Admin Dashboard** — Secure, authenticated admin area to manage orders, projects, and services
- **Order Management** — Real-time incoming inquiry tracking via Firestore
- **Image Uploads** — Direct Cloudinary integration for managing portfolio assets

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui, Framer Motion |
| Routing | wouter |
| Data Fetching | TanStack React Query v5 |
| Auth | Firebase Authentication (Email/Password + Google) |
| Database | Firebase Firestore |
| AI | Google Gemini (Flash / Pro with fallback) |
| Media | Cloudinary |
| Forms | React Hook Form + Zod |

---

## Project Structure

```
client/
  index.html
  src/
    App.tsx                  - Main app with routing
    main.tsx                 - Entry point
    index.css                - Global styles
    components/              - Reusable UI components (Header, Footer, ProjectCard, ServiceCard)
    components/ui/           - shadcn/ui component library
    context/                 - AuthContext for Firebase auth state
    hooks/                   - Custom hooks (use-orders, use-projects, use-services, use-team)
    lib/
      firebase/              - Firebase config, auth, and Firestore helpers
      cloudinary.ts          - Cloudinary upload helper
      gemini.ts              - AI chatbot logic and business knowledge base
      queryClient.ts         - TanStack React Query client setup
      utils.ts               - Utility functions
    pages/                   - Public pages (Home, Services, Portfolio, About, Contact)
    pages/admin/             - Admin pages (Dashboard, Orders, Projects, Services)
    types/                   - TypeScript type definitions
vite.config.ts               - Vite configuration
tailwind.config.ts           - Tailwind configuration
postcss.config.js            - PostCSS configuration
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Firestore and Authentication enabled
- A Cloudinary account
- A Google Gemini API key

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root (or configure via your hosting platform). All `VITE_` prefixed variables are available in the React frontend via `import.meta.env`.

#### Firebase

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_ADMIN_EMAILS=admin@example.com,other@example.com
```

#### Cloudinary

```env
VITE_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

#### AI Chatbot

```env
VITE_GEMINI_API_KEY=
```

### Running in Development

```bash
npx vite
```

The app will be available at `http://localhost:5000`.

### Building for Production

```bash
npm run build
```

Output is generated in `dist/public`.

---

## Admin Access

The admin dashboard is available at `/admin`. Access is restricted to authenticated users whose email addresses are listed in the `VITE_ADMIN_EMAILS` environment variable (comma-separated).

Admins can:
- View and manage incoming orders in real time
- Add, edit, and delete portfolio projects
- Manage service packages and pricing
- Upload images directly to Cloudinary

---

## AI Chatbot

The chatbot is powered by Google Gemini and uses a built-in site knowledge base (`client/src/lib/gemini.ts`) to answer specific business questions such as:

- Service pricing and what's included
- Technology stack used on projects
- Typical delivery timelines
- How to place an order

It implements automatic model fallback (Gemini Flash 2.5 → 2.0) and multi-key rotation for reliability.

---

## License

This project is private and intended for use by DevStudio. All rights reserved.
