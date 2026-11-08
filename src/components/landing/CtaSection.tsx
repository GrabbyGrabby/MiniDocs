"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function CtaSection() {
  return (
    <motion.section
      initial={{ scale: 0.98, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative bg-[#212842] text-white border border-white/10 rounded-[36px] p-8 sm:p-12 text-center space-y-6 shadow-sm overflow-hidden max-w-4xl mx-auto"
    >
      <div className="space-y-2">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight leading-tight text-white">
          Ready to optimize media with MiniDocs?
        </h2>
        <p className="text-xs sm:text-sm text-[#F0E7D5]/80 max-w-lg mx-auto font-light leading-relaxed">
          Zero uploads, zero subscriptions, zero watermarks. Your files stay 100% on your device.
        </p>
      </div>

      <div className="pt-2 flex items-center justify-center">
        <Link
          className="inline-flex items-center justify-center gap-2 bg-white text-[#17191D] hover:bg-[#D4BCC8] font-normal px-8 py-3 rounded-full text-xs sm:text-sm tracking-wide shadow-sm hover:scale-102 active:scale-98 transition-all"
          href="/home"
        >
          <span>Open MiniDocs Studio</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#17191D]" />
        </Link>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs font-light text-[#D4BCC8]/80 pt-1">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Private Client-Side Processing • No account required</span>
      </div>
    </motion.section>
  );
}
