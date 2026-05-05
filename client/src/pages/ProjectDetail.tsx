import { useRoute, Link } from "wouter";
import { useProject } from "@/hooks/use-projects";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, ExternalLink, Github, Calendar, Tag,
  Star, CheckCircle2, Clock, Code2, ArrowUpRight,
  Layers, Zap, Globe
} from "lucide-react";

/* ── animation presets ── */
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0, distance = 24) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.55, delay },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, delay, ease },
});

/* ═══════════════════════════════════════════════════════ */

export default function ProjectDetail() {
  const [, params] = useRoute("/portfolio/:id");
  const { data: project, isLoading } = useProject(params?.id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-[3px] border-primary/20" />
            <div className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-[3px] border-transparent border-t-primary" />
          </div>
          <p className="text-[11px] text-muted-foreground tracking-[0.2em] uppercase animate-pulse">Loading project</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
            <Code2 className="w-7 h-7 text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Project not found</h2>
            <p className="text-sm text-muted-foreground mt-1">The project may have been removed or the link is invalid.</p>
          </div>
          <Link href="/portfolio">
            <Button variant="outline" data-testid="link-back-404" className="rounded-xl">
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

      {/* ══════════════════════════════════════════════════════
          HERO — cinematic full-width image with overlay
      ══════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">

        {/* Background image */}
        <div className="relative w-full h-[55vh] sm:h-[65vh] lg:h-[75vh] min-h-[360px] max-h-[720px]">
          <motion.div
            initial={{ scale: 1.06 }}
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

          {/* Multi-layer overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d1a] via-[#0b0d1a]/60 to-[#0b0d1a]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d1a]/70 via-transparent to-transparent" />

          {/* Floating badge — top right */}
          <motion.div
            {...scaleIn(0.8)}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 flex items-center gap-2 backdrop-blur-xl bg-black/30 border border-white/10 rounded-full px-3 py-1.5 sm:px-4 sm:py-2"
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] sm:text-xs text-white/80 font-semibold tracking-wide">{project.category}</span>
          </motion.div>

          {/* Status chip — bottom right (desktop) */}
          <motion.div
            {...scaleIn(0.95)}
            className={`hidden sm:flex absolute bottom-8 right-8 items-center gap-2 backdrop-blur-xl bg-black/30 border rounded-full px-4 py-2 ${isCompleted ? "border-emerald-500/30" : "border-sky-400/30"}`}
          >
            {isCompleted
              ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              : <Clock className="h-3.5 w-3.5 text-sky-400" />
            }
            <span className="text-xs text-white/80 font-semibold">{isCompleted ? completedLabel : "In Progress"}</span>
          </motion.div>

          {/* Hero text overlay — bottom left */}
          <div className="absolute inset-x-0 bottom-0 px-5 sm:px-10 lg:px-16 xl:px-24 pb-10 sm:pb-14 lg:pb-16">
            <div className="max-w-7xl mx-auto">

              {/* Back nav */}
              <motion.div {...fadeIn(0.05)} className="mb-5 sm:mb-6">
                <Link href="/portfolio">
                  <button
                    className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/80 transition-colors duration-200 text-xs font-medium group"
                    data-testid="link-back-portfolio"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Portfolio</span>
                    <span className="text-white/20 mx-0.5">/</span>
                    <span className="text-white/55 truncate max-w-[160px]">{project.title}</span>
                  </button>
                </Link>
              </motion.div>

              {/* Badges */}
              <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-2 mb-4 sm:mb-5">
                <StatusBadge color="primary">{project.category}</StatusBadge>
                {project.featured && (
                  <StatusBadge color="amber">
                    <Star className="w-2.5 h-2.5 fill-current mr-1" /> Featured
                  </StatusBadge>
                )}
                <StatusBadge color={isCompleted ? "emerald" : "sky"}>
                  {isCompleted
                    ? <><CheckCircle2 className="w-2.5 h-2.5 mr-1" /> Completed</>
                    : <><Clock className="w-2.5 h-2.5 mr-1" /> In Progress</>
                  }
                </StatusBadge>
              </motion.div>

              {/* Title */}
              <motion.h1
                {...fadeUp(0.18)}
                className="font-display font-bold text-white leading-[1.05] tracking-tight mb-3 sm:mb-4"
                style={{ fontSize: "clamp(1.75rem, 5vw, 3.75rem)" }}
              >
                {project.title}
              </motion.h1>

              {/* Short description */}
              <motion.p
                {...fadeUp(0.26)}
                className="text-sm sm:text-base lg:text-lg text-white/55 leading-relaxed max-w-2xl mb-6 sm:mb-8"
              >
                {project.description}
              </motion.p>

              {/* CTA buttons */}
              <motion.div {...fadeUp(0.33)} className="flex flex-wrap gap-3">
                {project.projectUrl && (
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" data-testid="button-live-demo">
                    <Button
                      size="lg"
                      className="h-11 sm:h-12 px-5 sm:px-7 rounded-xl text-sm font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/40 transition-all"
                    >
                      <Globe className="mr-2 h-4 w-4" /> View Live Project
                    </Button>
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-testid="button-github-repo">
                    <Button
                      size="lg"
                      className="h-11 sm:h-12 px-5 sm:px-7 rounded-xl text-sm font-bold border border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all bg-white/5 backdrop-blur-sm"
                    >
                      <Github className="mr-2 h-4 w-4" /> Source Code
                    </Button>
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS STRIP — quick-glance metadata bar
      ══════════════════════════════════════════════════════ */}
      <div className="border-y border-border bg-card/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex items-center flex-wrap gap-0 divide-x divide-border"
          >
            <StatPill icon={<Tag className="h-3.5 w-3.5 text-primary" />} label="Category" value={project.category} />
            <StatPill
              icon={isCompleted ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <Clock className="h-3.5 w-3.5 text-sky-500" />}
              label={isCompleted ? "Completed" : "Status"}
              value={completedLabel}
            />
            {project.technologies?.length > 0 && (
              <StatPill icon={<Layers className="h-3.5 w-3.5 text-primary" />} label="Tech Stack" value={`${project.technologies.length} Technologies`} />
            )}
            {project.featured && (
              <StatPill icon={<Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />} label="Recognition" value="Featured Project" />
            )}
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          BODY
      ══════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-16">

          {/* ── SIDEBAR ────────────────────────────────────── */}
          <aside className="w-full lg:w-[280px] xl:w-[300px] shrink-0 order-first lg:order-last">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease }}
              className="lg:sticky lg:top-24 flex flex-col gap-4"
            >

              {/* Meta card */}
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="h-[3px] bg-gradient-to-r from-primary via-primary/50 to-transparent" />

                <div className="divide-y divide-border">
                  <SidebarRow
                    icon={<Tag className="h-3.5 w-3.5 text-primary" />}
                    label="Category"
                    value={project.category}
                  />
                  <SidebarRow
                    icon={<Calendar className="h-3.5 w-3.5 text-primary" />}
                    label={isCompleted ? "Completed" : "Status"}
                    value={completedLabel}
                    suffix={isCompleted
                      ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      : <Clock className="h-4 w-4 text-sky-500" />
                    }
                  />
                  {project.technologies?.length > 0 && (
                    <SidebarRow
                      icon={<Code2 className="h-3.5 w-3.5 text-primary" />}
                      label="Tech Stack"
                      value={`${project.technologies.length} Technologies`}
                    />
                  )}
                  {project.featured && (
                    <SidebarRow
                      icon={<Zap className="h-3.5 w-3.5 text-amber-500" />}
                      label="Recognition"
                      value="Featured Project"
                    />
                  )}
                </div>

                {(project.projectUrl || project.githubUrl) && (
                  <div className="p-4 flex flex-col gap-2.5 bg-muted/20">
                    {project.projectUrl && (
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" data-testid="button-live-demo-sidebar">
                        <Button size="lg" className="w-full h-11 rounded-xl text-sm font-bold bg-primary hover:bg-primary/90 shadow-md shadow-primary/20">
                          <ExternalLink className="mr-2 h-4 w-4" /> View Live Project
                        </Button>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-testid="button-github-sidebar">
                        <Button variant="outline" size="lg" className="w-full h-11 rounded-xl text-sm font-bold border-border hover:border-primary/40 hover:bg-muted/50">
                          <Github className="mr-2 h-4 w-4" /> Source Code
                        </Button>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Contact nudge card */}
              <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/8 via-primary/4 to-transparent p-5 overflow-hidden relative">
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
                <p className="text-sm font-bold text-foreground mb-1 relative">Like what you see?</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 relative">
                  Let's build something amazing together for your next project.
                </p>
                <Link href="/contact">
                  <Button size="sm" className="w-full rounded-xl text-xs font-bold bg-primary hover:bg-primary/90" data-testid="button-sidebar-contact">
                    Get in Touch <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>

            </motion.div>
          </aside>

          {/* ── MAIN CONTENT ─────────────────────────────── */}
          <main className="flex-1 min-w-0 order-last lg:order-first">

            {/* Lead quote */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease }}
              className="relative pl-5 sm:pl-6 mb-12 sm:mb-14"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-primary via-primary/60 to-primary/10" />
              <p className="text-base sm:text-lg lg:text-xl text-foreground font-medium leading-[1.8]">
                {project.description}
              </p>
            </motion.div>

            {/* About section */}
            <ContentSection title="About the Project" icon={<Code2 className="h-4 w-4 text-primary" />}>
              <div className="space-y-4">
                {paragraphs.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className="text-sm sm:text-base text-muted-foreground leading-[1.95]"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            </ContentSection>

            {/* Technologies section */}
            {project.technologies?.length > 0 && (
              <ContentSection title="Technologies Used" icon={<Layers className="h-4 w-4 text-primary" />}>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {project.technologies.map((tech, i) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.82, y: 6 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.32, delay: i * 0.04 }}
                      data-testid={`tech-chip-${i}`}
                    >
                      <TechChip label={tech} />
                    </motion.div>
                  ))}
                </div>
              </ContentSection>
            )}

            {/* CTA section */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease }}
              className="mt-12 sm:mt-14 rounded-2xl sm:rounded-3xl overflow-hidden relative"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
              <div className="absolute inset-0 border border-primary/12 rounded-2xl sm:rounded-3xl" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/50 via-primary/30 to-transparent" />

              {/* Decorative blob */}
              <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-primary/8 blur-3xl pointer-events-none" />

              <div className="relative p-7 sm:p-9 lg:p-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
                  <div className="flex-1 min-w-0">
                    <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full mb-3">
                      <Zap className="h-3 w-3" /> Work Together
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-[1.6rem] font-display font-bold text-foreground mb-2 leading-snug">
                      Interested in collaborating?
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                      Let's turn your idea into a polished product. Reach out and start a conversation.
                    </p>
                  </div>
                  <div className="flex flex-row sm:flex-col gap-2.5 shrink-0">
                    <Link href="/contact">
                      <Button
                        size="lg"
                        className="w-full sm:w-44 h-11 rounded-xl font-bold text-sm bg-primary hover:bg-primary/90 shadow-md shadow-primary/25"
                        data-testid="button-contact-cta"
                      >
                        Get in Touch <ArrowUpRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/portfolio">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-44 h-11 rounded-xl font-bold text-sm border-border hover:border-primary/30 hover:bg-muted/40"
                        data-testid="link-more-projects"
                      >
                        More Projects
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

          </main>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────── */

