"use client";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function LandingNavbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 120) {
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
          hidden: { y: -80, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="pointer-events-auto h-12 bg-[#17191D] text-white px-4 flex items-center gap-5 sm:gap-7 rounded-full shadow-lg border border-white/10"
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center text-white font-medium text-sm tracking-tight select-none"
        >
          <span>MD.</span>
        </Link>

        {/* Center navigation links */}
        <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-light text-white/80">
          <a href="#demo" className="hover:text-white transition-colors">
            Playground
          </a>
          <a href="#how" className="hover:text-white transition-colors">
            How it works
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/15">
          <Link
            href="/home"
            className="text-xs font-normal px-3 py-1 rounded-full bg-white text-[#17191D] hover:bg-[#D4BCC8] transition-all"
          >
            Open App
          </Link>
          <ThemeToggle className="text-white hover:bg-white/10 w-7 h-7" />
        </div>
      </motion.header>
    </div>
  );
}
