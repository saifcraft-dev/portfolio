import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  Github, Linkedin, Twitter, Target, Lightbulb, Clock,
  ArrowRight, CheckCircle2, Zap, Users, Award, Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  SiReact, SiNodedotjs, SiTypescript, SiPostgresql,
  SiTailwindcss, SiNextdotjs, SiFirebase, SiOpenai,
  SiDocker, SiGit,
} from "react-icons/si";

const stats = [
  { icon: Award, value: "7+", label: "Years Experience" },
  { icon: Code2, value: "48+", label: "Projects Delivered" },
  { icon: Users, value: "29+", label: "Happy Clients" },
  { icon: Zap, value: "94%", label: "Satisfaction Rate" },
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

const skills = [
  { icon: SiReact,      name: "React",        color: "#61DAFB" },
  { icon: SiNextdotjs,  name: "Next.js",       color: "#111827" },
  { icon: SiNodedotjs,  name: "Node.js",       color: "#68A063" },
  { icon: SiTypescript, name: "TypeScript",    color: "#3178C6" },
  { icon: SiPostgresql, name: "PostgreSQL",    color: "#336791" },
  { icon: SiTailwindcss,name: "Tailwind CSS",  color: "#38BDF8" },
  { icon: SiFirebase,   name: "Firebase",      color: "#FFCA28" },
  { icon: SiOpenai,     name: "AI / LLMs",     color: "#10A37F" },
  { icon: SiDocker,     name: "Docker",        color: "#2496ED" },
  { icon: SiGit,        name: "Git / CI",      color: "#F05032" },
];

const timeline = [
  { year: "2024–Now", role: "Senior Fullstack + AI Developer", desc: "Building AI-integrated web products — chatbots, semantic search, content engines — for startups globally." },
  { year: "2021–2024", role: "Fullstack Developer", desc: "Led end-to-end development of SaaS platforms and e-commerce products for clients across the US, UK, and Pakistan." },
  { year: "2018–2021", role: "Frontend Developer", desc: "Started with React, grew into full-stack. Delivered 20+ projects ranging from landing pages to complex dashboards." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function About() {
  useEffect(() => {
    document.title = "About Saif Khan — Senior Fullstack Developer | DevStudio";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "7+ years building fast, production-ready web apps. React, Node.js, TypeScript & AI specialist. Direct communication, clean code, on-time delivery.");
  }, []);

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20">
        {/* Background blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -right-20 h-[480px] w-[480px] rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute top-20 -left-16 h-[320px] w-[320px] rounded-full bg-secondary/6 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-[200px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-2xl" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs sm:text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-primary/20">
              About Me
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-foreground mb-5 leading-tight tracking-tight">
              Hi, I'm{" "}
              <span className="text-primary">Saif Khan</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto px-2 mb-8">
              I help startups and businesses build fast, custom web applications that solve real problems and deliver measurable results.
            </p>

            {/* Social links */}
            <div className="flex justify-center gap-3">
              {[
                { href: "#", Icon: Github,   label: "GitHub"   },
                { href: "#", Icon: Linkedin, label: "LinkedIn" },
                { href: "#", Icon: Twitter,  label: "Twitter"  },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>
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

        {/* ── Bio + Photo ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Photo — top on mobile */}
          <motion.div
            className="relative order-first lg:order-last"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -inset-4 bg-primary/12 blur-3xl rounded-full -z-10" />
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-2xl aspect-[4/3] lg:aspect-auto">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072"
                alt="Developer working"
                className="w-full h-full object-cover"
              />
              {/* Floating availability badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-5 bg-background/90 backdrop-blur-md border border-border rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <div>
                  <p className="text-xs font-bold text-foreground leading-none mb-0.5">Available for Projects</p>
                  <p className="text-[10px] text-muted-foreground">Starting June 2026</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-last lg:order-first"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground">My Story</h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p>
                I'm a self-driven fullstack developer with{" "}
                <strong className="text-foreground font-semibold">7+ years of experience</strong>{" "}
                building web applications from scratch. I've worked with early-stage startups, small businesses, and growing companies — always focused on writing clean code that actually solves the problem.
              </p>
              <p>
                I specialize in{" "}
                <strong className="text-foreground font-semibold">React, Node.js, TypeScript, and PostgreSQL</strong>.
                Over the past 2 years, I've integrated AI into production projects — semantic search, chatbots, content generation, and recommendation engines.
              </p>
              <p>
                When you hire me, you're not handing your project off to a project manager.{" "}
                <strong className="text-foreground font-semibold">You talk directly to the developer doing the work.</strong>{" "}
                Fast replies, clear updates, honest timelines.
              </p>
            </div>

            {/* Bullet highlights */}
            <ul className="mt-6 space-y-2.5">
              {[
                "End-to-end fullstack development",
                "AI integration & LLM-powered features",
                "Production-ready, maintainable code",
                "Direct communication, no middlemen",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="rounded-full px-7 h-12 font-bold text-sm sm:text-base shadow-md shadow-primary/20">
                <Link href="/contact">
                  Let's Work Together <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-7 h-12 font-bold text-sm sm:text-base border-border hover:border-primary/40">
                <Link href="/portfolio">View My Work</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* ── How I Work ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-14"
          >
            <div className="flex items-center gap-3 justify-center mb-3">
              <div className="w-1 h-7 bg-primary rounded-full" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground">How I Work</h2>
              <div className="w-1 h-7 bg-primary rounded-full" />
            </div>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              Three principles that guide every project I take on.
            </p>
          </motion.div>

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-14"
          >
            <div className="flex items-center gap-3 justify-center mb-3">
              <div className="w-1 h-7 bg-primary rounded-full" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground">My Core Stack</h2>
              <div className="w-1 h-7 bg-primary rounded-full" />
            </div>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              Technologies I use every day to build production-ready applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-10 gap-3 sm:gap-4">
            {skills.map((s, i) => (
              <motion.div
                key={s.name}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex flex-col items-center gap-2 group cursor-default"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 group-hover:shadow-md transition-all duration-300">
                  <s.icon style={{ color: s.color }} className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <span className="text-[9px] sm:text-[10px] text-muted-foreground text-center font-semibold leading-tight uppercase tracking-wide">
                  {s.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Experience Timeline ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-14"
          >
            <div className="flex items-center gap-3 justify-center mb-3">
              <div className="w-1 h-7 bg-primary rounded-full" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground">Experience</h2>
              <div className="w-1 h-7 bg-primary rounded-full" />
            </div>
          </motion.div>

          <div className="relative max-w-2xl mx-auto">
            {/* Vertical line — hidden on smallest screens */}
            <div className="hidden sm:block absolute left-[120px] top-0 bottom-0 w-px bg-border" />

            <div className="space-y-8 sm:space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-8"
                >
                  {/* Year pill */}
                  <div className="sm:w-[120px] sm:text-right shrink-0">
                    <span className="inline-block bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-primary/20">
                      {item.year}
                    </span>
                  </div>

                  {/* Dot — hidden on mobile */}
                  <div className="hidden sm:flex w-4 shrink-0 items-start justify-center pt-0.5 -ml-2">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-primary bg-background z-10" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-primary/30 transition-colors">
                    <h3 className="font-display font-bold text-foreground text-sm sm:text-base mb-1">{item.role}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
          {/* Decorative blobs inside CTA */}
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