function StatusBadge({ children, color }: { children: React.ReactNode; color: "primary" | "amber" | "emerald" | "sky" }) {
  const styles = {
    primary: "bg-primary/90 text-white shadow-primary/30 border-primary/20",
    amber:   "bg-amber-500/90 text-white shadow-amber-500/30 border-amber-400/20",
    emerald: "bg-emerald-500/90 text-white shadow-emerald-500/30 border-emerald-400/20",
    sky:     "bg-sky-500/90 text-white shadow-sky-500/30 border-sky-400/20",
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase shadow-lg border backdrop-blur-sm ${styles[color]}`}>
      {children}
    </span>
  );
}

function StatPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 px-5 sm:px-7 py-4 sm:py-5 first:pl-0 last:pr-0">
      <span className="shrink-0">{icon}</span>
      <div className="hidden xs:block">
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-muted-foreground leading-none mb-0.5">{label}</p>
        <p className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">{value}</p>
      </div>
      <div className="xs:hidden">
        <p className="text-xs font-semibold text-foreground whitespace-nowrap">{value}</p>
      </div>
    </div>
  );
}

function SidebarRow({ icon, label, value, suffix }: { icon: React.ReactNode; label: string; value: string; suffix?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3.5 px-4 py-3.5">
      <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 border border-primary/10">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground leading-none mb-1">{label}</p>
        <p className="text-sm font-semibold text-foreground truncate">{value}</p>
      </div>
      {suffix && <div className="shrink-0">{suffix}</div>}
    </div>
  );
}

function ContentSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 sm:mb-14"
    >
      <div className="flex items-center gap-2.5 mb-6 sm:mb-7">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/15">
          {icon}
        </div>
        <h2 className="text-lg sm:text-xl font-display font-bold text-foreground tracking-tight">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function TechChip({ label }: { label: string }) {
  return (
    <div className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-card border border-border rounded-xl hover:border-primary/40 hover:bg-primary/4 hover:shadow-sm transition-all duration-200 cursor-default">
      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
        <Code2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">{label}</span>
    </div>
  );
}
