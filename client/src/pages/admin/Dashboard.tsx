import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Briefcase,
  ArrowUpRight,
  TrendingUp
} from "lucide-react";
import { useOrders } from "@/hooks/use-orders";
import { useProjects } from "@/hooks/use-projects";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Order, Project } from "@/types";

export default function AdminDashboard() {
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const { data: projects, isLoading: projectsLoading } = useProjects();

  const metrics = [
    {
      title: "Total Orders",
      value: orders?.length || 0,
      icon: ShoppingBag,
      description: "All time service requests",
      color: "text-blue-500",
      loading: ordersLoading
    },
    {
      title: "Pending Orders",
      value: orders?.filter((o: Order) => o.status === "pending").length || 0,
      icon: Clock,
      description: "Awaiting review",
      color: "text-yellow-500",
      loading: ordersLoading
    },
    {
      title: "Completed Projects",
      value: projects?.filter((p: Project) => p.completedDate).length || 0,
      icon: CheckCircle2,
      description: "Delivered to clients",
      color: "text-green-500",
      loading: projectsLoading
    },
    {
      title: "Active Projects",
      value: projects?.filter((p: Project) => !p.completedDate).length || 0,
      icon: Briefcase,
      description: "Currently in development",
      color: "text-purple-500",
      loading: projectsLoading
    }
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back. Here's what's happening with DevStudio.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="hover-elevate">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              {metric.loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{metric.value}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : orders && (orders as Order[]).length > 0 ? (
              <div className="space-y-4">
                {(orders as Order[]).slice(0, 5).map((order: Order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                    <div>
                      <p className="font-medium">{order.clientName}</p>
                      <p className="text-xs text-muted-foreground">{order.serviceType}</p>
                    </div>
                    <Badge variant={order.status === "pending" ? "outline" : "default"}>
                      {order.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No recent orders found.</p>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-primary" />
              Recent Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            {projectsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : projects && (projects as Project[]).length > 0 ? (
              <div className="space-y-4">
                {(projects as Project[]).slice(0, 5).map((project: Project) => (
                  <div key={project.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-xs text-muted-foreground">{project.category}</p>
                    </div>
                    {project.completedDate ? (
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Completed</Badge>
                    ) : (
                      <Badge variant="secondary">In Progress</Badge>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No recent projects found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
