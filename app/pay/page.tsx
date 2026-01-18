"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, ArrowLeft, Rocket, Activity, MessageSquare } from 'lucide-react';
// Import Link for internal navigation
import Link from 'next/link';

export default function PayPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back to Home Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-400 mb-12 transition-colors uppercase text-[10px] font-bold tracking-[0.3em]">
          <ArrowLeft size={14} /> Back to Portfolio
        </Link>
      </div>

      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-black italic mb-4 uppercase tracking-tighter">Service Selection</h1>
          <p className="text-slate-500 mb-16 uppercase tracking-[0.4em] text-[10px] font-bold font-mono">
             <Activity className="inline mr-2 text-blue-500" size={12}/> Systematic Design • Clinical Execution
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Card 1: Landing Page Tier */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#0F0F0F] border border-white/10 p-10 rounded-[2.5rem] text-left hover:border-blue-500 transition-all group"
          >
            <Zap className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-2xl font-bold mb-2 uppercase italic tracking-tight">Standard Landing</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">High-performance Next.js infrastructure. Optimized for protocol deployments and terminal interfaces.</p>
            
            {/* Redirecting to Contact instead of Payment */}
            <Link href="/contact">
              <button className="w-full bg-blue-600 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all flex items-center justify-center gap-2">
                Consult for Deployment <MessageSquare size={14} />
              </button>
            </Link>
          </motion.div>

          {/* Card 2: Motion Branding Tier */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#0F0F0F] border border-white/10 p-10 rounded-[2.5rem] text-left hover:border-orange-500 transition-all group"
          >
            <Rocket className="text-orange-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-2xl font-bold mb-2 uppercase italic tracking-tight">Motion Branding</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">Premium 3D motion assets and interactive visual identity for the modern Web3 ecosystem.</p>
            
            {/* Redirecting to Contact instead of Payment */}
            <Link href="/contact">
              <button className="w-full bg-orange-600 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-700 transition-all flex items-center justify-center gap-2">
                Inquire for Motion <MessageSquare size={14} />
              </button>
            </Link>
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-4 text-slate-600 border-t border-white/5 pt-12">
          <ShieldCheck size={18} />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Secure Professional Consultation</span>
        </div>
      </div>
    </main>
  );
}