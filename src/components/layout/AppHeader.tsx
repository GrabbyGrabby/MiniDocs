"use client";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Link from "next/link";
import { Home } from "lucide-react";

interface AppHeaderProps {
  activeTab: string;
}

export default function AppHeader({ activeTab }: AppHeaderProps) {
  return (
    <header className="h-18 px-6 sm:px-8 border-b border-[#212842]/20 bg-[#212842] text-white flex items-center justify-between sticky top-0 z-10 transition-colors duration-200">
      <div className="flex md:hidden items-center gap-2 select-none">
        <div className="w-8 h-8 rounded-full bg-[#D4BCC8] text-[#17191D] flex items-center justify-center font-bold">
          ✦
        </div>
        <span className="text-xl font-black text-white">
          Mini<span className="text-[#D4BCC8]">Docs</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-2.5 text-xs font-bold text-[#F0E7D5]">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="uppercase tracking-widest text-[#D4BCC8]">MiniDocs Engine</span>
        <span>•</span>
        <span className="capitalize text-white font-black">{activeTab} Studio</span>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white hover:text-[#17191D] px-4 py-2 rounded-full bg-white/10 hover:bg-[#D4BCC8] transition-all"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Landing</span>
        </Link>
        <ThemeToggle className="text-white hover:bg-white/10" />
      </div>
    </header>
  );
}
