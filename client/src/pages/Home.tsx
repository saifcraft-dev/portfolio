import { useEffect } from "react";
import Hero from "@/components/Hero";
import ProjectsGallery from "@/components/ProjectsGallery";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Quote, Star, ArrowRight, Zap, Shield, Clock, HeartHandshake,
  ExternalLink
} from "lucide-react";
import {
  SiReact, SiNodedotjs, SiTypescript, SiPostgresql, SiTailwindcss,
  SiNextdotjs, SiMongodb, SiDocker, SiFirebase, SiGraphql,
  SiGithub, SiLinkedin, SiX, SiRedis, SiPrisma, SiVercel,
  SiGit, SiOpenai
} from "react-icons/si";

const skillCategories = [
  {
    label: "Frontend",
    color: "from-blue-500/15 to-cyan-500/5",
    border: "border-blue-500/20",
    dot: "bg-blue-500",
    skills: [
      { icon: SiReact, name: "React", color: "#61DAFB", level: "Expert" },
      { icon: SiNextdotjs, name: "Next.js", color: "#111827", level: "Expert" },
      { icon: SiTypescript, name: "TypeScript", color: "#3178C6", level: "Expert" },
      { icon: SiTailwindcss, name: "Tailwind CSS", color: "#38BDF8", level: "Expert" },
    ],
  },
  {
    label: "Backend",
    color: "from-emerald-500/15 to-green-500/5",
    border: "border-emerald-500/20",
    dot: "bg-emerald-500",
    skills: [
      { icon: SiNodedotjs, name: "Node.js", color: "#68A063", level: "Expert" },
      { icon: SiGraphql, name: "GraphQL", color: "#E10098", level: "Advanced" },
      { icon: SiPrisma, name: "Prisma", color: "#2D3748", level: "Advanced" },
      { icon: SiFirebase, name: "Firebase", color: "#FFCA28", level: "Advanced" },
    ],
  },
  {
    label: "Database",
    color: "from-violet-500/15 to-purple-500/5",
    border: "border-violet-500/20",
    dot: "bg-violet-500",
    skills: [
      { icon: SiPostgresql, name: "PostgreSQL", color: "#336791", level: "Expert" },
      { icon: SiMongodb, name: "MongoDB", color: "#47A248", level: "Expert" },
      { icon: SiRedis, name: "Redis", color: "#DC382D", level: "Advanced" },
    ],
  },
  {
    label: "DevOps & Tools",
    color: "from-orange-500/15 to-amber-500/5",
    border: "border-orange-500/20",
    dot: "bg-orange-500",
    skills: [
      { icon: SiDocker, name: "Docker", color: "#2496ED", level: "Advanced" },
      { icon: SiVercel, name: "Vercel", color: "#111827", level: "Expert" },
      { icon: SiGit, name: "Git", color: "#F05032", level: "Expert" },
    ],
  },
  {
    label: "AI / LLMs",
    color: "from-pink-500/15 to-rose-500/5",
    border: "border-pink-500/20",
    dot: "bg-pink-500",
    skills: [
      { icon: SiOpenai, name: "OpenAI API", color: "#10A37F", level: "Advanced" },
    ],
  },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Founder, MedBook",
    quote: "He built our patient booking system in 6 weeks. It reduced our front-desk workload by 60% and the code is clean enough that our own team can maintain it. Best investment we made.",
    stars: 5,
  },
  {
    name: "James Okonkwo",
    role: "CEO, ShopLocal",
    quote: "He replaced our Shopify store with a custom solution that loads 3x faster. We eliminated $300/month in fees and our conversion rate went up by 22%. I wish I'd done this sooner.",
    stars: 5,
  },
  {
    name: "Priya Sharma",
    role: "CTO, LaunchPad SaaS",
    quote: "We went from idea to working MVP in under 8 weeks. He communicated clearly throughout, hit every milestone, and the code quality blew our in-house team away.",
    stars: 5,
  },
];

