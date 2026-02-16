import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Rocket className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white">
            DevStudio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-200 relative ${
                location === item.href
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.name}
              {location === item.href && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </Link>
          ))}
          <Button
            asChild
            className="bg-white text-black hover:bg-gray-200 font-semibold rounded-full px-6"
          >
            <Link href="/contact">Start Project</Link>
          </Button>
        </nav>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-card border-l border-white/10 w-[300px]">
            <div className="flex flex-col space-y-8 mt-10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-2xl font-display font-bold ${
                    location === item.href ? "text-primary" : "text-white/60"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link href="/contact">Let's Talk</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
