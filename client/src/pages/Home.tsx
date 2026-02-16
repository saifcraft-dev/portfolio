import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Code2, Users, Trophy } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useProjects } from "@/hooks/use-projects";
import { useServices } from "@/hooks/use-services";
import { ProjectCard } from "@/components/ProjectCard";
import { ServiceCard } from "@/components/ServiceCard";

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: services, isLoading: servicesLoading } = useServices();

  const featuredProjects = projects?.filter((p: any) => p.featured).slice(0, 3) || [];
  const featuredServices = services?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full" />
          <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="container-padding max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-sm font-medium text-gray-300">Available for new projects</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] mb-6">
                  We craft <span className="text-gradient-primary">digital masterpieces</span> that scale.
                </h1>
                
                <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl">
                  Award-winning development studio specializing in high-performance web applications, mobile apps, and stunning digital experiences.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg h-14 px-8 rounded-full" asChild>
                    <Link href="/contact">Start a Project <ArrowRight className="ml-2 w-5 h-5" /></Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg h-14 px-8 rounded-full" asChild>
                    <Link href="/portfolio">View Our Work</Link>
                  </Button>
                </div>

                <div className="mt-12 flex items-center space-x-8 text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-white">4.9/5</span>
                    <span className="text-sm">Rating</span>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <span className="font-bold text-white">100+</span>
                    <span className="text-sm ml-2">Projects Delivered</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10"
              >
                {/* Placeholder for Hero Image - Abstract 3D shape or dashboard mockup */}
                <div className="aspect-square relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-gray-900 to-black p-4">
                   {/* Unsplash abstract tech image */}
                   <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" 
                    alt="Digital Technology"
                    className="w-full h-full object-cover rounded-2xl opacity-80"
                   />
                   
                   {/* Floating Cards */}
                   <div className="absolute bottom-10 -left-10 bg-card border border-white/10 p-4 rounded-xl shadow-xl animate-float">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                          <Code2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">Clean Code</div>
                          <div className="text-xs text-gray-400">Best Practices</div>
                        </div>
                      </div>
                   </div>

                   <div className="absolute top-10 -right-5 bg-card border border-white/10 p-4 rounded-xl shadow-xl animate-float" style={{ animationDelay: "2s" }}>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">
                          <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">Award Winning</div>
                          <div className="text-xs text-gray-400">Design & Dev</div>
                        </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Years Experience", value: "8+" },
              { label: "Projects Completed", value: "150+" },
              { label: "Team Members", value: "12" },
              { label: "Happy Clients", value: "98%" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl lg:text-5xl font-display font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-6">Our Expertise</h2>
            <p className="text-gray-400 text-lg">
              We provide comprehensive digital solutions tailored to your business needs. From initial concept to final deployment.
            </p>
          </div>

          {servicesLoading ? (
             <div className="text-white text-center">Loading services...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredServices.map((service, idx) => (
                <ServiceCard key={service.id} service={service} index={idx} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Button variant="link" className="text-primary hover:text-primary/80 text-lg" asChild>
              <Link href="/services">View All Services <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-6">Selected Work</h2>
              <p className="text-gray-400 text-lg">
                Explore our portfolio of award-winning projects that drive results for our clients.
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex border-white/20 hover:bg-white/10" asChild>
              <Link href="/portfolio">View All Projects</Link>
            </Button>
          </div>

          {projectsLoading ? (
            <div className="text-white text-center">Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Button variant="outline" className="w-full border-white/20 hover:bg-white/10" asChild>
              <Link href="/portfolio">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute -top-[50%] left-[20%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-8">
            Ready to bring your vision to life?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Let's collaborate to build something extraordinary. Our team is ready to help you scale.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg h-16 px-10 rounded-full" asChild>
            <Link href="/contact">Start Your Project</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
