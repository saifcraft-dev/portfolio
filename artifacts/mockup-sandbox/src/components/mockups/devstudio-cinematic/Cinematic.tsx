import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Code2, Database, Layout, Server, Sparkles, Terminal, Cpu, ArrowUpRight, CheckCircle2, MessageSquare, Star, Zap } from 'lucide-react';

export function Cinematic() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  
  return (
    <div style={{
      fontFamily: "'Space Grotesk', sans-serif",
      backgroundColor: '#09090B',
      color: '#FAFAFA',
      minHeight: '100vh',
      overflowX: 'hidden'
    }} className="relative selection:bg-indigo-500/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        .bg-grid-pattern {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
        
        .text-gradient {
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .glow-indigo {
          box-shadow: 0 0 40px rgba(99,102,241,0.3);
        }
        
        .glass-card {
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
        }
        
        .dracula-keyword { color: #ff79c6; }
        .dracula-function { color: #50fa7b; }
        .dracula-string { color: #f1fa8c; }
        .dracula-comment { color: #6272a4; }
        .dracula-variable { color: #f8f8f2; }
        .dracula-punctuation { color: #f8f8f2; }
      `}</style>

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-grid-pattern opacity-40"></div>
      <div className="fixed top-0 left-0 w-full h-[800px] bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent blur-[100px] z-0 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-full h-[600px] bg-gradient-to-tl from-emerald-500/10 via-transparent to-transparent blur-[120px] z-0 pointer-events-none"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center glow-indigo">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tighter">SK.DEV</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#tech" className="hover:text-white transition-colors">Tech</a>
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
        </div>
        <button className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform flex items-center gap-2">
          Hire Me <ChevronRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-48 pb-32 px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
          Available for new projects
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1] mb-6"
        >
          I build fast, custom<br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-gradient">
            web apps
          </span> that deliver.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/60 max-w-2xl mb-12 font-light"
        >
          Hi, I'm Saif Khan. A senior fullstack developer crafting elite digital experiences from architecture to deployment.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-lg transition-colors flex items-center justify-center gap-2 glow-indigo">
            Start a project <ArrowUpRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-lg transition-colors flex items-center justify-center gap-2">
            View portfolio
          </button>
        </motion.div>

        {/* Code Block Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-[#2A2A35] bg-[#1E1E2E] text-left"
        >
          <div className="flex items-center px-4 py-3 bg-[#181825] border-b border-[#2A2A35]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="mx-auto text-xs text-white/40 font-mono">App.tsx</div>
          </div>
          <div className="p-6 overflow-x-auto font-mono text-sm leading-relaxed">
            <div><span className="dracula-keyword">import</span> <span className="dracula-punctuation">&#123;</span> useState<span className="dracula-punctuation">,</span> useEffect <span className="dracula-punctuation">&#125;</span> <span className="dracula-keyword">from</span> <span className="dracula-string">'react'</span><span className="dracula-punctuation">;</span></div>
            <div><span className="dracula-keyword">import</span> <span className="dracula-punctuation">&#123;</span> motion <span className="dracula-punctuation">&#125;</span> <span className="dracula-keyword">from</span> <span className="dracula-string">'framer-motion'</span><span className="dracula-punctuation">;</span></div>
            <br />
            <div><span className="dracula-keyword">export</span> <span className="dracula-keyword">default</span> <span className="dracula-keyword">function</span> <span className="dracula-function">SaifKhan</span><span className="dracula-punctuation">()</span> <span className="dracula-punctuation">&#123;</span></div>
            <div className="pl-4"><span className="dracula-keyword">const</span> <span className="dracula-punctuation">[</span>isElite<span className="dracula-punctuation">,</span> setIsElite<span className="dracula-punctuation">]</span> <span className="dracula-punctuation">=</span> <span className="dracula-function">useState</span><span className="dracula-punctuation">(</span><span className="dracula-keyword">true</span><span className="dracula-punctuation">);</span></div>
            <br />
            <div className="pl-4"><span className="dracula-comment">// Always delivering above expectations</span></div>
            <div className="pl-4"><span className="dracula-keyword">return</span> <span className="dracula-punctuation">(</span></div>
            <div className="pl-8"><span className="dracula-punctuation">&lt;</span><span className="dracula-function">motion.div</span></div>
            <div className="pl-12"><span className="dracula-variable">initial</span><span className="dracula-punctuation">=&#123;&#123;</span> opacity<span className="dracula-punctuation">:</span> 0 <span className="dracula-punctuation">&#125;&#125;</span></div>
            <div className="pl-12"><span className="dracula-variable">animate</span><span className="dracula-punctuation">=&#123;&#123;</span> opacity<span className="dracula-punctuation">:</span> 1 <span className="dracula-punctuation">&#125;&#125;</span></div>
            <div className="pl-8"><span className="dracula-punctuation">&gt;</span></div>
            <div className="pl-12"><span className="dracula-punctuation">&lt;</span><span className="dracula-function">Architecture</span> <span className="dracula-variable">scalable</span><span className="dracula-punctuation">=</span><span className="dracula-punctuation">&#123;</span><span className="dracula-keyword">true</span><span className="dracula-punctuation">&#125;</span> <span className="dracula-punctuation">/&gt;</span></div>
            <div className="pl-12"><span className="dracula-punctuation">&lt;</span><span className="dracula-function">Performance</span> <span className="dracula-variable">optimized</span><span className="dracula-punctuation">=</span><span className="dracula-string">"100%"</span> <span className="dracula-punctuation">/&gt;</span></div>
            <div className="pl-12"><span className="dracula-punctuation">&lt;</span><span className="dracula-function">Design</span> <span className="dracula-variable">pixelPerfect</span><span className="dracula-punctuation">=</span><span className="dracula-punctuation">&#123;</span><span className="dracula-keyword">true</span><span className="dracula-punctuation">&#125;</span> <span className="dracula-punctuation">/&gt;</span></div>
            <div className="pl-8"><span className="dracula-punctuation">&lt;/</span><span className="dracula-function">motion.div</span><span className="dracula-punctuation">&gt;</span></div>
            <div className="pl-4"><span className="dracula-punctuation">);</span></div>
            <div><span className="dracula-punctuation">&#125;</span></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-12 border-y border-white/5 bg-[#0C0C10]">
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-between gap-8">
          {[
            { label: 'Projects Delivered', value: '50+' },
            { label: 'Happy Clients', value: '30+' },
            { label: 'Years Experience', value: '5+' },
            { label: 'Client Satisfaction', value: '99%' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start">
              <span className="text-4xl font-bold bg-gradient-to-r from-white to-white/70 text-gradient drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{stat.value}</span>
              <span className="text-white/50 text-sm mt-1 uppercase tracking-widest font-mono">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack (Bento Grid) */}
      <section id="tech" className="relative z-10 py-32 px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Engineering Arsenal</h2>
          <p className="text-xl text-white/50 max-w-2xl">Modern tools for modern problems. I use the best technology for the task at hand.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass-card rounded-3xl p-8 flex flex-col justify-between group hover:border-indigo-500/30 transition-colors">
            <div>
              <Terminal className="w-10 h-10 text-indigo-400 mb-6" />
              <h3 className="text-2xl font-bold mb-2">Frontend Excellence</h3>
              <p className="text-white/60 mb-8">Building fluid, responsive, and accessible interfaces that users love to interact with.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Zustand'].map(tech => (
                <span key={tech} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono">{tech}</span>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 flex flex-col justify-between group hover:border-emerald-500/30 transition-colors">
            <div>
              <Server className="w-10 h-10 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-bold mb-2">Backend & APIs</h3>
              <p className="text-white/60 mb-8">Robust architectures that scale flawlessly.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {['Node.js', 'Express', 'PostgreSQL', 'Redis', 'GraphQL'].map(tech => (
                <span key={tech} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono">{tech}</span>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 flex flex-col justify-between group hover:border-purple-500/30 transition-colors">
            <div>
              <Cpu className="w-10 h-10 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold mb-2">AI & LLMs</h3>
              <p className="text-white/60 mb-8">Integrating the future of computing.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {['OpenAI', 'LangChain', 'Vector DBs', 'RAG'].map(tech => (
                <span key={tech} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono">{tech}</span>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 glass-card rounded-3xl p-8 flex flex-col justify-between group hover:border-pink-500/30 transition-colors">
            <div>
              <Layout className="w-10 h-10 text-pink-400 mb-6" />
              <h3 className="text-2xl font-bold mb-2">DevOps & Cloud</h3>
              <p className="text-white/60 mb-8">Automated deployments and bulletproof infrastructure.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {['AWS', 'Docker', 'Vercel', 'CI/CD', 'Linux', 'Nginx'].map(tech => (
                <span key={tech} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services & Pricing */}
      <section id="services" className="relative z-10 py-32 bg-[#09090B] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Transparent Pricing</h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">High-impact solutions with clear pricing structures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Landing Page',
                price: '$250 - $600',
                desc: 'High-converting, blazingly fast single page sites with animations.',
                color: 'border-l-indigo-500'
              },
              {
                name: 'Business Website',
                price: '$700 - $1.8k',
                desc: 'Multi-page CMS driven websites optimized for SEO and conversion.',
                color: 'border-l-emerald-500'
              },
              {
                name: 'Custom Web App',
                price: '$2.5k - $10k+',
                desc: 'Full-stack applications with user auth, databases, and complex logic.',
                color: 'border-l-purple-500'
              },
              {
                name: 'AI Add-On',
                price: '$600 - $4k',
                desc: 'Integrate LLMs, chatbots, or automated workflows into existing apps.',
                color: 'border-l-pink-500'
              }
            ].map((service, i) => (
              <div key={i} className={`glass-card rounded-2xl p-8 border-l-4 ${service.color} hover:-translate-y-2 transition-transform duration-300`}>
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-white/60 text-sm mb-6 min-h-[60px]">{service.desc}</p>
                <div className="text-2xl font-mono font-bold bg-gradient-to-r from-white to-white/70 text-gradient mb-6">
                  {service.price}
                </div>
                <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-semibold flex items-center justify-center gap-2">
                  Inquire <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-32 px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Client Impact</h2>
          <p className="text-xl text-white/50 max-w-2xl">Don't just take my word for it.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Sarah Mitchell',
              role: 'Founder, MedBook',
              quote: "Saif completely transformed our patient portal. The speed and UX improvements resulted in significantly fewer support tickets.",
              metric: '60% less workload',
              color: 'from-blue-500/20'
            },
            {
              name: 'James Okonkwo',
              role: 'CEO, ShopLocal',
              quote: "The ecommerce rebuild was flawless. Performance went through the roof, and our bottom line followed immediately after launch.",
              metric: '+22% conversions',
              color: 'from-emerald-500/20'
            },
            {
              name: 'Priya Sharma',
              role: 'CTO, LaunchPad',
              quote: "We needed our MVP built yesterday. Saif came in, architected the whole thing, and delivered a production-ready app insanely fast.",
              metric: 'MVP in 8 weeks',
              color: 'from-purple-500/20'
            }
          ].map((testimonial, i) => (
            <div key={i} className="relative glass-card rounded-3xl p-8 pt-10 overflow-hidden group">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${testimonial.color} to-transparent opacity-50 group-hover:opacity-100 transition-opacity`}></div>
              <div className="flex gap-1 mb-6 text-yellow-500">
                {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-lg text-white/80 mb-8 line-clamp-4">"{testimonial.quote}"</p>
              <div className="mt-auto">
                <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70 mb-4 flex items-center gap-2 w-fit">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  {testimonial.metric}
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-white/50">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-32 px-8">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden relative border border-indigo-500/20 bg-[#0C0C10]">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-transparent z-0"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-indigo-500/30 blur-[100px] z-0 pointer-events-none"></div>
          
          <div className="relative z-10 p-12 md:p-24 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Ready to build something <span className="italic font-light">extraordinary?</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mb-10 font-light">
              Let's turn your vision into a high-performance digital reality. My calendar is open for new opportunities.
            </p>
            <button className="px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">Get in touch <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40 max-w-7xl mx-auto">
        <div>© 2024 Saif Khan. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
