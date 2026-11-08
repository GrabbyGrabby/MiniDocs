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
  const [activeMediaTab, setActiveMediaTab] = useState<"image" | "video">("image");
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

    if (files.some((f) => isVideoFile(f))) {
      setActiveMediaTab("video");
    }
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

  const hasVideos = items.some((i) => isVideoFile(i.file));
  const hasIdle = items.some((i) => i.status === "idle");
  const hasDone = items.some((i) => i.status === "done");

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-2xl sm:text-3xl font-light text-[#F0E7D5] tracking-tight">
          Compress Image &amp; Video
        </h2>
        <p className="text-xs text-[#D4BCC8] mt-1 font-light">
          Private, in-browser optimization without upload limits or server bottlenecks.
        </p>
      </div>

      {/* Compact Curved Settings Bar (Space-efficient & clean) */}
      <div className="bg-[#F0E7D5] text-[#000000] border border-[#D4BCC8]/40 rounded-[24px] p-4 sm:p-5 space-y-3.5 shadow-sm">
        {/* Switcher Bar: Appears ONLY when a video is present in the queue */}
        {hasVideos && (
          <div className="flex items-center justify-between border-b border-black/10 pb-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveMediaTab("image")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-normal transition-all cursor-pointer ${
                  activeMediaTab === "image"
                    ? "bg-[#000000] text-[#FFFFFF] shadow-sm"
                    : "bg-black/5 text-[#000000]/70 hover:bg-black/10"
                }`}
              >
                Image Settings
              </button>
              <button
                type="button"
                onClick={() => setActiveMediaTab("video")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-normal transition-all cursor-pointer ${
                  activeMediaTab === "video"
                    ? "bg-[#000000] text-[#FFFFFF] shadow-sm"
                    : "bg-black/5 text-[#000000]/70 hover:bg-black/10"
                }`}
              >
                Video Settings
              </button>
            </div>
            <span className="text-[11px] font-light text-[#000000]/60">
              {activeMediaTab === "image" ? "PNG • JPG • WebP" : "MP4 • MOV • WebM"}
            </span>
          </div>
        )}

        {/* IMAGE SETTINGS: Clearly distinguished columns taking minimal vertical space */}
        {(!hasVideos || activeMediaTab === "image") && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Format Column */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-normal uppercase tracking-widest text-[#000000]/70 block">
                  Export Format
                </label>
                <span className="text-[10px] font-mono text-[#000000]/50 uppercase">{imgFormat}</span>
              </div>
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
                          ? "bg-[#000000] text-[#FFFFFF]"
                          : "bg-[#000000]/5 text-[#000000] hover:bg-[#000000]/10"
                      }`}
                    >
                      {f === "jpeg" ? "jpg" : f}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quality Level Column */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-normal uppercase tracking-widest text-[#000000]/70 block">
                  Quality Level
                </label>
                <span className="text-[10px] font-mono text-[#000000]/50">
                  {imgLevel === "high" ? "Max" : imgLevel === "balance" ? "Mid" : "High Q"}
                </span>
              </div>
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
                          ? "bg-[#000000] text-[#FFFFFF]"
                          : "bg-[#000000]/5 text-[#000000] hover:bg-[#000000]/10"
                      }`}
                    >
                      {lvl === "high" ? "Max" : lvl === "balance" ? "Mid" : "High Q"}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* VIDEO SETTINGS: Shows ONLY when video is added AND active tab is video */}
        {hasVideos && activeMediaTab === "video" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-normal uppercase tracking-widest text-[#000000]/70 block">
                  Export Format
                </label>
                <span className="text-[10px] font-mono text-[#000000]/50">MP4</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled
                  className="flex-1 py-1.5 rounded-full text-xs font-normal bg-[#000000] text-[#FFFFFF] cursor-default"
                >
                  Universal MP4 (H.264)
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-normal uppercase tracking-widest text-[#000000]/70 block">
                  Video Quality Level
                </label>
                <span className="text-[10px] font-mono text-[#000000]/50">
                  {vidLevel === "high" ? "Max" : vidLevel === "balance" ? "Mid" : "High Q"}
                </span>
              </div>
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
                          ? "bg-[#000000] text-[#FFFFFF]"
                          : "bg-[#000000]/5 text-[#000000] hover:bg-[#000000]/10"
                      }`}
                    >
                      {lvl === "high" ? "Max" : lvl === "balance" ? "Mid" : "High Q"}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {ffmpegLoading && (
        <div className="p-3 bg-[#F0E7D5] text-[#000000] rounded-full text-xs font-light flex items-center justify-center gap-2 border border-[#D4BCC8]/40">
          <span className="animate-spin">✦</span>
          <span>Preparing video engine in memory...</span>
        </div>
      )}

      {/* Drop Zone */}
      <DropZone onFilesSelected={handleFilesSelected} />

      {/* File List */}
      {items.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between gap-3 bg-[#F0E7D5] text-[#000000] p-3 rounded-full px-5 border border-[#D4BCC8]/40">
            <span className="text-xs font-light tracking-wide text-[#000000]">
              {items.length} {items.length === 1 ? "file" : "files"} in queue
            </span>
            <div className="flex items-center gap-2">
              {hasIdle && (
                <button
                  disabled={isProcessingAll}
                  onClick={handleCompressAll}
                  className="px-4 py-1.5 rounded-full bg-[#000000] text-[#FFFFFF] hover:bg-[#D4BCC8] hover:text-[#000000] text-xs font-normal uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                >
                  {isProcessingAll ? "Processing..." : "Compress All"}
                </button>
              )}
              {hasDone && (
                <button
                  onClick={handleDownloadAllZip}
                  className="px-4 py-1.5 rounded-full bg-[#D4BCC8] hover:bg-[#000000] hover:text-[#FFFFFF] text-[#000000] text-xs font-normal uppercase tracking-wider transition-all cursor-pointer"
                >
                  Download All (ZIP)
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2">
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
