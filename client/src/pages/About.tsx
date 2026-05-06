import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDarkMode } from "@/hooks/use-dark-mode";
import {
  Github, Linkedin, Twitter, Target, Lightbulb, Clock,
  ArrowRight, CheckCircle2, Zap, Users, Award, Code2,
  MapPin, Mail, MessageSquare, Download, Briefcase,
  Star, Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  SiReact, SiNodedotjs, SiTypescript, SiPostgresql,
  SiTailwindcss, SiNextdotjs, SiFirebase, SiOpenai,
  SiDocker, SiGit, SiMongodb, SiGraphql,
} from "react-icons/si";

const stats = [
  { icon: Award,  value: "7+",  label: "Years Experience" },
  { icon: Code2,  value: "48+", label: "Projects Delivered" },
  { icon: Users,  value: "29+", label: "Happy Clients" },
  { icon: Zap,    value: "94%", label: "Satisfaction Rate" },
];

const pillars = [
  {
    icon: Target,
    title: "Results First",
    desc: "I care about the outcome — not just shipping code. Every project has a clear success metric we agree on upfront.",
    highlights: ["Clear KPIs from day one", "Outcome-driven sprints"],
  },
  {
    icon: Lightbulb,
    title: "Clean Code",
    desc: "I write code your team can maintain and extend. No black boxes, no technical debt left behind.",
    highlights: ["Typed, documented codebase", "Scalable architecture"],
  },
  {
    icon: Clock,
    title: "On Time, Always",
    desc: "I work in focused sprints with weekly demos. You see real progress every week — not just at the end.",
    highlights: ["Weekly demos & updates", "Honest, realistic timelines"],
  },
];

const stackGroups = [
  {
    label: "Frontend",
    color: "text-blue-500",
    bg: "bg-blue-500/8",
    skills: [
      { icon: SiReact,       name: "React",       color: "#61DAFB" },
      { icon: SiNextdotjs,   name: "Next.js",     color: "#111827" },
      { icon: SiTypescript,  name: "TypeScript",  color: "#3178C6" },
      { icon: SiTailwindcss, name: "Tailwind",    color: "#38BDF8" },
    ],
  },
  {
    label: "Backend & DB",
    color: "text-emerald-500",
    bg: "bg-emerald-500/8",
    skills: [
      { icon: SiNodedotjs,  name: "Node.js",    color: "#68A063" },
      { icon: SiPostgresql, name: "PostgreSQL",  color: "#336791" },
      { icon: SiMongodb,    name: "MongoDB",     color: "#47A248" },
      { icon: SiGraphql,    name: "GraphQL",     color: "#E10098" },
    ],
  },
  {
    label: "AI & Cloud",
    color: "text-violet-500",
    bg: "bg-violet-500/8",
    skills: [
      { icon: SiOpenai,    name: "AI / LLMs",  color: "#10A37F" },
      { icon: SiFirebase,  name: "Firebase",   color: "#FFCA28" },
      { icon: SiDocker,    name: "Docker",     color: "#2496ED" },
      { icon: SiGit,       name: "Git / CI",   color: "#F05032" },
    ],
  },
];

const timeline = [
  {
    year: "2026–Now",
    role: "Senior Fullstack + AI Developer",
    type: "Freelance / Remote",
    desc: "Building AI-integrated web products — chatbots, semantic search, content engines — for startups globally.",
    tags: ["AI", "React", "Node.js", "LLMs"],
  },
  {
    year: "2021–2026",
    role: "Fullstack Developer",
    type: "Contract",
    desc: "Led end-to-end development of SaaS platforms and e-commerce products for clients across the US, UK, and Pakistan.",
    tags: ["SaaS", "E-Commerce", "PostgreSQL"],
  },
  {
    year: "2018–2021",
    role: "Frontend Developer",
    type: "Agency",
    desc: "Started with React, grew into full-stack. Delivered 20+ projects ranging from landing pages to complex dashboards.",
    tags: ["React", "TypeScript", "Dashboards"],
  },
];

