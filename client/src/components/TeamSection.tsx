import { useTeam } from "@/hooks/use-team";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { SiGithub, SiLinkedin, SiTwitter } from "react-icons/si";

export default function TeamSection() {
  const { data: team, isLoading } = useTeam();

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <section id="team" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-6">Meet Our Team</h2>
          <p className="text-gray-400 text-lg">
            A diverse group of passionate developers, designers, and strategists dedicated to delivering excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team?.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 hover-elevate transition-all duration-300">
                <CardContent className="pt-8 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-6 border-2 border-primary/20">
                    <AvatarImage src={member.imageUrl} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-4 font-medium uppercase tracking-wider">{member.role}</p>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3">{member.bio}</p>
                  
                  <div className="flex justify-center gap-4">
                    {member.socialLinks.github && (
                      <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <SiGithub className="w-5 h-5" />
                      </a>
                    )}
                    {member.socialLinks.linkedin && (
                      <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <SiLinkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.socialLinks.twitter && (
                      <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <SiTwitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
