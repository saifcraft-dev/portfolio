import { useRoute } from "wouter";
import { useProject } from "@/hooks/use-projects";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, Layers } from "lucide-react";
import { Link } from "wouter";

export default function ProjectDetail() {
  const [, params] = useRoute("/portfolio/:id");
  const id = params?.id;
  const { data: project, isLoading } = useProject(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-32 flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-r-transparent" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background pt-24 sm:pt-32 text-center px-4">
        <h2 className="text-xl sm:text-2xl text-foreground mb-4">Project not found</h2>
        <Link href="/portfolio">
          <Button variant="outline">Back to Portfolio</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-12 sm:pb-20">

      {/* Hero — dark overlay, white text */}
      <div className="relative h-[55vh] sm:h-[65vh] lg:h-[70vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-background/15 z-10" />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 z-20 flex items-end">
          <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8 sm:pb-14 lg:pb-20">
            <Link href="/portfolio">
              <Button
                variant="ghost"
                className="text-white/80 hover:text-white mb-4 sm:mb-6 hover:bg-white/10 transition-all duration-300 -ml-2 group text-sm"
                data-testid="link-back-portfolio"
              >
                <ArrowLeft className="mr-1.5 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Portfolio
              </Button>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              <Badge className="mb-3 sm:mb-4 px-3 py-1 text-xs sm:text-sm font-bold tracking-wide uppercase bg-primary text-primary-foreground border-none shadow-lg shadow-primary/20">
                {project.category}
              </Badge>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-3 sm:mb-5 leading-tight tracking-tight drop-shadow-2xl">
                {project.title}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-white/85 max-w-2xl font-medium leading-relaxed drop-shadow-md bg-black/25 backdrop-blur-sm px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl border border-white/10">
                {project.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16">

          {/* Sidebar — shown FIRST on mobile via order, sticky only on desktop */}
          <div className="lg:col-span-4 order-first lg:order-last">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-10 lg:sticky lg:top-32 shadow-sm"
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-foreground mb-5 sm:mb-7 lg:mb-10">
                Project Overview
              </h3>

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5 lg:gap-8">
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 group">
                  <div className="p-2.5 sm:p-3 bg-primary/10 rounded-xl lg:rounded-2xl group-hover:bg-primary/20 transition-colors duration-300 shrink-0">
                    <Tag className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black mb-0.5">Category</p>
                    <p className="text-sm sm:text-base lg:text-lg text-foreground font-semibold truncate">{project.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 group">
                  <div className="p-2.5 sm:p-3 bg-primary/10 rounded-xl lg:rounded-2xl group-hover:bg-primary/20 transition-colors duration-300 shrink-0">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black mb-0.5">Completed</p>
                    <p className="text-sm sm:text-base lg:text-lg text-foreground font-semibold">
                      {project.completedDate ? new Date(project.completedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                      }) : 'Ongoing'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-7 lg:mt-12 flex flex-col sm:flex-row lg:flex-col gap-3">
                {project.projectUrl && (
                  <Button
                    asChild
                    size="lg"
                    className="flex-1 lg:flex-none w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 h-11 sm:h-12 lg:h-14 rounded-xl lg:rounded-2xl text-sm sm:text-base lg:text-lg font-bold"
                    data-testid="button-live-demo"
                  >
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      View Live Project
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="flex-1 lg:flex-none w-full border-border text-foreground hover:bg-muted/50 hover:border-primary/40 h-11 sm:h-12 lg:h-14 rounded-xl lg:rounded-2xl text-sm sm:text-base lg:text-lg font-bold"
                    data-testid="button-github-repo"
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Source Code
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 order-last lg:order-first space-y-10 sm:space-y-14 lg:space-y-20">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground mb-5 sm:mb-6 lg:mb-8 relative inline-block">
                About the Project
                <span className="absolute -bottom-2 left-0 w-10 h-1 bg-primary rounded-full" />
              </h2>
              <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                {(project.longDescription || project.description).split('\n').map((paragraph, i) => (
                  <p key={i} className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </motion.section>

            {project.technologies && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground mb-5 sm:mb-6 lg:mb-8 relative inline-block">
                  Technologies Used
                  <span className="absolute -bottom-2 left-0 w-10 h-1 bg-primary rounded-full" />
                </h2>
                <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
                  {project.technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-card border border-border rounded-xl lg:rounded-2xl text-foreground hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 group"
                    >
                      <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:scale-110 transition-transform" />
                      <span className="text-xs sm:text-sm font-medium">{tech}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
