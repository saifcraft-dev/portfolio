import { Link } from "wouter";
import { Code2, Twitter, Linkedin, Github, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--footer))] text-[hsl(var(--footer-foreground))] pt-20 pb-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <Link href="/">
              <div className="flex items-center space-x-2.5 mb-6 cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Code2 className="text-white w-4 h-4" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight text-foreground">
                  DevStudio
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Hi, I'm Saif Khan — a freelance fullstack developer. I help startups and businesses build fast, custom web apps that solve real problems.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-[hsl(var(--footer-foreground))] mb-6 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/services"><span className="hover:text-primary transition-colors cursor-pointer">Landing Page — from $250</span></Link></li>
              <li><Link href="/services"><span className="hover:text-primary transition-colors cursor-pointer">Business Website — from $700</span></Link></li>
              <li><Link href="/services"><span className="hover:text-primary transition-colors cursor-pointer">Custom Web App — from $2,500</span></Link></li>
              <li><Link href="/services"><span className="hover:text-primary transition-colors cursor-pointer">AI Features — from $600</span></Link></li>
              <li><Link href="/services"><span className="hover:text-primary transition-colors cursor-pointer">Monthly Retainer — from $250/mo</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-[hsl(var(--footer-foreground))] mb-6 text-sm uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about"><span className="hover:text-primary transition-colors cursor-pointer">About Me</span></Link></li>
              <li><Link href="/portfolio"><span className="hover:text-primary transition-colors cursor-pointer">My Work</span></Link></li>
              <li><Link href="/services"><span className="hover:text-primary transition-colors cursor-pointer">Services & Pricing</span></Link></li>
              <li><Link href="/faq"><span className="hover:text-primary transition-colors cursor-pointer">FAQ</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-primary transition-colors cursor-pointer">Hire Me</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-[hsl(var(--footer-foreground))] mb-6 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>hello@devstudio.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Available remotely worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Saif Khan / DevStudio. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/faq"><span className="hover:text-foreground transition-colors cursor-pointer">FAQ</span></Link>
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
