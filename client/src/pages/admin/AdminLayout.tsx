import { 
  LayoutDashboard, 
  ShoppingBag, 
  Briefcase, 
  Layers, 
  Users, 
  LogOut,
  ChevronRight,
  Bell,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/lib/firebase/auth";
import { useLocation, Link } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Portfolio",
    url: "/admin/projects",
    icon: Briefcase,
  },
  {
    title: "Services",
    url: "/admin/services",
    icon: Layers,
  },
  {
    title: "Team",
    url: "/admin/team",
    icon: Users,
  },
];

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/orders": "Orders",
  "/admin/projects": "Portfolio",
  "/admin/services": "Services",
  "/admin/team": "Team",
};

export function AdminSidebar() {
  const { user } = useAuth();
  const [location, setLocation] = useLocation();

  const handleLogout = async () => {
    await signOut();
    setLocation("/admin/login");
  };

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : "AD";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-4 py-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground text-xs font-bold">&lt;/&gt;</span>
          </div>
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="font-semibold text-sm truncate">SaifCraft</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Admin Panel</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location === item.url || location.startsWith(item.url + "/");
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      tooltip={item.title}
                      isActive={isActive}
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 w-full rounded-lg px-2 py-2 text-left hover:bg-accent transition-colors group-data-[collapsible=icon]:justify-center">
              <Avatar className="h-7 w-7 flex-shrink-0">
                <AvatarImage src={user?.photoURL || ""} />
                <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                <p className="text-xs font-medium truncate">{user?.displayName || "Admin"}</p>
                <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-52">
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground truncate">
              {user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="text-destructive focus:text-destructive cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3.5rem",
  };

  const currentTitle = pageTitles[location] || "Admin";
  const parentCrumb = location !== "/admin/dashboard" ? "Dashboard" : null;

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex min-h-screen w-full bg-background">
        <AdminSidebar />
        <div className="flex flex-col flex-1 w-full overflow-hidden min-w-0">
          <header className="flex h-14 items-center gap-3 border-b bg-background/80 backdrop-blur-sm px-4 lg:px-6 sticky top-0 z-10">
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
            
            <div className="flex items-center gap-1.5 text-sm flex-1">
              {parentCrumb && (
                <>
                  <span className="text-muted-foreground hidden sm:inline">{parentCrumb}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground hidden sm:inline" />
                </>
              )}
              <span className="font-semibold">{currentTitle}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" asChild>
                <Link href="/" target="_blank">
                  <span className="sr-only">View Site</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </Link>
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-muted/20">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
