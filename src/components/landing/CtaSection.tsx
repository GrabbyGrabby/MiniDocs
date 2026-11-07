"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function CtaSection() {
  return (
    <motion.section
      initial={{ scale: 0.96, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative bg-[#212842] text-white border-4 border-white/20 rounded-[44px] p-8 sm:p-14 text-center space-y-6 shadow-2xl overflow-hidden max-w-5xl mx-auto"
    >
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4BCC8] bg-white/10 px-4 py-1.5 rounded-full inline-block">
          Instant Client-Side
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
          Ready to shrink media with MiniDocs?
        </h2>
        <p className="text-sm sm:text-base text-[#F0E7D5] max-w-lg mx-auto font-medium leading-relaxed">
          Zero uploads, zero subscriptions, zero watermarks. Your files stay 100% on your device.
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4BCC8] hover:bg-white text-[#17191D] font-black px-10 py-4 rounded-full text-xs uppercase tracking-wider shadow-lg hover:scale-103 active:scale-98 transition-all"
          href="/home"
        >
          <span>Open MiniDocs Studio</span>
          <ArrowRight className="w-4 h-4 text-[#17191D]" />
        </Link>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#D4BCC8] pt-2">
        <ShieldCheck className="w-4 h-4" />
        <span>100% Free Client-Side Processing • No account required</span>
      </div>
    </motion.section>
  );
}
