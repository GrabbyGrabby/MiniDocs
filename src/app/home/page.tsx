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
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-[#F0E7D5] dark:bg-[#17191D] text-[#17191D] dark:text-[#F0E7D5] transition-colors duration-200">
      <CollapsibleSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        storageUsed={storageUsed}
        maxStorage={MAX_STORAGE}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <AppHeader activeTab={activeTab} />

        <main className="flex-1 p-5 md:p-8 pb-20 md:pb-8 overflow-y-auto no-scrollbar max-w-5xl w-full mx-auto">
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
