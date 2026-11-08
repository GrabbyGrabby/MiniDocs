"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import CompressTab from "@/components/home/CompressTab";
import ConvertTab from "@/components/home/ConvertTab";
import DashboardTab from "@/components/home/DashboardTab";
import PricingTab from "@/components/home/PricingTab";

export type Tab = "compress" | "convert" | "dashboard" | "pricing";

export default function HomeWorkspacePage() {
  const [activeTab, setActiveTab] = useState<Tab>("compress");
  const [storageUsed, setStorageUsed] = useState<number>(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("minifolio_storage_used");
      if (stored) setStorageUsed(parseInt(stored, 10));
    } catch { /* ok */ }
  }, []);

  function handleBytesProcessed(bytes: number) {
    setStorageUsed((prev) => {
      const next = prev + bytes;
      try {
        localStorage.setItem("minifolio_storage_used", String(next));
      } catch { /* ok */ }
      return next;
    });
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "compress", label: "Compress" },
    { id: "convert", label: "Convert" },
    { id: "dashboard", label: "Dashboard" },
    { id: "pricing", label: "Plans" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#000000] text-[#F0E7D5] flex flex-col">
      {/* Studio Header matching exact pure black & vanilla cream theme */}
      <header className="sticky top-0 z-30 w-full px-4 pt-4 pb-2 flex justify-center bg-[#000000]">
        <div className="h-11 bg-[#F0E7D5] text-[#000000] border border-[#D4BCC8]/40 px-3 flex items-center gap-2 sm:gap-4 rounded-full shadow-lg">
          <Link
            href="/"
            className="text-xs px-2.5 py-1 rounded-full text-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] transition-all font-normal"
          >
            ← Home
          </Link>

          <div className="h-3.5 w-px bg-[#000000]/20" />

          {/* Active Navigation Pills */}
          <nav className="flex items-center gap-1">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-xs px-3.5 py-1 rounded-full transition-all cursor-pointer font-normal ${
                    active
                      ? "bg-[#000000] text-[#FFFFFF] shadow-sm"
                      : "text-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Studio Work Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-20">
        {activeTab === "compress" && (
          <CompressTab onBytesProcessed={handleBytesProcessed} />
        )}
        {activeTab === "convert" && (
          <ConvertTab onBytesProcessed={handleBytesProcessed} />
        )}
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "pricing" && <PricingTab />}
      </main>
    </div>
  );
}
