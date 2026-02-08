"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, MessageSquare, Code2, LineChart, Activity, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
// --- COMPONENT IMPORT ---
import WhaleTicker from '../components/WhaleTicker';

const projects = [
  {
    title: "Solana Whale Tracker",
    client: "Autonomous Data Systems",
    desc: "A Python-based tracking engine monitoring high-value Solana transactions to trigger real-time growth signals and alerts.",
    // FIXED: Points to your real backend repository
    link: "https://github.com/Ajibobo-3/whale-tracker-backend", 
    icon: <Activity size={48} />,
    color: "from-green-600 to-emerald-900",
    live: true 
  },
  {
    title: "Boop Terminal",
    client: "Web3 Trading UI",
    desc: "High-performance terminal with real-time on-chain data indexing. Optimized for sub-second reward verification and trader retention.",
    link: "https://boop-terminal.vercel.app",
    icon: <LineChart size={48} />,
    color: "from-[#D4AF37] to-[#8B7326]"
  },
  {
    title: "Pippin Protocol",
    client: "Open Source / Web3",
    desc: "Contributed to the core codebase of the Pippin ecosystem, focusing on protocol efficiency and decentralized infrastructure.",
    link: "https://github.com/pippin-project", 
    icon: <Globe size={48} />,
    color: "from-blue-600 to-indigo-900"
  },
  {
    title: "Article Ledger",
    client: "Growth Infrastructure",
    desc: "A technical dashboard for decentralized narrative verification with optimized state synchronization for power users.",
    link: "https://article-terminal.vercel.app",
    icon: <Code2 size={48} />,
    color: "from-slate-800 to-black"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      {/* --- HERO / ABOUT SECTION --- */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs uppercase tracking-[0.5em] text-[#D4AF37] font-bold mb-6">Growth Engineer & Web3 Dev</h2>
            <h1 className="text-6xl md:text-8xl font-black italic mb-4 uppercase tracking-tighter">Tunde.</h1>
            <p className="text-3xl md:text-4xl font-serif italic text-slate-100 leading-tight mb-8">
              Engineering <span className="text-[#D4AF37]">Scalable</span> Web3 Growth Loops.
            </p>
            <div className="flex flex-col gap-6">
              <p className="text-slate-400 leading-relaxed text-lg">
                I build high-performance <span className="text-white">Full-Stack systems</span> that bridge the gap between protocol architecture and user acquisition. Specializing in <span className="text-white">on-chain data automation</span> and conversion-optimized interfaces.
              </p>
              <div className="flex gap-4">
                <Link href="https://t.me/Tundee_sunkanmi">
                  <button className="flex items-center gap-2 bg-[#D4AF37] text-black px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white transition-all w-fit">
                    Let&apos;s Scale <Zap size={16} />
                  </button>
                </Link>
                <Link href="#projects">
                  <button className="flex items-center gap-2 border border-white/10 text-white px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white/5 transition-all w-fit">
                    View Systems <Code2 size={16} />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-[#D4AF37]/5 bg-[#0F0F0F]"
          >
            <Image 
              src="/images/tunde-headshot.jpg" 
              alt="Tunde - Growth Engineer"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* --- TECH STACK MARQUEE --- */}
      <div className="border-y border-white/5 py-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
            {['Next.js 15', 'Python', 'Solana SDK', 'Web3.js', 'Viem/Wagmi', 'Growth Funnels'].map((tech) => (
                <span key={tech} className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">{tech}</span>
            ))}
        </div>
      </div>

      {/* --- PROJECT SECTION --- */}
      <section id="projects" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-xs uppercase tracking-[0.5em] text-slate-500 font-bold mb-2">Systems</h2>
            <h3 className="text-4xl font-black italic text-white tracking-tighter uppercase">Growth & Engineering</h3>
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-12 snap-x no-scrollbar px-4">
          {projects.map((project, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="min-w-[350px] md:min-w-[450px] snap-center bg-[#0F0F0F] border border-white/10 rounded-3xl overflow-hidden group p-8 flex flex-col justify-between"
            >
              <div>
                {/* --- LIVE TICKER COMPONENT --- */}
                {project.live ? (
                  <div className="mb-6 h-48 overflow-hidden rounded-2xl bg-black border border-white/5">
                    <WhaleTicker />
                  </div>
                ) : (
                  <div className={`w-full h-48 rounded-2xl bg-gradient-to-br ${project.color} mb-6 opacity-40 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center`}>
                    <div className="text-white/20 group-hover:text-white transition-all">
                        {project.icon}
                    </div>
                  </div>
                )}
                
                <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-2">{project.client}</p>
                <h4 className="text-2xl font-black italic text-white mb-3 tracking-tight">{project.title}</h4>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  {project.desc}
                </p>
              </div>

              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white border-b border-white/20 pb-1 hover:border-[#D4AF37] transition-colors w-fit"
              >
                View Documentation <ChevronRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-white/10 p-12 rounded-[3rem] text-center">
          <Activity className="text-[#D4AF37] mx-auto mb-6" size={48} />
          <h2 className="text-3xl md:text-5xl font-black italic uppercase mb-6 tracking-tighter">Optimize Your Funnel</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto uppercase tracking-widest text-[10px] font-bold">
            Bridging Technical Architecture with Quantitative Growth.
          </p>
          <Link href="https://t.me/Tundee_sunkanmi">
            <button className="flex items-center gap-3 mx-auto bg-white text-black hover:bg-[#D4AF37] px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all shadow-[0_0_30px_rgba(212,175,55,0.1)]">
              Contact Growth Engineer <MessageSquare size={18} />
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}