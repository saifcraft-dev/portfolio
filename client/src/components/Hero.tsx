import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Zap, Shield, Clock, Star, Code2, Globe, Layers } from "lucide-react";

const highlights = [
  { icon: Zap, text: "Fast Delivery" },
  { icon: Shield, text: "Clean Code" },
  { icon: Clock, text: "On Time & On Budget" },
];

const techBadges = ["React", "Node.js", "TypeScript", "PostgreSQL", "AI / LLMs"];

const stats = [
  { label: "Projects Delivered", value: "50+" },
  { label: "Happy Clients", value: "30+" },
  { label: "Years Experience", value: "5+" },
  { label: "Satisfaction Rate", value: "99%" },
];

const floatingCards = [
  {
    icon: Globe,
    title: "Web Applications",
    desc: "Full-stack, production-ready",
    color: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-500",
    delay: 0.6,
  },
  {
    icon: Layers,
    title: "Clean Architecture",
    desc: "Scalable & maintainable",
    color: "from-emerald-500/20 to-green-500/10",
    iconColor: "text-emerald-500",
    delay: 0.75,
  },
  {
    icon: Code2,
    title: "Modern Stack",
    desc: "React, Node, TypeScript",
    color: "from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-500",
    delay: 0.9,
  },
];

export default function Hero() {
  return (
    <section className="relative pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24 lg:pb-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[15%] right-0 w-[55%] h-[70%] bg-primary/10 blur-[140px] rounded-full" />
        <div className="absolute top-[50%] -left-[5%] w-[40%] h-[50%] bg-secondary/8 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] left-[40%] w-[30%] h-[40%] bg-primary/6 blur-[100px] rounded-full" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT: Content */}
          <div className="flex flex-col items-start text-left">
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                Available for New Projects
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] tracking-tight mb-6"
            >
              I build{" "}
              <span className="relative">
                <span className="text-gradient-primary">fast, custom</span>
              </span>{" "}
              <br className="hidden sm:block" />
              web apps that{" "}
              <span className="relative inline-block">
                <span className="relative z-10">deliver results.</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/15 -skew-x-2 rounded" />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl"
            >
              Senior fullstack developer with{" "}
              <strong className="text-foreground font-semibold">5+ years of experience</strong>{" "}
              helping startups and businesses turn ideas into polished, production-ready web applications — on time, within budget.
            </motion.p>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {highlights.map((h, i) => (
                <div
                  key={h.text}
                  className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm font-medium text-foreground shadow-sm"
                >
                  <h.icon className="w-3.5 h-3.5 text-primary" />
                  {h.text}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10 w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg rounded-full group btn-cta border-0 shadow-lg shadow-primary/25"
                asChild
              >
                <Link href="/contact">
                  <span className="flex items-center justify-center gap-2">
                    Hire Me
                    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg rounded-full border-border hover:bg-muted/60 transition-all"
                asChild
              >
                <Link href="/portfolio">View My Work</Link>
              </Button>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="text-xs text-muted-foreground/60 font-semibold uppercase tracking-widest mr-1">
                Stack:
              </span>
              {techBadges.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono bg-primary/8 text-primary/80 border border-primary/15 rounded-md px-2.5 py-1"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Visual Panel */}
          <div className="relative hidden lg:flex flex-col gap-4 items-end">
            {/* Main card */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-xl shadow-primary/5 overflow-hidden"
            >
              {/* Card header */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border px-5 py-4 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <span className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <span className="text-xs text-muted-foreground font-mono">project.tsx</span>
              </div>
              {/* Code snippet */}
              <div className="px-5 py-5 font-mono text-xs leading-6 space-y-0.5">
                <p><span className="text-violet-500">const</span> <span className="text-blue-400">project</span> <span className="text-foreground/60">=</span> <span className="text-foreground/60">{"{"}</span></p>
                <p className="pl-4"><span className="text-emerald-500">name</span><span className="text-foreground/60">:</span> <span className="text-amber-500">"Your Dream App"</span><span className="text-foreground/60">,</span></p>
                <p className="pl-4"><span className="text-emerald-500">quality</span><span className="text-foreground/60">:</span> <span className="text-amber-500">"production-ready"</span><span className="text-foreground/60">,</span></p>
                <p className="pl-4"><span className="text-emerald-500">delivery</span><span className="text-foreground/60">:</span> <span className="text-amber-500">"on-time"</span><span className="text-foreground/60">,</span></p>
                <p className="pl-4"><span className="text-emerald-500">budget</span><span className="text-foreground/60">:</span> <span className="text-amber-500">"within-scope"</span><span className="text-foreground/60">,</span></p>
                <p className="pl-4"><span className="text-emerald-500">satisfaction</span><span className="text-foreground/60">:</span> <span className="text-blue-400">99</span><span className="text-foreground/60">,</span></p>
                <p><span className="text-foreground/60">{"}"}</span></p>
                <p className="pt-2"><span className="text-muted-foreground/50">{"// Ready to build yours?"}</span></p>
              </div>
            </motion.div>

            {/* Floating feature cards */}
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: card.delay }}
                className={`flex items-center gap-3 bg-gradient-to-r ${card.color} border border-border backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm self-${i % 2 === 0 ? "end" : "start"} max-w-[280px]`}
              >
                <div className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center shrink-0 shadow-sm">
                  <card.icon className={`w-4 h-4 ${card.iconColor}`} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground leading-tight">{card.title}</div>
                  <div className="text-xs text-muted-foreground">{card.desc}</div>
                </div>
              </motion.div>
            ))}

            {/* Star rating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2.5 shadow-md self-start"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-foreground">5.0</span>
              <span className="text-xs text-muted-foreground">· 30+ clients</span>
            </motion.div>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
