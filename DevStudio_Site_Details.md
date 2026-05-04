# DevStudio — Full Site & Home Page Details

---

## Overview

**DevStudio** is a professional portfolio and digital agency website built for a freelance full-stack developer named **Saif Khan**. The site is designed to attract clients, showcase past work, present service offerings with pricing, and handle project inquiries — all in one polished, high-performance web application.

- **Site Name:** DevStudio
- **Owner / Developer:** Saif Khan
- **Role:** Senior Fullstack Developer
- **Experience:** 7+ years (5+ years highlighted in hero)
- **Work Style:** Remote, Global, Fixed-scope contracts
- **Response Time:** Less than 24 hours
- **AI-Ready:** Yes — LLMs & RAG (2+ years of AI integration experience)
- **Page Title (SEO):** `Saif Khan — Freelance Fullstack Developer | DevStudio | React · Node.js · TypeScript`
- **Meta Description:** "I'm Saif Khan, a freelance fullstack developer. I help startups and businesses build fast, custom web applications — on time, within budget, with clean code you can maintain."

---

## Tech Stack

| Layer         | Technology                                              |
|---------------|---------------------------------------------------------|
| Frontend      | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui    |
| Animations    | Framer Motion                                           |
| Backend/Auth  | Firebase (Authentication + Firestore)                   |
| AI Chatbot    | Google Gemini API                                       |
| Media Storage | Cloudinary                                              |
| Data Fetching | TanStack React Query                                    |
| Routing       | Wouter                                                  |
| Forms         | React Hook Form + Zod                                   |
| Icons         | Lucide React + React Icons (SI set)                     |

---

## Navigation / Header

- **Logo:** `</>` icon + "DevStudio" text (top-left)
- **Nav Links:** Home · Services · Portfolio · About · FAQ · Contact
- **CTA Button:** "Get Started →" (filled, primary color, rounded-full)
- **Auth Button:** "Login" with login icon (outlined, rounded-full)
- **Behavior:** Transparent at top of page, blurred background (`backdrop-blur-lg`) on scroll — sticky positioning throughout

---

## Home Page — Full Section Breakdown

The home page is structured as a single scrollable page (`min-h-screen bg-background`) with 8 distinct sections rendered in sequence:

```
[1] Hero
[2] About Me
[3] Tech Stack / Skills
[4] Projects Gallery
[5] Services & Pricing
[6] Testimonials
[7] Platforms / Find Me Online
[8] CTA Banner
```

---

### SECTION 1 — Hero

**File:** `client/src/components/Hero.tsx`

#### Layout
- **Outer section:** `relative`, `pt-8 sm:pt-12 pb-10 sm:pb-14`, `overflow-hidden`
- **Inner container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Grid:** `grid lg:grid-cols-2 gap-8 lg:gap-12 items-center`
  - On mobile: single column (stacked)
  - On desktop (lg+): two equal columns side by side

#### Background Layer (absolute, z-0, pointer-events-none)
Three CSS-animated blobs layered behind content:
| Blob | Position | Size | Color | Blur |
|------|----------|------|-------|------|
| Blob 1 | `-top-[15%] right-0` | `55% × 70%` | `primary/10` | `blur-[140px]` |
| Blob 2 | `top-[50%] -left-[5%]` | `40% × 50%` | `secondary/8` | `blur-[120px]` |
| Blob 3 | `top-[20%] left-[40%]` | `25% × 30%` | `primary/5` | `blur-[100px]` |

A subtle grid pattern overlay sits on top of the blobs:
- Pattern: `1px` primary-color lines every `64px × 64px`
- Opacity: `0.025` (barely visible texture)

#### Left Column — Text Content

**Element order (top to bottom):**

1. **Availability Badge**
   - Style: `inline-flex`, `bg-primary/8 border border-primary/20`, `rounded-full px-3.5 py-1.5`
   - Animated: spring entrance from `y: -12, scale: 0.92` → `y: 0, scale: 1`
   - Content: pulsing green dot (`animate-ping`) + `"AVAILABLE FOR NEW PROJECTS"` in `text-[11px] font-semibold uppercase tracking-widest`

