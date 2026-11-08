"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Do my images or videos leave my device?",
    a: "No. MiniDocs runs 100% locally in your browser memory. Files never traverse network connections or touch any external server.",
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
    <section id="faq" className="space-y-6 max-w-3xl mx-auto scroll-mt-24 py-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl sm:text-4xl font-light text-[#17191D] dark:text-[#F0E7D5] tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-[#17191D]/75 dark:text-[#F0E7D5]/75 font-light">
          Everything you need to know about private media optimization.
        </p>
      </div>

      <div className="bg-[#212842] text-[#F0E7D5] border border-white/10 rounded-[32px] p-6 sm:p-8 space-y-4 shadow-sm">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border-b border-white/10 last:border-b-0 pb-3 first:pt-0"
          >
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex justify-between items-center text-left py-2 font-normal text-white hover:text-[#D4BCC8] transition-colors cursor-pointer"
            >
              <span className="text-sm sm:text-base font-normal">
                {faq.q}
              </span>
              <span className="text-lg font-light text-[#D4BCC8] ml-4 shrink-0">
                {openIdx === i ? "−" : "+"}
              </span>
            </button>
            {openIdx === i && (
              <p className="text-xs sm:text-sm text-[#F0E7D5]/80 font-light pt-1 pb-2 leading-relaxed">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
