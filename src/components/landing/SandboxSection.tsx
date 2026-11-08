"use client";
import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sliders, Columns } from "lucide-react";

type View = "slider" | "side";
type Format = "webp" | "png" | "jpeg" | "svg";
type Preset = "max" | "standard" | "lossless";

const QUALITY_MAP: Record<Preset, number> = { max: 50, standard: 75, lossless: 100 };

export default function SandboxSection() {
  const [view, setView] = useState<View>("slider");
  const [format, setFormat] = useState<Format>("webp");
  const [quality, setQuality] = useState(90);
  const [sliderPct, setSliderPct] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const startDrag = () => { dragging.current = true; };
  const stopDrag  = () => { dragging.current = false; };
  const onMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setSliderPct(pct);
  }, []);

  function applyPreset(p: Preset) { setQuality(QUALITY_MAP[p]); }

  const originalMB = 14.8;
  const compressedMB = +(originalMB * (quality / 100) * 0.08).toFixed(2);
  const reduction = Math.round(((originalMB - compressedMB) / originalMB) * 100);
  const filterStyle = `blur(${((100 - quality) / 100) * 0.4}px) contrast(${100 - (100 - quality) * 0.01}%)`;

  const VIDEO_SRC = "https://vjs.zencdn.net/v/oceans.mp4";

  return (
    <section id="demo" className="space-y-6 scroll-mt-24 py-6">
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-[11px] font-medium uppercase tracking-widest text-[#212842] dark:text-[#D4BCC8] bg-[#D4BCC8]/30 dark:bg-white/10 px-3.5 py-1 rounded-full">
          Live Playground
        </span>
        <h2 className="text-3xl sm:text-4xl font-light text-[#17191D] dark:text-[#F0E7D5] tracking-tight">
          Test MiniDocs Live
        </h2>
        <p className="text-xs sm:text-sm text-[#212842]/75 dark:text-[#F0E7D5]/75 font-light leading-relaxed">
          Drag the interactive slider to inspect simulated real-time in-browser video compression.
        </p>

        {/* View toggle */}
        <div className="inline-flex gap-1 bg-[#212842] p-1 rounded-full mt-2 border border-white/10">
          <button
            onClick={() => setView("slider")}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-normal uppercase tracking-wider rounded-full transition-all cursor-pointer ${
              view === "slider" ? "bg-white text-[#17191D]" : "text-[#F0E7D5] hover:text-white"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Split Slider</span>
          </button>
          <button
            onClick={() => setView("side")}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-normal uppercase tracking-wider rounded-full transition-all cursor-pointer ${
              view === "side" ? "bg-white text-[#17191D]" : "text-[#F0E7D5] hover:text-white"
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Side by Side</span>
          </button>
        </div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto"
      >
        {/* Settings Panel */}
        <div className="lg:col-span-4 bg-[#212842] text-[#F0E7D5] rounded-[32px] p-6 space-y-5 border border-white/10 shadow-sm">
          <div>
            <label className="text-[11px] font-medium uppercase tracking-widest text-[#D4BCC8] block mb-2">
              Format: <span className="text-white">{format.toUpperCase()}</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(["webp", "png", "jpeg", "svg"] as Format[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`py-1.5 text-[11px] font-normal uppercase rounded-full border transition-all cursor-pointer ${
                    format === f
                      ? "bg-white text-[#17191D] border-white"
                      : "border-white/20 text-white/80 hover:border-white/40"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-medium uppercase tracking-widest text-[#D4BCC8]">
                Quality Slider
              </label>
              <span className="text-xs font-mono font-normal text-white bg-white/10 px-2.5 py-0.5 rounded-full">
                {quality}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#D4BCC8] mt-2"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium uppercase tracking-widest text-[#D4BCC8] block mb-2">
              Presets
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([["max", "Max Saver"], ["standard", "Standard"], ["lossless", "Lossless"]] as [Preset, string][]).map(
                ([p, label]) => (
                  <button
                    key={p}
                    onClick={() => applyPreset(p)}
                    className="py-2 rounded-full border border-white/20 text-[11px] font-normal uppercase tracking-wider text-white hover:bg-white hover:text-[#17191D] transition-all cursor-pointer"
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 text-xs text-[#F0E7D5]/80 leading-relaxed border border-white/10">
            <span className="font-medium text-[#D4BCC8] block mb-1 uppercase tracking-wider text-[11px]">
              ✦ Zero Telemetry
            </span>
            Everything is computed in your device local memory with air-gapped privacy.
          </div>
        </div>

        {/* Live Preview Container */}
        <div className="lg:col-span-8 bg-[#212842] rounded-[32px] p-6 space-y-5 border border-white/10 shadow-sm">
          {view === "slider" ? (
            <div
              ref={containerRef}
              className="relative w-full h-72 sm:h-80 rounded-[28px] overflow-hidden border border-white/20 bg-black select-none cursor-ew-resize"
              onMouseMove={onMove}
              onMouseUp={stopDrag}
              onMouseLeave={stopDrag}
              onTouchMove={onMove}
              onTouchEnd={stopDrag}
            >
              <video src={VIDEO_SRC} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
              <div
                className="absolute inset-y-0 right-0 overflow-hidden"
                style={{ left: `${sliderPct}%` }}
              >
                <video
                  src={VIDEO_SRC}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-y-0 right-0 h-full object-cover max-w-none"
                  style={{
                    width: containerRef.current?.clientWidth || "100%",
                    transform: `translateX(-${sliderPct}%)`,
                    filter: filterStyle,
                  }}
                />
              </div>

              <span className="absolute bottom-3 left-3 bg-[#17191D]/80 backdrop-blur-xs text-white text-[10px] font-normal uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 pointer-events-none">
                Raw Source (100%)
              </span>
              <span className="absolute bottom-3 right-3 bg-[#17191D]/80 backdrop-blur-xs text-white text-[10px] font-normal uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 pointer-events-none">
                Optimized ({quality}%)
              </span>

              <div
                className="absolute inset-y-0 w-0.5 bg-white shadow-lg pointer-events-auto flex items-center justify-center -translate-x-1/2"
                style={{ left: `${sliderPct}%` }}
                onMouseDown={startDrag}
                onTouchStart={startDrag}
              >
                <div className="w-8 h-8 rounded-full bg-white text-[#17191D] flex items-center justify-center shadow-md">
                  <Sliders className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 h-72 sm:h-80">
              <div className="rounded-[28px] overflow-hidden border border-white/20 relative">
                <video src={VIDEO_SRC} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 bg-[#17191D]/80 text-white px-3 py-1 rounded-full text-[10px] font-normal">RAW</span>
              </div>
              <div className="rounded-[28px] overflow-hidden border border-white/20 relative">
                <video src={VIDEO_SRC} autoPlay loop muted playsInline className="w-full h-full object-cover" style={{ filter: filterStyle }} />
                <span className="absolute bottom-3 left-3 bg-[#17191D]/80 text-white px-3 py-1 rounded-full text-[10px] font-normal">OPTIMIZED</span>
              </div>
            </div>
          )}

          {/* Metric Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 rounded-full px-4 py-3 border border-white/10 text-center">
              <span className="text-[10px] font-medium uppercase tracking-widest text-[#D4BCC8] block">Raw</span>
              <div className="text-lg font-light text-white">{originalMB} MB</div>
            </div>
            <div className="bg-white/5 rounded-full px-4 py-3 border border-white/10 text-center">
              <span className="text-[10px] font-medium uppercase tracking-widest text-[#D4BCC8] block">Optimized</span>
              <div className="text-lg font-light text-white">{compressedMB} MB</div>
            </div>
            <div className="bg-white text-[#17191D] rounded-full px-4 py-3 text-center shadow-sm">
              <span className="text-[10px] font-medium uppercase tracking-widest text-[#17191D]/70 block">Saved</span>
              <div className="text-lg font-medium text-[#17191D]">-{reduction}%</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
