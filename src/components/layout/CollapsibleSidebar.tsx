"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  RefreshCw,
  BarChart3,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Cpu,
} from "lucide-react";

export type Tab = "compress" | "convert" | "dashboard" | "pricing";

interface CollapsibleSidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  storageUsed: number;
  maxStorage: number;
}

export default function CollapsibleSidebar({
  activeTab,
  setActiveTab,
  storageUsed,
  maxStorage,
}: CollapsibleSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const percentUsed = Math.min(100, Math.round((storageUsed / maxStorage) * 100));

  const navItems = [
    {
      tab: "compress" as Tab,
      label: "Compress",
      icon: Layers,
    },
    {
      tab: "convert" as Tab,
      label: "Convert",
      icon: RefreshCw,
    },
    {
      tab: "dashboard" as Tab,
      label: "Dashboard",
      icon: BarChart3,
    },
    {
      tab: "pricing" as Tab,
      label: "Plans",
      icon: CreditCard,
    },
  ];

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 76 : 240 }}
      transition={{ type: "spring", stiffness: 350, damping: 32 }}
      className="hidden md:flex relative flex-col justify-between p-4 bg-[#212842] text-[#F0E7D5] border-r border-white/10 shrink-0 z-30 select-none"
    >
      {/* Collapse Trigger Pill */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-7 w-6 h-6 rounded-full bg-[#D4BCC8] text-[#17191D] flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-all cursor-pointer z-40 border border-[#17191D]/20"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Top Brand & Nav */}
      <div className="space-y-6">
        <Link
          href="/"
          className={`flex items-center gap-2.5 group cursor-pointer ${
            isCollapsed ? "justify-center" : "px-2"
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-[#D4BCC8] text-[#17191D] flex items-center justify-center font-bold text-xs shrink-0">
            MD.
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.15 }}
                className="flex items-center"
              >
                <span className="text-sm font-semibold tracking-tight text-white">
                  Mini<span className="text-[#D4BCC8]">Docs</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>

        {/* Nav Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`w-full group flex items-center gap-3 px-3 py-2.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-white text-[#17191D] shadow-sm font-semibold"
                    : "text-[#F0E7D5]/80 hover:bg-white/10 hover:text-white"
                } ${isCollapsed ? "justify-center px-0" : ""}`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.12 }}
                      className="truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Memory Pill */}
      <div>
        {!isCollapsed ? (
          <div className="rounded-2xl p-3 bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-medium text-white/90">
              <span className="flex items-center gap-1.5 text-[#F0E7D5]/80">
                <Cpu className="w-3 h-3 text-[#D4BCC8]" /> Memory
              </span>
              <span className="font-mono text-[#D4BCC8]">{percentUsed}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D4BCC8] rounded-full transition-all duration-300"
                style={{ width: `${percentUsed}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5">
            <Cpu className="w-4 h-4 text-[#D4BCC8]" />
          </div>
        )}
      </div>
    </motion.aside>
  );
}
