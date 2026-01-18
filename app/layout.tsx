import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 1. Importing the Vercel tools
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

// 2. Setting up professional metadata for your brand
export const metadata: Metadata = {
  title: "Tunde_Visuals | Web3 Architect & Motion Designer",
  description: "High-performance landing pages and motion branding with clinical precision.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
      <body className={inter.className}>
        {children}
        
        {/* 3. Performance and Visitor Tracking */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}