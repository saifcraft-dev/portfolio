import { useRoute, Link } from "wouter";
import { useProject } from "@/hooks/use-projects";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, ExternalLink, Github, Calendar, Tag,
  Star, CheckCircle2, Clock, ChevronRight, Code2,
  ArrowUpRight, MousePointer2
} from "lucide-react";

/* ── animation presets ── */
const ease = [0.22, 1, 0.36, 1] as const;

const slideUp = (delay = 0, distance = 28) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

const slideIn = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, delay, ease },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, delay },
});

/* ═══════════════════════════════════════════════════════ */

export default function ProjectDetail() {
  const [, params] = useRoute("/portfolio/:id");
  const { data: project, isLoading } = useProject(params?.id || "");

  /* loading */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-primary border-r-transparent" />
          <p className="text-[11px] text-muted-foreground tracking-[0.2em] uppercase animate-pulse">Loading project</p>
        </div>
      </div>
    );
  }

  /* not found */
  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto">
            <Code2 className="w-7 h-7 text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Project not found</h2>
            <p className="text-sm text-muted-foreground mt-1">The project may have been removed or the link is invalid.</p>
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

      {/* ══════════════════════════════════════════════════════════
          HERO  —  asymmetric split: dark left panel + image right
          Mobile:   image top → content below
          Tablet:   same stack, bigger image
          Desktop:  side-by-side, full viewport height
      ══════════════════════════════════════════════════════════ */}
      <section className="flex flex-col lg:flex-row min-h-[100svh] lg:min-h-screen w-full overflow-hidden">

        {/* ── LEFT: dark editorial panel ───────────────────────── */}
        <div
          className="
            relative flex flex-col order-2 lg:order-1
            w-full lg:w-[52%] xl:w-[50%]
            px-5 sm:px-10 lg:px-14 xl:px-20
            pt-6 pb-10
            lg:pt-0 lg:pb-0
            lg:justify-center
            bg-[#0b0d1a]
            overflow-hidden
          "
        >
          {/* Dot-grid texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Primary glow blob — top-left */}
          <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-primary/20 blur-[96px] pointer-events-none" />
          {/* Secondary glow — bottom-right */}
          <div className="absolute -bottom-24 right-0 w-56 h-56 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />

          {/* Right-edge accent line (desktop only) */}
          <div className="hidden lg:block absolute right-0 top-[15%] bottom-[15%] w-[2px] bg-gradient-to-b from-transparent via-primary/50 to-transparent" />

          {/* Inner content — constrained width so text doesn't stretch too wide */}
          <div className="relative z-10 w-full max-w-xl mx-auto lg:mx-0 flex flex-col gap-0">

            {/* Breadcrumb (always visible, different top padding on mobile) */}
            <motion.nav
              {...fadeIn(0.08)}
              className="flex items-center gap-1.5 text-white/40 text-xs select-none mb-8 sm:mb-10 lg:mb-14 pt-[72px] sm:pt-[84px] lg:pt-0"
            >
              <Link href="/portfolio">
                <button
                  className="flex items-center gap-1 text-white/40 hover:text-white/80 transition-colors duration-200 group"
                  data-testid="link-back-portfolio"
                >
                  <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  <span className="font-medium">Portfolio</span>
                </button>
              </Link>
              <ChevronRight className="h-3 w-3 text-white/20" />
              <span className="text-white/50 truncate max-w-[130px] sm:max-w-[200px] font-medium">{project.title}</span>
            </motion.nav>

            {/* Badges */}
            <motion.div {...slideUp(0.14)} className="flex flex-wrap gap-2 mb-6 sm:mb-7">
              <HeroBadge color="primary">{project.category}</HeroBadge>
              {project.featured && (
                <HeroBadge color="amber">
                  <Star className="w-2.5 h-2.5 fill-current mr-1" /> Featured
                </HeroBadge>
              )}
              <HeroBadge color={isCompleted ? "emerald" : "sky"}>
                {isCompleted
                  ? <><CheckCircle2 className="w-2.5 h-2.5 mr-1" /> Completed</>
                  : <><Clock className="w-2.5 h-2.5 mr-1" /> In Progress</>
                }
              </HeroBadge>
            </motion.div>

            {/* Title */}
            <motion.h1
              {...slideUp(0.22)}
              className="font-display font-bold text-white leading-[1.07] tracking-tight mb-5 sm:mb-6"
              style={{ fontSize: "clamp(1.85rem, 4.5vw, 3.5rem)" }}
            >
              {project.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              {...slideUp(0.3)}
              className="text-sm sm:text-base text-white/55 leading-[1.8] mb-8 sm:mb-10 max-w-lg"
            >
              {project.description}
            </motion.p>

            {/* Meta row */}
            <motion.div {...slideUp(0.36)} className="flex flex-wrap gap-x-6 gap-y-3 mb-9 sm:mb-11">
              <MetaItem icon={<Tag className="h-3.5 w-3.5" />} label="Category" value={project.category} />
              <MetaItem icon={<Calendar className="h-3.5 w-3.5" />} label={isCompleted ? "Completed" : "Status"} value={completedLabel} />
              {project.technologies?.length > 0 && (
                <MetaItem icon={<Code2 className="h-3.5 w-3.5" />} label="Tech Stack" value={`${project.technologies.length} technologies`} />
              )}
            </motion.div>

            {/* CTA buttons */}
            <motion.div {...slideUp(0.42)} className="flex flex-wrap gap-3">
              {project.projectUrl && (
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" data-testid="button-live-demo">
                  <Button
                    size="lg"
                    className="h-12 px-6 rounded-xl text-sm font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> View Live Project
                  </Button>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-testid="button-github-repo">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-6 rounded-xl text-sm font-bold border-white/15 text-white hover:bg-white/8 hover:border-white/30 transition-all bg-transparent"
                  >
                    <Github className="mr-2 h-4 w-4" /> Source Code
                  </Button>
                </a>
              )}
            </motion.div>

            {/* Scroll hint (desktop only) */}
            <motion.div
              {...fadeIn(1.0)}
              className="hidden lg:flex items-center gap-2 mt-16 text-white/25 text-[11px] tracking-[0.15em] uppercase"
            >
              <MousePointer2 className="h-3.5 w-3.5" />
              <span>Scroll to explore</span>
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT: project image ──────────────────────────────── */}
        <div className="relative order-1 lg:order-2 w-full lg:flex-1 h-[42vh] sm:h-[52vh] lg:h-auto overflow-hidden">

          {/* Image with zoom-in entrance */}
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Dark tint overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Left-edge gradient fade INTO the dark panel (desktop only) */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#0b0d1a] to-transparent" />

          {/* Bottom fade into page background (mobile) */}
          <div className="lg:hidden absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0b0d1a] to-transparent" />

          {/* Category label floating over image (desktop) */}
          <motion.div
            {...slideIn(0.5)}
            className="hidden lg:flex absolute top-8 right-8 items-center gap-2 backdrop-blur-md bg-black/40 border border-white/10 rounded-full px-4 py-2"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-white/80 font-semibold tracking-wide">{project.category}</span>
          </motion.div>

          {/* Completion status chip floating (desktop) */}
          <motion.div
            {...slideIn(0.62)}
            className={`hidden lg:flex absolute bottom-8 right-8 items-center gap-2 backdrop-blur-md bg-black/40 border border-white/10 rounded-full px-4 py-2 ${isCompleted ? "border-emerald-500/30" : "border-sky-500/30"}`}
          >
            {isCompleted
              ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              : <Clock className="h-3.5 w-3.5 text-sky-400" />
            }
            <span className="text-xs text-white/80 font-semibold">{isCompleted ? completedLabel : "In Progress"}</span>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BODY
      ══════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-20">

          {/* ── SIDEBAR ────────────────────────────────────────── */}
          <aside className="w-full lg:w-[300px] xl:w-[320px] shrink-0 order-first lg:order-last">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="lg:sticky lg:top-24 flex flex-col gap-4"
            >

              {/* Meta card */}
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="h-[3px] bg-gradient-to-r from-primary via-primary/60 to-transparent" />
                <div className="divide-y divide-border">
                  <SidebarRow icon={<Tag className="h-3.5 w-3.5 text-primary" />} label="Category" value={project.category} />
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
                </div>

                {(project.projectUrl || project.githubUrl) && (
                  <div className="p-5 flex flex-col gap-2.5">
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

              {/* Featured callout */}
              {project.featured && (
                <div className="flex items-center gap-3.5 rounded-2xl border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/20 px-5 py-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Featured Project</p>
                    <p className="text-xs text-amber-600/60 dark:text-amber-500/60 mt-0.5">Highlighted as top work</p>
                  </div>
                </div>
              )}

              {/* Desktop contact nudge */}
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

          {/* ── MAIN CONTENT ───────────────────────────────────── */}
          <main className="flex-1 min-w-0 order-last lg:order-first space-y-14 sm:space-y-16">

            {/* Lead */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="border-l-[3px] border-primary pl-5 sm:pl-6"
            >
              <p className="text-base sm:text-lg lg:text-xl text-foreground font-medium leading-[1.75]">
                {project.description}
              </p>
            </motion.div>

            {/* About */}
            <Section title="About the Project">
              <div className="space-y-4 sm:space-y-5">
                {paragraphs.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    className="text-sm sm:text-[0.9375rem] lg:text-base text-muted-foreground leading-[1.9]"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            </Section>

            {/* Technologies */}
            {project.technologies?.length > 0 && (
              <Section title="Technologies Used">
                <div className="flex flex-wrap gap-2.5">
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
              transition={{ duration: 0.6, ease }}
              className="rounded-2xl sm:rounded-3xl border border-primary/12 bg-gradient-to-br from-primary/7 via-primary/3 to-transparent p-7 sm:p-9 lg:p-10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary mb-2">Work Together</p>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2 leading-snug">
                    Interested in collaborating?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Let's turn your idea into a polished product. Reach out and start a conversation.
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

/* ── Sub-components ─────────────────────────────────────── */

function HeroBadge({ children, color }: { children: React.ReactNode; color: "primary" | "amber" | "emerald" | "sky" }) {
  const styles = {
    primary: "bg-primary text-primary-foreground shadow-primary/35",
    amber:   "bg-amber-500 text-white shadow-amber-500/35",
    emerald: "bg-emerald-500 text-white shadow-emerald-500/35",
    sky:     "bg-sky-500 text-white shadow-sky-500/35",
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase shadow-lg ${styles[color]}`}>
      {children}
    </span>
  );
}

function MetaItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-white/35">{icon}</span>
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/30 leading-none mb-0.5">{label}</p>
        <p className="text-xs font-semibold text-white/60">{value}</p>
      </div>
    </div>
  );
}

function SidebarRow({ icon, label, value, suffix }: { icon: React.ReactNode; label: string; value: string; suffix?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">  {label}</p>
        <p className="text-sm font-semibold text-foreground mt-0.5 truncate">{value}</p>
      </div>
      {suffix && <div className="shrink-0">{suffix}</div>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3 mb-6 sm:mb-7">
        <div className="w-[3px] h-6 sm:h-7 bg-primary rounded-full" />
        <h2 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-foreground tracking-tight">{title}</h2>
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
