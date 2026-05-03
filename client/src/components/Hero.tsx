import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-primary/15 blur-[130px] rounded-full" />
        <div className="absolute top-[50%] -left-[10%] w-[45%] h-[45%] bg-primary/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-8">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wide uppercase">
                Available for New Projects
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight mb-8">
              I build{" "}
              <span className="text-gradient-primary">
                fast, custom
              </span>{" "}
              web apps that deliver results.
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed max-w-3xl mx-auto">
              I'm a fullstack developer who helps startups and businesses turn ideas into high-performance web applications — on time, within budget, with clean code you can actually maintain.
            </p>

            <p className="text-base text-muted-foreground/70 mb-12 max-w-2xl mx-auto">
              React · Node.js · TypeScript · PostgreSQL · Mobile · Cloud
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="h-14 px-10 text-lg rounded-full group btn-cta border-0 shadow-lg shadow-orange-900/20"
                asChild
              >
                <Link href="/contact">
                  <span className="flex items-center">
                    Hire Me
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 text-lg rounded-full border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all"
                asChild
              >
                <Link href="/portfolio">View My Work</Link>
              </Button>
            </div>

            <div className="mt-20 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Client Satisfaction", value: "99%" },
                { label: "Projects Delivered", value: "50+" },
                { label: "Years of Experience", value: "5+" },
                { label: "Happy Clients", value: "30+" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-display font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
