import { useState } from "react";
import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const categories = ["All", "Web", "Mobile", "UI/UX", "Branding"];

export default function ProjectsGallery() {
  const { data: projects, isLoading } = useProjects();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects?.filter(project =>
    activeCategory === "All" || project.category === activeCategory
  ) || [];

  if (isLoading) {
    return (
      <section className="py-24 bg-card/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-video bg-card rounded-2xl animate-pulse border border-border" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-24 bg-card/20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <p className="text-primary text-sm font-bold uppercase tracking-wider mb-3">My Work</p>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-4">Recent Projects</h2>
            <p className="text-muted-foreground text-lg">
              Real projects. Real results. Each one started with a problem to solve.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full text-sm ${
                  activeCategory === category
                    ? "bg-primary text-white border-primary"
                    : "border-border text-muted-foreground hover:text-white hover:border-primary/50"
                }`}
                data-testid={`button-filter-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" className="rounded-full border-border text-muted-foreground hover:text-white hover:border-primary/50 group" asChild>
              <Link href="/portfolio">
                <span className="flex items-center gap-2">
                  View All Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
