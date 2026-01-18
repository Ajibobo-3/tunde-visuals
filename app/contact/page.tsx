"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Twitter, Mail, Phone, ArrowLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const contactMethods = [
  {
    icon: <MessageCircle className="text-green-500" size={28} />,
    title: "WhatsApp",
    value: "09060426825",
    link: "https://wa.me/2349060426825",
    label: "Chat Now"
  },
  {
    icon: <Twitter className="text-blue-400" size={28} />,
    title: "X (Twitter)",
    value: "@Tundee_sunkanmi",
    link: "https://x.com/Tundee_sunkanmi",
    label: "Follow / DM"
  },
  {
    icon: <Mail className="text-red-400" size={28} />,
    title: "Email",
    value: "Ajibolasunkanmi001@gmail.com",
    link: "mailto:Ajibolasunkanmi001@gmail.com",
    label: "Send Message"
  }
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-16 transition-colors uppercase text-[10px] font-bold tracking-[0.3em]">
          <ArrowLeft size={14} /> Back to Hub
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
            Let's <span className="text-blue-500">Connect</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
            Available for high-fidelity Web3 landing pages, motion branding, and technical consultations. 
            Choose your preferred terminal to reach out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
          {contactMethods.map((method, i) => (
            <motion.a
              key={i}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group flex items-center justify-between p-8 bg-[#0F0F0F] border border-white/5 rounded-[2rem] hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-6">
                <div className="p-4 bg-black rounded-2xl border border-white/5 group-hover:scale-110 transition-transform">
                  {method.icon}
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">{method.title}</h3>
                  <p className="text-xl font-bold tracking-tight">{method.value}</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 opacity-0 group-hover:opacity-100 transition-all">
                {method.label} <ChevronRight size={14} />
              </div>
            </motion.a>
          ))}
          
          {/* Phone Call Specific (Same as WhatsApp but for direct dialing) */}
          <motion.a
            href="tel:+2349060426825"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="group flex items-center justify-between p-8 bg-[#0F0F0F] border border-white/5 rounded-[2rem] hover:border-white/20 transition-all"
          >
            <div className="flex items-center gap-6">
              <div className="p-4 bg-black rounded-2xl border border-white/5 group-hover:scale-110 transition-transform text-blue-500">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Voice Line</h3>
                <p className="text-xl font-bold tracking-tight">Direct Call</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 opacity-0 group-hover:opacity-100 transition-all">
              Initialize Call <ChevronRight size={14} />
            </div>
          </motion.a>
        </div>

        <footer className="mt-24 pt-12 border-t border-white/5 text-center">
            <p className="text-slate-700 text-[10px] font-bold uppercase tracking-[0.5em]">Tunde_Visuals • Clinical Precision</p>
        </footer>
      </div>
    </main>
  );
}