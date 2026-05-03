import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Zap, Shield, Clock } from "lucide-react";

const highlights = [
  { icon: Zap, text: "Fast Delivery" },
  { icon: Shield, text: "Clean Code" },
  { icon: Clock, text: "On Time & On Budget" },
];

const techBadges = ["React", "Node.js", "TypeScript", "PostgreSQL", "AI / LLMs", "Vibe Coding"];

export default function Hero() {
  return (
    <section className="relative pt-20 sm:pt-32 md:pt-48 pb-16 sm:pb-20 lg:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-primary/15 blur-[130px] rounded-full" />
        <div className="absolute top-[50%] -left-[10%] w-[45%] h-[45%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute top-[30%] left-[45%] w-[25%] h-[25%] bg-secondary/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-3 sm:px-5 py-2 mb-4 sm:mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-primary tracking-wide uppercase">
                Available for New Projects
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.15] tracking-tight mb-6 sm:mb-8 px-2">
              I build{" "}
              <span className="text-gradient-primary">
                fast, custom
              </span>{" "}
              web apps that{" "}
              <span className="relative inline-block">
                deliver results.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto px-2">
              I'm a senior fullstack developer with{" "}
              <strong className="text-foreground">5+ years of experience</strong>{" "}
              helping startups and businesses turn ideas into polished, production-ready web applications — on time, within budget.
            </p>

            {/* Highlight pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8 sm:mb-10 px-2">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm font-medium text-foreground shadow-sm"
                >
                  <h.icon className="w-3.5 h-3.5 text-primary" />
                  {h.text}
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2 mb-10 sm:mb-16">
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-10 text-base sm:text-lg rounded-full group btn-cta border-0 shadow-lg shadow-orange-900/20"
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
                className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-10 text-base sm:text-lg rounded-full border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all"
                asChild
              >
                <Link href="/portfolio">View My Work</Link>
              </Button>
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-16 px-2">
              <span className="text-xs text-muted-foreground/60 font-medium uppercase tracking-wider mr-1">Stack:</span>
              {techBadges.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className="text-xs font-mono bg-primary/8 text-primary/80 border border-primary/15 rounded-md px-2.5 py-1"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Stats */}
            <div className="pt-8 sm:pt-10 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {[
                { label: "Client Satisfaction", value: "99%" },
                { label: "Projects Delivered", value: "50+" },
                { label: "Years of Experience", value: "5+" },
                { label: "Happy Clients", value: "30+" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="text-center"
                >
                  <div className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
