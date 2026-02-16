import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useTeam } from "@/hooks/use-team";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function About() {
  const { data: teamMembers, isLoading } = useTeam();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-20 container-padding max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">About Us</h1>
          <p className="text-xl text-gray-400">
            We are a team of passionate developers, designers, and strategists building the future of the web.
          </p>
        </motion.div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
          <div>
            <h2 className="text-3xl font-display font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Our mission is to empower businesses with cutting-edge digital solutions. We believe in quality over quantity, writing clean code, and designing intuitive interfaces that users love.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Founded in 2023, DevStudio has already helped over 50 startups launch their MVPs and scale their infrastructure. We are remote-first, diverse, and driven by innovation.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
             {/* Unsplash image for office/team */}
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070" 
              alt="Team working together" 
              className="relative rounded-2xl border border-white/10 shadow-2xl z-10"
            />
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-display font-bold text-white text-center mb-12">Meet the Team</h2>
          
          {isLoading ? (
            <div className="text-white text-center">Loading team...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers?.map((member: any) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card border border-white/5 rounded-2xl p-6 text-center hover:border-primary/50 transition-colors group"
                >
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-2 border-white/10 group-hover:border-primary transition-colors">
                    <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-4">{member.role}</p>
                  <p className="text-gray-400 text-sm mb-6">{member.bio}</p>
                  
                  {/* Social Links would go here, parsing the JSON */}
                  <div className="flex justify-center space-x-4">
                     <Github className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                     <Linkedin className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                     <Twitter className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
