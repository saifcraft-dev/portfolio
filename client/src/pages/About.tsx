import { useTeam } from "@/hooks/use-team";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Target, Lightbulb, Users } from "lucide-react";

const pillars = [
  { icon: Target, title: "Results First", desc: "We care about the outcome — not just shipping code. Every project we take on has a clear success metric." },
  { icon: Lightbulb, title: "Clean Code", desc: "We write code your team can maintain and extend. No black boxes, no technical debt left behind." },
  { icon: Users, title: "People Over Process", desc: "We hire for communication first. You'll always know where your project stands." },
];

export default function About() {
  const { data: teamMembers, isLoading } = useTeam();

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-32 pb-20 container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="text-primary text-sm font-bold uppercase tracking-wider mb-4">Who We Are</p>
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">About DevStudio</h1>
          <p className="text-xl text-muted-foreground">
            We are a team of passionate developers, designers, and strategists building the future of the web — one result-driven project at a time.
          </p>
        </motion.div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-display font-bold text-white mb-6">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our mission is to empower businesses with cutting-edge digital solutions. We believe in quality over quantity — clean code, intuitive interfaces, and software that solves real problems.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 2023, DevStudio has already helped over 50 startups launch their MVPs and scale their infrastructure. We are remote-first, diverse, and driven by outcomes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We help <strong className="text-white">startups and small businesses</strong> build fast, custom web applications — so they can stop paying for tools that don't fit and start owning their own stack.
            </p>
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
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
              alt="Team working together"
              className="relative rounded-2xl border border-border shadow-2xl z-10"
            />
          </motion.div>
        </div>

        {/* Pillars */}
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

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-display font-bold text-white text-center mb-3">Meet the Team</h2>
          <p className="text-muted-foreground text-center mb-12">The people who make it happen.</p>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-card rounded-2xl animate-pulse border border-border" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers?.map((member: any) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/30 transition-colors group"
                >
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-5 border-2 border-border group-hover:border-primary transition-colors">
                    <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    <Github className="w-4 h-4 text-muted-foreground hover:text-white cursor-pointer transition-colors" />
                    <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                    <Twitter className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
