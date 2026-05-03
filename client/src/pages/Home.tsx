import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import ProjectsGallery from "@/components/ProjectsGallery";
import TeamSection from "@/components/TeamSection";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Quote, Star, ArrowRight, Zap, Shield, Clock, HeartHandshake } from "lucide-react";
import { SiReact, SiNodedotjs, SiTypescript, SiPostgresql, SiTailwindcss, SiNextdotjs, SiMongodb, SiDocker, SiFirebase, SiGraphql } from "react-icons/si";

const techStack = [
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiNodedotjs, name: "Node.js", color: "#68A063" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiNextdotjs, name: "Next.js", color: "#ffffff" },
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
    quote: "DevStudio built our patient booking system in 6 weeks. It reduced our front-desk workload by 60% and the code is clean enough that our own team can maintain it. Best investment we made.",
    stars: 5,
  },
  {
    name: "James Okonkwo",
    role: "CEO, ShopLocal",
    quote: "They replaced our Shopify store with a custom solution that loads 3x faster. We eliminated $300/month in fees and our conversion rate went up by 22%. I wish I'd done this sooner.",
    stars: 5,
  },
  {
    name: "Priya Sharma",
    role: "CTO, LaunchPad SaaS",
    quote: "We went from idea to working MVP in under 8 weeks. DevStudio communicated clearly throughout, hit every milestone, and the code quality blew our in-house team away.",
    stars: 5,
  },
];

const values = [
  { icon: Zap, title: "Fast Delivery", desc: "We work in focused sprints so you get a working product quickly — not months from now." },
  { icon: Shield, title: "Clean Code", desc: "We write maintainable, well-documented code your team can confidently take over." },
  { icon: Clock, title: "On Time & On Budget", desc: "Fixed-scope projects. No surprise invoices. No scope creep without your approval." },
  { icon: HeartHandshake, title: "Clear Communication", desc: "You'll always know exactly where your project stands. We reply within hours, not days." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />

      {/* Why Us — Values Section */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white mb-1">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />
      <ProjectsGallery />

      {/* Tech Stack / Skills Section */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-4">
              Our Tech Stack
            </h2>
            <p className="text-muted-foreground text-lg">
              We use modern, battle-tested technologies to build fast and scalable applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-4 md:gap-6">
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

      {/* Testimonials Section */}
      <section className="py-24 bg-card/40 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-4">
              What Clients Say
            </h2>
            <p className="text-muted-foreground text-lg">
              We let results speak. Here's what our clients say about working with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <p className="text-foreground/90 leading-relaxed flex-1">"{t.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
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

      <TeamSection />

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute -top-[50%] left-[20%] w-[60%] h-[60%] bg-primary/15 blur-[150px] rounded-full" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">
              Ready to bring your vision to life?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Let's build something that actually works — on time, on budget, and with measurable results.
            </p>
            <Button
              size="lg"
              className="btn-cta border-0 text-lg h-16 px-12 rounded-full shadow-lg shadow-orange-900/20 group"
              asChild
            >
              <Link href="/contact">
                <span className="flex items-center gap-2">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
