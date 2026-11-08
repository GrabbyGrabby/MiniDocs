"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AppHeaderProps {
  activeTab: string;
}

export default function AppHeader({ activeTab }: AppHeaderProps) {
  return (
    <header className="h-16 px-4 sm:px-8 border-b border-[#D4BCC8]/20 bg-[#000000] text-[#F0E7D5] flex items-center justify-between sticky top-0 z-20 shrink-0">
      {/* Mobile brand title */}
      <div className="flex md:hidden items-center gap-2.5 select-none">
        <div className="w-8 h-8 rounded-full bg-[#F0E7D5] text-[#000000] flex items-center justify-center font-normal text-xs">
          MD.
        </div>
        <span className="text-sm font-light text-[#F0E7D5] tracking-tight">
          MiniDocs
        </span>
      </div>

      {/* Modern minimal active indicator */}
      <div className="hidden md:flex items-center gap-2 text-xs font-light text-[#F0E7D5]/80">
        <span className="w-2 h-2 rounded-full bg-[#D4BCC8]" />
        <span className="capitalize text-[#F0E7D5] font-normal">{activeTab}</span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-normal text-[#000000] bg-[#F0E7D5] hover:bg-[#D4BCC8] px-3.5 py-1.5 rounded-full transition-all duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
      </div>
    </header>
  );
}
