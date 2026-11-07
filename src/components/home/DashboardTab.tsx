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
    <div className="space-y-8 text-left">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#17191D] dark:text-[#F0E7D5] tracking-tight">
            Processing Dashboard
          </h2>
          <p className="text-sm text-[#535B74] dark:text-[#D4BCC8] mt-2 font-medium">
            Local device analytics of your compressed media.
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="text-xs font-bold uppercase tracking-wider text-red-500 hover:underline cursor-pointer"
          >
            Clear History
          </button>
        )}
      </div>

      {/* Pill Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#212842] text-[#F0E7D5] border border-white/10 rounded-[36px] p-7 space-y-1 shadow-lg text-center">
          <span className="text-[10px] uppercase font-bold text-[#D4BCC8] tracking-widest block">
            Total Files
          </span>
          <div className="text-4xl font-black text-white mt-1">
            {history.length}
          </div>
        </div>
        <div className="bg-[#212842] text-[#F0E7D5] border border-white/10 rounded-[36px] p-7 space-y-1 shadow-lg text-center">
          <span className="text-[10px] uppercase font-bold text-[#D4BCC8] tracking-widest block">
            Data Saved
          </span>
          <div className="text-4xl font-black text-[#D4BCC8] mt-1">
            {formatBytes(totalSaved)}
          </div>
        </div>
        <div className="bg-[#D4BCC8] text-[#17191D] rounded-[36px] p-7 space-y-1 shadow-lg text-center">
          <span className="text-[10px] uppercase font-black text-[#17191D]/80 tracking-widest block">
            Average Reduction
          </span>
          <div className="text-4xl font-black text-[#17191D] mt-1">
            {totalOrig > 0 ? reductionPct(totalOrig, totalComp) : 0}%
          </div>
        </div>
      </div>

      {/* History Card */}
      <div className="bg-[#212842] text-[#F0E7D5] border border-white/10 rounded-[36px] overflow-hidden shadow-xl p-2">
        <div className="px-6 py-4 border-b border-white/10 font-bold text-xs uppercase tracking-wider text-[#D4BCC8]">
          Recent Compressions
        </div>
        {history.length === 0 ? (
          <div className="p-10 text-center text-xs text-[#F0E7D5]/70 font-medium">
            No files compressed yet. Go to Compress to test!
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {history.map((h, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between text-xs">
                <div className="truncate max-w-[200px] sm:max-w-[320px]">
                  <p className="font-bold text-white truncate">{h.name}</p>
                  <span className="text-[10px] text-[#D4BCC8]">{h.date} • {h.type.toUpperCase()}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#F0E7D5]/60">{formatBytes(h.orig)} → </span>
                  <span className="text-[#D4BCC8] font-black text-sm">{formatBytes(h.comp)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
