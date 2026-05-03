import type { Project } from "@/types";
import { motion } from "framer-motion";
import { ExternalLink, Eye, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-colors duration-300"
    >
      <div className="aspect-video relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors z-10" />
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        
        <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 z-20">
          <Link href={`/portfolio/${project.id}`}>
            <button className="p-3 bg-primary text-foreground rounded-full hover:bg-primary/90 transition-colors" data-testid={`button-view-project-${project.id}`}>
              <Eye className="w-5 h-5" />
            </button>
          </Link>
          {project.projectUrl && (
            <a 
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 text-foreground border border-white/20 rounded-full hover:bg-white/20 transition-colors"
              data-testid={`button-external-link-${project.id}`}
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">
              {project.category}
            </p>
            <Link href={`/portfolio/${project.id}`}>
              <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer" data-testid={`text-project-title-${project.id}`}>
                {project.title}
              </h3>
            </Link>
          </div>
          <Link href={`/portfolio/${project.id}`}>
            <button className="text-muted-foreground hover:text-primary transition-colors mt-1" data-testid={`button-arrow-detail-${project.id}`}>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <p className="text-muted-foreground text-sm mb-5 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies?.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 text-xs">
              {tech}
            </Badge>
          ))}
          {(project.technologies?.length || 0) > 3 && (
            <Badge variant="secondary" className="bg-card text-muted-foreground border border-border text-xs">
              +{project.technologies!.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </motion.div>
  );
}
