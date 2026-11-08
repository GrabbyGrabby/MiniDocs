"use client";
import { Tab } from "./CollapsibleSidebar";
import { Layers, RefreshCw, BarChart3, CreditCard } from "lucide-react";

interface MobileNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function MobileNav({ activeTab, setActiveTab }: MobileNavProps) {
  const tabs: { tab: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { tab: "compress", label: "Compress", icon: Layers },
    { tab: "convert", label: "Convert", icon: RefreshCw },
    { tab: "dashboard", label: "History", icon: BarChart3 },
    { tab: "pricing", label: "Plans", icon: CreditCard },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#000000]/95 backdrop-blur-md border-t border-[#D4BCC8]/20 flex justify-around items-center h-16 px-2 shadow-lg">
      {tabs.map((t) => {
        const Icon = t.icon;
        const active = activeTab === t.tab;
        return (
          <button
            key={t.tab}
            onClick={() => setActiveTab(t.tab)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
              active ? "text-[#F0E7D5]" : "text-[#F0E7D5]/50 hover:text-[#F0E7D5]"
            }`}
          >
            <Icon className={`w-4 h-4 shrink-0 ${active ? "text-[#D4BCC8]" : ""}`} />
            <span className={`text-[10px] tracking-wider uppercase ${active ? "font-normal text-[#F0E7D5]" : "font-light"}`}>
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
