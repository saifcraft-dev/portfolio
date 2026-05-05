import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  Plus,
  ListFilter,
  Activity,
} from "lucide-react";
import { useOrders } from "@/hooks/use-orders";
import { useProjects } from "@/hooks/use-projects";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Order, Project } from "@/types";
import { Link } from "wouter";
import { format } from "date-fns";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  "in-progress": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  completed: "bg-green-500/10 text-green-600 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
};

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  color,
  href,
  loading,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
  color: string;
  href: string;
  loading: boolean;
}) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${color} bg-opacity-10`}>
            <Icon className={`h-4 w-4`} />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-16 mb-1" />
          ) : (
            <div className="text-3xl font-bold tracking-tight">{value}</div>
          )}
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            {description}
            <ArrowUpRight className="h-3 w-3 opacity-50" />
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function AdminDashboard() {
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const { data: projects, isLoading: projectsLoading } = useProjects();

  const pendingCount = (orders as Order[] | undefined)?.filter(o => o.status === "pending").length || 0;
  const completedProjects = (projects as Project[] | undefined)?.filter(p => p.completedDate).length || 0;
  const activeProjects = (projects as Project[] | undefined)?.filter(p => !p.completedDate).length || 0;

  const metrics = [
    {
      title: "Total Orders",
      value: orders?.length || 0,
      icon: ShoppingBag,
      description: "All-time service requests",
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950",
      href: "/admin/orders",
      loading: ordersLoading,
    },
    {
      title: "Pending Orders",
      value: pendingCount,
      icon: Clock,
      description: "Awaiting your review",
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950",
      href: "/admin/orders",
      loading: ordersLoading,
    },
    {
      title: "Completed Projects",
      value: completedProjects,
      icon: CheckCircle2,
      description: "Delivered to clients",
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950",
      href: "/admin/projects",
      loading: projectsLoading,
    },
    {
      title: "Active Projects",
      value: activeProjects,
      icon: Briefcase,
      description: "Currently in development",
      color: "text-violet-600 bg-violet-50 dark:bg-violet-950",
      href: "/admin/projects",
      loading: projectsLoading,
    },
  ];

  const recentOrders = (orders as Order[] | undefined)?.slice(0, 5) || [];
  const recentProjects = (projects as Project[] | undefined)?.slice(0, 5) || [];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Welcome back — here's what's happening with SaifCraft.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/orders">
              <ListFilter className="h-4 w-4 mr-1.5" />
              View Orders
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/admin/projects">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Project
            </Link>
          </Button>
        </div>
      </div>

      {pendingCount > 0 && (
        <div className="flex items-center gap-3 p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300">
          <Activity className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm font-medium">
            You have <strong>{pendingCount}</strong> pending {pendingCount === 1 ? "order" : "orders"} awaiting review.
          </span>
          <Button size="sm" variant="outline" className="ml-auto border-amber-300 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 h-7 text-xs" asChild>
            <Link href="/admin/orders">Review Now</Link>
          </Button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Recent Orders
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">Latest client submissions</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-xs h-7 text-muted-foreground" asChild>
                <Link href="/admin/orders">View all</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-14 w-full rounded-lg" />)}
              </div>
            ) : recentOrders.length > 0 ? (
              <div className="space-y-2">
                {recentOrders.map((order: Order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/40 transition-colors group">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">{order.clientName}</p>
                      <p className="text-xs text-muted-foreground truncate">{order.serviceType}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className="text-[10px] text-muted-foreground hidden sm:block">
                        {order.createdAt ? (() => {
                          const d = new Date(order.createdAt);
                          return isNaN(d.getTime()) ? "" : format(d, "MMM d");
                        })() : ""}
                      </span>
                      <Badge className={`text-[10px] px-1.5 py-0 ${statusColors[order.status] || ""}`}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <ShoppingBag className="h-8 w-8 text-muted-foreground/30 mb-2" />
                <p className="text-sm font-medium text-muted-foreground">No orders yet</p>
                <p className="text-xs text-muted-foreground/70 mt-0.5">New client orders will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                  Recent Projects
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">Latest portfolio entries</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-xs h-7 text-muted-foreground" asChild>
                <Link href="/admin/projects">View all</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {projectsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-14 w-full rounded-lg" />)}
              </div>
            ) : recentProjects.length > 0 ? (
              <div className="space-y-2">
                {recentProjects.map((project: Project) => (
                  <div key={project.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/40 transition-colors">
                    <div className="h-9 w-9 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                      {project.imageUrl ? (
                        <img src={project.imageUrl} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <Briefcase className="h-4 w-4 text-muted-foreground/40" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">{project.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{project.category}</p>
                    </div>
                    {project.completedDate ? (
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] px-1.5 flex-shrink-0">
                        Done
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px] px-1.5 flex-shrink-0">Active</Badge>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Briefcase className="h-8 w-8 text-muted-foreground/30 mb-2" />
                <p className="text-sm font-medium text-muted-foreground">No projects yet</p>
                <Button size="sm" variant="outline" className="mt-3 h-7 text-xs" asChild>
                  <Link href="/admin/projects">
                    <Plus className="h-3 w-3 mr-1" />
                    Add your first project
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
