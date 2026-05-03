import { useRoute } from "wouter";
import { useProject } from "@/hooks/use-projects";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, Layers, Star } from "lucide-react";
import { Link } from "wouter";

export default function ProjectDetail() {
  const [, params] = useRoute("/portfolio/:id");
  const id = params?.id;
  const { data: project, isLoading } = useProject(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24 sm:pt-32 flex items-center justify-center">
        <div className="h-10 w-10 sm:h-12 sm:w-12 animate-spin rounded-full border-4 border-primary border-r-transparent" />
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
    <div className="min-h-screen bg-background pb-16 sm:pb-24">

      {/* ── Hero ── */}
      <div className="relative h-[52vh] sm:h-[62vh] lg:h-[72vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Layered gradients for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/45 z-10" />
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Back button + hero text */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-6 sm:py-10 lg:py-14">
          {/* Back button at top */}
          <div className="pt-16 sm:pt-20">
            <Link href="/portfolio">
              <Button
                variant="ghost"
                className="text-white/85 hover:text-white hover:bg-white/15 transition-all duration-300 -ml-2 group text-sm rounded-full"
                data-testid="link-back-portfolio"
              >
                <ArrowLeft className="mr-1.5 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Portfolio
              </Button>
            </Link>
          </div>

          {/* Hero text at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="pb-2 sm:pb-4"
          >
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
              <Badge className="px-3 py-1 text-[10px] sm:text-xs font-bold tracking-wide uppercase bg-primary text-primary-foreground border-none shadow-lg shadow-primary/25">
                {project.category}
              </Badge>
              {project.featured && (
                <Badge className="px-3 py-1 text-[10px] sm:text-xs font-bold tracking-wide uppercase bg-amber-500 text-white border-none shadow-lg">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-3 sm:mb-5 leading-tight tracking-tight drop-shadow-2xl max-w-4xl">
              {project.title}
            </h1>

            <p className="text-xs sm:text-sm lg:text-base text-white/85 max-w-2xl font-medium leading-relaxed drop-shadow-md bg-black/30 backdrop-blur-sm px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-white/10">
              {project.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 sm:pt-12 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14">

          {/* ── Sidebar — first on mobile ── */}
          <div className="lg:col-span-4 order-first lg:order-last">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-card border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 lg:sticky lg:top-28 shadow-sm"
            >
              <h3 className="text-lg sm:text-xl font-display font-bold text-foreground mb-5 sm:mb-6">
                Project Overview
              </h3>

              {/* Metadata */}
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-center gap-3.5 group">
                  <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors shrink-0">
                    <Tag className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.18em] font-black mb-0.5">Category</p>
                    <p className="text-sm sm:text-base text-foreground font-semibold truncate">{project.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 group">
                  <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors shrink-0">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.18em] font-black mb-0.5">Completed</p>
                    <p className="text-sm sm:text-base text-foreground font-semibold">
                      {project.completedDate
                        ? new Date(project.completedDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })
                        : "Ongoing"}
                    </p>
                  </div>
                </div>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex items-start gap-3.5 group">
                    <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors shrink-0 mt-0.5">
                      <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-[0.18em] font-black mb-1.5">Tech Stack</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span key={tech} className="text-[10px] sm:text-xs bg-primary/8 text-primary border border-primary/20 rounded-full px-2.5 py-0.5 font-semibold">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="text-[10px] sm:text-xs bg-muted text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
                            +{project.technologies.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="my-5 sm:my-6 border-t border-border" />

              {/* Action buttons */}
              <div className="flex flex-col gap-3">
                {project.projectUrl && (
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 h-11 sm:h-12 rounded-xl text-sm font-bold"
                    data-testid="button-live-demo"
                  >
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live Project
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full h-11 sm:h-12 rounded-xl text-sm font-bold border-border hover:border-primary/40 hover:bg-muted/50"
                    data-testid="button-github-repo"
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Source Code
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          </div>

          {/* ── Main Content ── */}
          <div className="lg:col-span-8 order-last lg:order-first space-y-10 sm:space-y-14">

            {/* About */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5 sm:mb-7">
                <div className="w-1 h-7 sm:h-8 bg-primary rounded-full" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground">
                  About the Project
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {(project.longDescription || project.description).split("\n").filter(Boolean).map((paragraph, i) => (
                  <p key={i} className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.section>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-5 sm:mb-7">
                  <div className="w-1 h-7 sm:h-8 bg-primary rounded-full" />
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground">
                    Technologies Used
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.88 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.04 }}
                      className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-card border border-border rounded-xl sm:rounded-2xl text-foreground hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 group cursor-default"
                    >
                      <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary group-hover:scale-110 transition-transform shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold">{tech}</span>
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
