import { jsPDF } from "jspdf";

const PHOTO_URL =
  "https://res.cloudinary.com/de2wrwg6e/image/upload/v1778032828/khjghjfgjhfgh_lnkk4d.png";

async function imgToDataURL(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onloadend = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}

/* ──────────────────────────────────────────────────
   CONSTANTS
────────────────────────────────────────────────── */
const W = 210;
const H = 297;
const SIDE = 62;          // sidebar width
const MX = SIDE + 1;      // main content X start
const MW = W - MX - 12;   // main content width
const SM = 8;              // sidebar inner margin

// Palette
const C = {
  navy:   [13, 27, 68]   as [number,number,number],
  blue:   [37, 99, 235]  as [number,number,number],
  sky:    [96, 165, 250] as [number,number,number],
  ice:    [219,234,254]  as [number,number,number],
  white:  [255,255,255]  as [number,number,number],
  offW:   [248,250,252]  as [number,number,number],
  slate:  [100,116,139]  as [number,number,number],
  dark:   [15, 23, 42]   as [number,number,number],
  border: [203,213,225]  as [number,number,number],
  green:  [34, 197, 94]  as [number,number,number],
};

/* ──────────────────────────────────────────────────
   EXPORT
────────────────────────────────────────────────── */
export async function generateResume() {
  let photo: string | null = null;
  try { photo = await imgToDataURL(PHOTO_URL); } catch { photo = null; }

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  /* helper shorthands */
  const F = (c: [number,number,number]) => doc.setFillColor(...c);
  const D = (c: [number,number,number]) => doc.setDrawColor(...c);
  const T = (c: [number,number,number]) => doc.setTextColor(...c);
  const font = (style: "bold"|"normal"|"italic", size: number) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
  };

  /* ── Draw sidebar background (call on every page) ── */
  const drawSideBg = () => {
    F(C.navy); doc.rect(0, 0, SIDE, H, "F");
    // subtle top stripe
    F(C.blue); doc.rect(0, 0, SIDE, 4, "F");
  };

  /* ── Draw main background ── */
  const drawMainBg = () => {
    F(C.white); doc.rect(SIDE, 0, W - SIDE, H, "F");
  };

  /* ══════════════════════════════════════════
     PAGE 1
  ══════════════════════════════════════════ */
  drawSideBg();
  drawMainBg();

  /* ─── SIDEBAR PAGE 1 ─────────────────────────── */
  let sy = 10;

  /* Photo */
  const PR = 22; // photo circle radius
  const PCX = SIDE / 2;
  const PCY = sy + PR;
  // White border ring
  F(C.white); D(C.white); doc.setLineWidth(0);
  doc.circle(PCX, PCY, PR + 2.5, "F");
  // Blue accent ring
  D(C.blue); doc.setLineWidth(1.2);
  doc.circle(PCX, PCY, PR + 1, "S");
  // Photo or placeholder
  if (photo) {
    const ps = (PR + 0) * 2;
    doc.addImage(photo, "PNG", PCX - PR, PCY - PR, ps, ps);
    // overlay ring to hide square corners
    D(C.navy); doc.setLineWidth(6);
    doc.circle(PCX, PCY, PR + 3, "S");
    D(C.blue); doc.setLineWidth(1.2);
    doc.circle(PCX, PCY, PR + 1, "S");
  } else {
    F(C.blue); doc.circle(PCX, PCY, PR, "F");
    font("bold", 16); T(C.white);
    doc.text("SK", PCX, PCY + 4, { align: "center" });
  }
  sy = PCY + PR + 8;

  /* Name */
  font("bold", 13.5); T(C.white);
  doc.text("Saif Khan", SIDE / 2, sy, { align: "center" });
  sy += 5.5;

  /* Title pill */
  F(C.blue);
  doc.roundedRect(SM, sy, SIDE - SM * 2, 11, 2, 2, "F");
  font("bold", 6.5); T(C.white);
  doc.text("Senior Fullstack Developer", SIDE / 2, sy + 4, { align: "center" });
  doc.text("& AI Integration Specialist", SIDE / 2, sy + 8.5, { align: "center" });
  sy += 16;

  /* Stats 2×2 */
  const stats = [
    { v: "7+", l: "Years" }, { v: "48+", l: "Projects" },
    { v: "29+", l: "Clients" }, { v: "94%", l: "Satisfaction" },
  ];
  const sw2 = (SIDE - SM * 2) / 2;
  stats.forEach((s, i) => {
    const bx = SM + (i % 2) * sw2;
    const by = sy + Math.floor(i / 2) * 15;
    F([22, 52, 115] as [number,number,number]);
    doc.roundedRect(bx + 0.5, by - 1.5, sw2 - 1, 13, 2, 2, "F");
    font("bold", 11); T(C.sky);
    doc.text(s.v, bx + sw2 / 2, by + 5.5, { align: "center" });
    font("normal", 6); T([180,200,240] as [number,number,number]);
    doc.text(s.l, bx + sw2 / 2, by + 10, { align: "center" });
  });
  sy += 34;

  /* Sidebar section helper */
  const sSection = (title: string) => {
    D([50,80,160] as [number,number,number]); doc.setLineWidth(0.25);
    doc.line(SM, sy, SIDE - SM, sy);
    sy += 4;
    font("bold", 7); T(C.sky);
    doc.text(title.toUpperCase(), SM, sy);
    sy += 5;
  };

  const sItem = (icon: string, text: string) => {
    font("normal", 7.5); T(C.sky);
    doc.text(icon, SM, sy);
    T(C.white);
    const lines = doc.splitTextToSize(text, SIDE - SM - 7);
    doc.text(lines, SM + 5, sy);
    sy += lines.length * 4.5 + 1.5;
  };

  const sBar = (name: string, pct: number) => {
    font("normal", 7.5); T(C.white);
    doc.text(name, SM, sy);
    const bw = SIDE - SM * 2;
    F([22, 52, 115] as [number,number,number]);
    doc.roundedRect(SM, sy + 1.5, bw, 2.5, 1, 1, "F");
    F(C.sky);
    doc.roundedRect(SM, sy + 1.5, bw * pct / 100, 2.5, 1, 1, "F");
    sy += 8;
  };

  /* Contact */
  sSection("Contact");
  sItem("@", "contact@saifcraft.com");
  sItem("◈", "saifcraft.com");
  sItem("gh", "github.com/saifkhan-dev");
  sItem("in", "linkedin.com/in/saifkhan");
  sItem("◷", "< 24h response time");
  sy += 3;

  /* Skills */
  sSection("Skills");
  sBar("React / Next.js", 95);
  sBar("TypeScript", 93);
  sBar("Node.js / Express", 92);
  sBar("PostgreSQL / MongoDB", 90);
  sBar("AI / LLM APIs", 85);
  sBar("Docker / DevOps", 82);
  sy += 3;

  /* Technologies */
  sSection("Technologies");
  const techs = [
    "React","Next.js","TypeScript","Node.js",
    "PostgreSQL","MongoDB","GraphQL","Prisma",
    "Firebase","Redis","Docker","OpenAI",
    "Vercel","Git / CI-CD","Tailwind CSS",
  ];
  let tx = SM, tgy = sy;
  techs.forEach((tech) => {
    font("normal", 6.5);
    const tw = doc.getTextWidth(tech) + 5;
    if (tx + tw > SIDE - SM + 2) { tx = SM; tgy += 7; }
    F(C.blue);
    doc.roundedRect(tx, tgy - 3.5, tw, 6, 1.5, 1.5, "F");
    T(C.white);
    doc.text(tech, tx + 2.5, tgy);
    tx += tw + 2;
  });
  sy = tgy + 10;

  /* Availability */
  sSection("Availability");
  sItem("✓", "Freelance / Contract");
  sItem("✓", "Fixed-scope projects");
  sItem("✓", "Available June 2026");
  sItem("✓", "Remote — Worldwide");

  /* ─── MAIN CONTENT PAGE 1 ─────────────────────── */
  let my = 10;

  /* Header area bg */
  F(C.offW);
  doc.roundedRect(MX + 1, my, MW + 4, 46, 3, 3, "F");

  /* Name */
  font("bold", 24); T(C.dark);
  doc.text("Saif Khan", MX + 6, my + 13);

  /* Title */
  font("normal", 9.5); T(C.blue);
  doc.text("Senior Fullstack Developer  ·  AI Integration Specialist", MX + 6, my + 21);

  /* Divider */
  D(C.blue); doc.setLineWidth(0.6);
  doc.line(MX + 6, my + 24, W - 12, my + 24);

  /* Contact chips */
  const chips = [
    "✉ contact@saifcraft.com",
    "⌂ Remote — Global",
    "◈ github.com/saifkhan-dev",
    "✦ Freelance",
  ];
  let cx = MX + 6; const chipY = my + 35;
  chips.forEach((chip) => {
    font("normal", 7);
    const cw = doc.getTextWidth(chip) + 6;
    if (cx + cw > W - 12) { cx = MX + 6; }
    F(C.ice);
    doc.roundedRect(cx, chipY - 4, cw, 7, 2, 2, "F");
    T(C.blue);
    doc.text(chip, cx + 3, chipY);
    cx += cw + 3;
  });

  /* Available badge */
  F(C.green); T(C.white);
  font("bold", 7);
  const badgeTxt = "● Available for Projects";
  const bw = doc.getTextWidth(badgeTxt) + 8;
  doc.roundedRect(W - 12 - bw, chipY - 4, bw, 7, 2, 2, "F");
  doc.text(badgeTxt, W - 12 - bw + 4, chipY);

  my = 62;

  /* ── Main section heading helper ── */
  const mSection = (title: string) => {
    if (my > 266) {
      doc.addPage();
      drawSideBg();
      drawMainBg();
      // re-draw sidebar footer links on new page
      my = 14;
    }
    D(C.blue); doc.setLineWidth(0.5);
    doc.line(MX + 2, my, MX + 2, my + 7);
    font("bold", 9.5); T(C.dark);
    doc.text(title, MX + 6, my + 5.5);
    D(C.border); doc.setLineWidth(0.25);
    doc.line(MX + 6 + doc.getTextWidth(title) + 3, my + 4, W - 12, my + 4);
    my += 12;
  };

  const mPara = (text: string) => {
    if (my > 274) { doc.addPage(); drawSideBg(); drawMainBg(); my = 14; }
    const lines = doc.splitTextToSize(text, MW);
    font("normal", 8.5); T(C.slate);
    lines.forEach((line: string) => {
      if (my > 276) { doc.addPage(); drawSideBg(); drawMainBg(); my = 14; }
      doc.text(line, MX + 2, my);
      my += 4.6;
    });
  };

  const mBullet = (text: string) => {
    const lines = doc.splitTextToSize(text, MW - 6);
    font("normal", 8.5); T(C.slate);
    lines.forEach((line: string, i: number) => {
      if (my > 276) { doc.addPage(); drawSideBg(); drawMainBg(); my = 14; }
      if (i === 0) {
        F(C.blue); doc.circle(MX + 4.5, my - 1.3, 1.1, "F");
      }
      doc.text(line, MX + 8, my);
      my += 4.6;
    });
  };

  const mJob = (role: string, co: string, period: string, type: string) => {
    if (my > 262) { doc.addPage(); drawSideBg(); drawMainBg(); my = 14; }
    // card bg
    F(C.offW); D(C.border); doc.setLineWidth(0.25);
    doc.roundedRect(MX + 2, my - 1.5, MW, 16, 2, 2, "FD");
    // left accent bar
    F(C.blue); doc.roundedRect(MX + 2, my - 1.5, 3.5, 16, 1, 1, "F");
    // role
    font("bold", 9); T(C.dark);
    doc.text(role, MX + 9, my + 5);
    // company
    font("bold", 7.5); T(C.blue);
    doc.text(co, MX + 9, my + 11);
    // period + type
    font("normal", 7.5); T(C.slate);
    doc.text(period, W - 12, my + 5, { align: "right" });
    doc.text(type, W - 12, my + 11, { align: "right" });
    my += 20;
  };

  const gap = (n = 4) => { my += n; };

  /* ── PROFESSIONAL SUMMARY ── */
  mSection("Professional Summary");
  mPara(
    "Self-driven Senior Fullstack Developer with 7+ years of hands-on experience building fast, production-ready " +
    "web applications for startups and growing businesses worldwide. Specialist in React, Node.js, TypeScript, " +
    "and PostgreSQL. Over the past 2 years, integrated AI into real production products — chatbots, semantic " +
    "search, content generation, and recommendation engines. You speak directly to the developer — clean code, " +
    "honest timelines, and direct communication every step of the way."
  );
  gap(4);

  /* ── EXPERIENCE ── */
  mSection("Experience");

  mJob(
    "Senior Fullstack & AI Developer",
    "SaifCraft · Self-employed",
    "2024 – Present",
    "Freelance / Remote"
  );
  mBullet("Building AI-integrated web products — chatbots, semantic search, content engines, recommendation systems — for global startups using OpenAI / LLM APIs.");
  mBullet("Full-cycle delivery: React + Node.js + PostgreSQL from discovery call to production deployment and post-launch support.");
  mBullet("Clients across US, UK, Europe, Middle East & South Asia — 100% remote, fixed-scope contracts only.");
  gap(4);

  mJob(
    "Fullstack Developer",
    "Multiple Clients · Remote",
    "2021 – 2024",
    "Contract"
  );
  mBullet("Led end-to-end development of SaaS platforms and e-commerce products for US, UK, and Pakistani clients.");
  mBullet("Delivered custom e-commerce solution: 3× faster than Shopify, +22% conversions, saved client $300/month in fees.");
  mBullet("Built patient booking system in 6 weeks — reduced front-desk workload by 60%.");
  mBullet("REST & GraphQL APIs, PostgreSQL and MongoDB, multi-tenant dashboards, and custom admin panels.");
  gap(4);

  mJob(
    "Frontend Developer",
    "Web Agency · On-site / Remote",
    "2018 – 2021",
    "Agency"
  );
  mBullet("Grew from React specialist to full-stack developer — 20+ projects from landing pages to complex dashboards.");
  mBullet("Built responsive, accessible UIs with React and TypeScript; integrated Firebase for auth and real-time data.");
  mBullet("Adopted Node.js and PostgreSQL mid-tenure; contributed to backend API design and database architecture.");
  gap(4);

  /* ── NOTABLE CLIENT RESULTS ── */
  mSection("Notable Client Results");

  const results: [string, string, string][] = [
    ["−60%", "Workload", "MedBook — Patient booking system built in 6 weeks · Sarah Mitchell, Founder"],
    ["+22%", "Conversions", "ShopLocal — Custom e-commerce, 3× faster, saved $300/mo · James Okonkwo, CEO"],
    ["8 wks", "MVP Launch", "LaunchPad SaaS — Idea to production deployment · Priya Sharma, CTO"],
    ["10 days", "AI Live", "ShopFlow — AI chatbot integrated into live e-commerce site · Priya Mehta, Founder"],
  ];

  results.forEach(([val, label, detail]) => {
    if (my > 272) { doc.addPage(); drawSideBg(); drawMainBg(); my = 14; }
    // card
    F(C.offW); D(C.border); doc.setLineWidth(0.2);
    doc.roundedRect(MX + 2, my - 3.5, MW, 10, 2, 2, "FD");
    // metric badge
    F(C.blue);
    doc.roundedRect(MX + 3, my - 2.5, 18, 8, 1.5, 1.5, "F");
    font("bold", 8.5); T(C.white);
    doc.text(val, MX + 12, my + 1.5, { align: "center" });
    // label
    font("bold", 8); T(C.dark);
    doc.text(label, MX + 24, my + 1.5);
    // detail
    font("normal", 7.5); T(C.slate);
    const dLines = doc.splitTextToSize(detail, MW - 35);
    doc.text(dLines[0], MX + 24 + doc.getTextWidth(label) + 3, my + 1.5);
    my += 11.5;
  });
  gap(4);

  /* ── SERVICES & RATES ── */
  mSection("Services & Rates");

  const svcs: [string, string, string, boolean][] = [
    ["Landing Page",      "$800 – $1,500",     "5–7 days",    false],
    ["Business Website",  "$2,000 – $3,500",   "2–3 weeks",   true ],
    ["Custom Web App",    "$3,500 – $8,000+",  "4–8 weeks",   false],
    ["AI Feature Add-On", "$1,200 – $3,000",   "1–3 weeks",   true ],
    ["Monthly Retainer",  "$550 – $950/mo",    "Ongoing",     false],
  ];

  // Header row
  if (my > 272) { doc.addPage(); drawSideBg(); drawMainBg(); my = 14; }
  F(C.navy); doc.roundedRect(MX + 2, my - 3, MW, 8, 2, 2, "F");
  font("bold", 8); T(C.white);
  doc.text("Service", MX + 6, my + 1.5);
  doc.text("Rate", W - 55, my + 1.5);
  doc.text("Timeline", W - 12, my + 1.5, { align: "right" });
  my += 7;

  svcs.forEach(([name, price, time, alt]) => {
    if (my > 276) { doc.addPage(); drawSideBg(); drawMainBg(); my = 14; }
    F(alt ? C.ice : C.white);
    doc.rect(MX + 2, my - 3, MW, 8, "F");
    font("bold", 8.5); T(C.dark);
    doc.text(name, MX + 6, my + 1.5);
    font("bold", 8.5); T(C.blue);
    doc.text(price, W - 55, my + 1.5);
    font("normal", 8); T(C.slate);
    doc.text(time, W - 12, my + 1.5, { align: "right" });
    my += 8;
  });

  gap(4);

  /* ── WORK APPROACH ── */
  mSection("Work Approach");
  const principles = [
    "Fixed-scope contracts only — clear deliverables, no hourly billing surprises.",
    "Progress updates every 2–3 days; weekly live demos throughout the project.",
    "30-day post-launch support included on all projects as standard.",
    "Full source code, IP, and designs transfer to the client on final payment.",
    "Signed contracts on every project without exception — protects both parties.",
  ];
  principles.forEach(mBullet);

  /* ══════════════════════════════════════════
     FOOTER on every page
  ══════════════════════════════════════════ */
  const pages = doc.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);

    // Footer bar
    F(C.navy); doc.rect(0, H - 9, W, 9, "F");
    F(C.blue); doc.rect(0, H - 9, SIDE, 9, "F");

    // Sidebar footer text
    font("bold", 7); T(C.white);
    doc.text("saifcraft.com", SIDE / 2, H - 4, { align: "center" });

    // Main footer text
    font("normal", 7); T([148,163,184] as [number,number,number]);
    doc.text(
      "contact@saifcraft.com  ·  github.com/saifkhan-dev  ·  linkedin.com/in/saifkhan",
      MX + 4, H - 4
    );

    // Page number
    font("bold", 7); T(C.sky);
    doc.text(`${p} / ${pages}`, W - 10, H - 4, { align: "right" });
  }

  doc.save("Saif_Khan_Resume.pdf");
}
