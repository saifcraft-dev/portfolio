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
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { Input } from "@/components/ui/input";
import { useOrders, useUpdateOrder } from "@/hooks/use-orders";
import { Order } from "@/types";
import { 
  MoreHorizontal, Eye, Clock, CheckCircle2, XCircle, AlertCircle, 
  Search, ShoppingBag, Mail, Calendar, DollarSign, Tag
} from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const statusIcons = {
  pending: Clock,
  "in-progress": AlertCircle,
  completed: CheckCircle2,
  cancelled: XCircle,
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  "in-progress": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  completed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
};

const priorityColors: Record<string, string> = {
  high: "bg-red-500/10 text-red-600 border-red-500/20",
  medium: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  low: "bg-slate-500/10 text-slate-600 border-slate-500/20",
};

const statusTabs = ["all", "pending", "in-progress", "completed", "cancelled"] as const;
type StatusTab = typeof statusTabs[number];

export default function OrdersManagement() {
  const { data: orders, isLoading } = useOrders();
  const updateOrder = useUpdateOrder();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<StatusTab>("all");

  const handleStatusUpdate = async (id: string, status: Order["status"]) => {
    await updateOrder.mutateAsync({ id, data: { status } });
  };

  const filtered = useMemo(() => {
    if (!orders) return [];
    let list = orders as Order[];
    if (activeTab !== "all") list = list.filter(o => o.status === activeTab);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        o =>
          o.clientName?.toLowerCase().includes(q) ||
          o.clientEmail?.toLowerCase().includes(q) ||
          o.serviceType?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [orders, activeTab, search]);

  const counts = useMemo(() => {
    if (!orders) return {};
    const o = orders as Order[];
    return {
      all: o.length,
      pending: o.filter(x => x.status === "pending").length,
      "in-progress": o.filter(x => x.status === "in-progress").length,
      completed: o.filter(x => x.status === "completed").length,
      cancelled: o.filter(x => x.status === "cancelled").length,
    };
  }, [orders]);

  if (isLoading) {
    return (
      <div className="p-6 space-y-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-24" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage and track all client service requests.
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1.5 text-sm font-medium">
          {orders?.length || 0} Total
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by name, email or service…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-9"
            data-testid="input-order-search"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {statusTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              data-testid={`filter-${tab}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors border ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-foreground/30"
              }`}
            >
              {tab === "all" ? "All" : tab}
              {counts[tab as keyof typeof counts] !== undefined && (
                <span className={`ml-1.5 px-1 rounded text-[10px] ${activeTab === tab ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {counts[tab as keyof typeof counts]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-4">Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Priority</TableHead>
              <TableHead className="text-right pr-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <ShoppingBag className="h-8 w-8 text-muted-foreground/30" />
                    <p className="text-sm font-medium text-muted-foreground">
                      {search || activeTab !== "all" ? "No orders match your filters." : "No orders yet."}
                    </p>
                    {(search || activeTab !== "all") && (
                      <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => { setSearch(""); setActiveTab("all"); }}>
                        Clear filters
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((order: Order) => {
                const StatusIcon = statusIcons[order.status] || Clock;
                return (
                  <TableRow key={order.id} className="group hover:bg-muted/40">
                    <TableCell className="pl-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{order.clientName}</span>
                        <span className="text-xs text-muted-foreground">{order.clientEmail}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal text-xs">{order.serviceType}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-sm text-muted-foreground">
                        {(() => {
                          if (!order.createdAt) return "N/A";
                          const d = new Date(order.createdAt);
                          return isNaN(d.getTime()) ? "N/A" : format(d, "MMM dd, yyyy");
                        })()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${statusColors[order.status] || ""}`}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className={`text-xs font-normal capitalize ${priorityColors[order.priority] || ""}`}>
                        {order.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <div className="flex items-center justify-end gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" data-testid={`button-view-order-${order.id}`}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Order Details</DialogTitle>
                              <DialogDescription>
                                Full request from <strong>{order.clientName}</strong>
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-2">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-lg bg-muted/50 space-y-0.5">
                                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                                    <Mail className="h-3 w-3" /> Client
                                  </div>
                                  <p className="text-sm font-medium">{order.clientName}</p>
                                  <p className="text-xs text-muted-foreground">{order.clientEmail}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-muted/50 space-y-0.5">
                                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                                    <Calendar className="h-3 w-3" /> Timeline
                                  </div>
                                  <p className="text-sm font-medium">{order.timeline || "Not specified"}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-muted/50 space-y-0.5">
                                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                                    <DollarSign className="h-3 w-3" /> Budget
                                  </div>
                                  <p className="text-sm font-medium">{order.budget || "Not specified"}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-muted/50 space-y-0.5">
                                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                                    <Tag className="h-3 w-3" /> Service
                                  </div>
                                  <p className="text-sm font-medium">{order.serviceType}</p>
                                </div>
                              </div>
                              <div className="p-3 rounded-lg bg-muted/50">
                                <p className="text-xs text-muted-foreground mb-1.5">Project Description</p>
                                <p className="text-sm leading-relaxed">
                                  {order.projectDescription || <span className="italic text-muted-foreground">No description provided.</span>}
                                </p>
                              </div>
                              <div className="flex items-center justify-between pt-1">
                                <div className="flex gap-2">
                                  <Badge className={statusColors[order.status] || ""}>
                                    <StatusIcon className="mr-1 h-3 w-3" />
                                    {order.status}
                                  </Badge>
                                  <Badge variant="outline" className={`capitalize ${priorityColors[order.priority] || ""}`}>
                                    {order.priority} priority
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8" data-testid={`button-order-actions-${order.id}`}>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuLabel className="text-xs">Update Status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(order.id, "pending")}
                              disabled={order.status === "pending"}
                              className="text-xs"
                            >
                              <Clock className="mr-2 h-3 w-3" /> Mark Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(order.id, "in-progress")}
                              disabled={order.status === "in-progress"}
                              className="text-xs"
                            >
                              <AlertCircle className="mr-2 h-3 w-3" /> Mark In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(order.id, "completed")}
                              disabled={order.status === "completed"}
                              className="text-xs"
                            >
                              <CheckCircle2 className="mr-2 h-3 w-3" /> Mark Completed
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(order.id, "cancelled")}
                              disabled={order.status === "cancelled"}
                              className="text-xs text-destructive focus:text-destructive"
                            >
                              <XCircle className="mr-2 h-3 w-3" /> Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {filtered.length > 0 && (
        <p className="text-xs text-muted-foreground text-right">
          Showing {filtered.length} of {orders?.length || 0} orders
        </p>
      )}
    </div>
  );
}
