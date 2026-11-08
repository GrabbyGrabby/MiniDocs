"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative pt-16 sm:pt-24 pb-8 text-center space-y-6 max-w-4xl mx-auto z-10 px-4">
      {/* Exact headline requested: Compress files. Store nothing. (Milky / Soft Lilac color) */}
      <div className="space-y-4">
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-[1.08] text-white"
        >
          Compress files. <br />
          <span className="text-[#D4BCC8] font-light">
            Store nothing.
          </span>
        </motion.h1>

        {/* Subtitle in vanilla cream */}
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-sm sm:text-base md:text-lg text-[#F0E7D5]/80 max-w-2xl mx-auto font-light leading-relaxed pt-2"
        >
          An editorial, browser-cached image &amp; video optimizer. Your media assets never touch external servers, safeguarding your privacy while eliminating upload bottlenecks.
        </motion.p>
      </div>

      {/* Pill action buttons */}
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="flex items-center justify-center gap-3 pt-4"
      >
        <Link
          href="/home"
          className="inline-flex items-center justify-center bg-[#F0E7D5] hover:bg-[#D4BCC8] text-black font-normal px-7 py-3 rounded-full text-xs sm:text-sm tracking-wide shadow-sm active:scale-98 transition-all"
        >
          <span>Start Compressing</span>
        </Link>
        <a
          href="#demo"
          className="inline-flex items-center justify-center bg-[#D4BCC8]/20 hover:bg-[#D4BCC8]/30 text-[#F0E7D5] border border-[#D4BCC8]/30 font-normal px-6 py-3 rounded-full text-xs sm:text-sm tracking-wide active:scale-98 transition-all"
        >
          <span>Try Demo</span>
        </a>
      </motion.div>
    </section>
  );
}