const testimonials = [
  {
    name: "James Carter",
    role: "CEO, LaunchPad SaaS",
    avatar: "JC",
    color: "bg-blue-500",
    text: "Saif delivered our entire platform in 6 weeks — clean code, no bugs at launch, and communicated every step. Best hire we've made.",
    stars: 5,
  },
  {
    name: "Priya Mehta",
    role: "Founder, ShopFlow",
    avatar: "PM",
    color: "bg-violet-500",
    text: "We needed an AI chatbot integrated into our e-commerce site fast. Saif had it live in 10 days. Responsive, professional, and incredibly skilled.",
    stars: 5,
  },
  {
    name: "Lucas Brennan",
    role: "CTO, DataNest",
    avatar: "LB",
    color: "bg-emerald-500",
    text: "Rarely do you find a developer who understands both the technical and business side. Saif ships quality code and actually cares about the outcome.",
    stars: 5,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

function SectionHeading({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-10 sm:mb-14"
    >
      <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
        {label}
      </span>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground mb-3">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">{subtitle}</p>}
    </motion.div>
  );
}

export default function About() {
  const isDark = useDarkMode();
  useEffect(() => {
    document.title = "About Saif Khan — Senior Fullstack Developer | SaifCraft";
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        "content",
        "7+ years building fast, production-ready web apps. React, Node.js, TypeScript & AI specialist. Direct communication, clean code, on-time delivery."
      );
  }, []);

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-0 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -right-20 h-[520px] w-[520px] rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute top-20 -left-16 h-[320px] w-[320px] rounded-full bg-secondary/6 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pb-16 sm:pb-20">

            {/* ── Left: Text ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full mb-5">
                About Me
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 leading-tight tracking-tight">
                Hi, I'm{" "}
                <span className="text-primary">Saif Khan</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-lg">
                Senior Fullstack Developer with <strong className="text-foreground font-semibold">7+ years</strong> building fast, production-ready web apps for startups and growing businesses worldwide.
              </p>

              <ul className="space-y-2.5 mb-8">
                {[
                  "End-to-end fullstack development",
                  "AI integration & LLM-powered features",
                  "Production-ready, maintainable code",
                  "Direct communication, no middlemen",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 mb-8">
                <Button asChild size="lg" className="rounded-full px-7 h-11 font-bold shadow-md shadow-primary/20">
                  <Link href="/contact">
                    Hire Me <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-7 h-11 font-bold border-border hover:border-primary/40">
                  <Link href="/portfolio">View My Work</Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="rounded-full px-5 h-11 font-bold text-muted-foreground hover:text-foreground">
                  <a href="#" aria-label="Download Resume">
                    <Download className="mr-2 w-4 h-4" /> Resume
                  </a>
                </Button>
              </div>

              <div className="flex items-center gap-3">
                {[
                  { href: "#", Icon: Github,   label: "GitHub"   },
                  { href: "#", Icon: Linkedin, label: "LinkedIn" },
                  { href: "#", Icon: Twitter,  label: "Twitter"  },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* ── Right: Photo + Profile Card ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-5"
            >
              {/* Photo */}
              <div className="relative">
                <div className="absolute -inset-3 bg-primary/10 blur-3xl rounded-full -z-10" />
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-2xl aspect-[3/4]">
                  <img
                    src="https://res.cloudinary.com/de2wrwg6e/image/upload/v1778029685/ChatGPT_Image_May_6_2026_06_07_30_AM_wgfcfr.png"
                    alt="Saif Khan — Senior Fullstack Developer"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />

                  {/* Availability badge */}
                  <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-4 sm:w-auto bg-background/95 backdrop-blur-md border border-border/60 rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-foreground leading-none">Available for Projects</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Starting June 2026</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick-info card */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: MapPin,        label: "Location",      value: "Remote — Global" },
                  { icon: Clock,         label: "Response Time",  value: "< 24 hours" },
                  { icon: Briefcase,     label: "Experience",     value: "7+ Years" },
                  { icon: MessageSquare, label: "Communication",  value: "Direct & Clear" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{label}</p>
                      <p className="text-xs font-semibold text-foreground truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="border-y border-border bg-card">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-border">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 py-6 sm:py-8 px-4 sm:px-8"
              >
                <div className="p-2 bg-primary/10 rounded-xl shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-2xl sm:text-3xl font-display font-bold text-primary leading-none mb-0.5">{value}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">{label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl py-14 sm:py-20 space-y-20 sm:space-y-28">

        {/* ── My Story ── */}
        <div>
          <SectionHeading label="Background" title="My Story" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p>
                I'm a self-driven fullstack developer with <strong className="text-foreground font-semibold">7+ years of experience</strong> building web applications from scratch. I've worked with early-stage startups, small businesses, and growing companies — always focused on writing clean code that actually solves the problem.
              </p>
              <p>
                I specialize in <strong className="text-foreground font-semibold">React, Node.js, TypeScript, and PostgreSQL</strong>. Over the past 2 years, I've integrated AI into production projects — semantic search, chatbots, content generation, and recommendation engines.
              </p>
              <p>
                When you hire me, you're not handing your project off to a project manager. <strong className="text-foreground font-semibold">You talk directly to the developer doing the work.</strong> Fast replies, clear updates, honest timelines.
              </p>
            </div>

            {/* Side card: what I can help with */}
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">What I can help with</p>
              <ul className="space-y-2.5">
                {[
                  "Custom Web Applications",
                  "SaaS Product Development",
                  "AI / LLM Integrations",
                  "E-Commerce Platforms",
                  "API Design & Integration",
                  "Performance Optimization",
                  "Technical Consulting",
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full rounded-xl h-10 font-semibold">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" /> Start a Project
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ── How I Work ── */}
        <div>
          <SectionHeading
            label="Process"
            title="How I Work"
            subtitle="Three principles that guide every project I take on."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card border border-border rounded-2xl p-6 sm:p-7 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-display font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4">{p.desc}</p>
                <ul className="space-y-1.5">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Tech Stack ── */}
        <div>
          <SectionHeading
            label="Skills"
            title="My Core Stack"
            subtitle="Technologies I use every day to build production-ready applications."
          />
          <div className="space-y-6">
            {stackGroups.map((group, gi) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gi * 0.1 }}
                className="bg-card border border-border rounded-2xl p-5 sm:p-6"
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${group.color} ${group.bg} border-current/20`}>
                    {group.label}
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 gap-4">
                  {group.skills.map((s, i) => (
                    <motion.div
                      key={s.name}
                      custom={i}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      className="flex items-center gap-3 group cursor-default"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-background border border-border flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 group-hover:shadow-sm transition-all duration-300 flex-shrink-0">
                        <s.icon style={{ color:
                          (s.name === "Next.js" || s.name === "Vercel") ? (isDark ? "#ffffff" : "#111827") :
                          s.name === "Prisma" ? (isDark ? "#cbd5e0" : "#2D3748") :
                          s.name === "PostgreSQL" ? (isDark ? "#76b5e8" : "#336791") :
                          s.color
                        }} className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-xs font-semibold text-foreground hidden sm:block">{s.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Experience Timeline ── */}
        <div>
          <SectionHeading label="Career" title="Experience" />

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line — sits between left col and right col on desktop */}
            <div className="hidden sm:block absolute left-[172px] top-2 bottom-2 w-px bg-border z-0" />

            <div className="space-y-8 sm:space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-0"
                >
                  {/* Left: year + type */}
                  <div className="sm:w-[160px] shrink-0 flex sm:flex-col sm:items-end sm:pr-6 gap-2 sm:gap-1.5 sm:pt-1">
                    <span className="inline-block bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {item.year}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-medium">{item.type}</span>
                  </div>

                  {/* Dot — centered on the line */}
                  <div className="hidden sm:flex w-[24px] shrink-0 items-start justify-center pt-2 z-10">
                    <div className="w-4 h-4 rounded-full border-2 border-primary bg-background shadow-sm" />
                  </div>

                  {/* Right: card */}
                  <div className="flex-1 sm:pl-6">
                    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300">
                      <h3 className="font-display font-bold text-foreground text-sm sm:text-base mb-2">
                        {item.role}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4">{item.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-block bg-primary text-primary-foreground text-[11px] font-semibold px-3 py-1 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div>
          <SectionHeading
            label="Social Proof"
            title="What Clients Say"
            subtitle="Real feedback from people I've worked with."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 flex flex-col"
              >
                <Quote className="w-6 h-6 text-primary/30 mb-4 shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className={`h-9 w-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5 flex-shrink-0">
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <Star key={si} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-primary px-6 sm:px-12 py-12 sm:py-16 text-center"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/8 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/6 blur-2xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white mb-4">
              Ready to work together?
            </h2>
            <p className="text-white/75 mb-8 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
              Tell me about your project and I'll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="rounded-full px-8 h-12 sm:h-14 text-sm sm:text-base font-bold bg-white text-primary hover:bg-white/90 shadow-lg border-0"
                asChild
              >
                <Link href="/contact">
                  Get in Touch <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-12 sm:h-14 text-sm sm:text-base font-bold text-white border-white/30 hover:bg-white/10 hover:border-white/50 bg-transparent"
                asChild
              >
                <Link href="/portfolio">See My Work</Link>
              </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
