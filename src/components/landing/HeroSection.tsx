"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative pt-12 sm:pt-20 pb-8 text-center space-y-6 max-w-4xl mx-auto z-10 px-4">
      {/* Centered label directly above headline: increased size on mobile view */}
      <motion.div
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex justify-center items-center pb-1"
      >
        <span className="text-xl sm:text-sm md:text-base font-light tracking-[0.25em] uppercase text-[#F0E7D5] select-none">
          MiniDocs
        </span>
      </motion.div>

      {/* Main Headline: Two noticeably distinct colors */}
      <div className="space-y-4 pt-1">
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-[1.08]"
        >
          <span className="text-[#F0E7D5]">Compress files.</span> <br />
          <span style={{ color: "oklch(87.1% 0.15 154.449)" }}>Store nothing.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-sm sm:text-base md:text-lg text-[#F0E7D5]/80 max-w-2xl mx-auto font-light leading-relaxed pt-2"
        >
          An editorial, browser-cached image &amp; video optimizer. Your media assets never touch external servers, safeguarding your privacy while eliminating upload bottlenecks.
        </motion.p>
      </div>

      {/* Both buttons share the exact same Vanilla Cream colour with dark black text */}
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="flex items-center justify-center gap-3 pt-4"
      >
        <Link
          href="/home"
          className="inline-flex items-center justify-center bg-[#F0E7D5] hover:bg-[#D4BCC8] text-[#000000] font-normal px-7 py-3 rounded-full text-xs sm:text-sm tracking-wide shadow-sm active:scale-98 transition-all"
        >
          <span>Start Compressing</span>
        </Link>
        <a
          href="#demo"
          className="inline-flex items-center justify-center bg-[#F0E7D5] hover:bg-[#D4BCC8] text-[#000000] font-normal px-7 py-3 rounded-full text-xs sm:text-sm tracking-wide shadow-sm active:scale-98 transition-all"
        >
          <span>Try Demo</span>
        </a>
      </motion.div>
    </section>
  );
}
