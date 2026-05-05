import { useRoute, Link } from "wouter";
import { useProject } from "@/hooks/use-projects";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, ExternalLink, Github, Calendar, Tag,
  Star, CheckCircle2, Clock, ChevronRight, Code2, ArrowUpRight
} from "lucide-react";

export default function ProjectDetail() {
  const [, params] = useRoute("/portfolio/:id");
  const { data: project, isLoading } = useProject(params?.id || "");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayO = useTransform(scrollYProgress, [0, 1], [0.55, 0.75]);

  /* ── loading ── */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-primary border-r-transparent" />
          <p className="text-xs text-muted-foreground tracking-wider uppercase animate-pulse">Loading project</p>
        </div>
      </div>
    );
  }

  /* ── not found ── */
  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto">
            <Code2 className="w-7 h-7 text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Project not found</h2>
            <p className="text-sm text-muted-foreground mt-1">This project may have been removed or the link is invalid.</p>
          </div>
          <Link href="/portfolio">
            <Button variant="outline" data-testid="link-back-404">
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
  const paragraphs = (project.longDescription || project.description).split("\n").filter(Boolean);

  return (
    <div className="min-h-screen bg-background">

      {/* ══════════════════════════════════════════
          HERO — full-bleed parallax
      ══════════════════════════════════════════ */}
      <div ref={heroRef} className="relative h-[60vh] sm:h-[68vh] lg:h-[78vh] w-full overflow-hidden">

        {/* Parallax image */}
        <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Gradient overlays */}
        <motion.div style={{ opacity: overlayO }} className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* UI layer */}
        <div className="absolute inset-0 z-10 flex flex-col max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-14">

          {/* breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="pt-20 sm:pt-24 lg:pt-28 flex items-center gap-1.5 text-white/50 text-xs sm:text-sm select-none"
          >
            <Link href="/portfolio">
              <button className="flex items-center gap-1 hover:text-white/90 transition-colors duration-200 group" data-testid="link-back-portfolio">
                <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
                <span>Portfolio</span>
              </button>
            </Link>
            <ChevronRight className="h-3 w-3 text-white/25" />
            <span className="text-white/60 truncate max-w-[140px] sm:max-w-sm">{project.title}</span>
          </motion.nav>

          {/* bottom hero text */}
          <div className="mt-auto pb-8 sm:pb-12 lg:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* badges row */}
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-amber-500 text-white shadow-lg shadow-amber-500/30">
                    <Star className="w-2.5 h-2.5 fill-current" /> Featured
                  </span>
                )}
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-lg ${isCompleted ? "bg-emerald-500 text-white shadow-emerald-500/30" : "bg-sky-500 text-white shadow-sky-500/30"}`}>
                  {isCompleted ? <CheckCircle2 className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                  {isCompleted ? "Completed" : "In Progress"}
                </span>
              </div>

              {/* title */}
              <h1 className="font-display font-bold text-white leading-[1.08] tracking-tight drop-shadow-xl max-w-4xl text-[clamp(1.75rem,5vw,3.75rem)]">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BODY
      ══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 py-10 sm:py-14 lg:py-18">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-20">

          {/* ── SIDEBAR ─────────────────────────── */}
          <aside className="w-full lg:w-[300px] xl:w-[320px] shrink-0 order-first lg:order-last">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-24 flex flex-col gap-4"
            >

              {/* ── meta card ── */}
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                {/* coloured top bar */}
                <div className="h-1 bg-gradient-to-r from-primary via-primary/70 to-transparent" />

                <div className="p-5 sm:p-6 space-y-0 divide-y divide-border">

                  {/* category */}
                  <div className="flex items-center gap-4 py-4 first:pt-0">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Tag className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Category</p>
                      <p className="text-sm font-semibold text-foreground mt-0.5 truncate">{project.category}</p>
                    </div>
                  </div>

                  {/* date */}
                  <div className="flex items-center gap-4 py-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{isCompleted ? "Completed" : "Status"}</p>
                      <p className="text-sm font-semibold text-foreground mt-0.5">{completedLabel}</p>
                    </div>
                    {isCompleted
                      ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      : <Clock className="h-4 w-4 text-sky-500 shrink-0" />
                    }
                  </div>

                  {/* tech count */}
                  {project.technologies?.length > 0 && (
                    <div className="flex items-center gap-4 py-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Code2 className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Tech Stack</p>
                        <p className="text-sm font-semibold text-foreground mt-0.5">{project.technologies.length} Technologies</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* action buttons */}
                {(project.projectUrl || project.githubUrl) && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 flex flex-col gap-2.5">
                    {project.projectUrl && (
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" data-testid="button-live-demo">
                        <Button size="lg" className="w-full h-11 rounded-xl text-sm font-bold bg-primary hover:bg-primary/90 shadow-md shadow-primary/25 transition-all">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Live Project
                        </Button>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-testid="button-github-repo">
                        <Button variant="outline" size="lg" className="w-full h-11 rounded-xl text-sm font-bold border-border hover:border-primary/40 hover:bg-muted/50 transition-all">
                          <Github className="mr-2 h-4 w-4" />
                          Source Code
                        </Button>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* ── featured callout ── */}
              {project.featured && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.42 }}
                  className="flex items-center gap-3.5 rounded-2xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/20 px-5 py-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Featured Project</p>
                    <p className="text-xs text-amber-600/60 dark:text-amber-500/60 mt-0.5">Highlighted as top work</p>
                  </div>
                </motion.div>
              )}

              {/* ── contact nudge (desktop only) ── */}
              <div className="hidden lg:block rounded-2xl border border-border bg-gradient-to-br from-primary/6 via-primary/3 to-transparent p-5">
                <p className="text-sm font-bold text-foreground mb-1">Like what you see?</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">Let's build something amazing together for your next project.</p>
                <Link href="/contact">
                  <Button size="sm" className="w-full rounded-xl text-xs font-bold bg-primary hover:bg-primary/90" data-testid="button-sidebar-contact">
                    Get in Touch <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>

            </motion.div>
          </aside>

          {/* ── MAIN CONTENT ──────────────────────── */}
          <main className="flex-1 min-w-0 order-last lg:order-first space-y-14 sm:space-y-18">

            {/* Lead description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="border-l-2 border-primary pl-5 sm:pl-6"
            >
              <p className="text-base sm:text-lg lg:text-xl text-foreground font-medium leading-relaxed">
                {project.description}
              </p>
            </motion.div>

            {/* About */}
            <Section title="About the Project" delay={0.1}>
              <div className="space-y-4 sm:space-y-5">
                {paragraphs.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    className="text-sm sm:text-[0.9375rem] lg:text-base text-muted-foreground leading-[1.9] tracking-[0.01em]"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            </Section>

            {/* Technologies */}
            {project.technologies?.length > 0 && (
              <Section title="Technologies Used" delay={0.12}>
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {project.technologies.map((tech, i) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.035 }}
                      data-testid={`tech-chip-${i}`}
                    >
                      <TechChip label={tech} />
                    </motion.div>
                  ))}
                </div>
              </Section>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl sm:rounded-3xl border border-primary/12 bg-gradient-to-br from-primary/7 via-primary/4 to-transparent p-7 sm:p-9 lg:p-11"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-2">Work Together</p>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2 leading-snug">
                    Interested in collaborating?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Let's turn your idea into a polished product. Reach out and let's start a conversation.
                  </p>
                </div>
                <div className="flex flex-col xs:flex-row sm:flex-col gap-2.5 shrink-0">
                  <Link href="/contact">
                    <Button size="lg" className="w-full sm:w-44 h-11 rounded-xl font-bold text-sm bg-primary hover:bg-primary/90 shadow-md shadow-primary/20" data-testid="button-contact-cta">
                      Get in Touch <ArrowUpRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/portfolio">
                    <Button variant="outline" size="lg" className="w-full sm:w-44 h-11 rounded-xl font-bold text-sm border-border hover:border-primary/30 hover:bg-muted/40" data-testid="link-more-projects">
                      More Projects
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

          </main>
        </div>
      </div>
    </div>
  );
}

/* ── helpers ─────────────────────────── */

function Section({ title, delay = 0, children }: { title: string; delay?: number; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3 mb-6 sm:mb-7">
        <div className="w-[3px] h-6 sm:h-7 bg-primary rounded-full" />
        <h2 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-foreground tracking-tight">
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

function TechChip({ label }: { label: string }) {
  return (
    <div className="group inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:border-primary/35 hover:bg-primary/4 transition-all duration-200 cursor-default">
      <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
        <Code2 className="h-3 w-3 text-primary" />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">{label}</span>
    </div>
  );
}
