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
    delay: 0.5,
  },
  {
    icon: Layers,
    title: "Clean Architecture",
    desc: "Scalable & maintainable",
    color: "from-emerald-500/20 to-green-500/10",
    iconColor: "text-emerald-500",
    delay: 0.65,
  },
  {
    icon: Code2,
    title: "Modern Stack",
    desc: "React, Node, TypeScript",
    color: "from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-500",
    delay: 0.8,
  },
];

export default function Hero() {
  return (
    <section className="relative pt-8 sm:pt-12 pb-10 sm:pb-14 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[15%] right-0 w-[55%] h-[70%] bg-primary/10 blur-[140px] rounded-full" />
        <div className="absolute top-[50%] -left-[5%] w-[40%] h-[50%] bg-secondary/8 blur-[120px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* LEFT: Content */}
          <div className="flex flex-col items-start text-left">
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-primary/8 border border-primary/20 rounded-full px-3.5 py-1.5 mb-4"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-semibold text-primary tracking-widest uppercase">
                Available for New Projects
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-display font-bold leading-[1.1] tracking-tight mb-4"
            >
              I build{" "}
              <span className="text-gradient-primary">fast, custom</span>{" "}
              <br className="hidden sm:block" />
              web apps that{" "}
              <span className="relative inline-block">
                <span className="relative z-10">deliver results.</span>
                <span className="absolute bottom-1 left-0 w-full h-2.5 bg-primary/12 -skew-x-2 rounded" />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-sm sm:text-base text-muted-foreground mb-5 leading-relaxed max-w-lg"
            >
              Senior fullstack developer with{" "}
              <strong className="text-foreground font-semibold">5+ years of experience</strong>{" "}
              helping startups and businesses turn ideas into polished, production-ready web applications — on time, within budget.
            </motion.p>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.24 }}
              className="flex flex-wrap gap-2 mb-5"
            >
              {highlights.map((h) => (
                <div
                  key={h.text}
                  className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-1.5 text-xs font-medium text-foreground shadow-sm"
                >
                  <h.icon className="w-3 h-3 text-primary" />
                  {h.text}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-6 w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="h-11 px-7 text-sm rounded-full group btn-cta border-0 shadow-md shadow-primary/20"
                asChild
              >
                <Link href="/contact">
                  <span className="flex items-center justify-center gap-2">
                    Hire Me
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 px-7 text-sm rounded-full border-border hover:bg-muted/60 transition-all"
                asChild
              >
                <Link href="/portfolio">View My Work</Link>
              </Button>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-1.5"
            >
              <span className="text-[10px] text-muted-foreground/60 font-semibold uppercase tracking-widest mr-1">
                Stack:
              </span>
              {techBadges.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono bg-primary/8 text-primary/80 border border-primary/15 rounded-md px-2 py-0.5"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Visual Panel */}
          <div className="relative hidden lg:flex flex-col gap-3 items-end">
            {/* Main code card */}
            <motion.div
              initial={{ opacity: 0, x: 24, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="w-full max-w-xs bg-card border border-border rounded-2xl shadow-xl shadow-primary/5 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border px-4 py-3 flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                </div>
                <span className="text-xs text-muted-foreground font-mono">project.tsx</span>
              </div>
              <div className="px-4 py-4 font-mono text-[11px] leading-5 space-y-0.5">
                <p><span className="text-violet-500">const</span> <span className="text-blue-400">project</span> <span className="text-foreground/60">=</span> <span className="text-foreground/60">{"{"}</span></p>
                <p className="pl-4"><span className="text-emerald-500">name</span><span className="text-foreground/60">:</span> <span className="text-amber-500">"Your Dream App"</span><span className="text-foreground/60">,</span></p>
                <p className="pl-4"><span className="text-emerald-500">quality</span><span className="text-foreground/60">:</span> <span className="text-amber-500">"production-ready"</span><span className="text-foreground/60">,</span></p>
                <p className="pl-4"><span className="text-emerald-500">delivery</span><span className="text-foreground/60">:</span> <span className="text-amber-500">"on-time"</span><span className="text-foreground/60">,</span></p>
                <p className="pl-4"><span className="text-emerald-500">budget</span><span className="text-foreground/60">:</span> <span className="text-amber-500">"within-scope"</span><span className="text-foreground/60">,</span></p>
                <p className="pl-4"><span className="text-emerald-500">satisfaction</span><span className="text-foreground/60">:</span> <span className="text-blue-400">99</span><span className="text-foreground/60">,</span></p>
                <p><span className="text-foreground/60">{"}"}</span></p>
                <p className="pt-1.5"><span className="text-muted-foreground/50">{"// Ready to build yours?"}</span></p>
              </div>
            </motion.div>

            {/* Floating feature cards */}
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: card.delay }}
                className={`flex items-center gap-2.5 bg-gradient-to-r ${card.color} border border-border backdrop-blur-sm rounded-xl px-3.5 py-2.5 shadow-sm self-${i % 2 === 0 ? "end" : "start"} max-w-[240px]`}
              >
                <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center shrink-0 shadow-sm">
                  <card.icon className={`w-3.5 h-3.5 ${card.iconColor}`} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground leading-tight">{card.title}</div>
                  <div className="text-[11px] text-muted-foreground">{card.desc}</div>
                </div>
              </motion.div>
            ))}

            {/* Star rating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.95 }}
              className="flex items-center gap-2 bg-card border border-border rounded-full px-3.5 py-2 shadow-md self-start"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-foreground">5.0</span>
              <span className="text-xs text-muted-foreground">· 30+ clients</span>
            </motion.div>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground mb-0.5 group-hover:text-primary transition-colors duration-200">
                {stat.value}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
