"use client";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AppHeaderProps {
  activeTab: string;
}

export default function AppHeader({ activeTab }: AppHeaderProps) {
  return (
    <header className="h-16 px-4 sm:px-8 border-b border-white/10 bg-[#212842] text-white flex items-center justify-between sticky top-0 z-20 shrink-0">
      {/* Mobile brand title */}
      <div className="flex md:hidden items-center gap-2 select-none">
        <div className="w-8 h-8 rounded-full bg-[#D4BCC8] text-[#17191D] flex items-center justify-center font-bold text-xs">
          MD.
        </div>
        <span className="text-base font-semibold text-white tracking-tight">
          Mini<span className="text-[#D4BCC8]">Docs</span>
        </span>
      </div>

      {/* Modern minimal active indicator */}
      <div className="hidden md:flex items-center gap-2 text-xs font-medium text-[#F0E7D5]/80">
        <span className="w-2 h-2 rounded-full bg-[#A2C4A5]" />
        <span className="capitalize text-white font-semibold">{activeTab}</span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-medium text-white px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ThemeToggle className="text-white hover:bg-white/10 w-8 h-8" />
      </div>
    </header>
  );
}
