import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowRight, Check, Clock, RefreshCw, Zap, Bot,
  Globe, Layers, Code2, Wrench, Star
} from "lucide-react";

const packages = [
  {
    id: 1,
    icon: Globe,
    name: "Landing Page",
    tagline: "For startups launching a product or local businesses promoting a service.",
    price: "$250 – $600",
    timeline: "5–7 business days",
    revisions: "2 revision rounds",
    features: [
      "Single-page, fully responsive design (mobile + tablet + desktop)",
      "Clear headline, benefits section, and call-to-action",
      "Contact form with email notification",
      "Basic on-page SEO (meta title, description, page speed optimization)",
      "Deployed and live with your domain",
    ],
    highlight: false,
  },
  {
    id: 2,
    icon: Layers,
    name: "Business Website",
    tagline: "For small businesses, freelancers, restaurants, clinics, and service providers.",
    price: "$700 – $1,800",
    timeline: "2–3 weeks",
    revisions: "2 revision rounds",
    features: [
      "5–8 pages (Home, About, Services, Blog, FAQ, Contact)",
      "Mobile-first responsive design",
      "Contact form with email notifications",
      "Google Maps embed (if applicable)",
      "Basic SEO setup (meta tags, sitemap, robots.txt)",
      "Google Analytics integration",
      "Deployed and live",
    ],
    highlight: false,
  },
  {
    id: 3,
    icon: Code2,
    name: "Custom Web Application",
    tagline: "For startups building an MVP or businesses needing a custom internal or client-facing app.",
    price: "$2,500 – $10,000+",
    timeline: "4–8 weeks",
    revisions: "3 milestone reviews",
    features: [
      "Full frontend built with React + TypeScript",
      "Backend API built with Node.js + Express",
      "Database design and setup (PostgreSQL)",
      "User authentication (sign up, login, password reset)",
      "Admin dashboard",
      "Deployed to production with a live URL",
      "Handover documentation + 30-day post-launch support",
    ],
    highlight: true,
    badge: "Most Popular",
  },
  {
    id: 4,
    icon: Bot,
    name: "AI Feature Add-On",
    tagline: "For businesses or developers who want to add AI-powered capabilities to an existing app.",
    price: "$600 – $4,000",
    timeline: "1–3 weeks per feature",
    revisions: "Included",
    features: [
      "Smart semantic search",
      "AI-generated content / product descriptions",
      "Chatbot trained on your own data",
      "Recommendation engine",
      "Automated summarization or classification",
      "OpenAI / Anthropic API integration",
    ],
    highlight: false,
    badge: "🔥 Fastest Growing",
  },
  {
    id: 5,
    icon: Wrench,
    name: "Monthly Maintenance Retainer",
    tagline: "For clients who need ongoing support after their project goes live.",
    price: "$250 – $1,000/month",
    timeline: "Ongoing (min. 3 months)",
    revisions: "Priority response (4 hrs)",
    features: [
      "Up to 5–10 hours of work per month",
      "Bug fixes and performance monitoring",
      "Content and copy updates",
      "Security patches and dependency updates",
      "Priority response time (within 4 hours vs. 24 hours)",
      "Monthly progress report",
    ],
    highlight: false,
  },
];

const pricingTable = [
  { level: "Beginner", experience: "0–1 year", hourly: "$15 – $30/hr", small: "$150 – $600", large: "$600 – $2,000" },
  { level: "Intermediate", experience: "1–3 years", hourly: "$30 – $65/hr", small: "$600 – $2,500", large: "$2,500 – $7,000" },
  { level: "Senior", experience: "3–5 years", hourly: "$65 – $120/hr", small: "$2,000 – $6,000", large: "$6,000 – $20,000", highlight: true },
  { level: "Expert / Specialist", experience: "5+ years", hourly: "$120 – $200+/hr", small: "$5,000+", large: "$20,000+" },
];

const paymentStructure = [
  { size: "Under $300", structure: "100% upfront" },
  { size: "$300 – $1,500", structure: "50% upfront / 50% on delivery" },
  { size: "$1,500 – $5,000", structure: "33% upfront · 33% at midpoint · 33% on delivery" },
  { size: "$5,000+", structure: "40% upfront · 30% at key milestone · 30% on delivery" },
  { size: "Monthly retainer", structure: "100% on the 1st of each month, before work begins" },
];

const steps = [
  { number: "01", title: "Discovery Call", desc: "We talk about your business, goals, and the problem you need solved. You get a clear written scope within 48 hours." },
  { number: "02", title: "Proposal & Contract", desc: "I send a fixed-scope proposal with timeline, price, and exact deliverables. You sign and pay the upfront deposit." },
  { number: "03", title: "Build with Weekly Demos", desc: "I build in focused sprints. You see a working demo every week — not just at the very end." },
  { number: "04", title: "Launch & Handoff", desc: "I deploy, record a Loom walkthrough, hand over all code and docs, and stay available for 30 days post-launch." },
];

