"use client";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function LandingNavbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 100) {
      setHidden(true); // scrolling down -> hide
    } else {
      setHidden(false); // scrolling up -> reveal
    }
  });

  return (
    <div className="fixed inset-x-0 top-0 z-50 w-full px-4 pt-4 pointer-events-none flex justify-center">
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -70, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="pointer-events-auto h-11 bg-[#F0E7D5] text-black px-3 sm:px-4 flex items-center gap-4 sm:gap-6 rounded-full shadow-lg border border-[#D4BCC8]/30"
      >
        {/* Brand */}
        <Link
          href="/"
          className="text-black font-normal text-xs sm:text-sm tracking-tight px-2 py-1 rounded-full transition-colors hover:bg-black hover:text-[#F0E7D5]"
        >
          MD.
        </Link>

        {/* Links that turn to black pill with white/cream text on hover */}
        <nav className="flex items-center gap-1 text-xs">
          <a
            href="#demo"
            className="px-3 py-1 rounded-full text-black/80 hover:bg-black hover:text-[#F0E7D5] transition-all duration-200"
          >
            Playground
          </a>
          <a
            href="#how"
            className="px-3 py-1 rounded-full text-black/80 hover:bg-black hover:text-[#F0E7D5] transition-all duration-200"
          >
            How it works
          </a>
          <a
            href="#faq"
            className="px-3 py-1 rounded-full text-black/80 hover:bg-black hover:text-[#F0E7D5] transition-all duration-200"
          >
            FAQ
          </a>
        </nav>

        {/* Studio Button */}
        <div className="pl-1 border-l border-black/10">
          <Link
            href="/home"
            className="text-xs px-3 py-1 rounded-full bg-black text-[#F0E7D5] hover:bg-[#D4BCC8] hover:text-black transition-all"
          >
            Studio
          </Link>
        </div>
      </motion.header>
    </div>
  );
}