2. **Main Headline (h1)**
   - Font: `font-display font-bold`, sizes: `text-3xl sm:text-4xl md:text-5xl lg:text-5xl`
   - Line height: `leading-[1.1]`, tracking: `tracking-tight`
   - Animated: fades in from `y: 20` with `duration: 0.6, delay: 0.1`
   - Text: `"I build "` + gradient span `"fast, custom"` + `" web apps that deliver results."`
   - `"fast, custom"` uses `text-gradient-primary` class
   - `"deliver results."` has an animated underline highlight bar (`scaleX 0→1, delay: 0.7`)

3. **Sub-description (p)**
   - Font: `text-sm sm:text-base text-muted-foreground`, `leading-relaxed max-w-lg`
   - Animated: fades in from `y: 14`, `delay: 0.2`
   - Text: "Senior fullstack developer with **5+ years of experience** helping startups and businesses turn ideas into polished, production-ready web applications — on time, within budget."

4. **Feature Tag Pills** (staggered, `staggerChildren: 0.1, delayChildren: 0.3`)
   - Layout: `flex flex-wrap gap-2`
   - Style: `bg-card border border-border rounded-full px-3 py-1.5 text-xs font-medium shadow-sm`
   - Hover: `scale: 1.06, y: -2` (spring)
   - Tags:
     - ⚡ `Zap` icon — "Fast Delivery"
     - 🛡️ `Shield` icon — "Clean Code"
     - 🕐 `Clock` icon — "On Time & On Budget"

5. **CTA Buttons**
   - Layout: `flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5`
   - Animated: fades from `y: 10`, `delay: 0.42`
   - **"Hire Me →"** — links to `/contact`
     - Style: `size="lg" h-11 px-7 rounded-full`, `shadow-md shadow-primary/20`
     - Hover: `scale: 1.04`, Tap: `scale: 0.97`
   - **"View My Work"** — links to `/portfolio`
     - Style: `size="lg" variant="outline" h-11 px-7 rounded-full border-border`
     - Hover: `scale: 1.04`, Tap: `scale: 0.97`

6. **Tech Stack Badges** (staggered, `staggerChildren: 0.08, delayChildren: 0.55`)
   - Layout: `flex flex-wrap items-center gap-1.5`
   - Label: `"STACK:"` in `text-[10px] text-muted-foreground/60 font-semibold uppercase tracking-widest`
   - Badges: `text-[11px] font-mono bg-primary/8 text-primary/80 border border-primary/15 rounded-md px-2 py-0.5`
   - Hover: `scale: 1.1, y: -2` (spring)
   - Items: React · Node.js · TypeScript · PostgreSQL · AI / LLMs

#### Right Column — Visual Panel (desktop only: `hidden lg:block`)

Container: `relative h-[460px]` — all cards are absolutely positioned inside.

| Card | Position | Size | Details |
|------|----------|------|---------|
| **Code Card** | `top-0 left-0` | `w-[255px]` | `bg-card border rounded-2xl shadow-xl shadow-primary/5` |
| **Rating Badge** | `top-4 right-0` | auto | `bg-card border rounded-full px-3.5 py-2 shadow-md` |
| **Web Applications** | `top-[44%] right-0` | `max-w-[210px]` | `bg-gradient-to-r from-blue-500/20 to-cyan-500/10` |
| **Clean Architecture** | `bottom-[18%] left-2` | `max-w-[210px]` | `bg-gradient-to-r from-emerald-500/20 to-green-500/10` |
| **Modern Stack** | `bottom-0 right-4` | `max-w-[210px]` | `bg-gradient-to-r from-violet-500/20 to-purple-500/10` |

