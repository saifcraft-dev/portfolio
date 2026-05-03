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
      <div className="min-h-screen bg-background pt-32 text-center">
        <h2 className="text-2xl text-foreground mb-4">Project not found</h2>
        <Link href="/portfolio">
          <Button variant="outline">Back to Portfolio</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section — dark overlay, so white text is appropriate here */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20 z-10" />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 z-20 flex items-end">
          <div className="container mx-auto px-4 pb-20 max-w-7xl">
            <Link href="/portfolio">
              <Button
                variant="ghost"
                className="text-white/80 hover:text-white mb-8 hover:bg-white/10 transition-all duration-300 -ml-4 group"
                data-testid="link-back-portfolio"
              >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Portfolio
              </Button>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Badge className="mb-6 px-4 py-1.5 text-sm font-bold tracking-wide uppercase bg-primary text-primary-foreground border-none shadow-lg shadow-primary/20">
                {project.category}
              </Badge>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
                {project.title}
              </h1>
              <p className="text-xl text-white/85 max-w-2xl font-medium leading-relaxed drop-shadow-md bg-black/25 backdrop-blur-sm p-4 rounded-2xl -ml-4 border border-white/10">
                {project.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Body — light background */}
      <div className="container mx-auto px-4 py-24 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-20">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-display font-bold text-foreground mb-8 relative inline-block">
                About the Project
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full" />
              </h2>
              <div className="max-w-none text-lg leading-relaxed space-y-6">
                {(project.longDescription || project.description).split('\n').map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground">{paragraph}</p>
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
                <h2 className="text-3xl font-display font-bold text-foreground mb-8 relative inline-block">
                  Technologies Used
                  <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full" />
                </h2>
                <div className="flex flex-wrap gap-4">
                  {project.technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center gap-3 px-6 py-3 bg-card border border-border rounded-2xl text-foreground hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 group"
                    >
                      <Layers className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{tech}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar — Project Overview */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card border border-border rounded-3xl p-10 sticky top-32 shadow-sm"
            >
              <h3 className="text-2xl font-display font-bold text-foreground mb-10">Project Overview</h3>

              <div className="space-y-8">
                <div className="flex items-center gap-5 group">
                  <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors duration-300">
                    <Tag className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black mb-1">Category</p>
                    <p className="text-lg text-foreground font-semibold">{project.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-5 group">
                  <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors duration-300">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black mb-1">Completed</p>
                    <p className="text-lg text-foreground font-semibold">
                      {project.completedDate ? new Date(project.completedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long'
                      }) : 'Ongoing'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                {project.projectUrl && (
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 h-14 rounded-2xl text-lg font-bold"
                    data-testid="button-live-demo"
                  >
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-3 h-5 w-5" />
                      View Live Project
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full border-border text-foreground hover:bg-muted/50 hover:border-primary/40 h-14 rounded-2xl text-lg font-bold"
                    data-testid="button-github-repo"
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-3 h-5 w-5" />
                      Source Code
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
