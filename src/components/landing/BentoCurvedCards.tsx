"use client";
import { motion } from "framer-motion";
import {
  Code2,
  Sparkles,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Lock,
  ArrowUpRight,
} from "lucide-react";

export default function BentoCurvedCards() {
  const cards = [
    {
      title: "Frontend In-Browser Engine",
      subtitle:
        "Zero backend servers. Media files are processed client-side via WebAssembly & Canvas 2D without data ever escaping your browser.",
      icon: Code2,
      bgColor: "bg-[#8EB69B]", // Sage green card from reference
      textColor: "text-[#17191D]",
      subtextColor: "text-[#17191D]/80",
      iconBg: "bg-[#17191D] text-[#8EB69B]",
      colSpan: "lg:col-span-8",
      tags: ["WebAssembly", "FFmpeg v0.12", "Canvas 2D", "UPNG.js", "Web Workers"],
    },
    {
      title: "Zero-Knowledge Privacy",
      subtitle:
        "No logs, no cookies, no tracking. Air-gapped confidentiality for sensitive assets.",
      icon: Lock,
      bgColor: "bg-[#212842]", // Midnight Indigo card from reference
      textColor: "text-white",
      subtextColor: "text-[#F0E7D5]/70",
      iconBg: "bg-white/10 text-[#D4BCC8]",
      colSpan: "lg:col-span-4",
      tags: ["Client-Side", "Local Memory", "Strict Sandbox"],
    },
    {
      title: "Lossy & Lossless Quantization",
      subtitle:
        "Smart palette compression reduces PNG, WebP and JPEG payloads up to 85% with pixel-perfect clarity.",
      icon: Layers,
      bgColor: "bg-[#212842]", // Dark indigo card
      textColor: "text-white",
      subtextColor: "text-[#F0E7D5]/70",
      iconBg: "bg-white/10 text-[#D4BCC8]",
      colSpan: "lg:col-span-4",
      tags: ["Color Dithering", "Sub-pixel", "Alpha Preserve"],
    },
    {
      title: "High-Throughput Batch Processing",
      subtitle:
        "Drag & drop dozens of files. Multi-threaded background workers compress in parallel and bundle into ZIPs instantly.",
      icon: Cpu,
      bgColor: "bg-[#A2C4A5]", // Soft light sage card
      textColor: "text-[#17191D]",
      subtextColor: "text-[#17191D]/80",
      iconBg: "bg-[#17191D] text-[#A2C4A5]",
      colSpan: "lg:col-span-4",
      tags: ["JSZip Batch", "Parallel Queue", "Multi-core"],
    },
    {
      title: "Hardware Accelerated Video Encoding",
      subtitle:
        "Compress 4K & 1080p MP4/WebM videos right in memory using multi-threaded WebAssembly threads.",
      icon: Zap,
      bgColor: "bg-[#212842]",
      textColor: "text-white",
      subtextColor: "text-[#F0E7D5]/70",
      iconBg: "bg-white/10 text-[#D4BCC8]",
      colSpan: "lg:col-span-4",
      tags: ["H.264", "VP9 Core", "Bitrate Tuning"],
    },
  ];

  return (
    <section id="features" className="py-12 space-y-8 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#212842] dark:text-[#D4BCC8] bg-[#D4BCC8]/30 dark:bg-white/10 px-4 py-1.5 rounded-full inline-block">
            Architected for Privacy
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#17191D] dark:text-[#F0E7D5] tracking-tight">
            Curved Card Architecture
          </h2>
        </div>
        <p className="text-sm font-medium text-[#212842]/70 dark:text-[#D4BCC8] max-w-sm">
          A seamless blend of continuous pill-geometry, specular lighting, and pure local execution.
        </p>
      </div>

      {/* Grid of reference-style cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className={`rounded-[36px] p-7 sm:p-9 flex flex-col justify-between shadow-xl ${card.bgColor} ${card.colSpan} border border-white/15 relative overflow-hidden group`}
            >
              {/* Top ambient bubble decoration */}
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-[20px] flex items-center justify-center font-bold shadow-md ${card.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-current opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${card.textColor}`}>
                    {card.title}
                  </h3>
                  <p className={`text-xs sm:text-sm font-medium leading-relaxed ${card.subtextColor}`}>
                    {card.subtitle}
                  </p>
                </div>
              </div>

              {/* Bottom pill badges */}
              <div className="flex flex-wrap gap-2 pt-6 relative z-10">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-full text-[11px] font-extrabold bg-white/70 dark:bg-white/10 text-[#17191D] dark:text-[#F0E7D5] shadow-xs backdrop-blur-xs tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
