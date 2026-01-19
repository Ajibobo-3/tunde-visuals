"use client";
import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Zap } from 'lucide-react';

export default function PayPage() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    // This will trigger your Paystack API route
    try {
      const res = await fetch('/api/paystack', { method: 'POST' });
      const data = await res.json();
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      }
    } catch (error) {
      console.error("Payment failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-[#0F0F0F] border border-white/10 p-8 rounded-3xl text-center">
        <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Zap className="text-blue-500" size={32} />
        </div>
        <h1 className="text-3xl font-black italic uppercase mb-2">Secure Booking</h1>
        <p className="text-slate-400 text-sm mb-8 uppercase tracking-widest">Initial Project Deposit</p>
        
        <div className="bg-white/5 p-6 rounded-2xl mb-8 text-left border border-white/5">
          <div className="flex justify-between mb-2">
            <span className="text-slate-400">Service</span>
            <span className="font-bold">Web3 Architecture</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Amount</span>
            <span className="text-blue-400 font-bold">₦50,000.00</span>
          </div>
        </div>

        <button 
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
        >
          {loading ? "Initializing..." : "Pay via Paystack"} <ShieldCheck size={18} />
        </button>

        <p className="mt-6 text-[10px] text-slate-500 uppercase tracking-tighter">
          Secure encryption provided by Paystack.
        </p>
      </div>
    </main>
  );
}