**Code Card internals:**
- Header bar: `bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border px-4 py-3`
- Three macOS dots: red, yellow, green (`w-2.5 h-2.5 rounded-full`)
- Filename: `project.tsx` in `font-mono text-xs`
- Body: `TypewriterCode` component — reveals lines one by one every `220ms`
- Full code content typed out:
  ```
  const project = {
    name: "Your Dream App",
    quality: "production-ready",
    delivery: "on-time",
    budget: "within-scope",
    satisfaction: 99,
  }
  // Ready to build yours?
  ```
- Syntax colors: `violet-500` (const), `blue-400` (var), `emerald-500` (keys), `amber-500` (strings), `muted-foreground/50` (comment)
- Blinking cursor: `w-[2px] h-[12px] bg-primary`, blinks via `opacity: [1, 0, 1]` every `0.8s`

**Rating Badge internals:**
- 5 × amber stars revealed one by one (`delay: 0.6 + i * 0.08`)
- Text: `"5.0"` bold + `"· 30+ clients"` muted

**Floating Cards (Web Applications / Clean Architecture / Modern Stack):**
- Each uses CSS `animate-float` class (continuous bobbing `y: 0 → -8 → 0` every `3.2s`)
- Each has staggered `animationDelay`: `0s`, `0.8s`, `1.6s`
- Structure: icon box (`w-8 h-8 rounded-lg bg-card border`) + title + subtitle
- `hover:scale-105 transition-transform` on hover
- Entry animations: spring from different directions (x: 24, x: -24, y: 24)

#### Stats Bar (below the two columns)

- Layout: `mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border`
- Grid: `grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6`
- Animated: fades in from `y: 20`, `delay: 0.55`
- Each stat: `text-center group cursor-default`, hover lifts `y: -4` (spring)
- Number: `AnimatedCounter` component — counts from 0 to target on scroll-into-view using `IntersectionObserver` (threshold `0.5`), duration `1.6s`, easing `easeOut`
- Label: `text-[10px] text-muted-foreground uppercase tracking-widest font-semibold`

| Stat Label          | Target | Suffix |
|---------------------|--------|--------|
| Projects Delivered  | 50     | +      |
| Happy Clients       | 30     | +      |
| Years Experience    | 5      | +      |
| Satisfaction Rate   | 99     | %      |

---

### SECTION 2 — About Me

**Location:** Inline in `Home.tsx` (section id: `about`)
**Padding:** `py-10 sm:py-16`
**Border:** `border-t border-border`

#### Layout Grid
- Mobile: single column, flex column
- Desktop: `lg:grid-cols-5` — Profile card on right (2 cols), text content on left (3 cols)
- **Note:** On mobile, the profile card renders FIRST (visually top); on desktop it renders on the right

#### Right Side — Profile Card (2 of 5 cols on desktop)

Three stacked cards with `gap-3`:

**Card 1 — Profile + Stats**
- Rounded card: `bg-card border border-border rounded-2xl overflow-hidden`
- Header image area: `h-20 sm:h-24`, gradient `from-primary/20 via-primary/10 to-secondary/10`
  - Grid line texture overlay at 24px spacing
  - Unsplash background image (developer at laptop), `opacity-25 mix-blend-luminosity`
- Body: `px-4 pb-4 pt-3`
  - Name: `"Saif Khan"` in `font-display font-bold text-base`
  - Title: `"Senior Fullstack Developer"` in `text-xs text-muted-foreground`
  - Availability badge: `bg-emerald-500/10 border-emerald-500/20 text-emerald-600 text-[11px] rounded-full` with pulsing green dot
- Stats row: `grid-cols-3 gap-2 border-t border-border`
  - 7+ Yrs Exp. · 50+ Projects · 99% Satisfaction

**Card 2 — Specializations**
- `bg-card border border-border rounded-2xl p-4`
- Label: `"SPECIALIZATIONS"` in `text-[10px] font-bold uppercase tracking-widest text-muted-foreground`
- 4 progress bars, each animated with `whileInView`:
  - Bar slides in from `x: 8` (`delay: 0.15 + i * 0.06`)
  - Bar fill animates `width: 0 → {pct}%` (`duration: 0.8, ease: easeOut`)
  - Fill style: `bg-gradient-to-r from-primary to-secondary`

