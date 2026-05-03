import { useEffect } from "react";
import Hero from "@/components/Hero";
import ProjectsGallery from "@/components/ProjectsGallery";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Quote, Star, ArrowRight, Zap, Shield, Clock, HeartHandshake,
  CheckCircle2, ExternalLink
} from "lucide-react";
import {
  SiReact, SiNodedotjs, SiTypescript, SiPostgresql, SiTailwindcss,
  SiNextdotjs, SiMongodb, SiDocker, SiFirebase, SiGraphql,
  SiUpwork, SiFiverr, SiGithub, SiLinkedin, SiX
} from "react-icons/si";

const techStack = [
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiNodedotjs, name: "Node.js", color: "#68A063" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiNextdotjs, name: "Next.js", color: "#000000" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#336791" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#38BDF8" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { icon: SiDocker, name: "Docker", color: "#2496ED" },
  { icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
  { icon: SiGraphql, name: "GraphQL", color: "#E10098" },
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
  { icon: SiGithub, name: "GitHub", desc: "Browse my open-source work and code quality", href: "#", color: "#ffffff" },
  { icon: SiLinkedin, name: "LinkedIn", desc: "Connect, read my posts, and see recommendations", href: "#", color: "#0A66C2" },
  { icon: SiX, name: "Twitter / X", desc: "I build in public — follow my daily progress", href: "#", color: "#ffffff" },
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
      <section id="about" className="py-16 sm:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-primary text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 sm:mb-4">About Me</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground mb-6 sm:mb-8">
                I help businesses build web apps that solve real problems.
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
                I'm a freelance fullstack developer with <strong className="text-foreground">5+ years of experience</strong> building web applications from scratch. I've worked with early-stage startups, growing businesses, and local companies — always focused on clean code and measurable outcomes.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
                I specialize in <strong className="text-foreground">React, Node.js, TypeScript, and PostgreSQL.</strong> For the past <strong className="text-foreground">2 years, I've integrated AI features</strong> into projects — including semantic search, chatbots, content generation, and recommendation engines. I also leverage <strong className="text-foreground">AI-assisted development (vibe coding)</strong> to ship high-quality code faster without cutting corners. I handle everything from database design and API architecture to pixel-perfect frontends and AI capabilities. When you hire me, you talk directly to the developer doing the work — no project managers in the middle.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
                What drives me: I want to build things that genuinely make clients' businesses better — not just pretty apps that sit unused. I price for the result I deliver, not the hours I spend.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {values.map((v, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{v.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/15 blur-[100px] rounded-full" />
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072"
                alt="Developer at work"
                className="relative rounded-2xl border border-border shadow-2xl z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. SKILLS / TECH STACK */}
      <section id="skills" className="py-16 sm:py-24 border-t border-border bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
          >
            <p className="text-primary text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-5">My Skills</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4 sm:mb-5 px-2">Tech Stack</h2>
            <p className="text-sm sm:text-base text-muted-foreground px-2 leading-relaxed">
              Modern, battle-tested technologies I use every day to build production-ready applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-3 sm:gap-4 md:gap-6">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex flex-col items-center gap-2 group"
                data-testid={`badge-tech-${tech.name.toLowerCase()}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300">
                  <tech.icon style={{ color: tech.color }} className="w-7 h-7" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
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
                    <span className="bg-primary text-foreground text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
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
                <p className="text-foreground/85 leading-relaxed flex-1">{t.quote}</p>
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
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
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
      <section id="contact-cta" className="py-20 sm:py-32 relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute -top-[50%] left-[20%] w-[60%] h-[60%] bg-primary/15 blur-[150px] rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold text-foreground mb-4 sm:mb-6 px-2">
              Have a project in mind?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-3 sm:mb-4 max-w-2xl mx-auto px-2">
              Tell me what you're building. I'll get back to you within 24 hours with my thoughts and a rough timeline.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground/70 mb-8 sm:mb-12 px-2">
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
                className="h-16 px-10 text-lg rounded-full border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
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
