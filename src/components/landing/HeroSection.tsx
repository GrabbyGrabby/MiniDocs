"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative pt-12 sm:pt-20 pb-8 text-center space-y-6 max-w-4xl mx-auto z-10 px-4">
      {/* Main Headline matching the exact screenshot: Compress files. Store nothing. */}
      <div className="space-y-4">
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-[1.08] text-[#17191D] dark:text-white"
        >
          Compress files. <br />
          <span className="text-[#FF5500] font-light">
            Store nothing.
          </span>
        </motion.h1>

        {/* Exact text requested from the user image */}
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-sm sm:text-base md:text-lg text-[#17191D]/75 dark:text-[#F0E7D5]/75 max-w-3xl mx-auto font-light leading-relaxed pt-2"
        >
          An editorial, browser-cached image &amp; video optimizer. Your media assets never touch external servers, safeguarding your privacy while eliminating upload bottlenecks.
        </motion.p>
      </div>

      {/* Modern Curved Pill Buttons */}
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="flex items-center justify-center gap-3 pt-4"
      >
        <Link
          href="/home"
          className="inline-flex items-center justify-center bg-[#17191D] dark:bg-white text-white dark:text-[#17191D] font-normal px-7 py-3 rounded-full text-xs sm:text-sm tracking-wide shadow-sm hover:opacity-90 active:scale-98 transition-all"
        >
          <span>Start Compressing</span>
        </Link>
        <a
          href="#demo"
          className="inline-flex items-center justify-center bg-[#D4BCC8] hover:bg-[#E8DCC8] text-[#17191D] font-normal px-6 py-3 rounded-full text-xs sm:text-sm tracking-wide shadow-sm active:scale-98 transition-all"
        >
          <span>Try Demo</span>
        </a>
      </motion.div>
    </section>
  );
}