| Skill                      | %  |
|----------------------------|----|
| React / Next.js Frontends  | 95 |
| Node.js APIs & Backends    | 92 |
| Database Design            | 88 |
| AI Feature Integration     | 85 |

**Card 3 — Quick Facts (2×2 grid)**
- `grid grid-cols-2 gap-2`
- Each cell: `bg-card border border-border rounded-xl px-3 py-2.5`
- Label `text-[10px] text-muted-foreground`, Value `text-xs font-semibold text-foreground`

| Label         | Value              |
|---------------|--------------------|
| Based in      | Remote — Global    |
| Response time | < 24 hours         |
| Contract type | Fixed-scope        |
| AI-ready      | Yes — LLMs & RAG   |

#### Left Side — Text + Values (3 of 5 cols on desktop)

Animated: slides in from `x: -20`, `duration: 0.5`.

1. **Label:** `"About Me"` — `text-primary text-xs font-bold uppercase tracking-widest`
2. **Headline (h2):** `text-2xl sm:text-3xl lg:text-4xl font-display font-bold leading-[1.15]`
   - "I help businesses build web apps that **solve real problems.**" (gradient on last phrase)
3. **Tagline:** `"Senior fullstack developer. Direct communication. Results you can measure."`
4. **Bio paragraph:** 
   > "I'm a freelance fullstack developer with **7+ years of experience** building web apps from scratch — specializing in **React, Node.js, TypeScript & PostgreSQL.** For the past **2 years I've integrated AI features** into real products: chatbots, semantic search, content generation. You talk directly to the developer, not a project manager."

5. **Value Cards** — `grid grid-cols-1 sm:grid-cols-2 gap-2.5`
   - Each card: `flex items-start gap-3 bg-card border border-border rounded-xl p-3`
   - Hover: `border-primary/30 bg-primary/3`
   - Icon box: `w-8 h-8 rounded-lg bg-primary/10`, icon: `w-4 h-4 text-primary`
   - Title: `text-xs font-semibold text-foreground`
   - Desc: `text-[11px] text-muted-foreground leading-relaxed`
   - Staggered entry: `delay: 0.1 + i * 0.06`

| Icon           | Title                  | Description                                                              |
|----------------|------------------------|--------------------------------------------------------------------------|
| Zap            | Fast Delivery          | I work in focused sprints so you get a working product quickly           |
| Shield         | Clean Code             | I write maintainable, well-documented code your team can confidently take over |
| Clock          | On Time & On Budget    | Fixed-scope projects. No surprise invoices. No scope creep without your approval |
| HeartHandshake | Clear Communication    | You'll always know exactly where your project stands. I reply within hours, not days |

6. **CTA Button:** `"Read My Full Story →"` — `variant="outline" rounded-full w-full sm:w-auto` — links to `/about`

---

### SECTION 3 — Tech Stack / Skills

**Section id:** `skills`
**Padding:** `py-10 sm:py-16`
**Background:** `bg-card/20`
**Border:** `border-t border-border`

#### Header
- Layout: `flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6 sm:mb-8`
- Label: `"MY SKILLS"` in primary color, `text-xs font-bold uppercase tracking-widest`
- Title: `"Tech Stack & Expertise"` in `text-2xl sm:text-3xl font-display font-bold`
- Subtitle (right-aligned on desktop): `"Battle-tested tools I use daily to build fast, scalable, production-ready apps."`

#### Skills Table
- Container: `bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border`
- Each row animated: slides from `x: -10`, staggered by `delay: ci * 0.06`
- Row hover: `hover:bg-muted/30`

Each row layout:
- **Mobile:** Label row first (dot + category name), then chips indented below
- **Desktop:** Side-by-side — label takes `w-36 shrink-0`, chips fill remaining space

Skill chip style: `bg-white border border-border rounded-lg px-2.5 py-1.5`
- Icon (colored SVG from react-icons/si)
- Name in `text-xs font-medium text-gray-800`
- Level indicator: `★` (Expert, primary color) or `◆` (Advanced, secondary color)
- Hover: `border-primary/40 bg-indigo-50`

