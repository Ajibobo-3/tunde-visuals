"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const [seconds, setSeconds] = useState(5);
  const router = useRouter();

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Direct push to the root of whatever domain the user is currently on
      router.push('/');
    }
  }, [seconds, router]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 selection:bg-blue-500/30">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Brand Identity */}
          <p className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-2 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            Tunde_Visuals
          </p>
          
          <motion.div
            initial={{ rotate: -10, scale: 0.5 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <CheckCircle2 className="text-green-500 mx-auto mb-6" size={80} />
          </motion.div>
          
          <h1 className="text-4xl font-black italic uppercase mb-4 tracking-tighter italic">
            Payment Received
          </h1>
          
          <p className="text-slate-400 mb-8 leading-relaxed text-sm max-w-[300px] mx-auto">
            Transaction successful. Your project has been added to the build queue. 
            Check your email for the next steps.
          </p>

          {/* Countdown Display */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl mb-8 flex items-center justify-center gap-4 backdrop-blur-sm">
            <Clock className="text-blue-500 animate-pulse" size={24} />
            <span className="text-sm uppercase tracking-widest font-bold tabular-nums">
              Redirecting in <span className="text-blue-400">{seconds}s</span>
            </span>
          </div>

          <Link href="/">
            <motion.button 
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 mx-auto text-slate-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest group"
            >
              Return Home Now 
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}