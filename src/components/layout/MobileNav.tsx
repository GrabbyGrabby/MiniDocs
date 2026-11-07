"use client";
import { Tab } from "./Sidebar";
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
    { tab: "pricing", label: "Pro", icon: CreditCard },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-card/90 backdrop-blur-md border-t border-border-base flex justify-around items-center h-16 px-2 shadow-lg transition-colors">
      {tabs.map((t) => {
        const Icon = t.icon;
        const active = activeTab === t.tab;
        return (
          <button
            key={t.tab}
            onClick={() => setActiveTab(t.tab)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
              active ? "text-brand-indigo dark:text-brand-mint font-bold" : "text-text-muted hover:text-text-base"
            }`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
