"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle2 className="text-green-500 mx-auto mb-6" size={80} />
          <h1 className="text-4xl font-black italic uppercase mb-4">Payment Received</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Transaction successful. Tunde has been notified and your project has been added to the build queue.
          </p>

          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl mb-8 flex items-center justify-center gap-4">
            <Clock className="text-blue-500 animate-pulse" size={24} />
            <span className="text-sm uppercase tracking-widest font-bold">
              Redirecting in {seconds}s
            </span>
          </div>

          <Link href="/">
            <button className="flex items-center gap-2 mx-auto text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
              Return Home Now <ArrowRight size={14} />
            </button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}