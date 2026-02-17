import Hero from "@/components/Hero";
import { useProjects } from "@/hooks/use-projects";
import { useServices } from "@/hooks/use-services";
import { ProjectCard } from "@/components/ProjectCard";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: services, isLoading: servicesLoading } = useServices();

  const featuredProjects = projects?.filter((p: any) => p.featured).slice(0, 3) || [];
  const featuredServices = services?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-background">
      <Hero />

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
              {featuredServices.map((service: any, idx: number) => (
                <ServiceCard key={service.id} service={service} index={idx} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Button variant="link" className="text-primary hover:text-primary/80 text-lg" asChild>
              <Link href="/services">
                <span className="flex items-center">
                  View All Services <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </Link>
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
              {featuredProjects.map((project: any) => (
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
    </div>
  );
}
