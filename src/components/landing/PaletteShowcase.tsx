"use client";
import { motion } from "framer-motion";

export default function PaletteShowcase() {
  return (
    <section id="palettes" className="space-y-12 scroll-mt-28 py-6">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#212842] dark:text-[#D4BCC8] bg-[#D4BCC8]/40 dark:bg-[#212842] px-4 py-1.5 rounded-full">
          Modern UI Aesthetic
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-[#17191D] dark:text-[#F0E7D5] tracking-tight">
          Curved Cards &amp; Color System
        </h2>
        <p className="text-sm text-[#535B74] dark:text-[#D4BCC8]/80 font-medium leading-relaxed">
          The exact color palettes and pill-curved card elevation system from your design reference.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {/* Card 1: Deep Slate & Soft Lilac with Dalmatian background */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative h-[480px] rounded-[48px] overflow-hidden p-6 flex flex-col justify-between shadow-xl bg-cover bg-center border-4 border-white/50"
          style={{ backgroundImage: `url('/palette-lilac.jpg')` }}
        >
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />

          {/* Pill 1: Deep Slate */}
          <div className="relative z-10 bg-[#17191D] text-[#D4BCC8] rounded-[36px] py-6 px-6 text-center shadow-2xl space-y-1">
            <div className="flex items-center justify-between text-xs font-mono font-medium px-2 opacity-90">
              <span>#17191D</span>
              <span>♥</span>
            </div>
            <h3 className="text-3xl font-black tracking-tight uppercase leading-none">
              DEEP SLATE
            </h3>
          </div>

          {/* Pill 2: Soft Lilac */}
          <div className="relative z-10 bg-[#D4BCC8] text-[#17191D] rounded-[36px] py-6 px-6 text-center shadow-2xl space-y-1">
            <h3 className="text-3xl font-black tracking-tight uppercase leading-none">
              SOFT LILAC
            </h3>
            <div className="flex items-center justify-between text-xs font-mono font-medium px-2 opacity-90 pt-1">
              <span>#D4BCC8</span>
              <span>♥</span>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Midnight Indigo & Vanilla Cream */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative h-[480px] rounded-[48px] overflow-hidden shadow-xl flex border-4 border-white/50"
        >
          {/* Left half: Midnight Indigo */}
          <div className="w-1/2 bg-[#212842] text-[#F0E7D5] p-6 flex flex-col justify-between">
            <span className="text-[11px] font-mono opacity-80">@minidocs</span>
            <div className="space-y-1">
              <span className="text-2xl">✦</span>
              <h3 className="text-2xl font-black tracking-tight uppercase leading-tight">
                MIDNIGHT<br />INDIGO
              </h3>
              <p className="text-[11px] font-mono tracking-wider pt-2 opacity-80">
                HEX: 212842
              </p>
            </div>
          </div>

          {/* Right half: Vanilla Cream */}
          <div className="w-1/2 bg-[#F0E7D5] text-[#212842] p-6 flex flex-col justify-between">
            <div className="text-right">
              <span className="text-2xl">✦</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-black tracking-tight uppercase leading-tight">
                VANILLA<br />CREAM
              </h3>
              <p className="text-[11px] font-mono tracking-wider pt-2 opacity-80">
                HEX: F0E7D5
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Stacked Purple / Slate Gradient Pills */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative h-[480px] rounded-[48px] overflow-hidden p-6 flex flex-col justify-center items-center shadow-xl border-4 border-white/50"
          style={{ background: "linear-gradient(180deg, #F0E7D5 0%, #DFB6B2 50%, #190019 100%)" }}
        >
          <div className="w-full flex flex-col -space-y-2.5 items-center z-10">
            {[
              { hex: "#190019", bg: "#190019", text: "#FFFFFF" },
              { hex: "#2B124C", bg: "#2B124C", text: "#FFFFFF" },
              { hex: "#522B5B", bg: "#522B5B", text: "#FFFFFF" },
              { hex: "#854F6C", bg: "#854F6C", text: "#FFFFFF" },
              { hex: "#DFB6B2", bg: "#DFB6B2", text: "#17191D" },
              { hex: "#FBE4D8", bg: "#FBE4D8", text: "#17191D" },
            ].map((pill, i) => (
              <div
                key={i}
                style={{ backgroundColor: pill.bg, color: pill.text }}
                className="w-full h-15 rounded-full flex items-center justify-center font-mono font-bold text-xs shadow-md transition-transform hover:scale-105 select-none"
              >
                <span>{pill.hex}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 4: Deep Emerald & Mint Gradient Pills */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative h-[480px] rounded-[48px] overflow-hidden p-6 flex flex-col justify-center items-center shadow-xl border-4 border-white/50"
          style={{ background: "linear-gradient(135deg, #163832 0%, #0B2B26 50%, #8EB69B 100%)" }}
        >
          <div className="w-full flex flex-col -space-y-2.5 items-center z-10">
            {[
              { hex: "#051F20", bg: "#051F20", text: "#FFFFFF" },
              { hex: "#0B2B26", bg: "#0B2B26", text: "#FFFFFF" },
              { hex: "#163832", bg: "#163832", text: "#FFFFFF" },
              { hex: "#235347", bg: "#235347", text: "#FFFFFF" },
              { hex: "#8EB69B", bg: "#8EB69B", text: "#051F20" },
              { hex: "#D9EFE2", bg: "#D9EFE2", text: "#051F20" },
            ].map((pill, i) => (
              <div
                key={i}
                style={{ backgroundColor: pill.bg, color: pill.text }}
                className="w-full h-15 rounded-full flex items-center justify-center font-mono font-bold text-xs shadow-md transition-transform hover:scale-105 select-none"
              >
                <span>{pill.hex}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
