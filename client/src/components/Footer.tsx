import { Link } from "wouter";
import { Rocket, Twitter, Linkedin, Github, Instagram, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center">
                <Rocket className="text-white w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                DevStudio
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Building digital experiences that matter. We help forward-thinking companies design, build, and scale their vision.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/services" className="hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Mobile Apps</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">UI/UX Design</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Cloud Solutions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary transition-colors">Our Work</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@devstudio.com</span>
              </li>
              <li>
                <p>123 Innovation Drive,<br />Tech Valley, CA 94043</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} DevStudio Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
