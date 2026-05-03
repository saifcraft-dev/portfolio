import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07 } }),
};

const sections = [
  {
    title: "Information We Collect",
    body: `When you use this website or submit a project inquiry, we may collect the following information:

• **Contact details** — your name, email address, and any other information you voluntarily provide through the contact form.
• **Project information** — details about your project, budget, timeline, and requirements that you share with us.
• **Usage data** — anonymous analytics data such as pages visited, time on site, and browser type, collected via privacy-respecting analytics tools.

We do not collect payment information directly. Any payment processing is handled by third-party providers (e.g. Stripe) under their own privacy policies.`,
  },
  {
    title: "How We Use Your Information",
    body: `Information you provide is used solely to:

• Respond to your inquiry and evaluate whether we're a good fit for your project.
• Communicate project updates, proposals, and deliverables during an active engagement.
• Improve the quality and relevance of this website's content.

We will never sell, rent, or trade your personal information to third parties for marketing purposes.`,
  },
  {
    title: "Cookies",
    body: `This website may use cookies to improve your browsing experience. Cookies are small files stored on your device. You can instruct your browser to refuse all cookies, though some features of the site may not function properly as a result.

We use cookies strictly for functional purposes (e.g. remembering your session preferences) and anonymised analytics. No advertising or tracking cookies are used.`,
  },
  {
    title: "Third-Party Services",
    body: `We may use trusted third-party services to operate this website, including hosting providers, analytics tools, and form processing services. These parties have access only to the information necessary to perform their functions and are obligated not to disclose or use it for any other purpose.

Links to external websites are provided for convenience. We have no control over the content or privacy practices of those sites and accept no responsibility for them.`,
  },
  {
    title: "Data Retention",
    body: `We retain personal data only as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Project-related communications are typically retained for up to 3 years after the conclusion of an engagement for record-keeping purposes.

You may request deletion of your personal data at any time by contacting us at the email address below.`,
  },
  {
    title: "Your Rights",
    body: `Depending on your location, you may have the right to:

• Access the personal data we hold about you.
• Request correction of inaccurate data.
• Request deletion of your data ("right to be forgotten").
• Withdraw consent for communications at any time.

To exercise any of these rights, please contact us at saif@devstudio.com and we will respond within 30 days.`,
  },
  {
    title: "Security",
    body: `We take reasonable technical and organisational measures to protect your data against unauthorised access, alteration, disclosure, or destruction. However, no method of internet transmission or electronic storage is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. We encourage you to review this page periodically to stay informed about how we protect your information.`,
  },
  {
    title: "Contact",
    body: `If you have any questions about this Privacy Policy, please contact us:

**Email:** saif@devstudio.com
**Website:** devstudio.com/contact`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -right-20 h-[480px] w-[480px] rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute top-20 -left-16 h-[320px] w-[320px] rounded-full bg-secondary/6 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-[200px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-2xl" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs sm:text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-primary/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Legal
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-foreground mb-5 leading-tight tracking-tight">
              Privacy{" "}
              <span className="text-primary">Policy</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto px-2">
              How DevStudio collects, uses, and protects your personal information.
            </p>

            <p className="mt-4 text-xs text-muted-foreground/70">Last updated: May 2026</p>
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="container mx-auto px-4 max-w-3xl pb-20 sm:pb-28">
        <div className="space-y-10">
          {sections.map(({ title, body }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="border-b border-border pb-10 last:border-0"
            >
              <h2 className="text-lg sm:text-xl font-display font-bold text-foreground mb-4">{title}</h2>
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3">
                {body.split("\n\n").map((para, j) => (
                  <p key={j} className="whitespace-pre-line">
                    {para.split(/(\*\*[^*]+\*\*)/).map((part, k) =>
                      part.startsWith("**") && part.endsWith("**")
                        ? <strong key={k} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>
                        : part
                    )}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
