import { useServices } from "@/hooks/use-services";
import { ServiceCard } from "@/components/ServiceCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const steps = [
  { number: "01", title: "Discovery Call", desc: "We talk about your business, goals, and the problem you need solved. You get a clear project scope within 48 hours." },
  { number: "02", title: "Design", desc: "I create wireframes and mockups so you can see exactly what we're building before a line of code is written." },
  { number: "03", title: "Development", desc: "I build in focused sprints with weekly demos. You see progress every week, not just at the end." },
  { number: "04", title: "Launch & Handoff", desc: "I deploy your product, hand over all code and documentation, and stay available for 30 days post-launch." },
];

export default function Services() {
  const { data: services, isLoading } = useServices();

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-32 pb-20 container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="text-primary text-sm font-bold uppercase tracking-wider mb-4">What I Offer</p>
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">Services & Packages</h1>
          <p className="text-xl text-muted-foreground">
            Fixed-scope packages with transparent pricing. You know exactly what you're getting and what it costs before we start.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-card rounded-2xl animate-pulse border border-border" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {services?.map((service: any, idx: number) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
          </div>
        )}

        {/* Process */}
        <div className="mt-32 border-t border-border pt-24">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-bold uppercase tracking-wider mb-4">My Process</p>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-4">How I Work</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A straightforward process designed to keep you informed and the project on track.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-5xl font-display font-bold text-primary/10 mb-4">{step.number}</div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center">
          <p className="text-muted-foreground mb-6">Not sure which package fits? Let's talk and I'll recommend the right one.</p>
          <Button
            size="lg"
            className="btn-cta border-0 rounded-full px-10 h-14 text-lg shadow-lg shadow-orange-900/20 group"
            asChild
          >
            <Link href="/contact">
              <span className="flex items-center gap-2">
                Get a Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
