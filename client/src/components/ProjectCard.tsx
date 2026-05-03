import type { Project } from "@/types";
import { motion } from "framer-motion";
import { ExternalLink, Eye, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [, navigate] = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-colors duration-300"
    >
      {/* Image — click navigates to detail */}
      <div
        className="aspect-video relative overflow-hidden cursor-pointer"
        onClick={() => navigate(`/portfolio/${project.id}`)}
      >
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors z-10" />
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />

        {/* Desktop hover overlay */}
        <div className="hidden sm:flex absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center gap-4 z-20">
          <button
            className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
            data-testid={`button-view-project-${project.id}`}
          >
            <Eye className="w-5 h-5" />
          </button>
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-3 bg-white/10 text-foreground border border-white/20 rounded-full hover:bg-white/20 transition-colors"
              data-testid={`button-external-link-${project.id}`}
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Mobile: always-visible "View" pill */}
        <div className="sm:hidden absolute bottom-2 right-2 z-20">
          <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold rounded-full px-2.5 py-1">
            <Eye className="w-3 h-3" /> View
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 lg:p-6">
        <div className="flex justify-between items-start mb-2 sm:mb-3">
          <div className="min-w-0 pr-2">
            <p className="text-primary text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1">
              {project.category}
            </p>
            <Link href={`/portfolio/${project.id}`}>
              <h3
                className="text-base sm:text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer leading-snug"
                data-testid={`text-project-title-${project.id}`}
              >
                {project.title}
              </h3>
            </Link>
          </div>
          <Link href={`/portfolio/${project.id}`}>
            <button
              className="text-muted-foreground hover:text-primary transition-colors mt-1 shrink-0"
              data-testid={`button-arrow-detail-${project.id}`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-5 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {project.technologies?.slice(0, 3).map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 text-[10px] sm:text-xs px-2 py-0.5"
            >
              {tech}
            </Badge>
          ))}
          {(project.technologies?.length || 0) > 3 && (
            <Badge
              variant="secondary"
              className="bg-card text-muted-foreground border border-border text-[10px] sm:text-xs px-2 py-0.5"
            >
              +{project.technologies!.length - 3}
            </Badge>
          )}
        </div>

        {/* Mobile: external link */}
        {project.projectUrl && (
          <div className="sm:hidden mt-3 pt-3 border-t border-border">
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
              data-testid={`button-external-link-mobile-${project.id}`}
            >
              <ExternalLink className="w-3 h-3" />
              Visit live site
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
