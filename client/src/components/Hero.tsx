import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-20 sm:pt-32 md:pt-48 pb-16 sm:pb-20 lg:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-primary/15 blur-[130px] rounded-full" />
        <div className="absolute top-[50%] -left-[10%] w-[45%] h-[45%] bg-primary/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-3 sm:px-5 py-2 mb-4 sm:mb-8">
              <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm font-semibold text-primary tracking-wide uppercase">
                Available for New Projects
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.15] tracking-tight mb-6 sm:mb-10 px-2">
              I build{" "}
              <span className="text-gradient-primary">
                fast, custom
              </span>{" "}
              web apps that deliver results.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-2">
              I'm a fullstack developer who helps startups and businesses turn ideas into high-performance web applications — on time, within budget, with clean code you can actually maintain. I leverage AI tools and vibe coding to ship faster without cutting corners.
            </p>

            <p className="text-sm sm:text-base text-muted-foreground/75 mb-8 sm:mb-14 max-w-2xl mx-auto px-2">
              React · Node.js · TypeScript · PostgreSQL · AI Integration · Vibe Coding · Semantic Search · Chatbots
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2">
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

            <div className="mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {[
                { label: "Client Satisfaction", value: "99%" },
                { label: "Projects Delivered", value: "50+" },
                { label: "Years of Experience", value: "5+" },
                { label: "Happy Clients", value: "30+" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-foreground/70 uppercase tracking-wider font-semibold">
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
