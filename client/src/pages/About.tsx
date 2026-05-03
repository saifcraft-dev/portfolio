import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Target, Lightbulb, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiReact, SiNodedotjs, SiTypescript, SiPostgresql, SiTailwindcss, SiNextdotjs } from "react-icons/si";

const pillars = [
  { icon: Target, title: "Results First", desc: "I care about the outcome — not just shipping code. Every project has a clear success metric we agree on upfront." },
  { icon: Lightbulb, title: "Clean Code", desc: "I write code your team can maintain and extend. No black boxes, no technical debt left behind." },
  { icon: Clock, title: "On Time, Always", desc: "I work in focused sprints with weekly demos. You see progress every week — not just at the end." },
];

const skills = [
  { icon: SiReact, name: "React / Next.js", color: "#61DAFB" },
  { icon: SiNodedotjs, name: "Node.js", color: "#68A063" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#336791" },
  { icon: SiTailwindcss, name: "Tailwind CSS", color: "#38BDF8" },
  { icon: SiNextdotjs, name: "Full-Stack", color: "#ffffff" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-32 pb-20 container mx-auto px-4 max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="text-primary text-sm font-bold uppercase tracking-wider mb-4">About Me</p>
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">
            Hi, I'm a Fullstack Developer
          </h1>
          <p className="text-xl text-muted-foreground">
            I help startups and businesses build fast, custom web applications that solve real problems and deliver measurable results.
          </p>
        </motion.div>

        {/* Bio + Photo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-display font-bold text-white mb-6">My Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm a self-driven fullstack developer with 5+ years of experience building web applications from scratch. I've worked with early-stage startups, small businesses, and growing companies — always focused on writing clean code that actually solves the problem.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I specialize in <strong className="text-white">React, Node.js, TypeScript, and PostgreSQL</strong>. I handle everything — from database architecture and API design to pixel-perfect frontend interfaces.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              When you hire me, you're not handing your project to a project manager who then hands it to a junior. <strong className="text-white">You talk directly to the developer doing the work.</strong> Fast replies, clear updates, honest timelines.
            </p>

            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-white transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-primary/15 blur-[100px] rounded-full" />
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072"
              alt="Developer working"
              className="relative rounded-2xl border border-border shadow-2xl z-10"
            />
          </motion.div>
        </div>

        {/* How I Work */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold text-white mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-24">
          <h2 className="text-2xl font-display font-bold text-white text-center mb-3">My Core Stack</h2>
          <p className="text-muted-foreground text-center mb-10">Technologies I use every day to build production-ready applications.</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {skills.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                  <s.icon style={{ color: s.color }} className="w-8 h-8" />
                </div>
                <span className="text-xs text-muted-foreground text-center font-medium leading-tight">{s.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center border-t border-border pt-20">
          <h2 className="text-3xl font-display font-bold text-white mb-4">Ready to work together?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Tell me about your project and I'll get back to you within 24 hours.
          </p>
          <Button
            size="lg"
            className="btn-cta border-0 rounded-full px-10 h-14 text-lg shadow-lg shadow-orange-900/20 group"
            asChild
          >
            <Link href="/contact">
              <span className="flex items-center gap-2">
                Get in Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
