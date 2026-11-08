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
  Sparkles,
  Zap,
  ShieldCheck,
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
      subtitle: "Instant Optimization",
      icon: Layers,
    },
    {
      tab: "convert" as Tab,
      label: "Convert",
      subtitle: "Multi-Format Core",
      icon: RefreshCw,
    },
    {
      tab: "dashboard" as Tab,
      label: "Dashboard",
      subtitle: "Usage & Telemetry",
      icon: BarChart3,
    },
    {
      tab: "pricing" as Tab,
      label: "Pro Access",
      subtitle: "Unlimited Pipelines",
      icon: CreditCard,
    },
  ];

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 96 : 300 }}
      transition={{ type: "spring", stiffness: 350, damping: 32 }}
      className="hidden md:flex relative flex-col justify-between p-5 bg-[#212842] text-[#F0E7D5] border-r border-white/10 shrink-0 z-30 select-none shadow-2xl"
    >
      {/* Collapse Toggle Trigger Pill */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-8 w-7 h-7 rounded-full bg-[#D4BCC8] text-[#17191D] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer z-40 border border-[#17191D]/20"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* Top Header & Navigation */}
      <div className="space-y-8">
        {/* Logo / Brand pill */}
        <Link
          href="/"
          className={`flex items-center gap-3.5 group cursor-pointer ${
            isCollapsed ? "justify-center" : "px-2"
          }`}
        >
          <div className="w-12 h-12 rounded-[22px] bg-[#D4BCC8] text-[#17191D] flex items-center justify-center font-black text-xl shadow-md group-hover:rotate-12 transition-transform duration-300 shrink-0">
            ✦
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col min-w-0"
              >
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xl font-black tracking-tight text-white leading-none">
                    Mini<span className="text-[#D4BCC8]">Docs</span>
                  </h1>
                  <span className="px-2 py-0.5 rounded-full bg-[#D4BCC8]/20 text-[#D4BCC8] text-[9px] font-black uppercase tracking-wider">
                    v2.0
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#F0E7D5]/70 mt-1 truncate">
                  Client Workspace
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>

        {/* Navigation list */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`w-full group relative flex items-center gap-3.5 p-3.5 rounded-[24px] text-xs font-bold transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-[#D4BCC8] text-[#17191D] shadow-lg shadow-black/20"
                    : "text-[#F0E7D5]/80 hover:bg-white/10 hover:text-white"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <div
                  className={`w-9 h-9 rounded-[16px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    active
                      ? "bg-[#17191D] text-[#D4BCC8]"
                      : "bg-white/10 text-[#F0E7D5]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.15 }}
                      className="flex flex-col text-left min-w-0"
                    >
                      <span className="text-xs font-black tracking-wide leading-tight">
                        {item.label}
                      </span>
                      <span
                        className={`text-[10px] truncate font-medium ${
                          active ? "text-[#17191D]/75" : "text-[#F0E7D5]/60"
                        }`}
                      >
                        {item.subtitle}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {active && !isCollapsed && (
                  <motion.div
                    layoutId="activePillIndicator"
                    className="ml-auto w-1.5 h-6 rounded-full bg-[#17191D]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status Card */}
      <div className="space-y-3">
        {!isCollapsed ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[28px] p-4 bg-white/5 border border-white/10 space-y-3 backdrop-blur-md"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#D4BCC8]" /> Memory Quota
              </span>
              <span className="text-[#D4BCC8] font-mono font-black">{percentUsed}%</span>
            </div>
            <div className="w-full h-2 bg-white/15 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#D4BCC8] to-[#FBE4D8] rounded-full transition-all duration-500"
                style={{ width: `${percentUsed}%` }}
              />
            </div>
            <div className="text-[10px] text-[#F0E7D5]/70 flex justify-between font-mono font-medium">
              <span>{(storageUsed / (1024 * 1024)).toFixed(1)} MB</span>
              <span>{(maxStorage / (1024 * 1024)).toFixed(0)} MB</span>
            </div>
            <div className="pt-1 flex items-center gap-1 text-[9px] font-bold text-[#D4BCC8] uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> 100% Client Memory
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center p-3 rounded-[20px] bg-white/5 border border-white/10">
            <Cpu className="w-5 h-5 text-[#D4BCC8]" />
            <span className="text-[9px] font-mono font-bold mt-1 text-[#F0E7D5]/80">
              {percentUsed}%
            </span>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
