"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-16 pb-6 text-center space-y-8 max-w-4xl mx-auto z-10">
      {/* Pill Badge */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#212842] text-[#F0E7D5] text-xs font-bold tracking-wider uppercase shadow-md border border-white/10"
      >
        <span className="text-[#D4BCC8] text-sm">✦</span>
        <span>The In-Browser Compression Engine • Zero Server Uploads</span>
      </motion.div>

      {/* Main Headline */}
      <div className="space-y-4">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black text-[#17191D] dark:text-white tracking-tight leading-[1.04]"
        >
          Compress files. <br />
          <span className="text-[#212842] dark:text-[#D4BCC8] underline decoration-[#D4BCC8] decoration-wavy">
            Store nothing.
          </span>
        </motion.h1>

        {/* Catchy line with high contrast text */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-[#212842] dark:text-[#F0E7D5] max-w-2xl mx-auto font-semibold leading-relaxed"
        >
          <strong className="text-[#17191D] dark:text-white font-black">MiniDocs</strong> shrinks images &amp; videos instantaneously with WebAssembly FFmpeg and Canvas directly in browser RAM. 100% private, zero latency.
        </motion.p>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
      >
        <Link
          href="/home"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#212842] hover:bg-[#17191D] text-white font-black px-10 py-4.5 rounded-full text-sm uppercase tracking-wider shadow-xl hover:scale-103 active:scale-98 transition-all"
        >
          <span>Start Compressing Free</span>
          <ArrowRight className="w-4 h-4 text-[#D4BCC8]" />
        </Link>
        <a
          href="#demo"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4BCC8] hover:bg-white text-[#17191D] rounded-full text-sm font-black uppercase tracking-wider px-8 py-4.5 shadow-md active:scale-98 transition-all border border-[#17191D]/10"
        >
          <span>Test Live Playground</span>
        </a>
      </motion.div>

      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-black uppercase tracking-wider text-[#212842] dark:text-[#D4BCC8]">
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#212842] dark:text-[#D4BCC8]" /> 100% Private Client-Side
        </span>
        <span>•</span>
        <span className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#212842] dark:text-[#D4BCC8]" /> Pure WebAssembly Speed
        </span>
        <span>•</span>
        <span>Zero Storage Footprint</span>
      </div>
    </section>
  );
}
