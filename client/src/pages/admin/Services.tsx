import { useState } from "react";
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
import { useServices, useCreateService, useUpdateService, useDeleteService } from "@/hooks/use-services";
import { Service } from "@/types";
import { Plus, Pencil, Trash2, Loader2, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServicesManagement() {
  const { data: services, isLoading } = useServices();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({
    title: "",
    description: "",
    category: "",
    pricing: "",
    deliveryTime: "",
    active: true,
    features: [],
  });
  const [featureInput, setFeatureInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService) {
        await updateService.mutateAsync({ id: editingService.id, ...formData });
        toast({ title: "Service updated successfully" });
      } else {
        await createService.mutateAsync(formData as Omit<Service, 'id'>);
        toast({ title: "Service created successfully" });
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
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
    });
    setFeatureInput("");
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData(service);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService.mutateAsync(id);
        toast({ title: "Service deleted" });
      } catch (error) {
        toast({ title: "Delete failed", variant: "destructive" });
      }
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), featureInput.trim()]
      });
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: (formData.features || []).filter((_, i) => i !== index)
    });
  };

  const toggleActive = async (service: Service) => {
    try {
      await updateService.mutateAsync({ id: service.id, active: !service.active });
      toast({ title: `Service ${!service.active ? 'activated' : 'deactivated'}` });
    } catch (error) {
      toast({ title: "Update failed", variant: "destructive" });
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
        <h1 className="text-3xl font-bold tracking-tight">Services Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="hover-elevate">
              <Plus className="mr-2 h-4 w-4" /> Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
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
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pricing">Pricing</Label>
                  <Input 
                    id="pricing" 
                    value={formData.pricing} 
                    onChange={e => setFormData({...formData, pricing: e.target.value})} 
                    placeholder="e.g. $499"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryTime">Delivery Time</Label>
                  <Input 
                    id="deliveryTime" 
                    value={formData.deliveryTime} 
                    onChange={e => setFormData({...formData, deliveryTime: e.target.value})} 
                    placeholder="e.g. 5-7 days"
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Features</Label>
                <div className="flex gap-2">
                  <Input 
                    value={featureInput} 
                    onChange={e => setFeatureInput(e.target.value)} 
                    placeholder="Add a feature..."
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); }}}
                  />
                  <Button type="button" variant="outline" onClick={addFeature}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.features?.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                      {feature}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeFeature(idx)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="active" 
                  checked={formData.active} 
                  onChange={e => setFormData({...formData, active: e.target.checked})}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="active">Active Service</Label>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={createService.isPending || updateService.isPending}>
                  {(createService.isPending || updateService.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingService ? "Update Service" : "Create Service"}
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
              <TableHead>Service</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services?.map((service: Service) => (
              <TableRow key={service.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{service.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{service.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{service.category}</Badge>
                </TableCell>
                <TableCell className="font-medium">{service.pricing}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`h-8 px-2 gap-1 ${service.active ? 'text-green-500' : 'text-muted-foreground'}`}
                    onClick={() => toggleActive(service)}
                  >
                    {service.active ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    {service.active ? 'Active' : 'Inactive'}
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8 hover-elevate" onClick={() => handleEdit(service)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 hover-elevate text-destructive" onClick={() => handleDelete(service.id)}>
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