import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import ProjectsGallery from "@/components/ProjectsGallery";
import TeamSection from "@/components/TeamSection";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ServicesSection />
      <ProjectsGallery />
      <TeamSection />

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
