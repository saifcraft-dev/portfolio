import type { Project } from "@/types";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-white/5 hover:border-primary/50 transition-colors duration-300"
    >
      <div className="aspect-video relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay with links that appears on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 z-20">
          {project.projectUrl && (
            <a 
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white text-black rounded-full hover:bg-primary hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 text-white backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">
              {project.category}
            </p>
            <h3 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </div>
          {project.projectUrl && (
            <a href={project.projectUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </a>
          )}
        </div>

        <p className="text-gray-400 text-sm mb-6 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies?.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-white/5 hover:bg-white/10 text-gray-300 border-none">
              {tech}
            </Badge>
          ))}
          {(project.technologies?.length || 0) > 3 && (
            <Badge variant="secondary" className="bg-white/5 text-gray-300 border-none">
              +{project.technologies!.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </motion.div>
  );
}
