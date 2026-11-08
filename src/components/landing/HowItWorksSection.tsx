"use client";
import { motion } from "framer-motion";
import { Link2, ThumbsUp, Sparkles } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      badge: "SUBMIT",
      step: "STEP 01",
      title: "Add your media",
      desc: "Drop any PNG, WebP, JPG image or MP4, WebM video directly into the browser window.",
      cardBg: "bg-[#CBE6D6] text-[#1E4D3E]", // Mint green card from reference image
      badgeBg: "bg-[#B4D7C1] text-[#1E4D3E]",
      iconBg: "bg-[#B4D7C1] text-[#1E4D3E]",
      descColor: "text-[#1E4D3E]/85",
      icon: Link2,
    },
    {
      badge: "OPTIMIZE",
      step: "STEP 02",
      title: "Select ratio & tier",
      desc: "Tweak quality balance and format. The engine processes bytes instantly in local memory.",
      cardBg: "bg-[#F3EAD8] text-[#332A1C]", // Warm beige card from reference image
      badgeBg: "bg-[#E6DBCE] text-[#332A1C]",
      iconBg: "bg-[#E6DBCE] text-[#332A1C]",
      descColor: "text-[#332A1C]/85",
      icon: ThumbsUp,
    },
    {
      badge: "EXPORT",
      step: "STEP 03",
      title: "Claim small size",
      desc: "Download compressed files or export all in one clean ZIP. Up to 85% size reduction guaranteed.",
      cardBg: "bg-[#0f0f12] text-[#F0E7D5] border border-[#D4BCC8]/30",
      badgeBg: "bg-white/10 text-[#F0E7D5]",
      iconBg: "bg-white/10 text-[#D4BCC8]",
      descColor: "text-[#D4BCC8]/80",
      icon: Sparkles,
    },
  ];

  return (
    <section id="how" className="space-y-6 scroll-mt-24 py-8">
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light text-[#17191D] dark:text-[#F0E7D5] tracking-tight">
          How It Works
        </h2>
        <p className="text-xs sm:text-sm text-[#17191D]/75 dark:text-[#F0E7D5]/75 font-light">
          Instant client-side execution. Zero server hops, zero data retention.
        </p>
      </div>

      {/* 3 Reference curved cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.step}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`rounded-[32px] p-7 flex flex-col justify-between space-y-7 shadow-sm ${s.cardBg} min-h-[280px] border border-black/5 dark:border-white/10`}
            >
              {/* Card top badges */}
              <div className="flex items-center justify-between">
                <span className={`px-3.5 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider ${s.badgeBg}`}>
                  {s.badge}
                </span>
                <span className="text-[11px] font-normal tracking-wider uppercase opacity-60">
                  {s.step}
                </span>
              </div>

              {/* Title & Desc */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-light tracking-tight leading-tight">
                  {s.title}
                </h3>
                <p className={`text-xs sm:text-sm font-light leading-relaxed ${s.descColor}`}>
                  {s.desc}
                </p>
              </div>

              {/* Bottom right curved icon circle */}
              <div className="flex justify-end pt-2">
                <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center ${s.iconBg}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
