import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { motion } from "framer-motion";

export default function Portfolio() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-32 pb-20 container mx-auto px-4 max-w-7xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold text-foreground mb-6 sm:mb-8">My Work</h1>
          <p className="text-base sm:text-lg text-muted-foreground px-2 leading-relaxed">
            A selection of projects I've built for clients across various industries. Each one solved a real problem and delivered measurable results.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-muted rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
