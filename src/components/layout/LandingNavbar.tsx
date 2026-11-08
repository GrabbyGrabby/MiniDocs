"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingNavbar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 w-full px-4 sm:px-6 pt-5 pointer-events-none">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="pointer-events-auto mx-auto max-w-4xl h-16 bg-[#17191D]/90 dark:bg-[#17191D]/95 backdrop-blur-xl text-[#F0E7D5] px-4 sm:px-6 flex items-center justify-between rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-white/15 transition-all"
      >
        {/* Brand Capsule with SJ-style avatar */}
        <Link href="/" className="flex items-center gap-2.5 group select-none">
          <div className="w-9 h-9 rounded-full bg-[#D4BCC8] text-[#17191D] flex items-center justify-center font-black text-xs tracking-tighter shadow-sm group-hover:scale-105 transition-transform duration-200">
            MD.
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black tracking-tight text-white">
              Mini<span className="text-[#D4BCC8]">Docs</span>
            </span>
          </div>
        </Link>

        {/* Center Pill Nav links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-1 text-xs font-semibold tracking-wide text-[#F0E7D5]/90">
          <a
            href="#demo"
            className="px-4 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all"
          >
            Playground
          </a>
          <a
            href="#features"
            className="px-4 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all"
          >
            Capabilities
          </a>
          <a
            href="#how"
            className="px-4 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all"
          >
            How It Works
          </a>
          <a
            href="#faq"
            className="px-4 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all"
          >
            FAQ
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <ThemeToggle className="text-[#F0E7D5] hover:bg-white/10 w-9 h-9" />
          <Link
            href="/home"
            className="flex items-center gap-1.5 bg-[#D4BCC8] hover:bg-white text-[#17191D] text-xs font-extrabold px-4.5 py-2.5 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span>Open Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.header>
    </div>
  );
}
