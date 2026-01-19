"use client";
import React, { useState } from 'react';
import { ShieldCheck, Zap, Mail, Banknote } from 'lucide-react';

export default function PayPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(""); // State for dynamic amount

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !amount) {
      alert("Please enter a valid email and amount.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/paystack', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: parseFloat(amount), // Sends the dynamic amount
          email: email 
        }) 
      });

      const data = await res.json();

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        alert(`Error: ${data.error || "Could not initialize payment"}`);
      }
    } catch (error) {
      console.error("Payment failed", error);
      alert("Something went wrong. Please check your connection.");
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
        <p className="text-slate-400 text-[10px] mb-8 uppercase tracking-[0.3em]">Tunde_Visuals Architecture</p>
        
        <form onSubmit={handlePayment} className="space-y-5">
          {/* Email Input */}
          <div className="text-left">
            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 block ml-2">Customer Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>
          </div>

          {/* Amount Input */}
          <div className="text-left">
            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 block ml-2">Project Fee (₦)</label>
            <div className="relative">
              <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Initializing..." : "Pay via Paystack"} <ShieldCheck size={18} />
          </button>
        </form>
      </div>
    </main>
  );
}