| Category       | Color Dot  | Skills & Levels                                                                   |
|----------------|------------|-----------------------------------------------------------------------------------|
| Frontend       | Blue       | React ★, Next.js ★, TypeScript ★, Tailwind CSS ★                                |
| Backend        | Emerald    | Node.js ★, GraphQL ◆, Prisma ◆, Firebase ◆                                      |
| Database       | Violet     | PostgreSQL ★, MongoDB ★, Redis ◆                                                 |
| DevOps & Tools | Orange     | Docker ◆, Vercel ★, Git ★                                                       |
| AI / LLMs      | Pink       | OpenAI API ◆                                                                      |

#### Legend + Stats Row (below table)
- Left: `★ Expert` / `◆ Advanced` legend
- Right: `7+ Yrs Exp.` · `18+ Technologies` · `50+ Apps Shipped`

---

### SECTION 4 — Projects Gallery

**Component:** `client/src/components/ProjectsGallery.tsx`

- Filter tabs: All · Web · Mobile · UI/UX · Branding
- `ProjectCard` components in responsive grid
- Transitions: `AnimatePresence` with `layout` prop for smooth filter-switch animations
- Each card shows: project image, title, category badge, short description, link

---

### SECTION 5 — Services & Pricing

**Section id:** `services`
**Padding:** `py-16 sm:py-24`
**Background:** `bg-card/20`
**Border:** `border-t border-border`

#### Header (centered, max-w-2xl)
- Tag pill: `Sparkles` icon + `"WHAT I OFFER"` — `bg-primary/8 border border-primary/15 rounded-full`
- Title: `"Services & Pricing"` — `text-2xl sm:text-3xl lg:text-4xl font-display font-bold`
- Subtitle: "Fixed-scope packages with clear deliverables and transparent pricing. No hourly surprises. No hidden fees. Just results."

