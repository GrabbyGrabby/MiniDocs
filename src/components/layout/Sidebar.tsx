"use client";
import Link from "next/link";
import { Layers, RefreshCw, BarChart3, CreditCard } from "lucide-react";

export type Tab = "compress" | "convert" | "dashboard" | "pricing";

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  storageUsed: number;
  maxStorage: number;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  storageUsed,
  maxStorage,
}: SidebarProps) {
  const percentUsed = Math.min(100, Math.round((storageUsed / maxStorage) * 100));

  const navItems: { tab: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { tab: "compress", label: "Compress", icon: Layers },
    { tab: "convert", label: "Convert", icon: RefreshCw },
    { tab: "dashboard", label: "Dashboard", icon: BarChart3 },
    { tab: "pricing", label: "Pro Access", icon: CreditCard },
  ];

  return (
    <aside className="hidden md:flex w-72 bg-[#212842] text-[#F0E7D5] border-r border-white/10 flex-col justify-between p-6 shrink-0 transition-colors duration-200">
      <div className="space-y-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 select-none group cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-[#D4BCC8] text-[#17191D] flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            ✦
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tight text-white leading-none">
              Mini<span className="text-[#D4BCC8]">Docs</span>
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#F0E7D5]/70 mt-1">
              Client Workspace
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="space-y-2.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`w-full flex items-center gap-3.5 px-5 py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-[#D4BCC8] text-[#17191D] shadow-md scale-102"
                    : "text-[#F0E7D5] hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Free quota pill card */}
      <div className="border border-white/15 rounded-[32px] p-5 bg-white/5 space-y-3 shadow-sm">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-white">Browser Memory Quota</span>
          <span className="text-[#D4BCC8] font-mono font-black">{percentUsed}%</span>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#D4BCC8] rounded-full transition-all duration-500"
            style={{ width: `${percentUsed}%` }}
          />
        </div>
        <div className="text-[11px] text-[#F0E7D5]/80 flex justify-between font-mono font-semibold">
          <span>{(storageUsed / (1024 * 1024)).toFixed(1)} MB used</span>
          <span>{(maxStorage / (1024 * 1024)).toFixed(0)} MB limit</span>
        </div>
      </div>
    </aside>
  );
}
