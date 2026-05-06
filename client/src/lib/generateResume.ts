import { jsPDF } from "jspdf";

const PHOTO_URL =
  "https://res.cloudinary.com/de2wrwg6e/image/upload/v1778032828/khjghjfgjhfgh_lnkk4d.png";

async function toDataURL(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function generateResume() {
  let photoData: string | null = null;
  try {
    photoData = await toDataURL(PHOTO_URL);
  } catch {
    photoData = null;
  }

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const W = 210;
  const H = 297;
  const SIDE = 65;
  const MAIN = SIDE + 1;
  const MAIN_W = W - MAIN - 13;
  const SM = 9; // sidebar margin

  // ── COLOURS ─────────────────────────────────────────────────────
  const navy: [number, number, number] = [11, 26, 65];
  const blue: [number, number, number] = [37, 99, 235];
  const sky: [number, number, number] = [147, 197, 253];
  const ice: [number, number, number] = [219, 234, 254];
  const white: [number, number, number] = [255, 255, 255];
  const offW: [number, number, number] = [245, 248, 252];
  const sl: [number, number, number] = [71, 85, 105];
  const dark: [number, number, number] = [15, 23, 42];
  const border: [number, number, number] = [203, 213, 225];

  const f = (c: [number, number, number]) => doc.setFillColor(...c);
  const d = (c: [number, number, number]) => doc.setDrawColor(...c);
  const t = (c: [number, number, number]) => doc.setTextColor(...c);

  // ── BACKGROUNDS ─────────────────────────────────────────────────
  f(navy); doc.rect(0, 0, SIDE, H, "F");
  f(blue); doc.rect(0, 0, SIDE, 5, "F");       // top accent stripe
  f(white); doc.rect(SIDE, 0, W - SIDE, H, "F");
  f(offW); doc.rect(SIDE, 0, W - SIDE, 50, "F"); // header bg right

  // ── PHOTO ───────────────────────────────────────────────────────
  const PH = 42;
  const PX = (SIDE - PH) / 2;
  const PY = 10;
  if (photoData) {
    // white circle border
    f(white); d(white); doc.setLineWidth(2);
    doc.circle(SIDE / 2, PY + PH / 2, PH / 2 + 2, "F");
    // photo clipped to circle area (jsPDF clips via image placement)
    doc.addImage(photoData, "PNG", PX, PY, PH, PH);
    // blue ring on top
    f([0,0,0]); d(blue); doc.setLineWidth(1.5);
    doc.circle(SIDE / 2, PY + PH / 2, PH / 2, "S");
  } else {
    // placeholder circle
    f(blue); d(white); doc.setLineWidth(1.5);
    doc.circle(SIDE / 2, PY + PH / 2, PH / 2 + 2, "F");
    t(white); doc.setFontSize(14); doc.setFont("helvetica", "bold");
    doc.text("SK", SIDE / 2, PY + PH / 2 + 4, { align: "center" });
  }

  let sy = PY + PH + 7;

  // ── NAME ────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold"); doc.setFontSize(14); t(white);
  doc.text("Saif Khan", SIDE / 2, sy, { align: "center" });
  sy += 6;

  // Title pill
  f(blue);
  doc.roundedRect(SM, sy, SIDE - SM * 2, 11, 2, 2, "F");
  doc.setFont("helvetica", "bold"); doc.setFontSize(6.5); t(white);
  doc.text("Senior Fullstack Developer", SIDE / 2, sy + 4, { align: "center" });
  doc.text("& AI Integration Specialist", SIDE / 2, sy + 8.5, { align: "center" });
  sy += 15;

  // ── STATS GRID ──────────────────────────────────────────────────
  const stats = [
    { v: "7+", l: "Years" }, { v: "48+", l: "Projects" },
    { v: "29+", l: "Clients" }, { v: "94%", l: "Satisfied" },
  ];
  const sw = (SIDE - SM * 2) / 2;
  stats.forEach((s, i) => {
    const sx2 = SM + (i % 2) * sw;
    const ry = sy + Math.floor(i / 2) * 15;
    f([22, 50, 110] as [number,number,number]);
    doc.roundedRect(sx2 + 1, ry - 2, sw - 2, 13, 2, 2, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(11); t(sky);
    doc.text(s.v, sx2 + sw / 2, ry + 5, { align: "center" });
    doc.setFont("helvetica", "normal"); doc.setFontSize(6.5); t(white);
    doc.text(s.l, sx2 + sw / 2, ry + 10, { align: "center" });
  });
  sy += 34;

  // ── SIDEBAR SECTION HELPER ──────────────────────────────────────
  const sSection = (title: string) => {
    d([255,255,255] as [number,number,number]); doc.setLineWidth(0.25);
    doc.line(SM, sy, SIDE - SM, sy);
    sy += 3;
    doc.setFont("helvetica", "bold"); doc.setFontSize(7); t(sky);
    doc.text(title.toUpperCase(), SM, sy);
    sy += 5;
  };

  const sItem = (label: string) => {
    f(blue); doc.circle(SM + 1.2, sy - 1.3, 1, "F");
    doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); t(white);
    const lines = doc.splitTextToSize(label, SIDE - SM - 7);
    doc.text(lines, SM + 4, sy);
    sy += lines.length * 4.5 + 1;
  };

  const sBar = (name: string, pct: number) => {
    doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); t(white);
    doc.text(name, SM, sy);
    const bw = SIDE - SM * 2;
    f([30, 60, 120] as [number,number,number]);
    doc.roundedRect(SM, sy + 1.5, bw, 2.5, 1, 1, "F");
    f(sky);
    doc.roundedRect(SM, sy + 1.5, bw * pct / 100, 2.5, 1, 1, "F");
    sy += 8;
  };

  // ── CONTACT ─────────────────────────────────────────────────────
  sSection("Contact");
  sItem("contact@saifcraft.com");
  sItem("github.com/saifkhan-dev");
  sItem("linkedin.com/in/saifkhan");
  sItem("Remote — Global");
  sItem("< 24h response time");
  sy += 3;

  // ── SKILLS ──────────────────────────────────────────────────────
  sSection("Skills");
  sBar("React / Next.js", 95);
  sBar("Node.js / Express", 92);
  sBar("TypeScript", 93);
  sBar("PostgreSQL", 90);
  sBar("AI / LLM APIs", 85);
  sBar("Docker / DevOps", 82);
  sy += 2;

  // ── TECHNOLOGIES ────────────────────────────────────────────────
  sSection("Technologies");
  const techs = ["React","Next.js","TypeScript","Node.js","PostgreSQL",
    "MongoDB","GraphQL","Prisma","Firebase","Docker","Redis","OpenAI","Vercel","Git"];
  let tx = SM, tagY = sy;
  techs.forEach((tech) => {
    doc.setFontSize(6.5);
    const tw = doc.getTextWidth(tech) + 5;
    if (tx + tw > SIDE - SM + 2) { tx = SM; tagY += 7; }
    f(blue); doc.roundedRect(tx, tagY - 3.5, tw, 6, 1.5, 1.5, "F");
    t(white); doc.setFont("helvetica", "normal");
    doc.text(tech, tx + 2.5, tagY);
    tx += tw + 2;
  });
  sy = tagY + 10;

  // ── AVAILABILITY ────────────────────────────────────────────────
  sSection("Availability");
  sItem("Freelance / Contract");
  sItem("Fixed-scope projects");
  sItem("Available June 2026");

  // ═══════════════════════════════════════════════════════════════
  // ── MAIN CONTENT ────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════
  let my = 12;

  // Name + title header
  doc.setFont("helvetica", "bold"); doc.setFontSize(27); t(dark);
  doc.text("Saif Khan", MAIN + 2, my + 10);

  doc.setFont("helvetica", "normal"); doc.setFontSize(10); t(blue);
  doc.text("Senior Fullstack Developer  ·  AI Integration Specialist", MAIN + 2, my + 18);

  d(blue); doc.setLineWidth(0.7);
  doc.line(MAIN + 2, my + 21, W - 13, my + 21);

  // Contact chips
  const chips = ["contact@saifcraft.com", "saifcraft.com", "Remote — Global", "Freelance"];
  let cx2 = MAIN + 2; const cy2 = my + 30;
  chips.forEach((chip) => {
    doc.setFontSize(7.5);
    const cw = doc.getTextWidth(chip) + 6;
    f(ice); doc.roundedRect(cx2, cy2 - 4, cw, 7, 2, 2, "F");
    t(blue); doc.setFont("helvetica", "bold");
    doc.text(chip, cx2 + 3, cy2);
    cx2 += cw + 4;
  });

  my = 53;

  // ── MAIN SECTION HELPER ─────────────────────────────────────────
  const mSection = (title: string) => {
    if (my > 266) { doc.addPage(); my = 14; }
    f(blue); doc.rect(MAIN + 2, my, 3.5, 5.5, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(9.5); t(dark);
    doc.text(title, MAIN + 8, my + 4.5);
    d(border); doc.setLineWidth(0.3);
    doc.line(MAIN + 8 + doc.getTextWidth(title) + 3, my + 3, W - 13, my + 3);
    my += 10;
  };

  const mPara = (text: string) => {
    const lines = doc.splitTextToSize(text, MAIN_W);
    doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); t(sl);
    lines.forEach((line: string) => {
      if (my > 274) { doc.addPage(); my = 14; }
      doc.text(line, MAIN + 2, my);
      my += 4.6;
    });
  };

  const mBullet = (text: string) => {
    const lines = doc.splitTextToSize(text, MAIN_W - 6);
    doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); t(sl);
    lines.forEach((line: string, i: number) => {
      if (my > 274) { doc.addPage(); my = 14; }
      if (i === 0) { f(blue); doc.circle(MAIN + 4, my - 1.3, 1.1, "F"); }
      doc.text(line, MAIN + 7, my);
      my += 4.5;
    });
  };

  const mJob = (role: string, co: string, period: string, type: string) => {
    if (my > 265) { doc.addPage(); my = 14; }
    f(offW); d(border); doc.setLineWidth(0.3);
    doc.roundedRect(MAIN + 2, my - 1, MAIN_W, 15, 2, 2, "FD");
    // left accent
    f(blue); doc.roundedRect(MAIN + 2, my - 1, 3, 15, 1, 1, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(9); t(dark);
    doc.text(role, MAIN + 8, my + 5);
    doc.setFont("helvetica", "bold"); doc.setFontSize(7.5); t(blue);
    doc.text(co, MAIN + 8, my + 10.5);
    doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); t(sl);
    doc.text(period, W - 13, my + 5, { align: "right" });
    doc.text(type, W - 13, my + 10.5, { align: "right" });
    my += 19;
  };

  const gap = (n = 4) => { my += n; };

  // ── SUMMARY ─────────────────────────────────────────────────────
  mSection("Professional Summary");
  mPara(
    "Self-driven Senior Fullstack Developer with 7+ years of hands-on experience building fast, production-ready " +
    "web applications for startups and growing businesses worldwide. Specialist in React, Node.js, TypeScript, and " +
    "PostgreSQL. Over the past 2 years, integrated AI into real production products — chatbots, semantic search, " +
    "content generation, and recommendation engines. You speak directly to the developer: clean code, honest " +
    "timelines, and direct communication every step of the way."
  );
  gap(3);

  // ── EXPERIENCE ──────────────────────────────────────────────────
  mSection("Experience");

  mJob("Senior Fullstack & AI Developer", "SaifCraft · Self-employed", "2024 – Present", "Freelance / Remote");
  mBullet("Building AI-integrated web products — chatbots, semantic search, content engines, recommendation systems — for global startups using OpenAI / LLM APIs.");
  mBullet("Full-cycle delivery: React + Node.js + PostgreSQL from discovery call to production deployment.");
  mBullet("Clients in US, UK, Europe, Middle East & South Asia — 100% remote, fixed-scope contracts only.");
  gap(3);

  mJob("Fullstack Developer", "Multiple Clients · Remote", "2021 – 2024", "Contract");
  mBullet("Led end-to-end development of SaaS platforms and e-commerce products for US, UK, and Pakistani clients.");
  mBullet("Delivered custom e-commerce solution: 3× faster than Shopify, +22% conversions, saved client $300/month.");
  mBullet("Built patient booking system in 6 weeks — reduced front-desk workload by 60%.");
  mBullet("REST & GraphQL APIs, PostgreSQL and MongoDB, multi-tenant dashboards, and custom admin panels.");
  gap(3);

  mJob("Frontend Developer", "Web Agency · On-site / Remote", "2018 – 2021", "Agency");
  mBullet("Grew from React specialist to full-stack developer — delivered 20+ projects from landing pages to dashboards.");
  mBullet("Responsive, accessible React + TypeScript UIs; Firebase for auth and real-time data.");
  mBullet("Adopted Node.js and PostgreSQL mid-tenure; contributed to backend APIs and database design.");
  gap(3);

  // ── CLIENT RESULTS ──────────────────────────────────────────────
  mSection("Notable Client Results");

  const results: [string, string][] = [
    ["−60% workload", "MedBook — Patient booking system built in 6 weeks (Sarah Mitchell, Founder)"],
    ["+22% conversions", "ShopLocal — Custom e-commerce, 3× faster, saved $300/mo (James Okonkwo, CEO)"],
    ["MVP in 8 weeks", "LaunchPad SaaS — Idea to production deployment (Priya Sharma, CTO)"],
    ["AI live in 10 days", "ShopFlow — Chatbot integrated into live e-commerce site (Priya Mehta, Founder)"],
  ];
  results.forEach(([metric, detail]) => {
    if (my > 272) { doc.addPage(); my = 14; }
    f(ice); d(border); doc.setLineWidth(0.25);
    doc.roundedRect(MAIN + 2, my - 3.5, MAIN_W, 8.5, 1.5, 1.5, "FD");
    doc.setFont("helvetica", "bold"); doc.setFontSize(8); t(blue);
    doc.text(metric, MAIN + 5, my + 0.8);
    const mw = doc.getTextWidth(metric);
    doc.setFont("helvetica", "normal"); t(sl);
    doc.text(detail, MAIN + 7 + mw, my + 0.8);
    my += 10;
  });
  gap(3);

  // ── SERVICES ────────────────────────────────────────────────────
  mSection("Services & Rates");
  const svcs: [string, string, string][] = [
    ["Landing Page", "$800 – $1,500", "5–7 days"],
    ["Business Website", "$2,000 – $3,500", "2–3 weeks"],
    ["Custom Web App", "$3,500 – $8,000+", "4–8 weeks"],
    ["AI Feature Add-On", "$1,200 – $3,000", "1–3 weeks"],
    ["Monthly Retainer", "$550 – $950/mo", "Ongoing"],
  ];
  svcs.forEach(([name, price, time], i) => {
    if (my > 272) { doc.addPage(); my = 14; }
    f(i % 2 === 0 ? offW : white);
    doc.rect(MAIN + 2, my - 3.5, MAIN_W, 8, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(8); t(dark);
    doc.text(name, MAIN + 5, my + 0.8);
    t(blue); doc.text(price, W - 50, my + 0.8);
    doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); t(sl);
    doc.text(time, W - 13, my + 0.8, { align: "right" });
    my += 8.5;
  });

  // ── GLOBAL FOOTER ───────────────────────────────────────────────
  const pages = doc.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);
    f(navy); doc.rect(0, H - 8, W, 8, "F");
    f(blue); doc.rect(0, H - 8, SIDE, 8, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(7); t(white);
    doc.text("saifcraft.com", SIDE / 2, H - 3, { align: "center" });
    doc.setFont("helvetica", "normal"); t(sky);
    doc.text("contact@saifcraft.com  ·  github.com/saifkhan-dev  ·  linkedin.com/in/saifkhan", MAIN + 3, H - 3);
    t(white);
    doc.text(`${p} / ${pages}`, W - 10, H - 3, { align: "right" });
  }

  doc.save("Saif_Khan_Resume.pdf");
}
