"use client";
import { useEffect, useState } from "react";
import CollapsibleSidebar, { Tab } from "@/components/layout/CollapsibleSidebar";
import AppHeader from "@/components/layout/AppHeader";
import MobileNav from "@/components/layout/MobileNav";
import CompressTab from "@/components/home/CompressTab";
import ConvertTab from "@/components/home/ConvertTab";
import DashboardTab from "@/components/home/DashboardTab";
import PricingTab from "@/components/home/PricingTab";

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

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-[#F0E7D5] dark:bg-[#17191D] text-[#17191D] dark:text-[#F0E7D5]">
      {/* Sidebar on desktop */}
      <CollapsibleSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        storageUsed={storageUsed}
        maxStorage={MAX_STORAGE}
      />

      {/* Main Studio Viewport */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AppHeader activeTab={activeTab} />

        {/* Scrollable Container */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 pb-28 md:pb-16 overflow-y-visible">
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

      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
