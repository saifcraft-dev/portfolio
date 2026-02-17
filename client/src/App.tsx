import { lazy, Suspense } from "react";
import "./index.css";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Switch, Route } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Lazy load pages for performance
const Home = lazy(() => import("@/pages/Home"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const Services = lazy(() => import("@/pages/Services"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const AdminLogin = lazy(() => import("@/pages/admin/Login"));
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const OrdersManagement = lazy(() => import("@/pages/admin/Orders"));
const ProjectsManagement = lazy(() => import("@/pages/admin/Projects"));
const ServicesManagement = lazy(() => import("@/pages/admin/Services"));
const AdminLayout = lazy(() => import("@/pages/admin/AdminLayout"));
const AdminProtectedRoute = lazy(() => import("@/components/AdminProtectedRoute"));
const NotFound = lazy(() => import("@/pages/not-found"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/services" component={Services} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/:rest*">
          <AdminProtectedRoute>
            <AdminLayout>
              <Switch>
                <Route path="/admin" component={AdminDashboard} />
                <Route path="/admin/orders" component={OrdersManagement} />
                <Route path="/admin/projects" component={ProjectsManagement} />
                <Route path="/admin/services" component={ServicesManagement} />
                <Route path="/admin/team" component={() => <div className="p-8">Team Management (Coming Soon)</div>} />
                <Route component={NotFound} />
              </Switch>
            </AdminLayout>
          </AdminProtectedRoute>
        </Route>
        
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
