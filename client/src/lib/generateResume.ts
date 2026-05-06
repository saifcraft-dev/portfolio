import { jsPDF } from "jspdf";

export function generateResume() {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const W = 210;
  const margin = 18;
  const contentW = W - margin * 2;
  let y = 0;

  const primary = [37, 99, 235] as [number, number, number];
  const dark = [15, 23, 42] as [number, number, number];
  const mid = [71, 85, 105] as [number, number, number];
  const light = [248, 250, 252] as [number, number, number];
  const white = [255, 255, 255] as [number, number, number];
  const border = [226, 232, 240] as [number, number, number];

  const setColor = (rgb: [number, number, number]) => doc.setTextColor(...rgb);
  const setFill = (rgb: [number, number, number]) => doc.setFillColor(...rgb);
  const setDraw = (rgb: [number, number, number]) => doc.setDrawColor(...rgb);

  // ── HEADER BAND ──────────────────────────────────────────────────
  setFill(dark);
  doc.rect(0, 0, W, 52, "F");

  // Accent stripe
  setFill(primary);
  doc.rect(0, 0, 5, 52, "F");

  // Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  setColor(white);
  doc.text("Saif Khan", margin + 4, 20);

  // Title
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  setColor([147, 197, 253]);
  doc.text("Senior Fullstack Developer  &  AI Integration Specialist", margin + 4, 29);

  // Contact row
  doc.setFontSize(8.5);
  setColor([203, 213, 225]);
  const contacts = [
    "contact@saifcraft.com",
    "github.com/saifkhan-dev",
    "linkedin.com/in/saifkhan",
    "Remote — Global",
  ];
  let cx = margin + 4;
  contacts.forEach((c, i) => {
    doc.text(c, cx, 40);
    cx += doc.getTextWidth(c) + 6;
    if (i < contacts.length - 1) {
      setColor([71, 85, 105]);
      doc.text("·", cx - 4, 40);
      setColor([203, 213, 225]);
    }
  });

  // Stats row
  const stats = [
    { v: "7+", l: "Yrs Exp." },
    { v: "48+", l: "Projects" },
    { v: "29+", l: "Clients" },
    { v: "94%", l: "Satisfaction" },
  ];
  let sx = margin + 4;
  stats.forEach((s) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    setColor(white);
    doc.text(s.v, sx, 49);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    setColor([147, 197, 253]);
    doc.text(s.l, sx, 53.5);
    sx += 38;
  });

  y = 62;

  // ── SECTION HELPER ───────────────────────────────────────────────
  const section = (title: string) => {
    if (y > 262) { doc.addPage(); y = 18; }
    setColor(primary);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text(title.toUpperCase(), margin, y);
    setDraw(primary);
    doc.setLineWidth(0.5);
    doc.line(margin + doc.getTextWidth(title.toUpperCase()) + 3, y - 1, W - margin, y - 1);
    y += 5;
  };

  const bullet = (text: string, indent = 0) => {
    const x = margin + indent;
    const maxW = contentW - indent - 4;
    setColor(mid);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    const lines = doc.splitTextToSize(text, maxW);
    lines.forEach((line: string, i: number) => {
      if (y > 272) { doc.addPage(); y = 18; }
      if (i === 0) {
        setFill(primary);
        doc.circle(x + 1.5, y - 1.2, 0.9, "F");
        doc.text(line, x + 4, y);
      } else {
        doc.text(line, x + 4, y);
      }
      y += 4.5;
    });
  };

  const label = (text: string) => {
    if (y > 272) { doc.addPage(); y = 18; }
    setColor(dark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(text, margin, y);
    y += 4.8;
  };

  const sublabel = (left: string, right: string) => {
    if (y > 272) { doc.addPage(); y = 18; }
    setColor(mid);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.text(left, margin, y);
    doc.text(right, W - margin, y, { align: "right" });
    y += 4.5;
  };

  const para = (text: string) => {
    const lines = doc.splitTextToSize(text, contentW);
    setColor(mid);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    lines.forEach((line: string) => {
      if (y > 272) { doc.addPage(); y = 18; }
      doc.text(line, margin, y);
      y += 4.5;
    });
  };

  const gap = (n = 4) => { y += n; };

  // ── PROFESSIONAL SUMMARY ─────────────────────────────────────────
  section("Professional Summary");
  para(
    "Self-driven Senior Fullstack Developer with 7+ years of experience building fast, production-ready web " +
    "applications from scratch for startups and growing businesses worldwide. Specialist in React, Node.js, " +
    "TypeScript, and PostgreSQL. Over the past 2 years, integrated AI into real production products — chatbots, " +
    "semantic search, content generation, and recommendation engines. You talk directly to the developer — " +
    "clean code, honest timelines, and clear communication every step of the way."
  );
  gap();

  // ── EXPERIENCE ───────────────────────────────────────────────────
  section("Experience");

  label("Senior Fullstack & AI Developer — Freelance / Remote");
  sublabel("Self-employed · SaifCraft", "2024 – Present");
  bullet("Building AI-integrated web products for startups globally — chatbots, semantic search engines, content generation systems, and recommendation engines using OpenAI / LLM APIs.");
  bullet("Delivering complete React + Node.js + PostgreSQL applications from discovery to production deployment.");
  bullet("Clients across the US, UK, Europe, Middle East, and South Asia; 100% remote, fixed-scope contracts.");
  gap(2);

  label("Fullstack Developer — Contract");
  sublabel("Multiple Clients · Remote", "2021 – 2024");
  bullet("Led end-to-end development of SaaS platforms and e-commerce products for clients in the US, UK, and Pakistan.");
  bullet("Built multi-tenant SaaS dashboards, custom admin panels, REST and GraphQL APIs backed by PostgreSQL and MongoDB.");
  bullet("Delivered a custom e-commerce platform that loaded 3× faster than Shopify, eliminated $300/month in fees, and lifted conversions by 22%.");
  bullet("Built a patient booking system in 6 weeks that reduced front-desk workload by 60%.");
  gap(2);

  label("Frontend Developer — Agency");
  sublabel("Web Agency · On-site / Remote", "2018 – 2021");
  bullet("Grew from React specialist into full-stack developer, delivering 20+ projects from landing pages to complex dashboards.");
  bullet("Built responsive, accessible interfaces with React and TypeScript; integrated Firebase for auth and real-time data.");
  bullet("Adopted Node.js and PostgreSQL mid-tenure; contributed to backend APIs and database design by end of role.");
  gap();

  // ── SKILLS ───────────────────────────────────────────────────────
  section("Technical Skills");

  const skillRows: [string, string][] = [
    ["Frontend", "React (Expert)  ·  Next.js (Expert)  ·  TypeScript (Expert)  ·  Tailwind CSS (Expert)"],
    ["Backend", "Node.js (Expert)  ·  Express  ·  GraphQL (Advanced)  ·  Prisma (Advanced)  ·  Firebase (Advanced)"],
    ["Databases", "PostgreSQL (Expert)  ·  MongoDB (Expert)  ·  Redis (Advanced)"],
    ["DevOps & Tools", "Docker (Advanced)  ·  Vercel (Expert)  ·  Git / CI-CD (Expert)"],
    ["AI / LLMs", "OpenAI API (Advanced)  ·  Semantic Search  ·  RAG  ·  LLM Integrations"],
  ];

  skillRows.forEach(([cat, skills]) => {
    if (y > 272) { doc.addPage(); y = 18; }
    setFill(light);
    setDraw(border);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y - 3.5, contentW, 8, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    setColor(primary);
    doc.text(cat, margin + 3, y + 1);

    doc.setFont("helvetica", "normal");
    setColor(mid);
    doc.text(skills, margin + 32, y + 1);
    y += 10;
  });

  gap(2);

  // ── SERVICES OFFERED ─────────────────────────────────────────────
  section("Services & Rates");

  const services = [
    ["Landing Page", "$800 – $1,500", "5–7 days"],
    ["Business Website", "$2,000 – $3,500", "2–3 weeks"],
    ["Custom Web App", "$3,500 – $8,000+", "4–8 weeks"],
    ["AI Feature Add-On", "$1,200 – $3,000", "1–3 weeks"],
    ["Monthly Retainer", "$550 – $950/mo", "Ongoing"],
  ];

  services.forEach(([name, price, time]) => {
    if (y > 272) { doc.addPage(); y = 18; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    setColor(dark);
    doc.text(name, margin, y);

    doc.setFont("helvetica", "bold");
    setColor(primary);
    doc.text(price, W - margin - 36, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    setColor(mid);
    doc.text(time, W - margin, y, { align: "right" });
    y += 6;
  });

  gap(2);

  // ── NOTABLE RESULTS ──────────────────────────────────────────────
  section("Notable Client Results");
  bullet("MedBook (Founder: Sarah Mitchell) — Built patient booking system in 6 weeks; reduced front-desk workload by 60%.");
  bullet("ShopLocal (CEO: James Okonkwo) — Custom e-commerce solution, 3× faster load, +22% conversions, eliminated $300/month in SaaS fees.");
  bullet("LaunchPad SaaS (CTO: Priya Sharma) — Full SaaS MVP delivered from idea to production in under 8 weeks.");
  bullet("ShopFlow (Founder: Priya Mehta) — AI chatbot integrated into live e-commerce site in 10 days.");
  gap();

  // ── WORK APPROACH ────────────────────────────────────────────────
  section("Work Approach");
  bullet("Fixed-scope contracts only — clear deliverables, no hourly billing surprises.");
  bullet("Progress updates every 2–3 days; weekly live demos throughout the project.");
  bullet("30-day post-launch support included on all projects.");
  bullet("Full source code, IP, and designs transfer to the client on final payment.");
  bullet("Contracts on every project without exception — protects both parties.");
  gap();

  // ── FOOTER ───────────────────────────────────────────────────────
  const pages = doc.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);
    setFill(dark);
    doc.rect(0, 290, W, 10, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    setColor([148, 163, 184]);
    doc.text("saifcraft.com  ·  contact@saifcraft.com  ·  github.com/saifkhan-dev", margin, 296);
    doc.text(`Page ${p} of ${pages}`, W - margin, 296, { align: "right" });
  }

  doc.save("Saif_Khan_Resume.pdf");
}
