# DevStudio — Portfolio & Freelance Business Hub

> **Senior Fullstack Developer & AI Integration Specialist**
> *Saif Khan — Building fast, custom web apps that deliver results.*

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features & Pages](#features--pages)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Environment Variables](#environment-variables)
6. [Project Structure](#project-structure)
7. [Deployment](#deployment)
8. [Brand Statement](#brand-statement)
9. [Services & Pricing](#services--pricing)
10. [Finding Clients](#finding-clients)
11. [Proposals That Win](#proposals-that-win)
12. [Contracts & Getting Paid](#contracts--getting-paid)
13. [Scaling Your Income](#scaling-your-income)
14. [Passive Income Streams](#passive-income-streams)
15. [Essential Tools Stack](#essential-tools-stack)
16. [90-Day Action Plan](#90-day-action-plan)
17. [Common Mistakes to Avoid](#common-mistakes-to-avoid)

---

## Project Overview

**DevStudio** is a professional portfolio and client services platform for **Saif Khan**, a Senior Fullstack Developer and AI Integration Specialist with 5+ years of experience. The site serves as both a showcase of completed work and a business portal where clients can explore services, view pricing, and submit project inquiries — all enhanced by an AI chatbot assistant powered by Google Gemini.

The application is a **fully serverless, static frontend** built with React and Vite, using Firebase Firestore for real-time data and Firebase Authentication for secure admin access. No traditional backend server is required.

---

## Features & Pages

### Features

- **AI Chatbot** — Floating assistant powered by Google Gemini 1.5/2.0 Flash with up to 3 API key fallbacks, trained on a detailed knowledge base covering services, pricing, and process
- **Project Portfolio** — Filterable gallery of completed projects with detailed case study pages
- **Service Packages** — 5 structured tiers with clear pricing and timelines
- **Contact / Lead Intake** — Client inquiry form for new project requests
- **Admin Dashboard** — Protected area to manage orders, portfolio projects, and services
- **Firebase Authentication** — Secure admin-only login (email/password + Google sign-in)
- **Cloudinary Image Management** — Direct unsigned image uploads from the frontend
- **Responsive Design** — Mobile-first with smooth Framer Motion animations
- **Lazy Loading** — All pages are code-split and lazily loaded for fast initial load

### Public Pages

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

### Admin Pages (Protected)

| Route | Page |
|---|---|
| `/admin/login` | Login (email/password or Google) |
| `/admin/dashboard` | Dashboard overview |
| `/admin/orders` | Manage client orders |
| `/admin/projects` | CRUD for portfolio items |
| `/admin/services` | Manage service offerings |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite 7 |
| Styling | Tailwind CSS 3, shadcn/ui (Radix UI) |
| Routing | Wouter 3 |
| State / Data | TanStack Query v5 |
| UI Components | Shadcn UI, Lucide React, React Icons |
| Animations | Framer Motion 11 |
| Forms | React Hook Form + Zod |
| Database | Firebase Firestore |
| Auth | Firebase Authentication (email/password + Google) |
| AI | Google Gemini API (1.5 / 2.0 Flash) |
| Images | Cloudinary (unsigned direct upload) |
| Hosting | Vercel (static) |

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

Copy the template below into a `.env` file (or configure via Replit Secrets) and fill in your credentials.

**4. Start the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5000` (or via the Replit preview URL).

**5. Build for production**
```bash
npm run build
```

Output goes to the `dist/` directory, ready for deployment to Vercel.

---

## Environment Variables

All variables are `VITE_` prefixed so they are accessible in the React frontend via `import.meta.env`.

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
VITE_GEMINI_API_KEY_B=        # Optional fallback key
VITE_GEMINI_API_KEY_C=        # Optional fallback key

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=devstudio_uploads

# Admin
VITE_ADMIN_EMAILS=            # Comma-separated list of admin email addresses
```

> **Replit note:** Secrets are configured under `[userenv.shared]` in `.replit` or via the Secrets panel. Never commit real credentials to version control.

---

## Project Structure

```
devstudio/
├── client/
│   ├── index.html
│   ├── public/               # Static assets (favicon, team member images)
│   └── src/
│       ├── App.tsx            # Root app with providers and routing
│       ├── main.tsx           # Vite entry point
│       ├── index.css          # Global styles and Tailwind base
│       ├── components/        # Shared UI components
│       │   ├── ChatBot.tsx    # AI chatbot (Gemini-powered)
│       │   ├── Header.tsx
│       │   ├── Navbar.tsx
│       │   ├── Footer.tsx
│       │   ├── Hero.tsx
│       │   ├── ProjectCard.tsx
│       │   ├── ProjectsGallery.tsx
│       │   ├── ServiceCard.tsx
│       │   ├── ServicesSection.tsx
│       │   ├── TeamSection.tsx
│       │   ├── ContactForm.tsx
│       │   ├── AdminProtectedRoute.tsx
│       │   └── ui/            # shadcn/ui component library
│       ├── context/
│       │   └── AuthContext.tsx  # Firebase auth context and provider
│       ├── hooks/             # Custom React hooks
│       │   ├── use-orders.ts
│       │   ├── use-projects.ts
│       │   ├── use-services.ts
│       │   ├── use-team.ts
│       │   ├── useImageUpload.ts
│       │   └── use-toast.ts
│       ├── lib/
│       │   ├── firebase/      # Firebase config, auth helpers, Firestore helpers
│       │   ├── cloudinary.ts  # Cloudinary unsigned upload helper
│       │   ├── gemini.ts      # Gemini AI client with key rotation
│       │   ├── queryClient.ts # TanStack Query client
│       │   └── utils.ts       # Utility functions (cn, etc.)
│       ├── pages/             # Route-level page components
│       │   ├── Home.tsx
│       │   ├── Portfolio.tsx
│       │   ├── ProjectDetail.tsx
│       │   ├── Services.tsx
│       │   ├── About.tsx
│       │   ├── Contact.tsx
│       │   ├── FAQ.tsx
│       │   ├── PrivacyPolicy.tsx
│       │   ├── TermsOfService.tsx
│       │   ├── not-found.tsx
│       │   └── admin/         # Admin-only pages (protected)
│       │       ├── AdminLayout.tsx
│       │       ├── Dashboard.tsx
│       │       ├── Orders.tsx
│       │       ├── Projects.tsx
│       │       └── Services.tsx
│       └── types/
│           └── index.ts       # Shared TypeScript types
├── vite.config.ts             # Vite config (port 5000, path aliases)
├── tailwind.config.ts         # Tailwind configuration
├── postcss.config.js          # PostCSS config
├── tsconfig.json              # TypeScript config
├── components.json            # shadcn/ui config
├── firestore.rules            # Firestore security rules
├── vercel.json                # Vercel deployment config
└── package.json
```

---

## Deployment

This project is a **static frontend** optimized for **Vercel**. There is no backend server to maintain.

1. Push to your connected GitHub repository
2. Vercel will detect the Vite build and deploy automatically using `vercel.json`
3. Set all environment variables in the Vercel project settings dashboard

For Replit deployment, use the built-in **Publish** feature which builds and hosts the static output.

---

## Brand Statement

> **"I help startups and small businesses build fast, custom web applications — on time, within budget, with clean code they can actually maintain."**

**Formula:** `I help [WHO] build [WHAT] so they can [RESULT].`

Use this statement consistently across LinkedIn, Upwork, proposals, and your email signature. Consistency builds recognition.

**LinkedIn Headline:**
```
Senior Fullstack Developer & AI Integration Specialist | React · Node.js · TypeScript | I Help Businesses Build Fast, Custom Web Apps
```

**LinkedIn About Section:**
```
I am a fullstack web developer specializing in building fast, custom web applications for startups and small businesses. I have built everything from AI-powered SaaS dashboards to e-commerce platforms and booking systems.

My clients get their projects delivered on time, within budget, with clean code they can actually maintain.

If you need a reliable developer who communicates clearly and delivers results — let's connect.
```

---

## Services & Pricing

### Package 1 — Landing Page
> For: Startups launching a product, local businesses promoting a service, event promotions.

**Includes:** Single-page responsive design · Contact form · Basic on-page SEO · Deployed live

**Timeline:** 5–7 business days | **Price: $250 – $600** | **Revisions:** 2

---

### Package 2 — Business Website
> For: Small businesses, freelancers, service providers, restaurants, clinics.

**Includes:** 5–8 pages · Mobile-first design · Contact form · Google Analytics · Basic SEO · Deployed live

**Timeline:** 2–3 weeks | **Price: $700 – $1,800** | **Revisions:** 2

---

### Package 3 — Custom Web Application
> For: Startups building an MVP, businesses needing a custom internal tool or client-facing app.

**Includes:** React + TypeScript frontend · Node.js + Express backend · PostgreSQL database · Auth · Admin dashboard · Handover documentation

**Timeline:** 4–8 weeks | **Price: $2,500 – $10,000+** | **Revisions:** 3 milestone reviews

---

### Package 4 — AI Feature Add-On
> For: Businesses wanting to add AI-powered capabilities to an existing app.

**Choose from:** Semantic search · AI-generated content · Custom chatbot · Recommendation engine · Automated summarization

**Timeline:** 1–3 weeks per feature | **Price: $600 – $4,000 per feature**

---

### Package 5 — Monthly Maintenance Retainer
> For: Clients who need ongoing support after launch.

**Includes:** Bug fixes · Performance monitoring · Content updates · Security patches · Priority response (within 4 hours)

**Price: $250 – $1,000/month** | **Minimum commitment:** 3 months

---

### Pricing by Experience Level

| Level | Experience | Hourly Rate | Small Project | Large Project |
|---|---|---|---|---|
| Beginner | 0–1 year | $15 – $30/hr | $150 – $600 | $600 – $2,000 |
| Intermediate | 1–3 years | $30 – $65/hr | $600 – $2,500 | $2,500 – $7,000 |
| Senior | 3–5 years | $65 – $120/hr | $2,000 – $6,000 | $6,000 – $20,000 |
| Expert / Specialist | 5+ years | $120 – $200+/hr | $5,000+ | $20,000+ |

**Pricing rules:**
- Always show 3 packages — the middle one is what you want them to buy
- Charge a 25–40% rush fee for urgent timelines
- Raise prices every 3 months in year one, every 6 months after that
- Never work for free — even $50 sets a professional tone

---

## Finding Clients

### Freelance Platforms

| Platform | Best For | Fee |
|---|---|---|
| **Upwork** | Long-term projects, serious clients | 10–20% |
| **Fiverr** | Fixed-price gigs, quick wins | 20% |
| **Contra** | No platform fee, modern UI | 0% |
| **Toptal** | High-paying clients (expert level) | 0% to you |
| **PeoplePerHour** | European clients | 20% |

**Winning on Upwork:**
1. Complete your profile to 100%
2. Target jobs with fewer than 5 proposals first
3. Apply within 1–2 hours of a job being posted
4. Send 5–10 personalized proposals per day
5. Reference something specific from the job description in every proposal

**Winning on Fiverr:**
1. Create 3–5 niche-specific gigs
2. Add a video — gigs with video get 4x more impressions
3. Respond within 1 hour
4. Deliver 1–2 days early whenever possible
5. Ask for a review on every delivery

---

### Direct Outreach (Zero Platform Fees)

**Target local businesses that:**
- Have no website
- Have a website that doesn't work on mobile
- Are missing key features (booking, menu, product catalog)

**Industries to target:** Restaurants · Salons · Gyms · Clinics · Law firms · Real estate agencies · Schools · Auto repair shops

**Cold Email Template — No Website:**
```
Subject: [Business Name] — I noticed you're not online yet

Hi [Name],

I was looking for [type of business] in [city] and noticed [Business Name]
doesn't have a website yet.

A lot of your potential customers are searching online before deciding
where to go — and if you're not there, they're choosing a competitor.

I'm a local web developer and I can have a professional website live for
you within 1–2 weeks. I recently built something similar for a [type of
business] in [nearby area].

Can I send over a quick mockup of what it could look like for you?

Best,
Saif Khan
devstudio.com | [Phone]
```

**Cold Email Template — Outdated Website:**
```
Subject: Quick idea for [Business Name]'s website

Hi [Name],

I visited [Business Name]'s website today and noticed it doesn't load
well on mobile — which means you could be losing customers who search
on their phones.

I specialize in rebuilding exactly this kind of site: fast, modern,
and mobile-first. I recently helped a similar business increase their
online inquiries after a full redesign.

Would you be open to a 15-minute call this week?

Best,
Saif Khan
devstudio.com
```

**LinkedIn Outreach (3-Step Sequence):**

Step 1 — Connection request:
> "Hi [Name] — I noticed you're building [type of business] in [city]. I work with businesses like yours on web development. Would love to connect."

Step 2 — After connecting (no pitch yet):
> "Thanks for connecting! I saw your post about [something from their profile]. That resonated — especially the part about [specific detail]."

Step 3 — Soft pitch after 3–5 days:
> "Quick question — do you currently have someone handling your web development or is that something you're looking for help with?"

---

## Proposals That Win

Most proposals lose in the first two sentences. Fix this and your win rate doubles.

**The Winning Structure (under 200 words):**
```
1. HOOK    — Show you understand THEIR specific problem (1–2 sentences)
2. SOLUTION — Briefly explain your approach (2–3 sentences)
3. PROOF   — One relevant example, not your whole portfolio (1–2 sentences)
4. PLAN    — Timeline and availability (1 sentence)
5. CTA     — One specific question or next step (1 sentence)
```

**Losing proposal:**
> "Hello! I am an experienced fullstack developer with 4 years of experience. I know React, Node.js, Express, MongoDB, PostgreSQL, TypeScript... I am hard working and will deliver quality work. Looking forward to working with you."

**Winning proposal:**
> "You need a booking system where customers can self-schedule, receive automatic reminders, and cancel without calling your front desk — synced with Google Calendar.
>
> My approach: React frontend, Node.js + PostgreSQL backend, Google Calendar API for two-way sync, and Twilio for SMS reminders. Pages load in under 1 second.
>
> I built this for a dental clinic in March — they went from 12 phone calls per day to 3. Live demo: [link].
>
> I can start Monday and deliver a working prototype in 2 weeks. Does a 15-minute call on Tuesday work for you?"

**Follow-up sequence:**
- Day 3: "Just following up — still happy to help if the timing works."
- Day 7: "One last follow-up. If this is no longer relevant, no worries."
- Day 14: Move on.

Two follow-ups is professional. Three or more is desperate.

---

## Contracts & Getting Paid

### Every Contract Must Include

1. **Scope of Work** — Specific list of exactly what you will deliver
2. **Exclusions** — What is NOT included (copywriting, graphic design, third-party API fees)
3. **Milestones & Timeline** — Specific dates with clear definitions of "done"
4. **Revision Policy** — How many rounds included; what counts as a new feature
5. **Payment Terms** — Exact amounts, due dates, and method
6. **Kill Fee** — If the client cancels, you keep the deposit
7. **IP Transfer** — Client owns all code after final payment in full
8. **Late Payment Fee** — 1.5–2% per month on overdue invoices

### Payment Structure

| Project Size | Structure |
|---|---|
| Under $300 | 100% upfront |
| $300 – $1,500 | 50% upfront / 50% on delivery |
| $1,500 – $5,000 | 33% / 33% at midpoint / 33% on delivery |
| $5,000+ | 40% upfront / 30% at milestone / 30% on delivery |
| Monthly retainer | 100% on the 1st of the month, before work begins |

**Golden rule: Never start work before receiving your upfront payment.**

### Handling Scope Creep

When a client asks for something extra, say:
> "I love that idea — it would definitely make the product better. That falls outside the agreed scope, so I'll put together a quick quote for it as a separate task. Usually something like that takes [X hours] at my rate, so around $[Z]. Want me to put that together?"

### Payment Tools

| Tool | Best For | Fee |
|---|---|---|
| **Wise** | Low-cost international transfers | ~0.5% |
| **PayPal Business** | International, widely trusted | 2.9% + $0.30 |
| **Stripe** | Auto-billing for retainers | 2.9% + $0.30 |
| **Wave** | Free invoicing + payment collection | 2.9% + $0.30 |

---

## Scaling Your Income

### 3 Phases of Freelance Growth

**Phase 1 — Months 1–3: Land & Learn**
Goal: Get first 3 paid projects. Build proof. Get reviews.
- Publish portfolio, set up Fiverr and Upwork, send 5–10 proposals/day
- Accept projects that fit your niche, even if small
- Deliver every project with maximum effort and collect testimonials

**Phase 2 — Months 3–12: Grow & Raise**
Goal: Consistent monthly income. Raise rates. First retainer clients.
- Raise prices 20–30% after every 3–5 positive reviews
- Stop accepting projects outside your niche
- Post on LinkedIn 2x per week
- Ask every client for a referral

**Phase 3 — Year 1+: Specialize & Scale**
Goal: Become the go-to developer in your niche.
- Publish case studies with real metrics for your best projects
- Create productized service packages with fixed prices
- Hire a subcontractor for parts you don't enjoy
- Build systems that let you manage more clients with less time

### Income Roadmap

| Timeline | Strategy | Realistic Monthly Income |
|---|---|---|
| Month 1–3 | First clients, building reviews | $300 – $1,000 |
| Month 3–6 | Regular clients, raising prices | $1,000 – $3,000 |
| Month 6–12 | Retainers, referrals, niche positioning | $3,000 – $6,000 |
| Year 1–2 | Specialist rates, productized services | $6,000 – $12,000 |
| Year 2–3 | Agency model, passive income | $12,000 – $25,000+ |

---

## Passive Income Streams

### Digital Products (Build Once, Sell Forever)

| Product | Platform | Realistic Earnings |
|---|---|---|
| React component library / UI kit | Gumroad, Creative Market | $200 – $2,000/month |
| Next.js or Vite starter templates | Gumroad, GitHub Marketplace | $100 – $1,000/month |
| Figma UI kits | UI8, Creative Market | $200 – $2,000/month |
| Code snippets / boilerplates | Gumroad | $50 – $300/month |

### Courses & Content

| Format | Platform | Potential |
|---|---|---|
| Video course | Udemy, Teachable, Gumroad | $500 – $10,000+/month |
| YouTube walkthroughs | YouTube (AdSense + sponsors) | $200 – $5,000+/month |
| Paid newsletter | Substack, Beehiiv | $100 – $3,000/month |
| 1-on-1 mentoring | Mentorcruise, ADPList | $50 – $200/hr |

### The Rule of 3 Income Streams

Aim for at least 3 streams within 3 years:
1. **Active** — Freelance projects (your main income early on)
2. **Semi-passive** — Retainer clients (recurring monthly income)
3. **Passive** — Digital product, course, or SaaS (income while you sleep)

---

## Essential Tools Stack

### Business Operations

| Tool | Purpose | Price |
|---|---|---|
| **Wave** | Free invoicing and accounting | Free |
| **Bonsai** | Contracts, proposals, invoicing | $17/month |
| **Calendly** | Client call scheduling | Free |
| **Loom** | Screen recordings for project deliveries | Free |
| **Notion** | Project tracking, client notes | Free |

### Client Communication

| Tool | Purpose |
|---|---|
| **Slack** | Real-time client communication |
| **Zoom / Google Meet** | Video discovery and progress calls |
| **Gmail + Grammarly** | Professional email with spell check |
| **Linear** | Advanced project and issue tracking |

### Development & Hosting

| Tool | Purpose | Price |
|---|---|---|
| **VS Code** | Primary code editor | Free |
| **GitHub** | Version control + code portfolio | Free |
| **Replit** | Build and host fullstack apps | Free / Paid |
| **Vercel** | Deploy React/Next.js/Vite apps | Free |
| **Render** | Deploy Node.js backends | Free |
| **Figma** | UI/UX design and mockups | Free |
| **Postman** | API testing | Free |
| **Railway** | PostgreSQL hosting | Free tier |

### Design & Content

| Tool | Purpose | Price |
|---|---|---|
| **Canva** | LinkedIn banners, proposal visuals | Free |
| **Unsplash / Pexels** | Free professional photos | Free |
| **ChatGPT / Claude** | Proposal drafting, code review | Free / $20/month |

---

## 90-Day Action Plan

### Week 1–2: Build Your Foundation
- [ ] Deploy your portfolio website (DevStudio)
- [ ] Write your brand statement (your one-liner niche)
- [ ] Set up and fully optimize your GitHub profile with a README
- [ ] Create strong READMEs for your 3 best repos
- [ ] Fully optimize your LinkedIn profile with value-driven headline
- [ ] Set up PayPal Business or Wise for payments

### Week 3–4: Go Live on Platforms
- [ ] Create Upwork account — complete to 100%
- [ ] Create Fiverr account — publish 3 niche-specific gigs
- [ ] Write 5 proposal templates (1 per service type)
- [ ] Write 2 cold email templates (no-website + outdated site)
- [ ] List 20–30 local businesses to contact
- [ ] Create a contract template in Bonsai or Wave

### Week 5–8: Start Outreach Aggressively
- [ ] Send 5–10 Upwork proposals every single day
- [ ] Cold email or visit 5 local businesses per week
- [ ] Send 5 LinkedIn connection requests per day (with a note)
- [ ] Post on LinkedIn 2x per week
- [ ] Follow up on all proposals after 3 days
- [ ] Join 3 Facebook or Discord groups where clients might be

### Week 9–12: Land, Deliver, and Repeat
- [ ] Land your first 2–3 paid projects
- [ ] Sign contracts and collect upfront payment before starting
- [ ] Deliver with a Loom walkthrough and handover document
- [ ] Ask for a testimonial after every delivery
- [ ] Ask for a referral after every happy client
- [ ] Raise prices by 20% before taking on the next project

---

## Common Mistakes to Avoid

| Mistake | Why It Hurts | What to Do Instead |
|---|---|---|
| Working for free | Creates entitlement, not trust | Charge even $50 — it sets a professional tone |
| Generic proposals | Gets ignored; signals laziness | Spend 10 minutes personalizing each one |
| No contract | No protection; scope creep wins | Always use a signed contract with a kill fee |
| No upfront payment | Risk of doing free work | 50% minimum before writing one line of code |
| Accepting every project | No niche = lower rates | Say no to projects outside your focus |
| Underpricing | Attracts difficult clients | Price for the result, not your hours |
| Poor communication | The #1 reason clients leave | Send updates every 2–3 days, even if brief |
| Not asking for reviews | Reviews are your most valuable asset | Ask every happy client, every single time |
| Not following up | 80% of deals need follow-up | Send 1 follow-up email 3 days after your proposal |
| Staying a generalist | Can't raise rates without specialization | Niche down after 3+ projects |

---

## Final Note

The path from "developer who can code" to "developer who earns well" is not complicated — but it requires consistency.

- **Show up every day** — Proposals, content, outreach, follow-ups
- **Communicate better than anyone else** — Clients choose the developer they trust, not the most technically impressive one
- **Protect your time with contracts** — Never let scope creep or unpaid work steal your income
- **Deliver beyond expectations** — One delighted client is worth more than ten satisfied ones
- **Raise your prices** — Every few months, whether it feels comfortable or not

Start today. Imperfect action beats perfect planning every time.

---

*Last updated: May 2026*
