import "./index.css";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Switch, Route } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import NotFound from "@/pages/not-found";

function Router() {
  return (
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
              <Route path="/admin/orders" component={() => <div className="p-8">Orders Management (Coming Soon)</div>} />
              <Route path="/admin/projects" component={() => <div className="p-8">Portfolio Management (Coming Soon)</div>} />
              <Route path="/admin/services" component={() => <div className="p-8">Services Management (Coming Soon)</div>} />
              <Route path="/admin/team" component={() => <div className="p-8">Team Management (Coming Soon)</div>} />
              <Route component={NotFound} />
            </Switch>
          </AdminLayout>
        </AdminProtectedRoute>
      </Route>
      
      <Route component={NotFound} />
    </Switch>
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
