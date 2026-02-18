import { useState, useRef } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from "@/hooks/use-projects";
import { Project } from "@/types";
import { Plus, Pencil, Trash2, ExternalLink, Github, Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsManagement() {
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    longDescription: "",
    category: "",
    imageUrl: "",
    projectUrl: "",
    githubUrl: "",
    technologies: [],
    featured: false,
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({ title: "Invalid file type", description: "Please upload an image", variant: "destructive" });
      return;
    }

    // Validate file size (e.g., 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Maximum size is 5MB", variant: "destructive" });
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      setFormData(prev => ({ ...prev, imageUrl: data.url }));
      toast({ title: "Image uploaded successfully to Cloudinary" });
    } catch (error) {
      console.error("Upload failed:", error);
      toast({ title: "Upload failed", description: "Please try again", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, imageUrl: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Submitting form data:", formData);
      const dataToSubmit = {
        ...formData,
        technologies: formData.technologies || [],
        featured: !!formData.featured,
        completedDate: formData.completedDate || new Date().toISOString().split('T')[0],
      };

      if (editingProject) {
        await updateProject.mutateAsync({ id: editingProject.id, ...dataToSubmit });
        toast({ title: "Project updated successfully" });
      } else {
        await createProject.mutateAsync(dataToSubmit as Omit<Project, 'id'>);
        toast({ title: "Project created successfully" });
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Project operation failed:", error);
      toast({ 
        title: "Operation failed", 
        description: error instanceof Error ? error.message : "Check console for details",
        variant: "destructive" 
      });
    }
  };

  const resetForm = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      longDescription: "",
      category: "",
      imageUrl: "",
      projectUrl: "",
      githubUrl: "",
      technologies: [],
      featured: false,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject.mutateAsync(id);
        toast({ title: "Project deleted" });
      } catch (error) {
        toast({ title: "Delete failed", variant: "destructive" });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Portfolio Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="hover-elevate">
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})} 
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Input 
                  id="description" 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longDescription">Long Description</Label>
                <Textarea 
                  id="longDescription" 
                  value={formData.longDescription} 
                  onChange={e => setFormData({...formData, longDescription: e.target.value})} 
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies Used (comma-separated)</Label>
                <Input 
                  id="technologies" 
                  value={formData.technologies?.join(", ")} 
                  onChange={e => setFormData({...formData, technologies: e.target.value.split(",").map(t => t.trim()).filter(t => t !== "")})} 
                  placeholder="React, TypeScript, Tailwind CSS"
                />
              </div>
              
              <div className="space-y-4 border rounded-lg p-4 bg-muted/30">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Project Image</Label>
                  {formData.imageUrl && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={removeImage}
                      className="text-destructive h-8 px-2"
                    >
                      <X className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  )}
                </div>

                {formData.imageUrl ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden border bg-background group">
                    <img 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button 
                        type="button" 
                        variant="secondary" 
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Change Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed rounded-lg aspect-video flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors border-muted-foreground/20"
                  >
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">Click to upload image</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (max. 5MB)</p>
                    </div>
                  </div>
                )}
                
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden" 
                  accept="image/*"
                />
                
                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="text-xs text-muted-foreground">Or provide an Image URL</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="imageUrl" 
                      value={formData.imageUrl} 
                      onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                      placeholder="https://example.com/image.jpg"
                      className="h-8 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectUrl">Live URL</Label>
                  <Input 
                    id="projectUrl" 
                    value={formData.projectUrl} 
                    onChange={e => setFormData({...formData, projectUrl: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input 
                    id="githubUrl" 
                    value={formData.githubUrl} 
                    onChange={e => setFormData({...formData, githubUrl: e.target.value})} 
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="featured" 
                  checked={formData.featured} 
                  onChange={e => setFormData({...formData, featured: e.target.checked})}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={createProject.isPending || updateProject.isPending || isUploading}>
                  {(createProject.isPending || updateProject.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingProject ? "Update Project" : "Create Project"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Links</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((project: Project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-muted flex-shrink-0 overflow-hidden">
                      {project.imageUrl ? (
                        <img src={project.imageUrl} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">No Img</div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{project.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{project.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{project.category}</Badge>
                </TableCell>
                <TableCell>
                  {project.featured ? (
                    <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Yes</Badge>
                  ) : (
                    <span className="text-muted-foreground text-sm">No</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {project.projectUrl && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                    {project.githubUrl && <Github className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8 hover-elevate" onClick={() => handleEdit(project)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 hover-elevate text-destructive" onClick={() => handleDelete(project.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}