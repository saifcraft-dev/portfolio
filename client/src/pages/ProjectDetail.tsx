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
        <h2 className="text-2xl text-white mb-4">Project not found</h2>
        <Link href="/portfolio">
          <Button variant="outline">Back to Portfolio</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="container mx-auto px-4 pb-12 max-w-7xl">
            <Link href="/portfolio">
              <Button variant="ghost" className="text-white mb-6 hover:bg-white/10 -ml-4" data-testid="link-back-portfolio">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-primary text-white border-none px-3 py-1">
                {project.category}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-display font-bold text-white mb-6">About the Project</h2>
              <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                {(project.longDescription || project.description).split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </section>

            {project.technologies && (
              <section>
                <h2 className="text-2xl font-display font-bold text-white mb-6">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <div 
                      key={tech}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300"
                    >
                      <Layers className="h-4 w-4 text-primary" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-white/5 rounded-2xl p-8 sticky top-24">
              <h3 className="text-xl font-display font-bold text-white mb-8">Project Details</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Tag className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Category</p>
                    <p className="text-white">{project.category}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Completed Date</p>
                    <p className="text-white">
                      {project.completedDate ? new Date(project.completedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4">
                {project.projectUrl && (
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white" data-testid="button-live-demo">
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button asChild variant="outline" className="w-full border-white/10 text-white hover:bg-white/5" data-testid="button-github-repo">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub Repo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
