import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useOrders, useUpdateOrder } from "@/hooks/use-orders";
import { Order } from "@/types";
import { MoreHorizontal, Eye, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const statusIcons = {
  'pending': Clock,
  'in-progress': AlertCircle,
  'completed': CheckCircle2,
  'cancelled': XCircle
};

const statusColors = {
  'pending': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  'in-progress': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'completed': 'bg-green-500/10 text-green-500 border-green-500/20',
  'cancelled': 'bg-red-500/10 text-red-500 border-red-500/20'
};

export default function OrdersManagement() {
  const { data: orders, isLoading } = useOrders();
  const updateOrder = useUpdateOrder();

  const handleStatusUpdate = async (id: string, status: Order['status']) => {
    await updateOrder.mutateAsync({ id, data: { status } });
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
        <h1 className="text-3xl font-bold tracking-tight">Orders Management</h1>
        <Badge variant="outline" className="px-3 py-1">
          {orders?.length || 0} Total Orders
        </Badge>
      </div>

      <div className="border rounded-lg bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order: Order) => {
              const StatusIcon = statusIcons[order.status];
              return (
                <TableRow key={order.id} className="group">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{order.clientName}</span>
                      <span className="text-xs text-muted-foreground">{order.clientEmail}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{order.serviceType}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {order.createdAt ? format(new Date(order.createdAt), 'MMM dd, yyyy') : 'N/A'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[order.status]}>
                      <StatusIcon className="mr-1 h-3 w-3" />
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={order.priority === 'high' ? 'destructive' : 'outline'}>
                      {order.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="icon" variant="ghost" className="h-8 w-8 hover-elevate">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Order Details</DialogTitle>
                            <DialogDescription>
                              Full request information for {order.clientName}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Client Information</p>
                                <p className="text-sm">{order.clientName} ({order.clientEmail})</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Project Timeline</p>
                                <p className="text-sm">{order.timeline}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Budget Range</p>
                                <p className="text-sm">{order.budget}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Service Type</p>
                                <p className="text-sm">{order.serviceType}</p>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-muted-foreground">Project Description</p>
                              <p className="text-sm p-3 bg-muted rounded-md italic">
                                "{order.projectDescription}"
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost" className="h-8 w-8 hover-elevate">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'in-progress')}>
                            Mark In Progress
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'completed')}>
                            Mark Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'cancelled')} className="text-destructive">
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}