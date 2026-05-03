import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const faqs = [
  {
    category: "Working With Me",
    items: [
      {
        q: "How do I get started?",
        a: "Fill out the contact form or email me directly. Describe your project — what problem you're solving, who it's for, and roughly what you want to build. I'll reply within 24 hours with my thoughts and, if it's a fit, we'll schedule a discovery call."
      },
      {
        q: "Do you work with clients remotely?",
        a: "Yes — 100% remote, worldwide. I've worked with clients in the US, UK, Europe, Middle East, and Southeast Asia. All communication is done over email, Slack, Zoom, or WhatsApp — whatever works best for you."
      },
      {
        q: "What do you need from me before starting?",
        a: "A signed contract, the upfront deposit, and a shared folder (Google Drive or Dropbox) with any logos, content, or design assets. I'll send a project kickoff message with a full timeline summary before writing a single line of code."
      },
      {
        q: "Do you work hourly or on fixed projects?",
        a: "I prefer fixed-scope projects — it rewards efficiency, helps you budget, and removes the anxiety of watching a clock. I only work hourly for ongoing retainer relationships. For one-off projects, we agree on a clear scope and a fixed price upfront."
      },
    ]
  },
  {
    category: "Pricing & Payment",
    items: [
      {
        q: "How much does a typical project cost?",
        a: "It depends on scope. A landing page starts at $250. A full business website typically runs $700–$1,800. A custom web application (React + Node.js + PostgreSQL) starts at $2,500 and goes up depending on complexity. See the full pricing breakdown on the Services page."
      },
      {
        q: "Do you require a deposit?",
        a: "Yes — always. For projects under $300, I collect 100% upfront. For larger projects, I collect 33–50% upfront before starting. This is standard practice and protects both of us. Serious clients respect payment terms; problematic ones push back on them — which is a useful early warning sign."
      },
      {
        q: "What payment methods do you accept?",
        a: "PayPal, Wise (bank transfer), Stripe (card), or direct bank transfer. For international clients, Wise is usually the cheapest option with the lowest fees."
      },
      {
        q: "Do you offer refunds?",
        a: "The upfront deposit is non-refundable — it covers my time spent on discovery, planning, and early work. If you cancel mid-project, you keep everything completed to that point and I keep the work done to date. This is clearly stated in the contract before we begin."
      },
      {
        q: "Is there a rush fee?",
        a: "Yes. If you need a project delivered in half the standard timeline, a 25–40% rush fee applies. Fast delivery requires rearranging my schedule and working extended hours — that has a cost."
      }
    ]
  },
  {
    category: "Contracts & Scope",
    items: [
      {
        q: "Do you use contracts?",
        a: "Always — without exception. Even for small projects or clients I know personally. The contract protects both of us. It defines exactly what I will deliver, what is NOT included, revision rounds, timeline, payment terms, and what happens if either of us cancels."
      },
      {
        q: "What if I want to add something new mid-project?",
        a: "That's fine — but it falls outside the agreed scope, which means a separate quote. I'll say something like: 'I love that idea — it falls outside what we agreed on, so let me put together a quick quote for it as a separate task.' This is professional, not confrontational. Good clients respect it."
      },
      {
        q: "How many revisions are included?",
        a: "It depends on the package. Landing pages include 2 revision rounds. Business websites include 2. Custom web apps include 3 milestone reviews. A revision is a change to agreed-upon work. A new feature or a significant direction change is a new scope item."
      },
      {
        q: "What happens if you miss a deadline?",
        a: "If a delay happens on my end, I will tell you immediately — not after the deadline passes — with a new realistic date and an explanation. Transparent communication is a core part of how I work. If something is delayed, you will always know before it happens."
      }
    ]
  },
  {
    category: "Process & Delivery",
    items: [
      {
        q: "How do I know my project is on track?",
        a: "I send a brief progress update every 2–3 days — even if it's just 'still on track, nothing to report.' You'll never be left wondering. I also show early previews and wireframes rather than hiding everything until the end."
      },
      {
        q: "What do I receive at the end?",
        a: "You receive: all source code (via GitHub), a deployed live URL, a Loom video walkthrough of the finished product, and a handover document explaining how to log in, update content, and maintain the system. All code and intellectual property transfers to you fully on final payment."
      },
      {
        q: "Do you offer ongoing support after delivery?",
        a: "Yes. All projects include 30 days of free post-launch support for bug fixes. After that, I offer monthly retainer packages starting at $250/month that cover bug fixes, updates, security patches, and priority response time."
      },
      {
        q: "Will I own the code?",
        a: "Yes — 100%. After final payment, all code, designs, and intellectual property transfer to you. I retain no rights to anything built for your project."
      }
    ]
  },
  {
    category: "Common Concerns",
    items: [
      {
        q: "How do I know you won't disappear with my deposit?",
        a: "We have a signed contract. I have an active portfolio, public profiles on Upwork/Fiverr/GitHub/LinkedIn with reviews, and I'll show you previous work and client references on request. My reputation is my most valuable business asset — I protect it more than my time."
      },
      {
        q: "I've been burned by a developer before. How are you different?",
        a: "The most common complaints about developers are: disappearing without updates, missing deadlines, unclear pricing, and scope creep. My process directly addresses all four: I give updates every 2–3 days, I commit to fixed timelines, I use fixed-scope pricing, and I use contracts that define exactly what scope creep is."
      },
      {
        q: "Can I see examples of your work?",
        a: "Yes — visit the Portfolio page. Each project includes a description, the problem it solved, the tech stack, and a link to the live app or GitHub repo where available."
      },
      {
        q: "What if I have a very small budget?",
        a: "Reach out anyway and describe your project. If your budget doesn't fit a full custom build, I may be able to recommend a phased approach — starting with an MVP and building from there. I'd rather give you an honest recommendation than waste both our time."
      }
    ]
  }
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-card/50 transition-colors"
        data-testid={`faq-toggle-${q.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`}
      >
        <span className="font-semibold text-foreground pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  useEffect(() => {
    document.title = "FAQ — Saif Khan | DevStudio | Freelance Fullstack Developer";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Answers to the most common questions about working with Saif Khan — pricing, contracts, payment, process, and delivery.");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-24 sm:pt-32 pb-16 sm:pb-20 container mx-auto px-4 max-w-4xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <p className="text-primary text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 sm:mb-4">FAQ</p>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold text-foreground mb-4 sm:mb-6 px-2">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground px-2">
            Everything you need to know before we work together — pricing, contracts, process, and what happens when things go sideways.
          </p>
        </motion.div>

        <div className="space-y-12 sm:space-y-16">
          {faqs.map((section, si) => (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: si * 0.05 }}
              className="px-2 sm:px-0"
            >
              <h2 className="text-lg sm:text-xl font-display font-bold text-foreground mb-4 sm:mb-5 flex items-center gap-2 sm:gap-3">
                <span className="text-primary text-xs sm:text-sm font-mono">{String(si + 1).padStart(2, "0")}</span>
                <span className="text-sm sm:text-lg">{section.category}</span>
              </h2>
              <div className="space-y-2 sm:space-y-3">
                {section.items.map((item, ii) => (
                  <FAQItem key={ii} q={item.q} a={item.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 sm:mt-24 text-center bg-card border border-border rounded-2xl p-6 sm:p-10 px-3 sm:px-10">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2 sm:mb-3 px-2">Still have a question?</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 px-2">
            Send me a message and I'll reply within 24 hours.
          </p>
          <Button
            size="lg"
            className="w-full sm:w-auto btn-cta border-0 rounded-full px-6 sm:px-10 h-12 sm:h-14 text-base sm:text-lg shadow-lg shadow-orange-900/20 group"
            asChild
          >
            <Link href="/contact">
              <span className="flex items-center justify-center gap-2">
                Get in Touch
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
