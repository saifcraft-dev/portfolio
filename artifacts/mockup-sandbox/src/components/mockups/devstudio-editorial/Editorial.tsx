import React from 'react';
import { ArrowUpRight, Terminal, Check, Code, Server, Database, Sparkles } from 'lucide-react';

export function Editorial() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#F9F9FB', color: '#0F0F14', minHeight: '100vh', overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Space+Mono&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-mono-custom { font-family: 'Space Mono', monospace; }
        .text-ink { color: #0F0F14; }
        .text-accent { color: #4F46E5; }
        .bg-accent { background-color: #4F46E5; }
        .border-hairline { border: 1px solid rgba(15, 15, 20, 0.1); }
        .border-t-hairline { border-top: 1px solid rgba(15, 15, 20, 0.1); }
        .border-b-hairline { border-bottom: 1px solid rgba(15, 15, 20, 0.1); }
        .shadow-ink { box-shadow: 0 12px 32px -4px rgba(15, 15, 20, 0.08); }
        .texture-noise {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none; z-index: 50; opacity: 0.02;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        html { scroll-behavior: smooth; }
        .hover-scale:hover img { transform: scale(1.05); }
        .hover-shadow:hover { box-shadow: 0 12px 32px -4px rgba(15, 15, 20, 0.08); }
        .nav-link:hover { color: #0F0F14; }
        .cta-link:hover { color: #4F46E5; border-color: #4F46E5; }
        .service-row:hover { background: #F9F9FB; }
      `}} />
      <div className="texture-noise"></div>

      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 64px', borderBottom: '1px solid rgba(15,15,20,0.1)', background: 'rgba(249,249,251,0.92)', backdropFilter: 'blur(8px)', position: 'sticky', top: 0, zIndex: 40 }}>
        <div className="font-display" style={{ fontSize: '1.5rem', letterSpacing: '-0.02em' }}>Saif Khan.</div>
        <div style={{ display: 'flex', gap: '48px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(15,15,20,0.5)', fontWeight: 500 }}>
          <a href="#work" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Work</a>
          <a href="#expertise" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Expertise</a>
          <a href="#services" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Services</a>
        </div>
        <a href="#contact" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 500, textDecoration: 'none', color: '#0F0F14', borderBottom: '1px solid #0F0F14', paddingBottom: '2px', transition: 'color 0.2s, border-color 0.2s' }}>
          Let's Talk
        </a>
      </nav>

      {/* Hero */}
      <section style={{ padding: '128px 64px 96px', display: 'flex', flexWrap: 'wrap', gap: '64px', alignItems: 'center', borderBottom: '1px solid rgba(15,15,20,0.1)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: '20%', width: '1px', height: '100%', background: 'rgba(15,15,20,0.05)' }}></div>
        <div style={{ flex: '2 1 400px', zIndex: 10 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '32px', padding: '6px 16px', border: '1px solid rgba(79,70,229,0.2)', background: 'rgba(79,70,229,0.04)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 6px rgba(16,185,129,0.6)' }}></span>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#4F46E5', fontWeight: 600 }}>Available for Projects</span>
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '32px', fontWeight: 500 }}>
            I build fast, custom<br />
            <span style={{ fontStyle: 'italic', color: '#4F46E5' }}>web apps</span> that<br />
            deliver results.
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(15,15,20,0.55)', maxWidth: '560px', fontWeight: 300, lineHeight: 1.7, marginBottom: '48px' }}>
            Senior Fullstack Developer crafting high-end digital experiences for ambitious brands and startups.
          </p>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', background: '#0F0F14', color: '#F9F9FB', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500, textDecoration: 'none', transition: 'background 0.2s' }}>
              Hire Me <ArrowUpRight size={14} />
            </a>
            <a href="#work" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(15,15,20,0.5)', textDecoration: 'none', borderBottom: '1px solid rgba(15,15,20,0.2)', paddingBottom: '2px' }}>
              View Work
            </a>
          </div>
        </div>
        <div style={{ flex: '1 1 280px', display: 'flex', justifyContent: 'center', zIndex: 10 }}>
          <div style={{ background: '#fff', padding: '32px', border: '1px solid rgba(15,15,20,0.1)', boxShadow: '0 12px 32px -4px rgba(15,15,20,0.08)', width: '100%', maxWidth: '340px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: '#4F46E5' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid rgba(15,15,20,0.08)', color: 'rgba(15,15,20,0.3)' }}>
              <Terminal size={14} />
              <span className="font-mono-custom" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>system_status</span>
            </div>
            <div className="font-mono-custom" style={{ fontSize: '12px', lineHeight: 1.8, color: 'rgba(15,15,20,0.65)' }}>
              <p><span style={{ color: '#4F46E5' }}>const</span> developer = <span style={{ color: '#4F46E5' }}>new</span> Senior();</p>
              <p style={{ marginTop: '12px' }}>developer.stack = [<br />&nbsp;&nbsp;<span style={{ color: '#0F0F14' }}>"React"</span>,<br />&nbsp;&nbsp;<span style={{ color: '#0F0F14' }}>"Node.js"</span>,<br />&nbsp;&nbsp;<span style={{ color: '#0F0F14' }}>"TypeScript"</span><br />];</p>
              <p style={{ color: '#10B981', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(15,15,20,0.08)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={14} /> All systems operational
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '80px 64px', borderBottom: '1px solid rgba(15,15,20,0.1)', background: 'rgba(255,255,255,0.4)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', maxWidth: '1120px', margin: '0 auto', borderLeft: '1px solid rgba(15,15,20,0.08)' }}>
          {[
            { label: 'Projects Delivered', value: '50+' },
            { label: 'Happy Clients', value: '30+' },
            { label: 'Years Experience', value: '5+' },
            { label: 'Client Satisfaction', value: '99%' }
          ].map((stat, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '32px 24px', borderRight: '1px solid rgba(15,15,20,0.08)' }}>
              <div className="font-display" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: '#0F0F14', marginBottom: '12px', fontWeight: 500 }}>{stat.value}</div>
              <div className="font-mono-custom" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(15,15,20,0.35)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section id="expertise" style={{ padding: '128px 64px', borderBottom: '1px solid rgba(15,15,20,0.1)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '64px' }}>
            <div style={{ width: '32px', height: '1px', background: 'rgba(15,15,20,0.25)' }}></div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(15,15,20,0.45)', fontWeight: 500 }}>Core Expertise</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'rgba(15,15,20,0.08)' }}>
            {[
              { icon: <Code size={24} strokeWidth={1.5} />, title: 'Frontend', desc: 'React, Next.js, TypeScript, Tailwind CSS, Framer Motion' },
              { icon: <Server size={24} strokeWidth={1.5} />, title: 'Backend', desc: 'Node.js, Express, RESTful APIs, GraphQL, Firebase' },
              { icon: <Database size={24} strokeWidth={1.5} />, title: 'Database', desc: 'PostgreSQL, MongoDB, Redis, Prisma ORM' },
              { icon: <Sparkles size={24} strokeWidth={1.5} />, title: 'AI / LLMs', desc: 'OpenAI API, LangChain, Vector DBs, RAG pipelines' }
            ].map((skill, i) => (
              <div key={i} style={{ padding: '40px 32px', background: '#fff', transition: 'box-shadow 0.3s' }} className="hover-shadow">
                <div style={{ color: '#4F46E5', marginBottom: '24px' }}>{skill.icon}</div>
                <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '12px', fontWeight: 500 }}>{skill.title}</h3>
                <p style={{ color: 'rgba(15,15,20,0.55)', fontSize: '14px', lineHeight: 1.7, fontWeight: 300 }}>{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section id="work" style={{ padding: '128px 64px', borderBottom: '1px solid rgba(15,15,20,0.1)', background: 'rgba(255,255,255,0.5)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '80px', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '32px', height: '1px', background: 'rgba(15,15,20,0.25)' }}></div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(15,15,20,0.45)', fontWeight: 500 }}>Selected Work</span>
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 500 }}>Featured Cases</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '96px' }}>
            {[
              { name: 'MedBook', type: 'Web Application', bg: '#E8F4FF', result: '60% less workload', desc: 'Healthcare management platform that reduced administrative workload by 60%.' },
              { name: 'ShopLocal', type: 'E-Commerce', bg: '#F0FFF4', result: '+22% conversions', desc: 'Custom storefront and inventory system resulting in a 22% increase in conversions.' },
              { name: 'LaunchPad', type: 'SaaS MVP', bg: '#FFF0F0', result: 'MVP in 8 weeks', desc: 'Rapid MVP development for a high-growth startup, delivered in 8 weeks.' }
            ].map((project, i) => (
              <div key={i} style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'center', flexDirection: i % 2 !== 0 ? 'row-reverse' : 'row' }}>
                <div style={{ flex: '3 1 300px', overflow: 'hidden', border: '1px solid rgba(15,15,20,0.1)', background: project.bg, minHeight: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ textAlign: 'center', padding: '48px' }}>
                    <div className="font-display" style={{ fontSize: '4rem', color: 'rgba(15,15,20,0.15)', fontWeight: 500 }}>{project.name}</div>
                    <div style={{ marginTop: '16px', padding: '8px 20px', display: 'inline-block', background: '#4F46E5', color: '#fff', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>{project.result}</div>
                  </div>
                </div>
                <div style={{ flex: '2 1 240px' }}>
                  <div className="font-mono-custom" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#4F46E5', marginBottom: '16px' }}>{project.type}</div>
                  <h3 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '20px', fontWeight: 500 }}>{project.name}</h3>
                  <p style={{ color: 'rgba(15,15,20,0.55)', lineHeight: 1.8, marginBottom: '32px', fontWeight: 300, fontSize: '1.05rem' }}>{project.desc}</p>
                  <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none', color: '#0F0F14', borderBottom: '1px solid rgba(15,15,20,0.2)', paddingBottom: '2px' }}>
                    View Project <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services & Pricing */}
      <section id="services" style={{ padding: '128px 64px', borderBottom: '1px solid rgba(15,15,20,0.1)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '80px' }}>
            <div style={{ width: '32px', height: '1px', background: 'rgba(15,15,20,0.25)' }}></div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(15,15,20,0.45)', fontWeight: 500 }}>Engagement Models</span>
            <div style={{ width: '32px', height: '1px', background: 'rgba(15,15,20,0.25)' }}></div>
          </div>
          <div style={{ background: '#fff', border: '1px solid rgba(15,15,20,0.1)' }}>
            {[
              { name: 'Landing Page', price: '$250 – $600', time: '5–7 days', desc: 'High-converting, bespoke single-page presence.' },
              { name: 'Business Website', price: '$700 – $1,800', time: '2–3 weeks', desc: 'Comprehensive multi-page marketing site.' },
              { name: 'Custom Web App', price: '$2,500 – $10,000+', time: '4–8 weeks', desc: 'Full-stack application with database and auth.', highlight: true },
              { name: 'AI Integration Add-On', price: '$600 – $4,000', time: '1–3 weeks', desc: 'Custom LLM features and intelligent workflows.' }
            ].map((service, i, arr) => (
              <div key={i} style={{ padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: i < arr.length - 1 ? '1px solid rgba(15,15,20,0.08)' : 'none', background: service.highlight ? 'rgba(79,70,229,0.03)' : 'transparent', transition: 'background 0.2s', flexWrap: 'wrap', gap: '16px' }} className="service-row">
                <div>
                  <h4 className="font-display" style={{ fontSize: '1.4rem', marginBottom: '4px', fontWeight: 500 }}>
                    {service.name}
                    {service.highlight && <span style={{ marginLeft: '12px', fontSize: '10px', background: '#4F46E5', color: '#fff', padding: '2px 10px', verticalAlign: 'middle', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Popular</span>}
                  </h4>
                  <p style={{ color: 'rgba(15,15,20,0.45)', fontSize: '13px', fontWeight: 300 }}>{service.desc} <span style={{ color: 'rgba(15,15,20,0.3)', fontSize: '11px' }}>· {service.time}</span></p>
                </div>
                <div className="font-mono-custom" style={{ fontSize: '1.1rem', color: service.highlight ? '#4F46E5' : '#0F0F14', letterSpacing: '-0.02em', background: '#fff', padding: '8px 16px', border: '1px solid rgba(15,15,20,0.1)', boxShadow: '0 1px 4px rgba(15,15,20,0.06)' }}>
                  {service.price}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '11px', color: 'rgba(15,15,20,0.35)', fontFamily: 'Space Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            * Custom quotes provided after initial consultation
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '128px 64px', borderBottom: '1px solid rgba(15,15,20,0.1)', background: '#0F0F14', color: '#F9F9FB' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '80px' }}>
            <div style={{ width: '32px', height: '1px', background: 'rgba(249,249,251,0.15)' }}></div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(249,249,251,0.35)', fontWeight: 500 }}>Client Perspectives</span>
            <div style={{ width: '32px', height: '1px', background: 'rgba(249,249,251,0.15)' }}></div>
          </div>
          <div style={{ marginBottom: '96px' }}>
            <div className="font-display" style={{ fontSize: '18px', color: 'rgba(249,249,251,0.25)', marginBottom: '24px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>"</div>
            <h3 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 1.3, marginBottom: '40px', fontWeight: 400, fontStyle: 'italic' }}>
              The MVP was delivered in 8 weeks, completely exceeding our expectations in both speed and quality.
            </h3>
            <div>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Priya Sharma</span>
              <span className="font-mono-custom" style={{ fontSize: '11px', color: 'rgba(249,249,251,0.35)' }}>CTO, LaunchPad SaaS</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', paddingTop: '64px', borderTop: '1px solid rgba(249,249,251,0.08)', textAlign: 'left' }}>
            {[
              { quote: '"Saif built a healthcare management platform that reduced our administrative workload by 60%."', name: 'Sarah Mitchell', role: 'Founder, MedBook' },
              { quote: '"Our custom storefront resulted in a 22% increase in conversions in month one."', name: 'James Okonkwo', role: 'CEO, ShopLocal' }
            ].map((t, i) => (
              <div key={i}>
                <p className="font-display" style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '24px', fontWeight: 400, color: 'rgba(249,249,251,0.85)' }}>{t.quote}</p>
                <div>
                  <span style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '11px', fontWeight: 500, display: 'block', marginBottom: '2px' }}>{t.name}</span>
                  <span className="font-mono-custom" style={{ fontSize: '10px', color: 'rgba(249,249,251,0.3)' }}>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ padding: '160px 64px', textAlign: 'center', background: '#fff', borderBottom: '1px solid rgba(15,15,20,0.1)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 1.05, marginBottom: '48px', fontWeight: 500, letterSpacing: '-0.02em' }}>
            Have a project<br />in mind?<br />
            <span style={{ fontStyle: 'italic', color: '#4F46E5' }}>Let's build it.</span>
          </h2>
          <a href="mailto:hello@devstudio.com" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', fontFamily: 'Playfair Display, serif', color: '#4F46E5', borderBottom: '2px solid #4F46E5', paddingBottom: '4px', textDecoration: 'none', transition: 'color 0.2s, border-color 0.2s' }}>
            hello@devstudio.com
          </a>
          <div style={{ marginTop: '32px', fontSize: '12px', color: 'rgba(15,15,20,0.35)', fontFamily: 'Space Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            50% upfront · Fixed-scope · 30-day post-launch support
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '48px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'rgba(15,15,20,0.35)', fontFamily: 'Space Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.15em', flexWrap: 'wrap', gap: '24px', borderTop: '1px solid rgba(15,15,20,0.08)' }}>
        <div>© {new Date().getFullYear()} Saif Khan. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Twitter', 'LinkedIn', 'GitHub'].map(s => (
            <a key={s} href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>{s}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
