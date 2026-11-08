"use client";
import { formatBytes, reductionPct } from "@/lib/format";
import { downloadSingle } from "@/lib/batch-download";
import { Film, Image as ImageIcon, X, Download, Loader2, Sparkles } from "lucide-react";

export interface ProcessedItem {
  id: string;
  file: File;
  compressedBlob?: Blob;
  outputName?: string;
  status: "idle" | "compressing" | "done" | "error";
  progress?: number;
  error?: string;
  originalSize: number;
  compressedSize?: number;
}

interface FileRowProps {
  item: ProcessedItem;
  onRemove: (id: string) => void;
  onCompressSingle?: (id: string) => void;
}

export default function FileRow({ item, onRemove, onCompressSingle }: FileRowProps) {
  const isVideo = item.file.type.startsWith("video/");
  const reduction = item.compressedSize
    ? reductionPct(item.originalSize, item.compressedSize)
    : 0;

  const downloadFilename = item.outputName || item.file.name;

  return (
    <div className="bg-[#141416] text-[#F0E7D5] border border-[#D4BCC8]/20 rounded-[20px] p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-200">
      {/* File Info */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-full bg-[#D4BCC8] text-black flex items-center justify-center shrink-0">
          {isVideo ? <Film className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
        </div>
        <div className="min-w-0 space-y-0.5">
          <p className="text-xs sm:text-sm font-normal text-white truncate max-w-[200px] sm:max-w-[320px]">
            {item.file.name}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-[#F0E7D5]/70 font-light">
            <span className="font-mono">{formatBytes(item.originalSize)}</span>
            {item.compressedSize && (
              <>
                <span>→</span>
                <span className="font-mono text-[#D4BCC8] font-normal">
                  {formatBytes(item.compressedSize)} (-{reduction}%)
                </span>
                {item.outputName && (
                  <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded-full font-mono font-light uppercase">
                    {item.outputName.split(".").pop()}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Progress / Actions */}
      <div className="flex items-center gap-2 self-end sm:self-auto">
        {item.status === "idle" && onCompressSingle && (
          <button
            onClick={() => onCompressSingle(item.id)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F0E7D5] hover:bg-[#D4BCC8] text-black text-xs font-normal uppercase tracking-wider transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Compress</span>
          </button>
        )}

        {item.status === "compressing" && (
          <div className="flex items-center gap-2 text-xs text-[#D4BCC8] font-light">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>{item.progress !== undefined ? `${item.progress}%` : "Processing..."}</span>
          </div>
        )}

        {item.status === "done" && item.compressedBlob && (
          <button
            onClick={() => downloadSingle(item.compressedBlob!, downloadFilename)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D4BCC8] hover:bg-white text-black text-xs font-normal uppercase tracking-wider transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        )}

        {item.status === "error" && (
          <span className="text-xs text-red-400 font-light">
            {item.error || "Failed"}
          </span>
        )}

        <button
          onClick={() => onRemove(item.id)}
          className="text-white/40 hover:text-red-400 transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer"
          title="Remove item"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
