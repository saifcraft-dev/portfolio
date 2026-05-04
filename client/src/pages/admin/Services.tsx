import { useState, useMemo } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useServices, useCreateService, useUpdateService, useDeleteService } from "@/hooks/use-services";
import { Service } from "@/types";
import { Plus, Pencil, Trash2, Loader2, X, Layers, Search, Clock, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useImageUpload } from "@/hooks/useImageUpload";

export default function ServicesManagement() {
  const { data: services, isLoading } = useServices();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();
  const imageUpload = useImageUpload();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState<Partial<Service>>({
    title: "",
    description: "",
    category: "",
    pricing: "",
    deliveryTime: "",
    active: true,
    features: [],
    imageUrl: "",
  });
  const [featureInput, setFeatureInput] = useState("");

  const filtered = useMemo(() => {
    if (!services) return [];
    const q = search.trim().toLowerCase();
    if (!q) return services as Service[];
    return (services as Service[]).filter(
      s =>
        s.title?.toLowerCase().includes(q) ||
        s.category?.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q)
    );
  }, [services, search]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const imageUrl = await imageUpload.mutateAsync(file);
      setFormData(prev => ({ ...prev, imageUrl }));
      toast({ title: "Image uploaded successfully" });
    } catch {
      toast({ title: "Upload failed", variant: "destructive" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService) {
        await updateService.mutateAsync({ id: editingService.id, ...formData });
        toast({ title: "Service updated successfully" });
      } else {
        await createService.mutateAsync(formData as Omit<Service, "id">);
        toast({ title: "Service created successfully" });
      }
      setIsDialogOpen(false);
      resetForm();
    } catch {
      toast({ title: "Operation failed", variant: "destructive" });
    }
  };

  const resetForm = () => {
    setEditingService(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      pricing: "",
      deliveryTime: "",
      active: true,
      features: [],
      imageUrl: "",
    });
    setFeatureInput("");
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData(service);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteService.mutateAsync(id);
      toast({ title: "Service deleted" });
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({ ...formData, features: [...(formData.features || []), featureInput.trim()] });
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: (formData.features || []).filter((_, i) => i !== index) });
  };

  const toggleActive = async (service: Service) => {
    try {
      await updateService.mutateAsync({ id: service.id, active: !service.active });
      toast({ title: `Service ${!service.active ? "activated" : "deactivated"}` });
    } catch {
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-9 w-32" />
        </div>
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  const activeCount = (services as Service[] | undefined)?.filter(s => s.active).length || 0;
  const inactiveCount = (services?.length || 0) - activeCount;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage the services displayed on your public site.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-service">
              <Plus className="mr-2 h-4 w-4" /> Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    required
                    data-testid="input-service-title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Development, Design"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What's included in this service"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pricing">
                    <DollarSign className="inline h-3 w-3 mr-1" />
                    Pricing <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="pricing"
                    value={formData.pricing}
                    onChange={e => setFormData({ ...formData, pricing: e.target.value })}
                    placeholder="e.g. $499 or From $999"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryTime">
                    <Clock className="inline h-3 w-3 mr-1" />
                    Delivery Time <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={e => setFormData({ ...formData, deliveryTime: e.target.value })}
                    placeholder="e.g. 5–7 days"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Features / Deliverables</Label>
                <div className="flex gap-2">
                  <Input
                    value={featureInput}
                    onChange={e => setFeatureInput(e.target.value)}
                    placeholder="Add a feature or deliverable…"
                    onKeyDown={e => {
                      if (e.key === "Enter") { e.preventDefault(); addFeature(); }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={addFeature} className="flex-shrink-0">
                    Add
                  </Button>
                </div>
                {(formData.features?.length || 0) > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 p-2 rounded-lg bg-muted/40 border">
                    {formData.features?.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="flex items-center gap-1 text-xs">
                        {feature}
                        <button type="button" onClick={() => removeFeature(idx)} className="ml-0.5 hover:text-destructive transition-colors">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceImage">Service Image (Optional)</Label>
                <div className="flex items-center gap-4">
                  {formData.imageUrl && (
                    <div className="h-16 w-16 rounded-lg border overflow-hidden bg-muted flex-shrink-0">
                      <img src={formData.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <Input type="file" onChange={handleFileUpload} accept="image/*" className="cursor-pointer" />
                    {imageUpload.isPending && (
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" /> Uploading…
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                <div>
                  <p className="text-sm font-medium">Active Service</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Visible on the public services page</p>
                </div>
                <Switch
                  checked={!!formData.active}
                  onCheckedChange={checked => setFormData({ ...formData, active: checked })}
                  data-testid="switch-active"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createService.isPending || updateService.isPending || imageUpload.isPending}
                  data-testid="button-submit-service"
                >
                  {(createService.isPending || updateService.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingService ? "Save Changes" : "Create Service"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search services…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-9"
            data-testid="input-service-search"
          />
        </div>
        <div className="flex gap-2 text-xs text-muted-foreground">
          <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-medium">
            {activeCount} active
          </span>
          {inactiveCount > 0 && (
            <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground border font-medium">
              {inactiveCount} inactive
            </span>
          )}
        </div>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-4">Service</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden sm:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">Delivery</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right pr-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Layers className="h-8 w-8 text-muted-foreground/30" />
                    <p className="text-sm font-medium text-muted-foreground">
                      {search ? "No services match your search." : "No services yet."}
                    </p>
                    {search ? (
                      <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => setSearch("")}>
                        Clear search
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="mt-1 h-7 text-xs" onClick={() => setIsDialogOpen(true)}>
                        <Plus className="h-3 w-3 mr-1" /> Add your first service
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((service: Service) => (
                <TableRow key={service.id} className="group hover:bg-muted/40">
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-3">
                      {service.imageUrl && (
                        <div className="h-8 w-8 rounded-md border overflow-hidden bg-muted flex-shrink-0">
                          <img src={service.imageUrl} alt="" className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="font-medium text-sm">{service.title}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">{service.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal text-xs">{service.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="font-medium text-sm">{service.pricing}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {service.deliveryTime}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => toggleActive(service)}
                      data-testid={`toggle-active-${service.id}`}
                      className="flex items-center gap-1.5 group/toggle"
                    >
                      <div className={`h-2 w-2 rounded-full ${service.active ? "bg-emerald-500" : "bg-muted-foreground/40"}`} />
                      <span className={`text-xs font-medium ${service.active ? "text-emerald-600" : "text-muted-foreground"} group-hover/toggle:underline`}>
                        {service.active ? "Active" : "Inactive"}
                      </span>
                    </button>
                  </TableCell>
                  <TableCell className="text-right pr-4">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => handleEdit(service)}
                        data-testid={`button-edit-service-${service.id}`}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" data-testid={`button-delete-service-${service.id}`}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Service</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete <strong>{service.title}</strong>? This will remove it from your public site.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(service.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {filtered.length > 0 && (
        <p className="text-xs text-muted-foreground text-right">
          Showing {filtered.length} of {services?.length || 0} services
        </p>
      )}
    </div>
  );
}
