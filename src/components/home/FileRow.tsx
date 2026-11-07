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
    <div className="bg-[#212842] text-[#F0E7D5] border border-white/10 rounded-[32px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg transition-all duration-200">
      {/* File Info */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-12 h-12 rounded-full bg-[#D4BCC8] text-[#17191D] flex items-center justify-center shrink-0 shadow-sm font-bold">
          {isVideo ? <Film className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
        </div>
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-[320px]">
            {item.file.name}
          </p>
          <div className="flex items-center gap-2 text-xs text-[#F0E7D5]/80">
            <span className="font-mono">{formatBytes(item.originalSize)}</span>
            {item.compressedSize && (
              <>
                <span>→</span>
                <span className="font-mono font-bold text-[#D4BCC8]">
                  {formatBytes(item.compressedSize)} (-{reduction}%)
                </span>
                {item.outputName && (
                  <span className="text-[10px] bg-[#D4BCC8] text-[#17191D] px-2.5 py-0.5 rounded-full font-black uppercase font-mono">
                    {item.outputName.split(".").pop()}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Progress / Actions */}
      <div className="flex items-center gap-3 self-end sm:self-auto">
        {item.status === "idle" && onCompressSingle && (
          <button
            onClick={() => onCompressSingle(item.id)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4BCC8] hover:bg-[#FBE4D8] text-[#17191D] text-xs font-black uppercase tracking-wider active:scale-95 transition-all cursor-pointer shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Compress</span>
          </button>
        )}

        {item.status === "compressing" && (
          <div className="flex items-center gap-2 text-xs text-[#D4BCC8] font-bold">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{item.progress !== undefined ? `${item.progress}%` : "Processing..."}</span>
          </div>
        )}

        {item.status === "done" && item.compressedBlob && (
          <button
            onClick={() => downloadSingle(item.compressedBlob!, downloadFilename)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#F0E7D5] text-[#17191D] text-xs font-black uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        )}

        {item.status === "error" && (
          <span className="text-xs text-red-400 font-bold">
            {item.error || "Failed"}
          </span>
        )}

        <button
          onClick={() => onRemove(item.id)}
          className="text-white/60 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-white/10 cursor-pointer"
          title="Remove item"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