#### Cards Grid
- Layout: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5`
- Each card animated: fades from `y: 20`, `delay: i * 0.08`

**Card structure (top to bottom):**
1. **Gradient top strip** — `h-1.5 w-full bg-gradient-to-r` (unique color per service)
2. **"Most Popular" badge** (Custom Web App only) — `bg-primary text-primary-foreground text-[11px] rounded-full`, absolute top-right
3. **Icon + Name row** — icon in colored `w-10 h-10 rounded-xl` box + service name + timeline
4. **Description** — `text-sm text-muted-foreground`
5. **Feature checklist** — `Check` icon in small colored circle + text, `text-xs`
6. **Price footer** — `border-t border-border`, "Starting from" label + bold price + arrow icon

| Service            | Price              | Timeline   | Icon     | Color Theme | Features |
|--------------------|--------------------|------------|----------|-------------|----------|
| Landing Page       | $250 – $600        | 5–7 days   | Globe    | Blue/Cyan   | Responsive design, SEO markup, Contact form, Fast load |
| Business Website   | $700 – $1,800      | 2–3 weeks  | Monitor  | Emerald     | 5–8 pages, Google Analytics, Mobile-first, CMS-ready |
| Custom Web App ⭐  | $2,500 – $10,000+  | 4–8 weeks  | Code2    | Primary     | Auth & accounts, Admin dashboard, REST/GraphQL, CI/CD |
| AI Feature Add-On  | $600 – $4,000      | 1–3 weeks  | Bot      | Violet      | AI chatbot, Semantic search, Content gen, OpenAI APIs |
| Monthly Retainer   | $250 – $1,000/mo   | Ongoing    | RefreshCcw | Orange   | Bug fixes, Uptime monitoring, Priority response, Reports |

**Featured card (Custom Web App)** differs visually:
- `border-primary/50 shadow-lg shadow-primary/10 ring-1 ring-primary/20`
- Background tint: `bg-primary/3`
- Price color: `text-primary` (instead of `text-foreground`)

#### Bottom Strip (guarantee bar)
- Layout: `flex flex-col sm:flex-row items-center justify-between`
- Style: `bg-card border border-border rounded-2xl px-5 sm:px-6 py-4 sm:py-5`
- Three trust icons with labels:
  - 🛡️ **Fixed-scope pricing** — "No hidden costs ever"
  - 🕐 **On-time delivery** — "Milestone-based progress"
  - 🤝 **Direct communication** — "You talk to the developer"
- CTA Button: `"View All Packages →"` — links to `/services`, `rounded-full bg-primary`

---

### SECTION 6 — Testimonials

**Section id:** `testimonials`
**Padding:** `py-16 sm:py-24`
**Border:** `border-t border-border`

#### Header (centered, max-w-2xl)
- Tag pill: `Award` icon + `"SOCIAL PROOF"`
- Title: `"What Clients Say"`
- Subtitle: `"Not just 'great work' — real problems solved, real numbers delivered."`

#### Trust Stats Strip
- Layout: `grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4`
- Each cell: `bg-card border border-border rounded-2xl px-4 py-4 flex items-center gap-3`
- Icon in colored `w-9 h-9 rounded-xl` box

| Metric           | Value   | Icon           | Color   |
|------------------|---------|----------------|---------|
| Average rating   | 5.0 / 5 | Star           | Amber   |
| Happy clients    | 30+     | Users          | Blue    |
| On-time delivery | 99%     | TrendingUp     | Emerald |
| Would re-hire    | 100%    | HeartHandshake | Violet  |

#### Testimonial Cards
- Layout: `grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5`
- Each card animated: fades from `y: 20`, `delay: i * 0.1`
- Hover: `hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5`

**Card structure:**
1. **Top accent strip** — `h-1 bg-gradient-to-r {color}` (blue, emerald, or violet)
2. **Stars row** — amber filled stars + `"via {source}"` pill (border, rounded-full, muted)
3. **Quote** — `Quote` icon (primary/20) + italic text in `text-sm text-foreground pl-5`
4. **Result metric pill** — gradient background matching card color
   - `TrendingUp` icon + bold result + sub-result
5. **Author row** — gradient avatar circle with initials + name + role, company

| Client         | Role    | Company        | Quote Summary                                               | Result             | Sub-result          | Color  | Via            |
|----------------|---------|----------------|-------------------------------------------------------------|--------------------|---------------------|--------|----------------|
| Sarah Mitchell | Founder | MedBook        | Patient booking system, 6 weeks, reduced workload 60%       | 60% less workload  | front-desk time saved | Blue   | Direct Client  |
| James Okonkwo  | CEO     | ShopLocal      | Custom Shopify replacement, 3x faster, +22% conversions     | +22% conversions   | & $300/mo saved     | Emerald| LinkedIn ⭐     |
| Priya Sharma   | CTO     | LaunchPad SaaS | Idea to MVP in under 8 weeks, every milestone hit           | MVP in 8 weeks     | idea to production  | Violet | Direct Client  |

James Okonkwo's card is `featured` — has `border-primary/40 ring-1 ring-primary/15`

#### Bottom Trust Note
- 5 amber stars + "**30+ clients** have trusted me with their products. [Become the next.](/contact)"

---

### SECTION 7 — Platforms / Find Me Online

**Section id:** `platforms`
**Padding:** `py-16 sm:py-24`
**Background:** `bg-card/20`
**Border:** `border-t border-border`

#### Header
- Layout: `flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4`
- Tag pill: `ExternalLink` icon + `"FIND ME ONLINE"`
- Title: `"Where to Hire or Follow Me"`
- Subtitle (right-aligned): `"Prefer a platform with built-in protection, or a direct hire? I'm reachable on all major channels."`

#### Platform Cards
- Layout: `grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5`
- Each card is an `<a>` tag (opens external link, `target="_blank"`)
- Hover: `hover:-translate-y-1 hover:shadow-xl hover:shadow-black/8`

**Card structure:**
- **Top hero area** (dark gradient background per platform):
  - Subtle white grid texture overlay (`opacity-10`, `20px × 20px`)
  - Platform icon in `w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20`
  - Category tag pill (top-right, platform-specific color)
  - Platform name (white, bold) + handle (white/60)
  - Stat badge: `bg-white/10 border border-white/15 rounded-full px-3 py-1`
- **Body:**
  - Description text
  - Highlights list with `Check` icons (primary color)
  - CTA text with arrow — arrow circle becomes filled primary on hover

| Platform    | Handle        | Tag               | Gradient             | Stat              | Highlights                                              | CTA              |
|-------------|---------------|-------------------|----------------------|-------------------|---------------------------------------------------------|------------------|
| GitHub      | @saifkhan-dev | Open Source       | slate-700 → slate-900 | 15+ repos        | 15+ public repos, Clean documented code, Real projects  | Browse My Code   |
| LinkedIn ⭐ | Saif Khan     | Professional      | blue-600 → blue-800  | 500+ connections  | Verified recommendations, 500+ connections, Weekly insights | Connect with Me |
| Twitter / X | @saifbuilds   | Building in Public| zinc-700 → zinc-900  | Building daily    | Daily build updates, Freelance tips, Dev threads        | Follow My Journey|

LinkedIn card is `featured` — `border-primary/40 ring-1 ring-primary/15`

#### Bottom Nudge Bar
- Layout: `flex flex-col sm:flex-row items-center justify-between`
- Style: `bg-card border border-border rounded-2xl px-5 sm:px-8 py-5`
- Left: `HeartHandshake` icon + "Prefer to skip the platforms?" + "You can reach me directly — I reply within 24 hours."
- Right CTA: `"Contact Me Directly →"` — links to `/contact`, `rounded-full bg-primary`

---

### SECTION 8 — Final CTA Banner

**Section id:** `contact-cta`
**Padding:** `py-20 sm:py-32`
**Background:** `bg-[hsl(var(--footer))]` (dark footer color)
**Border:** `border-t border-border`
**Extra:** `relative overflow-hidden`

#### Background Effect
- Absolute blur blob: `absolute -top-[50%] left-[20%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full`
- Creates a glowing halo effect behind the text

#### Content (centered, max-w-4xl)
All animated with `whileInView`, fades from `y: 20`, `duration: 0.5`

1. **Headline:** `"Have a project in mind?"`
   - Font: `text-3xl sm:text-4xl lg:text-6xl font-display font-bold text-white`

2. **Description:**
   > "Tell me what you're building. I'll get back to you within 24 hours with my thoughts and a rough timeline."
   - Font: `text-base sm:text-lg lg:text-xl text-white/90`

3. **Fine print:**
   - `"50% upfront · Fixed-scope contract · 30-day post-launch support"`
   - Font: `text-xs sm:text-sm text-white/60`

4. **Button row:** `flex flex-col sm:flex-row items-center justify-center gap-4`
   - **"Let's Work Together →"** (primary): `h-16 px-12 rounded-full text-lg shadow-lg shadow-orange-900/20` — links to `/contact`
   - **"Read the FAQ"** (outline): `h-16 px-10 text-lg rounded-full border-white/20 text-white/80` — links to `/faq`
   - Arrow icon on primary button animates right on hover

---

## AI Chatbot Widget

- **Position:** Fixed, bottom-right corner, `z-50`, always visible
- **File:** `client/src/components/ChatBot.tsx`
- **Powered by:** Google Gemini API
- **Collapsed state:** Floating circular icon button
- **Expanded state:** Full chat window with message history
- **Context-aware:** Knows the site's services, pricing, and timeline information
- **Purpose:** Answer visitor questions without requiring a form submission

---

## Other Pages

| Page      | Path        | Description                                                                   |
|-----------|-------------|-------------------------------------------------------------------------------|
| Services  | /services   | Full breakdown of all service packages                                        |
| Portfolio | /portfolio  | Full filterable project gallery                                               |
| About     | /about      | Expanded bio, story, values, timeline                                         |
| FAQ       | /faq        | Categories: Working With Me, Pricing, Contracts, Process, Common Concerns     |
| Contact   | /contact    | 3-step guide + full inquiry form (Service Type, Budget, Timeline, Message)    |
| Admin     | /admin      | Protected dashboard — orders, portfolio CRUD, Cloudinary media uploads        |

---

## Admin Dashboard

A secure hidden panel at `/admin` with Firebase Google Authentication:

- Real-time order and inquiry management
- Portfolio project CRUD operations
- Service and pricing management
- Direct image/media uploads via Cloudinary

---

## Design System

### Color Tokens (CSS Variables)
| Variable       | Usage                                           |
|----------------|-------------------------------------------------|
| `--primary`    | Buttons, badges, links, accents, progress bars  |
| `--secondary`  | Secondary accents, background blobs             |
| `--card`       | Card backgrounds, input surfaces                |
| `--border`     | Borders, dividers                               |
| `--muted`      | Muted backgrounds, hover surfaces               |
| `--footer`     | Dark footer and CTA banner background           |
| `--foreground` | Main text color                                 |
| `--muted-foreground` | Secondary/subdued text                   |

### Typography Scale
| Usage            | Classes                                              |
|------------------|------------------------------------------------------|
| H1 (Hero)        | `font-display font-bold text-5xl leading-[1.1]`      |
| H2 (Sections)    | `font-display font-bold text-4xl`                    |
| Body             | `text-sm sm:text-base text-muted-foreground leading-relaxed` |
| Label/Eyebrow    | `text-xs font-bold uppercase tracking-widest text-primary` |
| Tiny / Caption   | `text-[10px] sm:text-[11px] text-muted-foreground`   |

### Framer Motion Animation Patterns
| Pattern | Usage |
|---------|-------|
| `initial: opacity 0 + y 20 → whileInView` | All section headers and cards |
| `staggerChildren` | Feature tag pills, tech badges |
| `whileHover: scale + y` | All interactive cards and buttons |
| `whileTap: scale 0.97` | CTA buttons |
| `animate-float` CSS keyframe | Floating visual cards in hero |
| `animate-ping` CSS keyframe | Availability green dot |
| `IntersectionObserver + animate()` | Counter numbers in stats bar |
| `AnimatePresence + layout` | Project gallery filter transitions |
| Typewriter interval (220ms/line) | Code card in hero |
| `scaleX 0→1` | Underline highlight on "deliver results." |

### Responsiveness Breakpoints
| Breakpoint | Behavior |
|------------|----------|
| Mobile (default) | Single column, stacked layout, full-width buttons |
| `sm` (640px+) | 2-column grids, side-by-side buttons, larger text |
| `lg` (1024px+) | Full 2-col hero, 5-col about grid, 3-col service grid |
| Right panel (hero) | Hidden on mobile (`hidden lg:block`), 460px tall absolute layout |

---

## SEO & Structured Data

The home page injects a JSON-LD `Person` schema into `<head>` on mount:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Saif Khan",
  "url": "https://portfolio-wheat-iota-47.vercel.app/",
  "jobTitle": "Senior Fullstack Developer",
  "description": "Freelance fullstack developer specializing in React, Node.js, TypeScript, and AI integrations.",
  "knowsAbout": ["React", "Node.js", "TypeScript", "PostgreSQL", "AI/LLMs", "Firebase"],
  "offers": {
    "@type": "Offer",
    "description": "Custom web application development",
    "priceRange": "$250 - $10,000+"
  },
  "sameAs": [
    "https://github.com/saifkhan-dev",
    "https://linkedin.com/in/saifkhan"
  ]
}
```

---

## Footer

- **Background:** `bg-[hsl(var(--footer))]` (dark)
- **Content:**
  - DevStudio branding + tagline
  - Navigation quick-links
  - Service quick-links
  - Contact information (email + WhatsApp)
  - Social links: GitHub, LinkedIn, X (Twitter)
  - Legal links: Privacy Policy, Terms of Service
