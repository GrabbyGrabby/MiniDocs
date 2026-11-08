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
        className="pointer-events-auto h-11 bg-[#F0E7D5] text-[#000000] px-3 sm:px-4 flex items-center gap-3 sm:gap-5 rounded-full shadow-lg border border-[#D4BCC8]/40"
      >
        {/* Brand: Turns to "MiniDocs" on phone view, "MD." on desktop */}
        <Link
          href="/"
          className="text-[#000000] font-normal text-xs sm:text-sm tracking-tight px-2.5 py-1 rounded-full transition-colors hover:bg-[#000000] hover:text-[#FFFFFF]"
        >
          <span className="sm:hidden">MiniDocs</span>
          <span className="hidden sm:inline">MD.</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 text-xs">
          <a
            href="#demo"
            className="px-3.5 py-1 rounded-full text-[#000000] font-normal hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-200"
          >
            Playground
          </a>
          {/* Hidden on phone view */}
          <Link
            href="/how-it-works"
            className="hidden sm:inline-block px-3.5 py-1 rounded-full text-[#000000] font-normal hover:bg-[#000000] hover:text-[#FFFFFF] transition-all duration-200"
          >
            How it works
          </Link>
        </nav>

        {/* Studio Button */}
        <div className="pl-1 border-l border-[#000000]/20">
          <Link
            href="/home"
            className="text-xs px-3.5 py-1 rounded-full bg-[#000000] text-[#FFFFFF] hover:bg-[#D4BCC8] hover:text-[#000000] transition-all font-normal"
          >
            Studio
          </Link>
        </div>
      </motion.header>
    </div>
  );
}
