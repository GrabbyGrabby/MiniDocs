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
          <h2 className="text-2xl sm:text-3xl font-light text-[#F0E7D5] tracking-tight">
            Dashboard
          </h2>
          <p className="text-xs text-[#D4BCC8] mt-1 font-light">
            Device session analytics.
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="text-xs font-light text-[#D4BCC8] hover:underline cursor-pointer"
          >
            Clear History
          </button>
        )}
      </div>

      {/* Metric Cards - Pure Black, Vanilla Cream, Soft Lilac */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#F0E7D5] text-black border border-[#D4BCC8]/40 rounded-[20px] p-5 space-y-1 shadow-sm text-center">
          <span className="text-[10px] uppercase font-light text-black/60 tracking-widest block">
            Total Files
          </span>
          <div className="text-2xl sm:text-3xl font-normal text-black mt-1">
            {history.length}
          </div>
        </div>
        <div className="bg-[#F0E7D5] text-black border border-[#D4BCC8]/40 rounded-[20px] p-5 space-y-1 shadow-sm text-center">
          <span className="text-[10px] uppercase font-light text-black/60 tracking-widest block">
            Data Saved
          </span>
          <div className="text-2xl sm:text-3xl font-normal text-black mt-1">
            {formatBytes(totalSaved)}
          </div>
        </div>
        <div className="bg-[#D4BCC8] text-black rounded-[20px] p-5 space-y-1 shadow-sm text-center">
          <span className="text-[10px] uppercase font-light text-black/70 tracking-widest block">
            Average Reduction
          </span>
          <div className="text-2xl sm:text-3xl font-normal text-black mt-1">
            {totalOrig > 0 ? reductionPct(totalOrig, totalComp) : 0}%
          </div>
        </div>
      </div>

      {/* History Card */}
      <div className="bg-[#F0E7D5] text-black border border-[#D4BCC8]/40 rounded-[24px] overflow-hidden shadow-sm p-2">
        <div className="px-4 py-2.5 border-b border-black/10 font-normal text-xs uppercase tracking-wider text-black/70">
          Recent Files
        </div>
        {history.length === 0 ? (
          <div className="p-8 text-center text-xs text-black/60 font-light">
            No files compressed yet.
          </div>
        ) : (
          <div className="divide-y divide-black/10">
            {history.map((h, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between text-xs">
                <div className="truncate max-w-[200px] sm:max-w-[320px]">
                  <p className="font-normal text-black truncate">{h.name}</p>
                  <span className="text-[10px] text-black/60">{h.date} • {h.type.toUpperCase()}</span>
                </div>
                <div className="text-right font-light">
                  <span className="text-black/50">{formatBytes(h.orig)} → </span>
                  <span className="text-black text-xs font-normal">{formatBytes(h.comp)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
