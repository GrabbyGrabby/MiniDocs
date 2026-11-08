"use client";
import { useEffect, useState } from "react";
import { formatBytes, reductionPct } from "@/lib/format";

interface HistoryEntry {
  name: string;
  date: string;
  orig: number;
  comp: number;
  type: "image" | "video";
}

export default function DashboardTab() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("minifolio_history");
      if (stored) setHistory(JSON.parse(stored));
    } catch { /* ok */ }
  }, []);

  function handleClear() {
    localStorage.removeItem("minifolio_history");
    setHistory([]);
  }

  const totalOrig = history.reduce((acc, h) => acc + h.orig, 0);
  const totalComp = history.reduce((acc, h) => acc + h.comp, 0);
  const totalSaved = Math.max(0, totalOrig - totalComp);

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl sm:text-4xl font-light text-[#17191D] dark:text-[#F0E7D5] tracking-tight">
            Processing Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-[#535B74] dark:text-[#D4BCC8] mt-1 font-light">
            Local device analytics of your compressed media.
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="text-xs font-normal text-red-400 hover:underline cursor-pointer"
          >
            Clear History
          </button>
        )}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#212842] text-[#F0E7D5] border border-white/10 rounded-[28px] p-6 space-y-1 shadow-sm text-center">
          <span className="text-[10px] uppercase font-medium text-[#D4BCC8] tracking-widest block">
            Total Files
          </span>
          <div className="text-3xl font-light text-white mt-1">
            {history.length}
          </div>
        </div>
        <div className="bg-[#212842] text-[#F0E7D5] border border-white/10 rounded-[28px] p-6 space-y-1 shadow-sm text-center">
          <span className="text-[10px] uppercase font-medium text-[#D4BCC8] tracking-widest block">
            Data Saved
          </span>
          <div className="text-3xl font-light text-[#D4BCC8] mt-1">
            {formatBytes(totalSaved)}
          </div>
        </div>
        <div className="bg-white text-[#17191D] rounded-[28px] p-6 space-y-1 shadow-sm text-center">
          <span className="text-[10px] uppercase font-medium text-[#17191D]/70 tracking-widest block">
            Average Reduction
          </span>
          <div className="text-3xl font-medium text-[#17191D] mt-1">
            {totalOrig > 0 ? reductionPct(totalOrig, totalComp) : 0}%
          </div>
        </div>
      </div>

      {/* History Card */}
      <div className="bg-[#212842] text-[#F0E7D5] border border-white/10 rounded-[28px] overflow-hidden shadow-sm p-2">
        <div className="px-5 py-3 border-b border-white/10 font-medium text-xs uppercase tracking-wider text-[#D4BCC8]">
          Recent Compressions
        </div>
        {history.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#F0E7D5]/70 font-light">
            No files compressed yet. Go to Compress to test!
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {history.map((h, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center justify-between text-xs">
                <div className="truncate max-w-[200px] sm:max-w-[320px]">
                  <p className="font-normal text-white truncate">{h.name}</p>
                  <span className="text-[10px] text-[#D4BCC8]/80">{h.date} • {h.type.toUpperCase()}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#F0E7D5]/60">{formatBytes(h.orig)} → </span>
                  <span className="text-[#D4BCC8] font-normal text-xs">{formatBytes(h.comp)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
