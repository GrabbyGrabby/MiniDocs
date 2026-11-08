"use client";
import { useState } from "react";
import DropZone from "./DropZone";
import { compressImage, ImageOutputFormat } from "@/lib/compress-image";
import { downloadSingle } from "@/lib/batch-download";
import { formatBytes } from "@/lib/format";

interface ConvertTabProps {
  onBytesProcessed: (bytes: number) => void;
}

export default function ConvertTab({ onBytesProcessed }: ConvertTabProps) {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<ImageOutputFormat>("webp");
  const [isConverting, setIsConverting] = useState(false);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);

  function handleFileSelected(files: File[]) {
    if (files.length > 0) {
      setFile(files[0]);
      setConvertedBlob(null);
    }
  }

  async function handleConvert() {
    if (!file) return;
    setIsConverting(true);
    try {
      const blob = await compressImage(file, targetFormat, "low", 0.95);
      setConvertedBlob(blob);
      onBytesProcessed(file.size);
    } catch (e) {
      alert("Conversion error: " + String(e));
    } finally {
      setIsConverting(false);
    }
  }

  const outputExt = targetFormat === "jpeg" ? "jpg" : targetFormat;

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-2xl sm:text-3xl font-light text-[#F0E7D5] tracking-tight">
          Convert Format
        </h2>
        <p className="text-xs text-[#D4BCC8]/70 mt-1 font-light">
          Transform images across modern formats instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {/* Source / Dropzone */}
        <div className="lg:col-span-2">
          {!file ? (
            <DropZone
              onFilesSelected={handleFileSelected}
              accept="image/*"
              label="Add image to convert"
              sublabel="PNG, JPEG, WebP up to 50 MB"
            />
          ) : (
            <div className="bg-[#141416] text-[#F0E7D5] border border-[#D4BCC8]/20 rounded-[24px] p-5 space-y-4 shadow-sm">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-xs sm:text-sm font-normal truncate max-w-[240px] text-white">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => { setFile(null); setConvertedBlob(null); }}
                  className="text-xs font-light text-[#D4BCC8] hover:underline cursor-pointer uppercase"
                >
                  Change File
                </button>
              </div>
              <div className="flex items-center justify-between text-xs text-[#F0E7D5]/70">
                <span>Original: {formatBytes(file.size)}</span>
                {convertedBlob && (
                  <span className="text-[#D4BCC8] font-normal text-xs">
                    Converted: {formatBytes(convertedBlob.size)} [{outputExt.toUpperCase()}]
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Converter Controls Card */}
        <div className="bg-[#141416] text-[#F0E7D5] border border-[#D4BCC8]/20 rounded-[24px] p-5 space-y-4 shadow-sm">
          <h3 className="text-xs font-normal uppercase tracking-widest text-[#D4BCC8]">
            Target Format: <span className="text-white">{targetFormat.toUpperCase()}</span>
          </h3>
          <div className="flex gap-2">
            {(["webp", "png", "jpeg"] as ImageOutputFormat[]).map((f) => {
              const active = targetFormat === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setTargetFormat(f)}
                  className={`flex-1 py-1.5 text-xs font-normal uppercase rounded-full border transition-all cursor-pointer ${
                    active
                      ? "bg-[#F0E7D5] text-black border-[#F0E7D5]"
                      : "border-white/10 text-[#F0E7D5]/70 hover:border-white/30"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            disabled={!file || isConverting}
            onClick={handleConvert}
            className="w-full py-2.5 rounded-full text-xs font-normal uppercase tracking-wider bg-[#F0E7D5] text-black hover:bg-[#D4BCC8] transition-all disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed shadow-sm active:scale-98"
          >
            {isConverting ? "Converting..." : "Convert Now"}
          </button>

          {convertedBlob && file && (
            <button
              type="button"
              onClick={() =>
                downloadSingle(
                  convertedBlob,
                  file.name.replace(/\.[^.]+$/, `.${outputExt}`)
                )
              }
              className="w-full py-2.5 rounded-full text-xs font-normal uppercase tracking-wider bg-[#D4BCC8] text-black hover:bg-white transition-all cursor-pointer shadow-sm active:scale-98"
            >
              Download File
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
