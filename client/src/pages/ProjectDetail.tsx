import { useRoute } from "wouter";
import { useProject } from "@/hooks/use-projects";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, ExternalLink, Github, Calendar, Tag, Layers,
  Star, CheckCircle2, Clock, ChevronRight, Code2, Zap
} from "lucide-react";
import { Link } from "wouter";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay },
});

export default function ProjectDetail() {
  const [, params] = useRoute("/portfolio/:id");
  const id = params?.id;
  const { data: project, isLoading } = useProject(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-r-transparent" />
          <p className="text-sm text-muted-foreground animate-pulse">Loading project…</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
            <Code2 className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">Project not found</h2>
          <p className="text-muted-foreground text-sm">This project may have been removed or the link is incorrect.</p>
          <Link href="/portfolio">
            <Button variant="outline" className="mt-2" data-testid="link-back-portfolio-404">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isCompleted = !!project.completedDate;
  const completedLabel = isCompleted
    ? new Date(project.completedDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })
    : "Ongoing";

  const paragraphs = (project.longDescription || project.description)
    .split("\n")
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ── */}
      <div className="relative h-[55vh] sm:h-[65vh] lg:h-[75vh] w-full overflow-hidden">
        {/* Background image with zoom-in animation */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Layered overlays */}
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent z-10" />

        {/* Noise texture overlay for depth */}
        <div className="absolute inset-0 z-10 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
        />

        {/* Content layer */}
        <div className="absolute inset-0 z-20 flex flex-col px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full">

          {/* Breadcrumb / Back navigation */}
          <motion.div {...fadeIn(0.1)} className="pt-20 sm:pt-24 lg:pt-28 flex items-center gap-2 text-white/60 text-xs sm:text-sm">
            <Link href="/portfolio">
              <button
                className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors group"
                data-testid="link-back-portfolio"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Portfolio</span>
              </button>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-white/30" />
            <span className="text-white/80 truncate max-w-[160px] sm:max-w-xs">{project.title}</span>
          </motion.div>

          {/* Hero text — pushed to bottom */}
          <div className="mt-auto pb-8 sm:pb-10 lg:pb-14">
            <motion.div {...fadeUp(0.2)}>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="px-3 py-1 text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-primary text-primary-foreground border-none shadow-lg shadow-primary/30">
                  {project.category}
                </Badge>
                {project.featured && (
                  <Badge className="px-3 py-1 text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-amber-500 text-white border-none shadow-lg shadow-amber-500/30">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Featured
                  </Badge>
                )}
                <Badge
                  className={`px-3 py-1 text-[10px] sm:text-xs font-bold tracking-widest uppercase border-none shadow-lg ${isCompleted
                    ? "bg-emerald-500/90 text-white shadow-emerald-500/30"
                    : "bg-blue-500/90 text-white shadow-blue-500/30"
                    }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                  ) : (
                    <Clock className="w-3 h-3 mr-1" />
                  )}
                  {isCompleted ? "Completed" : "In Progress"}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-[1.1] tracking-tight drop-shadow-2xl max-w-4xl">
                {project.title}
              </h1>

              {/* Description pill */}
              <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed backdrop-blur-sm bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
                {project.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── QUICK STATS BAR ── */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            {...fadeIn(0.35)}
            className="flex flex-wrap items-center divide-x divide-border"
          >
            <div className="flex items-center gap-2.5 px-4 sm:px-6 py-4 first:pl-0">
              <Tag className="h-4 w-4 text-primary shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Category</p>
                <p className="text-sm font-semibold text-foreground">{project.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 px-4 sm:px-6 py-4">
              <Calendar className="h-4 w-4 text-primary shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">
                  {isCompleted ? "Completed" : "Status"}
                </p>
                <p className="text-sm font-semibold text-foreground">{completedLabel}</p>
              </div>
            </div>
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex items-center gap-2.5 px-4 sm:px-6 py-4">
                <Layers className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Tech Stack</p>
                  <p className="text-sm font-semibold text-foreground">{project.technologies.length} Technologies</p>
                </div>
              </div>
            )}
            {(project.projectUrl || project.githubUrl) && (
              <div className="flex items-center gap-2.5 px-4 sm:px-6 py-4">
                <Zap className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Links</p>
                  <p className="text-sm font-semibold text-foreground">
                    {[project.projectUrl && "Live Demo", project.githubUrl && "Source Code"]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

          {/* ── SIDEBAR ── */}
          <div className="lg:col-span-4 order-first lg:order-last">
            <motion.div
              {...fadeUp(0.3)}
              className="lg:sticky lg:top-28 space-y-5"
            >
              {/* Overview card */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-primary/8 via-primary/4 to-transparent border-b border-border px-5 sm:px-6 py-4">
                  <h3 className="text-base font-display font-bold text-foreground">Project Overview</h3>
                </div>
                <div className="p-5 sm:p-6 space-y-5">

                  {/* Category */}
                  <div className="flex items-center gap-3.5 group">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Tag className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-[0.18em] font-black mb-0.5">Category</p>
                      <p className="text-sm font-semibold text-foreground truncate">{project.category}</p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-3.5 group">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-[0.18em] font-black mb-0.5">
                        {isCompleted ? "Completed" : "Status"}
                      </p>
                      <p className="text-sm font-semibold text-foreground">{completedLabel}</p>
                    </div>
                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 ml-auto shrink-0" />
                    ) : (
                      <Clock className="h-4 w-4 text-blue-500 ml-auto shrink-0" />
                    )}
                  </div>

                  {/* Tech stack */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex items-start gap-3.5 group">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors mt-0.5">
                        <Layers className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.18em] font-black mb-2">Tech Stack</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 6).map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] sm:text-xs bg-primary/8 text-primary border border-primary/20 rounded-full px-2.5 py-0.5 font-semibold"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 6 && (
                            <span className="text-[10px] sm:text-xs bg-muted text-muted-foreground border border-border rounded-full px-2.5 py-0.5 font-medium">
                              +{project.technologies.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  {(project.projectUrl || project.githubUrl) && (
                    <>
                      <div className="border-t border-border" />
                      <div className="flex flex-col gap-2.5">
                        {project.projectUrl && (
                          <Button
                            asChild
                            size="lg"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/25 h-11 rounded-xl text-sm font-bold transition-all"
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
                            className="w-full h-11 rounded-xl text-sm font-bold border-border hover:border-primary/40 hover:bg-muted/50 transition-all"
                            data-testid="button-github-repo"
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" />
                              Source Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Featured badge card */}
              {project.featured && (
                <motion.div {...fadeIn(0.45)}
                  className="flex items-center gap-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-2xl px-5 py-4"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Featured Project</p>
                    <p className="text-xs text-amber-600/70 dark:text-amber-500/70 mt-0.5">Highlighted as a top work</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* ── MAIN CONTENT ── */}
          <div className="lg:col-span-8 order-last lg:order-first space-y-12 sm:space-y-16">

            {/* About */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-1 h-7 sm:h-8 bg-primary rounded-full" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground">
                  About the Project
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {paragraphs.map((paragraph, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="text-sm sm:text-base lg:text-[1.05rem] text-muted-foreground leading-[1.85] tracking-[0.01em]"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.section>

            {/* Technologies Used */}
            {project.technologies && project.technologies.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <div className="w-1 h-7 sm:h-8 bg-primary rounded-full" />
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground">
                    Technologies Used
                  </h2>
                </div>

                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                      className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200 group cursor-default"
                      data-testid={`tech-chip-${index}`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Code2 className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-foreground truncate">{tech}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* CTA / next steps */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-gradient-to-br from-primary/8 via-primary/4 to-transparent border border-primary/15 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-display font-bold text-foreground mb-2">
                      Interested in working together?
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Like what you see? Let's build something great. Reach out to start a conversation about your project.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
                    <Link href="/contact">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 rounded-xl font-bold"
                        data-testid="button-contact-cta"
                      >
                        Get in Touch
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/portfolio">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto rounded-xl font-bold border-border hover:border-primary/30 hover:bg-muted/40"
                        data-testid="link-more-projects"
                      >
                        More Projects
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.section>

          </div>
        </div>
      </div>
    </div>
  );
}
