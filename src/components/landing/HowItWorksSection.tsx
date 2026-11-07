"use client";
import { motion } from "framer-motion";
import { UploadCloud, Sliders, Download, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Select or Drag Media",
    desc: "Drop images (PNG, JPEG, WebP) or video clips (MP4, WebM) straight into the app window.",
    badge: "Input Stage",
    icon: UploadCloud,
    accent: "bg-[#212842] text-white",
  },
  {
    number: "02",
    title: "Choose Format & Ratio",
    desc: "Target ultra-efficient WebP or modern H.264. Fine-tune your quality balance on the fly.",
    badge: "Local Processing",
    icon: Sliders,
    accent: "bg-[#D4BCC8] text-[#17191D]",
  },
  {
    number: "03",
    title: "Instant Export or ZIP",
    desc: "Download single optimized assets or export the entire batch into one tidy ZIP archive.",
    badge: "Zero Uploads",
    icon: Download,
    accent: "bg-[#212842] text-white",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how" className="space-y-8 scroll-mt-28 py-6">
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#212842] dark:text-[#D4BCC8] bg-[#D4BCC8]/40 dark:bg-[#212842] px-4 py-1.5 rounded-full">
          Workflow
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-[#17191D] dark:text-[#F0E7D5] tracking-tight">
          Three steps. Zero latency.
        </h2>
        <p className="text-sm sm:text-base text-[#212842] dark:text-[#F0E7D5] font-semibold leading-relaxed">
          Because every step runs locally on your computer, there are no file upload queues or waiting lines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-4">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-[#212842] text-[#F0E7D5] border border-white/10 rounded-[36px] p-8 flex flex-col justify-between space-y-6 shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-black text-[#D4BCC8]">
                  {s.number}
                </span>
                <div className={`w-14 h-14 rounded-2xl ${s.accent} flex items-center justify-center shadow-md font-bold`}>
                  <Icon className="w-7 h-7" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-white tracking-tight">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#F0E7D5]/90 font-medium leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-[#D4BCC8]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{s.badge}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
