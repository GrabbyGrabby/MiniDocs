"use client";
import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sliders, Columns } from "lucide-react";

type View = "slider" | "side";
type Format = "webp" | "png" | "jpeg";
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
        <span className="text-[11px] font-normal uppercase tracking-widest text-[#D4BCC8] bg-[#D4BCC8]/15 px-3 py-1 rounded-full">
          Live Playground
        </span>
        <h2 className="text-3xl sm:text-4xl font-light text-[#F0E7D5] tracking-tight">
          Test MiniDocs Live
        </h2>
        <p className="text-xs sm:text-sm text-[#F0E7D5]/70 font-light leading-relaxed">
          Drag the interactive slider to inspect simulated real-time in-browser video compression.
        </p>

        {/* View toggle */}
        <div className="inline-flex gap-1 bg-[#F0E7D5] p-1 rounded-full mt-2">
          <button
            onClick={() => setView("slider")}
            className={`flex items-center gap-1.5 px-3.5 py-1 text-xs rounded-full transition-all cursor-pointer ${
              view === "slider" ? "bg-black text-[#F0E7D5]" : "text-black hover:bg-black/10"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Split Slider</span>
          </button>
          <button
            onClick={() => setView("side")}
            className={`flex items-center gap-1.5 px-3.5 py-1 text-xs rounded-full transition-all cursor-pointer ${
              view === "side" ? "bg-black text-[#F0E7D5]" : "text-black hover:bg-black/10"
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
        {/* Settings Panel - Cream Colored Card */}
        <div className="lg:col-span-4 bg-[#F0E7D5] text-black rounded-[32px] p-6 space-y-5 shadow-sm border border-[#D4BCC8]/30">
          <div>
            <label className="text-[11px] font-normal uppercase tracking-widest text-black/70 block mb-2">
              Format: <span className="text-black font-normal">{format.toUpperCase()}</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(["webp", "png", "jpeg"] as Format[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`py-1.5 text-[11px] font-normal uppercase rounded-full border transition-all cursor-pointer ${
                    format === f
                      ? "bg-black text-[#F0E7D5] border-black"
                      : "border-black/20 text-black/80 hover:border-black/50"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-normal uppercase tracking-widest text-black/70">
                Quality Slider
              </label>
              <span className="text-xs font-mono text-black bg-black/10 px-2 py-0.5 rounded-full">
                {quality}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-1.5 bg-black/20 rounded-full appearance-none cursor-pointer accent-black mt-2"
            />
          </div>

          <div>
            <label className="text-[11px] font-normal uppercase tracking-widest text-black/70 block mb-2">
              Presets
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([["max", "Max Saver"], ["standard", "Standard"], ["lossless", "Lossless"]] as [Preset, string][]).map(
                ([p, label]) => (
                  <button
                    key={p}
                    onClick={() => applyPreset(p)}
                    className="py-1.5 rounded-full border border-black/20 text-[11px] font-normal uppercase tracking-wider text-black hover:bg-black hover:text-[#F0E7D5] transition-all cursor-pointer"
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-black/5 text-xs text-black/70 leading-relaxed border border-black/10">
            <span className="text-black block mb-0.5 uppercase tracking-wider text-[11px]">
              ✦ Zero Telemetry
            </span>
            Everything is computed in your device local memory with air-gapped privacy.
          </div>
        </div>

        {/* Live Preview Container - Cream Colored Card */}
        <div className="lg:col-span-8 bg-[#F0E7D5] text-black rounded-[32px] p-6 space-y-5 shadow-sm border border-[#D4BCC8]/30">
          {view === "slider" ? (
            <div
              ref={containerRef}
              className="relative w-full h-72 sm:h-80 rounded-[24px] overflow-hidden border border-black/15 bg-black select-none cursor-ew-resize"
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

              <span className="absolute bottom-3 left-3 bg-black/70 text-[#F0E7D5] text-[10px] font-light uppercase tracking-wider px-2.5 py-0.5 rounded-full pointer-events-none">
                Raw (100%)
              </span>
              <span className="absolute bottom-3 right-3 bg-black/70 text-[#F0E7D5] text-[10px] font-light uppercase tracking-wider px-2.5 py-0.5 rounded-full pointer-events-none">
                Optimized ({quality}%)
              </span>

              <div
                className="absolute inset-y-0 w-0.5 bg-white pointer-events-auto flex items-center justify-center -translate-x-1/2"
                style={{ left: `${sliderPct}%` }}
                onMouseDown={startDrag}
                onTouchStart={startDrag}
              >
                <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                  <Sliders className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 h-72 sm:h-80">
              <div className="rounded-[24px] overflow-hidden border border-black/15 relative">
                <video src={VIDEO_SRC} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 bg-black/70 text-[#F0E7D5] px-2.5 py-0.5 rounded-full text-[10px]">RAW</span>
              </div>
              <div className="rounded-[24px] overflow-hidden border border-black/15 relative">
                <video src={VIDEO_SRC} autoPlay loop muted playsInline className="w-full h-full object-cover" style={{ filter: filterStyle }} />
                <span className="absolute bottom-3 left-3 bg-black/70 text-[#F0E7D5] px-2.5 py-0.5 rounded-full text-[10px]">OPTIMIZED</span>
              </div>
            </div>
          )}

          {/* Metric Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-black/5 rounded-full px-4 py-2.5 border border-black/10 text-center">
              <span className="text-[10px] uppercase tracking-widest text-black/60 block">Raw</span>
              <div className="text-base text-black">{originalMB} MB</div>
            </div>
            <div className="bg-black/5 rounded-full px-4 py-2.5 border border-black/10 text-center">
              <span className="text-[10px] uppercase tracking-widest text-black/60 block">Optimized</span>
              <div className="text-base text-black">{compressedMB} MB</div>
            </div>
            <div className="bg-[#D4BCC8] text-black rounded-full px-4 py-2.5 text-center">
              <span className="text-[10px] uppercase tracking-widest text-black/70 block">Saved</span>
              <div className="text-base text-black">-{reduction}%</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
