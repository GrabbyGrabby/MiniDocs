"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Do my images or videos leave my device?",
    a: "No. MiniDocs runs 100% locally in your browser memory (RAM) utilizing WebAssembly. Files never traverse network connections or touch any external server.",
  },
  {
    q: "What file formats can I compress?",
    a: "MiniDocs supports WebP, PNG, JPEG, SVG for images, and MP4 / WebM for video files with high compression and no watermarks.",
  },
  {
    q: "Is there any quality loss?",
    a: "You have full control. You can choose lossless compression or adjust the quality presets (Max Saver, Standard, High Quality) with a live preview before exporting.",
  },
  {
    q: "How do I download the compressed files?",
    a: "You can download individual files immediately upon completion or click 'Download All (ZIP)' to batch-export all processed files at once.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="space-y-8 max-w-4xl mx-auto scroll-mt-28 py-6">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#212842] dark:text-[#D4BCC8] bg-[#D4BCC8]/40 dark:bg-[#212842] px-4 py-1.5 rounded-full">
          Questions
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-[#17191D] dark:text-[#F0E7D5] tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-[#212842] dark:text-[#F0E7D5] font-semibold">
          Everything you need to know about in-browser media compression.
        </p>
      </div>

      <div className="bg-[#212842] text-[#F0E7D5] border border-white/10 rounded-[36px] p-6 sm:p-10 space-y-4 shadow-xl">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border-b border-white/10 last:border-b-0 pb-4 first:pt-0"
          >
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex justify-between items-center text-left py-2 font-bold text-white hover:text-[#D4BCC8] transition-colors cursor-pointer"
            >
              <span className="text-sm sm:text-base tracking-wide font-extrabold">
                {faq.q}
              </span>
              <span className="text-[#D4BCC8] text-xl font-mono font-bold">
                {openIdx === i ? "−" : "+"}
              </span>
            </button>
            {openIdx === i && (
              <p className="text-xs sm:text-sm text-[#F0E7D5]/90 mt-2 leading-relaxed font-medium">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
