"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { ArrowRight } from "lucide-react";

export default function LandingNavbar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 w-full px-4 sm:px-8 pt-6">
      <header className="mx-auto max-w-5xl h-18 bg-[#212842] text-[#F0E7D5] px-6 sm:px-8 flex items-center justify-between rounded-full shadow-[0_12px_40px_rgba(23,25,29,0.25)] border border-white/10 transition-all">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group select-none">
          <div className="w-10 h-10 rounded-full bg-[#D4BCC8] text-[#17191D] flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            ✦
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-white leading-none">
              Mini<span className="text-[#D4BCC8]">Docs</span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-[#F0E7D5]/80 uppercase mt-0.5">
              In-Browser Media Engine
            </span>
          </div>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-wider uppercase text-white/90">
          <a href="#demo" className="hover:text-[#D4BCC8] transition-colors">
            Try Demo
          </a>
          <a href="#how" className="hover:text-[#D4BCC8] transition-colors">
            How It Works
          </a>
          <a href="#faq" className="hover:text-[#D4BCC8] transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right Button */}
        <div className="flex items-center gap-3">
          <ThemeToggle className="text-[#F0E7D5] hover:bg-white/10" />
          <Link
            href="/home"
            className="flex items-center gap-2 bg-[#D4BCC8] hover:bg-white text-[#17191D] text-xs font-black uppercase tracking-wider px-6 py-3 rounded-full shadow-md hover:scale-102 active:scale-98 transition-all duration-200"
          >
            <span>Launch App</span>
            <ArrowRight className="w-4 h-4 text-[#17191D]" />
          </Link>
        </div>
      </header>
    </div>
  );
}
