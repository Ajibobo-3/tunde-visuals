"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Terminal, ArrowRight } from 'lucide-react';
// 1. Import Link from next/link
import Link from 'next/link';

export default function SuccessPage() {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-[#0F0F0F] border border-white/10 p-10 rounded-[2.5rem] text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border-2 border-dashed border-blue-500/30 rounded-full"
            />
            <CheckCircle2 size={64} className="text-blue-500 relative z-10" />
          </div>
        </div>

        <h1 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Payment Confirmed</h1>
        <p className="text-slate-500 text-sm mb-8 uppercase tracking-widest font-bold font-mono">
          REF_ID: #TV-{Math.floor(Math.random() * 10000)}
        </p>

        <div className="bg-black/50 rounded-2xl p-6 border border-white/5 mb-8">
          <div className="flex items-center gap-3 text-xs font-mono text-blue-400 mb-4">
            <Terminal size={14} />
            <span>INITIALIZING_WORKFLOW...</span>
          </div>
          
          <div className="text-5xl font-black italic mb-2 font-mono">
            {seconds > 0 ? `00:${seconds < 10 ? `0${seconds}` : seconds}` : "LIVE"}
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">
            {seconds > 0 ? "Analyzing project requirements" : "Onboarding initiated"}
          </p>
        </div>

        {/* 2. Using Link instead of window.location for a faster Hub return */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: seconds === 0 ? 1 : 0.3 }}
          className="transition-opacity duration-500"
        >
          <p className="text-sm text-slate-400 mb-6">
            {seconds === 0 
              ? "Check your inbox. I've sent the onboarding link to your email." 
              : "Please wait while we verify the transaction..."}
          </p>
          
          <Link href="/" prefetch={true}>
            <button 
              disabled={seconds > 0}
              className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2
                ${seconds === 0 
                  ? "bg-white text-black hover:bg-blue-400" 
                  : "bg-white/5 text-white/20 cursor-not-allowed"}`}
            >
              Return to Hub {seconds === 0 && <ArrowRight size={14} />}
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}