const values = [
  { icon: Zap, title: "Fast Delivery", desc: "I work in focused sprints so you get a working product quickly — not months from now." },
  { icon: Shield, title: "Clean Code", desc: "I write maintainable, well-documented code your team can confidently take over." },
  { icon: Clock, title: "On Time & On Budget", desc: "Fixed-scope projects. No surprise invoices. No scope creep without your approval." },
  { icon: HeartHandshake, title: "Clear Communication", desc: "You'll always know exactly where your project stands. I reply within hours, not days." },
];

const platforms = [
  { icon: SiGithub, name: "GitHub", desc: "Browse my open-source work and code quality", href: "#", color: "#1a1a2e" },
  { icon: SiLinkedin, name: "LinkedIn", desc: "Connect, read my posts, and see recommendations", href: "#", color: "#0A66C2" },
  { icon: SiX, name: "Twitter / X", desc: "I build in public — follow my daily progress", href: "#", color: "#1a1a2e" },
];

const servicePreview = [
  { name: "Landing Page", price: "$250 – $600", time: "5–7 days", desc: "Fully responsive, SEO-optimised, with contact form and CTA." },
  { name: "Business Website", price: "$700 – $1,800", time: "2–3 weeks", desc: "5–8 pages, Google Analytics, maps, mobile-first.", highlight: false },
  { name: "Custom Web App", price: "$2,500 – $10,000+", time: "4–8 weeks", desc: "React + Node.js + PostgreSQL, auth, admin panel, deployed.", highlight: true },
  { name: "AI Feature Add-On", price: "$600 – $4,000", time: "1–3 weeks", desc: "Chatbot, semantic search, AI generation — added to any app." },
  { name: "Monthly Retainer", price: "$250 – $1,000/mo", time: "Ongoing", desc: "Bug fixes, updates, monitoring, priority response time." },
];

