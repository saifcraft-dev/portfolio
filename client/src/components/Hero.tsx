import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroImage from "@assets/image_1777821589567.png";

const highlights = [
  "Fast Delivery",
  "Clean Code",
  "On Time & On Budget",
  "Clear Communication",
];

const stats = [
  { label: "Projects", value: "50+" },
  { label: "Clients", value: "30+" },
  { label: "Experience", value: "5 yrs" },
  { label: "Satisfaction", value: "99%" },
];

export default function Hero() {
  return (
    <section className="relative pt-10 sm:pt-14 pb-14 sm:pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[20%] right-0 w-[50%] h-[80%] bg-primary/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[60%] bg-secondary/8 blur-[110px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT: Content */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-primary tracking-widest uppercase mb-5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for New Projects
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-display font-bold leading-[1.1] tracking-tight mb-5 text-foreground"
            >
              I help businesses build{" "}
              <span className="text-gradient-primary">web apps</span> that{" "}
              solve real problems.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-7 max-w-lg"
            >
              Senior fullstack developer with{" "}
              <strong className="text-foreground font-semibold">5+ years of experience</strong>{" "}
              turning ideas into polished, production-ready web applications — on time, within budget.
            </motion.p>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-8"
            >
              {highlights.map((h) => (
                <div key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  {h}
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10"
            >
              <Button
                size="lg"
                className="h-12 px-8 text-base rounded-full group btn-cta border-0 shadow-lg shadow-primary/20"
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
                className="h-12 px-8 text-base rounded-full border-border hover:bg-muted/60 transition-all"
                asChild
              >
                <Link href="/portfolio">View My Work</Link>
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-6 sm:gap-8 pt-6 border-t border-border w-full"
            >
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl sm:text-2xl font-display font-bold text-foreground leading-none mb-1">
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Image */}
          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border">
              <img
                src={heroImage}
                alt="Developer workspace with code on screen"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -bottom-4 -left-6 bg-card border border-border rounded-xl px-4 py-3 shadow-lg flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg">⚡</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground leading-tight">Fast Turnaround</div>
                <div className="text-xs text-muted-foreground">From idea to deploy</div>
              </div>
            </motion.div>

            {/* Top badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -top-4 -right-4 bg-card border border-border rounded-xl px-4 py-3 shadow-lg"
            >
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-medium">Stack</div>
              <div className="flex gap-1.5 flex-wrap max-w-[160px]">
                {["React", "Node.js", "TS", "PostgreSQL"].map((t) => (
                  <span key={t} className="text-xs font-mono bg-primary/10 text-primary border border-primary/15 rounded px-1.5 py-0.5">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
