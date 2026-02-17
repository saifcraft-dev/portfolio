import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { Menu, X, Code2, LogIn, User as UserIcon, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Code2 className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
          <span className="text-xl font-bold font-display tracking-tighter">
            DevStudio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </a>
            </Link>
          ))}
          
          <div className="flex items-center gap-4 pl-4 border-l">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                      <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <a className="flex items-center gap-2 cursor-pointer w-full">
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Admin Dashboard</span>
                        </a>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleLogin} size="sm" className="gap-2">
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <a
                      className={`text-lg font-medium py-2 border-b ${
                        location === item.href ? "text-primary border-primary" : "border-transparent"
                      }`}
                    >
                      {item.label}
                    </a>
                  </Link>
                ))}
                {user ? (
                  <>
                    {isAdmin && (
                      <Link href="/admin">
                        <a className="flex items-center gap-2 py-2 text-primary">
                          <LayoutDashboard className="w-5 h-5" />
                          Dashboard
                        </a>
                      </Link>
                    )}
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      className="w-full justify-start gap-2 mt-4"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleLogin} className="w-full gap-2 mt-4">
                    <LogIn className="w-5 h-5" />
                    Login with Google
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