export default function Home() {
  useEffect(() => {
    document.title = "Saif Khan — Freelance Fullstack Developer | DevStudio | React · Node.js · TypeScript";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "I'm Saif Khan, a freelance fullstack developer. I help startups and businesses build fast, custom web applications — on time, within budget, with clean code you can maintain.");
  }, []);

  return (
    <div className="min-h-screen bg-background">

      {/* 1. HERO */}
      <Hero />

      {/* 2. ABOUT — inline per guide */}
      <section id="about" className="py-10 sm:py-16 border-t border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 lg:items-start">

            {/* RIGHT: Profile card — shown FIRST on mobile, second on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="order-first lg:order-last lg:col-span-2 flex flex-col gap-3"
            >
              {/* Profile + stats card */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="relative h-20 sm:h-24 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/10 overflow-hidden">
                  <div className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
                    alt="Developer at work"
                    className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
                  />
                </div>
                <div className="px-4 pb-4 pt-3">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-display font-bold text-foreground text-base leading-tight">Saif Khan</h3>
                      <p className="text-xs text-muted-foreground">Senior Fullstack Developer</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[11px] font-semibold rounded-full px-2.5 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      Available
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                    {[
                      { value: "7+", label: "Yrs Exp." },
                      { value: "50+", label: "Projects" },
                      { value: "99%", label: "Satisfaction" },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="text-base font-display font-bold text-foreground">{s.value}</div>
                        <div className="text-[11px] text-muted-foreground">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specializations */}
              <div className="bg-card border border-border rounded-2xl p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Specializations</p>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: "React / Next.js Frontends", pct: 95 },
                    { label: "Node.js APIs & Backends", pct: 92 },
                    { label: "AI Feature Integration", pct: 85 },
                    { label: "Database Design", pct: 88 },
                  ].map((skill, i) => (
                    <motion.div
                      key={skill.label}
                      initial={{ opacity: 0, x: 8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.06 }}
                    >
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="font-medium text-foreground">{skill.label}</span>
                        <span className="text-muted-foreground">{skill.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick facts — 2×2 */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Based in", value: "Remote — Global" },
                  { label: "Response time", value: "< 24 hours" },
                  { label: "Contract type", value: "Fixed-scope" },
                  { label: "AI-ready", value: "Yes — LLMs & RAG" },
                ].map((fact) => (
                  <div key={fact.label} className="bg-card border border-border rounded-xl px-3 py-2.5">
                    <p className="text-[10px] text-muted-foreground mb-0.5">{fact.label}</p>
                    <p className="text-xs font-semibold text-foreground leading-snug">{fact.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* LEFT: Headline + text + values */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-last lg:order-first lg:col-span-3 flex flex-col gap-5"
            >
              <div>
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">About Me</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground leading-[1.15] mb-3">
                  I help businesses build web apps that{" "}
                  <span className="text-gradient-primary">solve real problems.</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Senior fullstack developer. Direct communication. Results you can measure.
                </p>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                I'm a freelance fullstack developer with{" "}
                <strong className="text-foreground">7+ years of experience</strong> building web apps from scratch —{" "}
                specializing in <strong className="text-foreground">React, Node.js, TypeScript & PostgreSQL.</strong>{" "}
                For the past <strong className="text-foreground">2 years I've integrated AI features</strong> into real products: chatbots, semantic search, content generation. You talk directly to the developer, not a project manager.
              </p>

              {/* Value cards — 1 col on mobile, 2 col on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {values.map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
                    className="flex items-start gap-3 bg-card border border-border rounded-xl p-3 hover:border-primary/30 hover:bg-primary/3 transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <v.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground mb-0.5">{v.title}</p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{v.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div>
                <Button
                  variant="outline"
                  className="rounded-full border-border hover:border-primary/50 hover:bg-primary/5 group text-sm w-full sm:w-auto"
                  asChild
                >
                  <Link href="/about">
                    <span className="flex items-center justify-center sm:justify-start gap-2">
                      Read My Full Story
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. SKILLS / TECH STACK */}
      <section id="skills" className="py-10 sm:py-16 border-t border-border bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-4 mb-6 sm:mb-8"
          >
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1.5">My Skills</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                Tech Stack & Expertise
              </h2>
            </div>
            <p className="text-sm text-muted-foreground sm:text-right sm:max-w-xs leading-relaxed">
              Battle-tested tools I use daily to build fast, scalable, production-ready apps.
            </p>
          </motion.div>

          {/* Category rows */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
            {skillCategories.map((cat, ci) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.06, duration: 0.4 }}
                className="px-4 sm:px-5 py-3 sm:py-3.5 hover:bg-muted/30 transition-colors duration-150"
              >
                {/* Mobile: label row */}
                <div className="flex items-center gap-2 mb-2 sm:hidden">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${cat.dot}`} />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    {cat.label}
                  </span>
                </div>

                {/* Desktop: side-by-side / Mobile: chips indented */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  {/* Desktop-only label */}
                  <div className="hidden sm:flex items-center gap-2 w-36 shrink-0">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${cat.dot}`} />
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                      {cat.label}
                    </span>
                  </div>

                  {/* Skill chips — indented on mobile */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pl-4 sm:pl-0">
                    {cat.skills.map((tech) => (
                      <div
                        key={tech.name}
                        className="inline-flex items-center gap-1.5 bg-background border border-border rounded-lg px-2.5 py-1.5 hover:border-primary/40 hover:bg-primary/5 transition-all duration-150 cursor-default"
                        data-testid={`badge-tech-${tech.name.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <tech.icon style={{ color: tech.color }} className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-xs font-medium text-foreground">{tech.name}</span>
                        <span className={`text-[10px] font-semibold ml-0.5 ${
                          tech.level === "Expert" ? "text-primary" : "text-secondary"
                        }`}>
                          {tech.level === "Expert" ? "★" : "◆"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Legend + stats row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mt-4 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4"
          >
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="text-primary font-bold">★</span> Expert
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-secondary font-bold">◆</span> Advanced
              </span>
            </div>
            <div className="grid grid-cols-3 sm:flex sm:items-center sm:gap-6 bg-card sm:bg-transparent border sm:border-0 border-border rounded-xl sm:rounded-none px-4 sm:px-0 py-3 sm:py-0">
              {[
                { value: "7+", label: "Yrs Exp." },
                { value: "18+", label: "Technologies" },
                { value: "50+", label: "Apps Shipped" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-sm font-display font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. PROJECTS */}
      <ProjectsGallery />

      {/* 5. SERVICES PREVIEW */}
      <section id="services" className="py-16 sm:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
          >
            <p className="text-primary text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-5">What I Offer</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4 sm:mb-5 px-2">Services & Pricing</h2>
            <p className="text-sm sm:text-base text-muted-foreground px-2 leading-relaxed">
              Fixed-scope packages. Clear deliverables. Transparent prices. No hourly surprises.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {servicePreview.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl border p-6 flex flex-col gap-3 transition-colors ${
                  s.highlight
                    ? "border-primary/60 bg-primary/5 relative"
                    : "border-border bg-card hover:border-primary/30"
                }`}
                data-testid={`card-service-preview-${i}`}
              >
                {s.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                <h3 className="font-display font-bold text-foreground text-sm">{s.name}</h3>
                <p className="text-primary font-bold text-lg leading-tight">{s.price}</p>
                <p className="text-xs text-muted-foreground">{s.time}</p>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" className="rounded-full border-border text-muted-foreground hover:text-foreground hover:border-primary/50 group" asChild>
              <Link href="/services">
                <span className="flex items-center gap-2">
                  View Full Packages & Details
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section id="testimonials" className="py-16 sm:py-24 bg-card/40 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
          >
            <p className="text-primary text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-5">Social Proof</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4 sm:mb-5 px-2">What Clients Say</h2>
            <p className="text-sm sm:text-base text-muted-foreground px-2 leading-relaxed">
              Results-focused testimonials — not just "great work." Real problems solved, real outcomes delivered.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="bg-card border border-border rounded-2xl p-8 flex flex-col gap-6 hover:border-primary/30 transition-colors"
                data-testid={`card-testimonial-${i}`}
              >
                <Quote className="w-8 h-8 text-primary/40" />
                <p className="text-foreground leading-relaxed flex-1">{t.quote}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{t.role}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-[hsl(var(--cta))] text-[hsl(var(--cta))]" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PLATFORMS — Find me on */}
      <section id="platforms" className="py-16 sm:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
          >
            <p className="text-primary text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-5">Find Me Online</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4 sm:mb-5 px-2">Where to Hire or Follow Me</h2>
            <p className="text-sm sm:text-base text-muted-foreground px-2 leading-relaxed">
              Whether you prefer a platform with built-in protection or a direct hire — I'm available on all major channels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {platforms.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-6 flex flex-col items-start gap-4 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group"
                data-testid={`link-platform-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <p.icon style={{ color: p.color }} className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm mb-1 flex items-center gap-1">
                    {p.name}
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section id="contact-cta" className="py-20 sm:py-32 relative overflow-hidden border-t border-border bg-[hsl(var(--footer))]">
        <div className="absolute -top-[50%] left-[20%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6 px-2">
              Have a project in mind?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-3 sm:mb-4 max-w-2xl mx-auto px-2">
              Tell me what you're building. I'll get back to you within 24 hours with my thoughts and a rough timeline.
            </p>
            <p className="text-xs sm:text-sm text-white/60 mb-8 sm:mb-12 px-2">
              50% upfront · Fixed-scope contract · 30-day post-launch support
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="btn-cta border-0 text-lg h-16 px-12 rounded-full shadow-lg shadow-orange-900/20 group"
                asChild
              >
                <Link href="/contact">
                  <span className="flex items-center gap-2">
                    Let's Work Together
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-16 px-10 text-lg rounded-full border-white/20 text-white/80 hover:text-white hover:border-white/50 hover:bg-white/10"
                asChild
              >
                <Link href="/faq">Read the FAQ</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