const pricingRules = [
  "Never work for free — even a $50 project creates professional accountability.",
  "Fixed pricing beats hourly for most projects — it rewards efficiency and helps clients budget.",
  "The anchoring approach: three packages shown together make the middle option look reasonable.",
  "Rush fee applies if you need delivery in half the standard time (+25–40% on top of base price).",
  "All prices are for the result delivered — not the hours it takes me to build it.",
];

export default function Services() {
  useEffect(() => {
    document.title = "Services & Pricing — Saif Khan | DevStudio | Freelance Fullstack Developer";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Fixed-scope packages for landing pages, business websites, custom web apps, AI features, and monthly retainers. Clear pricing, no hourly surprises. By Saif Khan.");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-32 pb-20 container mx-auto px-4 max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="text-primary text-sm font-bold uppercase tracking-wider mb-4">What I Offer</p>
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">Services & Packages</h1>
          <p className="text-xl text-muted-foreground">
            Fixed-scope packages with transparent pricing. You know exactly what you're getting before we start — no hourly billing, no scope surprises.
          </p>
        </motion.div>

        {/* 5 Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={`relative rounded-2xl border p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                pkg.highlight
                  ? "border-primary/60 bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-border bg-card hover:border-primary/30"
              }`}
              data-testid={`card-package-${pkg.id}`}
            >
              {pkg.badge && (
                <div className="absolute -top-3 left-6">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${pkg.highlight ? "bg-primary text-white" : "bg-card border border-border text-muted-foreground"}`}>
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <pkg.icon className="w-5 h-5 text-primary" />
              </div>

              <h2 className="text-xl font-display font-bold text-white mb-2">{pkg.name}</h2>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{pkg.tagline}</p>

              <div className="space-y-2 mb-6">
                {pkg.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-foreground/85">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-5 border-t border-border space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>{pkg.timeline}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <RefreshCw className="w-3.5 h-3.5 text-primary" />
                  <span>{pkg.revisions}</span>
                </div>
                <div className="pt-3 flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">Starting from</div>
                  <div className="text-lg font-bold text-white">{pkg.price}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pricing Rules */}
        <div className="mb-24 bg-card border border-border rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-display font-bold text-white">Pricing Rules I Follow</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pricingRules.map((rule, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Structure */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-bold uppercase tracking-wider mb-3">How Payment Works</p>
            <h2 className="text-3xl font-display font-bold text-white mb-3">Payment Structure</h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm">
              I never start work before receiving the upfront payment. This protects both of us and keeps the project moving.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card/50">
                  <th className="text-left text-white font-semibold px-6 py-4">Project Size</th>
                  <th className="text-left text-white font-semibold px-6 py-4">Payment Schedule</th>
                </tr>
              </thead>
              <tbody>
                {paymentStructure.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-card/40 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{row.size}</td>
                    <td className="px-6 py-4 text-muted-foreground">{row.structure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing by Experience */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-bold uppercase tracking-wider mb-3">Market Reference</p>
            <h2 className="text-3xl font-display font-bold text-white mb-3">Pricing by Experience Level</h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm">
              For reference — where market rates sit at each experience level. I operate at the Senior tier.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card/50">
                  <th className="text-left text-white font-semibold px-6 py-4">Level</th>
                  <th className="text-left text-white font-semibold px-6 py-4">Experience</th>
                  <th className="text-left text-white font-semibold px-6 py-4">Hourly Rate</th>
                  <th className="text-left text-white font-semibold px-6 py-4">Small Project</th>
                  <th className="text-left text-white font-semibold px-6 py-4">Large Project</th>
                </tr>
              </thead>
              <tbody>
                {pricingTable.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-border last:border-0 transition-colors ${
                      row.highlight ? "bg-primary/5 border-primary/20" : "hover:bg-card/40"
                    }`}
                  >
                    <td className={`px-6 py-4 font-bold ${row.highlight ? "text-primary" : "text-white"}`}>
                      {row.level} {row.highlight && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full ml-2">← My Level</span>}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{row.experience}</td>
                    <td className="px-6 py-4 text-muted-foreground">{row.hourly}</td>
                    <td className="px-6 py-4 text-muted-foreground">{row.small}</td>
                    <td className="px-6 py-4 text-muted-foreground">{row.large}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Process */}
        <div className="mb-24 border-t border-border pt-24">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-bold uppercase tracking-wider mb-4">My Process</p>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">How I Work</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A clear, predictable process designed to keep you informed and the project on track.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-5xl font-display font-bold text-primary/10 mb-4">{step.number}</div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">Not sure which package fits? Describe your project and I'll recommend the right one.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="btn-cta border-0 rounded-full px-10 h-14 text-lg shadow-lg shadow-orange-900/20 group"
              asChild
            >
              <Link href="/contact">
                <span className="flex items-center gap-2">
                  Get a Free Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
            <Button variant="outline" className="rounded-full border-border text-muted-foreground hover:text-white hover:border-primary/50 h-14 px-8" asChild>
              <Link href="/faq">Read the FAQ</Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
