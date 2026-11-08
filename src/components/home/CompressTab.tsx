"use client";
import { useState } from "react";
import DropZone from "./DropZone";
import FileRow, { ProcessedItem } from "./FileRow";
import { compressImage, CompressionLevel, ImageOutputFormat } from "@/lib/compress-image";
import { useFFmpeg, VideoLevel } from "@/lib/use-ffmpeg";
import { downloadZip } from "@/lib/batch-download";
import { isVideoFile } from "@/lib/format";

interface CompressTabProps {
  onBytesProcessed: (bytes: number) => void;
}

export default function CompressTab({ onBytesProcessed }: CompressTabProps) {
  const [items, setItems] = useState<ProcessedItem[]>([]);
  const [imgLevel, setImgLevel] = useState<CompressionLevel>("balance");
  const [vidLevel, setVidLevel] = useState<VideoLevel>("balance");
  const [imgFormat, setImgFormat] = useState<ImageOutputFormat>("webp");
  const [isProcessingAll, setIsProcessingAll] = useState(false);

  const { loaded: ffmpegLoaded, loading: ffmpegLoading, load: loadFFmpeg, compressVideo } = useFFmpeg();

  function handleFilesSelected(files: File[]) {
    const newItems: ProcessedItem[] = files.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      status: "idle",
      originalSize: file.size,
    }));
    setItems((prev) => [...prev, ...newItems]);
  }

  function handleRemove(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  async function processItem(item: ProcessedItem) {
    const isVideo = isVideoFile(item.file);

    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: "compressing", progress: 0 } : i))
    );

    try {
      let compressedBlob: Blob;
      let targetExt: string;

      if (isVideo) {
        if (!ffmpegLoaded) {
          await loadFFmpeg();
        }
        compressedBlob = await compressVideo(item.file, vidLevel, (pct) => {
          setItems((prev) =>
            prev.map((i) => (i.id === item.id ? { ...i, progress: pct } : i))
          );
        });
        targetExt = "mp4";
      } else {
        compressedBlob = await compressImage(item.file, imgFormat, imgLevel);
        targetExt = imgFormat === "jpeg" ? "jpg" : imgFormat;
      }

      onBytesProcessed(item.originalSize);

      const baseName = item.file.name.replace(/\.[^.]+$/, "");
      const outputName = `${baseName}.${targetExt}`;

      try {
        const historyItem = {
          name: outputName,
          date: new Date().toLocaleDateString(),
          orig: item.originalSize,
          comp: compressedBlob.size,
          type: isVideo ? "video" : "image",
        };
        const prevHistory = JSON.parse(localStorage.getItem("minifolio_history") || "[]");
        localStorage.setItem("minifolio_history", JSON.stringify([historyItem, ...prevHistory.slice(0, 49)]));
      } catch { /* ok */ }

      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                status: "done",
                compressedBlob,
                outputName,
                compressedSize: compressedBlob.size,
                progress: 100,
              }
            : i
        )
      );
    } catch (err) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? { ...i, status: "error", error: err instanceof Error ? err.message : "Error" }
            : i
        )
      );
    }
  }

  async function handleCompressSingle(id: string) {
    const target = items.find((i) => i.id === id);
    if (target && target.status === "idle") {
      await processItem(target);
    }
  }

  async function handleCompressAll() {
    setIsProcessingAll(true);
    for (const item of items) {
      if (item.status === "idle") {
        await processItem(item);
      }
    }
    setIsProcessingAll(false);
  }

  async function handleDownloadAllZip() {
    const readyFiles = items
      .filter((i) => i.status === "done" && i.compressedBlob)
      .map((i) => ({
        name: i.outputName || i.file.name,
        blob: i.compressedBlob!,
      }));
    if (readyFiles.length > 0) {
      await downloadZip(readyFiles);
    }
  }

  const hasIdle = items.some((i) => i.status === "idle");
  const hasDone = items.some((i) => i.status === "done");

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-2xl sm:text-4xl font-light text-[#17191D] dark:text-[#F0E7D5] tracking-tight">
          Compress Image &amp; Video
        </h2>
        <p className="text-xs sm:text-sm text-[#535B74] dark:text-[#D4BCC8] mt-1 font-light">
          Private, in-browser optimization without upload limits or server bottlenecks.
        </p>
      </div>

      {/* Pill Settings Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-[28px] bg-[#212842] text-[#F0E7D5] border border-white/10 shadow-md">
        {/* Output Format */}
        <div className="space-y-2">
          <label className="text-[10px] font-medium uppercase tracking-widest text-[#D4BCC8] block">
            Target Format
          </label>
          <div className="flex gap-2">
            {(["webp", "jpeg", "png"] as ImageOutputFormat[]).map((f) => {
              const active = imgFormat === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setImgFormat(f)}
                  className={`flex-1 py-1.5 rounded-full text-xs font-normal uppercase transition-all cursor-pointer ${
                    active
                      ? "bg-white text-[#17191D]"
                      : "bg-white/10 text-[#F0E7D5] hover:bg-white/20"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Image Tier */}
        <div className="space-y-2">
          <label className="text-[10px] font-medium uppercase tracking-widest text-[#D4BCC8] block">
            Image Tier
          </label>
          <div className="flex gap-2">
            {(["high", "balance", "low"] as CompressionLevel[]).map((lvl) => {
              const active = imgLevel === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setImgLevel(lvl)}
                  className={`flex-1 py-1.5 rounded-full text-xs font-normal uppercase transition-all cursor-pointer ${
                    active
                      ? "bg-white text-[#17191D]"
                      : "bg-white/10 text-[#F0E7D5] hover:bg-white/20"
                  }`}
                >
                  {lvl === "high" ? "Max" : lvl === "balance" ? "Mid" : "High Q"}
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Tier */}
        <div className="space-y-2">
          <label className="text-[10px] font-medium uppercase tracking-widest text-[#D4BCC8] block">
            Video Tier
          </label>
          <div className="flex gap-2">
            {(["high", "balance", "low"] as VideoLevel[]).map((lvl) => {
              const active = vidLevel === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setVidLevel(lvl)}
                  className={`flex-1 py-1.5 rounded-full text-xs font-normal uppercase transition-all cursor-pointer ${
                    active
                      ? "bg-white text-[#17191D]"
                      : "bg-white/10 text-[#F0E7D5] hover:bg-white/20"
                  }`}
                >
                  {lvl === "high" ? "Max" : lvl === "balance" ? "Mid" : "High Q"}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {ffmpegLoading && (
        <div className="p-3 bg-[#212842] text-[#D4BCC8] rounded-full text-xs font-normal flex items-center justify-center gap-2 shadow-sm border border-[#D4BCC8]/20">
          <span className="animate-spin">✦</span>
          <span>Loading background optimizer in memory...</span>
        </div>
      )}

      {/* Drop Zone */}
      <DropZone onFilesSelected={handleFilesSelected} />

      {/* File List */}
      {items.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#212842] text-[#F0E7D5] p-4 rounded-full px-6 shadow-md border border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider">
              {items.length} {items.length === 1 ? "file" : "files"} in queue
            </span>
            <div className="flex items-center gap-2">
              {hasIdle && (
                <button
                  disabled={isProcessingAll}
                  onClick={handleCompressAll}
                  className="px-6 py-2.5 rounded-full bg-[#D4BCC8] hover:bg-[#FBE4D8] text-[#17191D] text-xs font-black uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 shadow-md active:scale-95"
                >
                  {isProcessingAll ? "Processing..." : "⚡ Compress All"}
                </button>
              )}
              {hasDone && (
                <button
                  onClick={handleDownloadAllZip}
                  className="px-6 py-2.5 rounded-full bg-white hover:bg-[#F0E7D5] text-[#17191D] text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-95"
                >
                  Download All (ZIP)
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <FileRow
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onCompressSingle={handleCompressSingle}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
