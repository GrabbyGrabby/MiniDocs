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
    <section id="demo" className="space-y-8 scroll-mt-28 py-6">
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#212842] dark:text-[#D4BCC8] bg-[#D4BCC8]/40 dark:bg-[#212842] px-4 py-1.5 rounded-full">
          Live Playground
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-[#17191D] dark:text-[#F0E7D5] tracking-tight">
          Test MiniDocs Live
        </h2>
        <p className="text-sm sm:text-base text-[#212842] dark:text-[#F0E7D5] font-semibold leading-relaxed">
          Drag the interactive slider to inspect simulated real-time in-browser video compression.
        </p>

        {/* View toggle */}
        <div className="inline-flex gap-1 bg-[#212842] p-1.5 rounded-full mt-2 shadow-md">
          <button
            onClick={() => setView("slider")}
            className={`flex items-center gap-1.5 px-5 py-2 text-xs font-black uppercase tracking-wider rounded-full transition-all cursor-pointer ${
              view === "slider" ? "bg-[#D4BCC8] text-[#17191D]" : "text-[#F0E7D5] hover:text-white"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Split Slider</span>
          </button>
          <button
            onClick={() => setView("side")}
            className={`flex items-center gap-1.5 px-5 py-2 text-xs font-black uppercase tracking-wider rounded-full transition-all cursor-pointer ${
              view === "side" ? "bg-[#D4BCC8] text-[#17191D]" : "text-[#F0E7D5] hover:text-white"
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
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto"
      >
        {/* Settings Panel */}
        <div className="lg:col-span-4 bg-[#212842] text-[#F0E7D5] rounded-[42px] p-7 space-y-6 shadow-xl border border-white/10">
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-[#D4BCC8] block mb-2.5">
              Format: <span className="text-white">{format.toUpperCase()}</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(["webp", "png", "jpeg", "svg"] as Format[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`py-2 text-[11px] font-black uppercase rounded-full border transition-all cursor-pointer ${
                    format === f
                      ? "bg-[#D4BCC8] text-[#17191D] border-[#D4BCC8] shadow-sm scale-102"
                      : "border-white/30 text-white hover:border-[#D4BCC8]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-black uppercase tracking-widest text-[#D4BCC8]">
                Quality Slider
              </label>
              <span className="text-xs font-mono font-black text-white bg-white/20 px-3 py-1 rounded-full">
                {quality}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-2.5 bg-white/30 rounded-full appearance-none cursor-pointer accent-[#D4BCC8] mt-2"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-[#D4BCC8] block mb-2">
              Presets
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([["max", "Max Saver"], ["standard", "Standard"], ["lossless", "Lossless"]] as [Preset, string][]).map(
                ([p, label]) => (
                  <button
                    key={p}
                    onClick={() => applyPreset(p)}
                    className="py-2.5 rounded-full border border-white/30 text-[11px] font-black uppercase tracking-wider text-white hover:bg-[#D4BCC8] hover:text-[#17191D] hover:border-[#D4BCC8] transition-all cursor-pointer"
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-white/10 text-xs text-[#F0E7D5] leading-relaxed border border-white/15">
            <span className="font-black text-[#D4BCC8] block mb-1 uppercase tracking-wider">
              ✦ Zero Telemetry
            </span>
            Everything is computed in your device RAM via WebAssembly &amp; HTML5 Canvas.
          </div>
        </div>

        {/* Live Preview Container */}
        <div className="lg:col-span-8 bg-[#212842] rounded-[42px] p-7 space-y-6 shadow-xl border border-white/10">
          {view === "slider" ? (
            <div
              ref={containerRef}
              className="relative w-full h-72 sm:h-80 rounded-[32px] overflow-hidden border-2 border-white/20 bg-black select-none cursor-ew-resize"
              onMouseMove={onMove}
              onMouseUp={stopDrag}
              onMouseLeave={stopDrag}
              onTouchMove={onMove}
              onTouchEnd={stopDrag}
            >
              {/* Right Side Video (Optimized) */}
              <div className="absolute inset-0">
                <video src={VIDEO_SRC} autoPlay loop muted playsInline className="w-full h-full object-cover" style={{ filter: filterStyle }} />
                <span className="absolute bottom-4 right-4 bg-[#17191D]/90 backdrop-blur-md text-[11px] text-white border border-white/20 px-3.5 py-1.5 rounded-full font-mono font-black tracking-wider z-10 shadow-sm">
                  OPTIMIZED ({quality}%)
                </span>
              </div>

              {/* Left Side Video (Raw Source) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white/90 shadow-2xl z-10"
                style={{ width: `${sliderPct}%` }}
              >
                <div style={{ width: containerRef.current?.offsetWidth ?? 600, height: "100%" }}>
                  <video src={VIDEO_SRC} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  <span className="absolute bottom-4 left-4 bg-[#212842]/90 backdrop-blur-md text-[11px] text-white border border-white/20 px-3.5 py-1.5 rounded-full font-mono font-black tracking-wider z-10 shadow-sm">
                    RAW SOURCE (100%)
                  </span>
                </div>
              </div>

              {/* Drag Handle */}
              <div
                className="absolute inset-y-0 z-20 w-8 -ml-4 flex items-center justify-center cursor-ew-resize"
                style={{ left: `${sliderPct}%` }}
                onMouseDown={startDrag}
                onTouchStart={startDrag}
              >
                <div className="w-9 h-9 rounded-full bg-[#D4BCC8] text-[#17191D] border-2 border-[#17191D] flex items-center justify-center shadow-2xl hover:scale-115 transition-transform">
                  <Sliders className="w-4 h-4" />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 h-72 sm:h-80">
              <div className="rounded-[32px] overflow-hidden border-2 border-white/20 relative">
                <video src={VIDEO_SRC} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 bg-[#212842]/90 text-white px-3 py-1 rounded-full font-mono font-bold text-[10px]">RAW</span>
              </div>
              <div className="rounded-[32px] overflow-hidden border-2 border-white/20 relative">
                <video src={VIDEO_SRC} autoPlay loop muted playsInline className="w-full h-full object-cover" style={{ filter: filterStyle }} />
                <span className="absolute bottom-3 left-3 bg-[#17191D]/90 text-white px-3 py-1 rounded-full font-mono font-bold text-[10px]">OPTIMIZED</span>
              </div>
            </div>
          )}

          {/* Metric Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/15 rounded-full px-5 py-3.5 border border-white/20 text-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#D4BCC8] block">Raw</span>
              <div className="text-xl font-black text-white">{originalMB} MB</div>
            </div>
            <div className="bg-white/15 rounded-full px-5 py-3.5 border border-white/20 text-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#D4BCC8] block">Optimized</span>
              <div className="text-xl font-black text-white">{compressedMB} MB</div>
            </div>
            <div className="bg-[#D4BCC8] text-[#17191D] rounded-full px-5 py-3.5 text-center shadow-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#17191D] block">Saved</span>
              <div className="text-xl font-black text-[#17191D]">-{reduction}%</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
