"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import CompressTab from "@/components/home/CompressTab";
import ConvertTab from "@/components/home/ConvertTab";
import DashboardTab from "@/components/home/DashboardTab";
import PricingTab from "@/components/home/PricingTab";

export type Tab = "compress" | "convert" | "dashboard" | "pricing";

const MAX_STORAGE = 50 * 1024 * 1024; // 50 MB Free tier

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
    <div className="min-h-screen w-full bg-black text-[#F0E7D5] flex flex-col">
      {/* Sleek Floating Pill Studio Bar (No fat sidebar or chunky header) */}
      <header className="sticky top-0 z-30 w-full px-4 pt-4 pb-2 flex justify-center bg-black/80 backdrop-blur-md">
        <div className="h-11 bg-[#161618] border border-[#D4BCC8]/20 px-3 flex items-center gap-3 sm:gap-5 rounded-full shadow-lg">
          <Link
            href="/"
            className="text-xs px-2.5 py-1 rounded-full text-[#F0E7D5]/70 hover:text-white hover:bg-white/10 transition-all"
          >
            ← Home
          </Link>

          <div className="h-3.5 w-px bg-white/15" />

          {/* Active Navigation Pills */}
          <nav className="flex items-center gap-1">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-xs px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                    active
                      ? "bg-[#F0E7D5] text-black shadow-sm"
                      : "text-[#F0E7D5]/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Studio Work Area - Natural clean scroll */}
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
