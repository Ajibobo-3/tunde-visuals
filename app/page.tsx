"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronRight, Zap, MessageSquare } from 'lucide-react';
// Import Link for internal navigation
import Link from 'next/link';

const projects = [
  {
    title: "Boop Terminal",
    client: "$BOOP (Arbitrum)",
    desc: "Interactive community terminal with live boop counter and reward verification.",
    link: "https://boop-terminal.vercel.app",
    color: "from-blue-600 to-blue-400"
  },
  {
    title: "Article Ledger",
    client: "Article Protocol",
    desc: "A high-fidelity editorial terminal for decentralized narrative verification.",
    link: "https://article-terminal.vercel.app",
    color: "from-orange-600 to-orange-400"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* --- HERO / ABOUT SECTION --- */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xs uppercase tracking-[0.5em] text-blue-500 font-bold mb-8">The Architect</h2>
          <p className="text-4xl md:text-6xl font-serif italic text-white leading-tight mb-8">
            Bridging the gap between <span className="text-blue-400 text-glow">visual storytelling</span> and functional Web3 infrastructure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div className="flex flex-col gap-6">
              <p className="text-slate-400 leading-relaxed text-lg">
                I am a Website Landing Page Developer and Graphics Designer. Currently balancing my passion for digital architecture with my journey as a medical student. 
              </p>
              {/* Pointing to Contact Page */}
              <Link href="/contact">
                <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-blue-400 transition-colors w-fit">
                  Get in Touch <MessageSquare size={16} />
                </button>
              </Link>
            </div>
            <p className="text-slate-400 leading-relaxed text-lg">
              My work focuses on creating high-performance terminals and interactive interfaces for emerging protocols on Arbitrum and Solana.
            </p>
          </div>
        </motion.div>
      </section>

      {/* --- PORTFOLIO CAROUSEL --- */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-xs uppercase tracking-[0.5em] text-slate-500 font-bold mb-2">Portfolio</h2>
            <h3 className="text-4xl font-black italic text-white tracking-tighter uppercase">Selected Works</h3>
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-12 snap-x no-scrollbar px-4">
          {projects.map((project, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="min-w-[350px] md:min-w-[450px] snap-center bg-[#0F0F0F] border border-white/10 rounded-3xl overflow-hidden group p-8"
            >
              <div className={`w-full h-48 rounded-2xl bg-gradient-to-br ${project.color} mb-6 opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}>
                 <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-all" size={32} />
              </div>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">{project.client}</p>
              <h4 className="text-2xl font-black italic text-white mb-3 tracking-tight">{project.title}</h4>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                {project.desc}
              </p>
              <a 
                href={project.link} 
                target="_blank" 
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white border-b border-white/20 pb-1 hover:border-blue-400 transition-colors"
              >
                Explore Live Terminal <ChevronRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/20 to-transparent border border-white/10 p-12 rounded-[3rem] text-center">
          <Zap className="text-blue-500 mx-auto mb-6" size={48} />
          <h2 className="text-3xl md:text-5xl font-black italic uppercase mb-6 tracking-tighter">Ready to Build?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto uppercase tracking-widest text-[10px] font-bold">
            Standardizing the visual identity of Web3.
          </p>
          {/* Pointing to Contact Page */}
          <Link href="/contact">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)]">
              Contact Me
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}