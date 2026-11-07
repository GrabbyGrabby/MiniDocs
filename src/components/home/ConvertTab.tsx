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
    <div className="space-y-8 text-left">
      <div>
        <h2 className="text-3xl sm:text-5xl font-black text-[#17191D] dark:text-[#F0E7D5] tracking-tight">
          Convert Image Format
        </h2>
        <p className="text-sm text-[#535B74] dark:text-[#D4BCC8] mt-2 font-medium">
          Transform images across modern formats with zero server latency.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Source / Dropzone */}
        <div className="lg:col-span-2">
          {!file ? (
            <DropZone
              onFilesSelected={handleFileSelected}
              accept="image/*"
              label="Add Image to Convert"
              sublabel="PNG, JPEG, WebP, SVG up to 50 MB"
            />
          ) : (
            <div className="bg-[#212842] text-[#F0E7D5] border border-white/10 rounded-[36px] p-8 space-y-5 shadow-xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-base font-bold truncate max-w-[240px] text-white">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => { setFile(null); setConvertedBlob(null); }}
                  className="text-xs font-bold text-[#D4BCC8] hover:underline cursor-pointer uppercase"
                >
                  Change File
                </button>
              </div>
              <div className="flex items-center justify-between text-xs text-[#F0E7D5]/80">
                <span>Original: {formatBytes(file.size)}</span>
                {convertedBlob && (
                  <span className="text-[#D4BCC8] font-black text-sm">
                    Converted: {formatBytes(convertedBlob.size)} [{outputExt.toUpperCase()}]
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Converter Controls Card */}
        <div className="bg-[#212842] text-[#F0E7D5] border border-white/10 rounded-[36px] p-8 space-y-6 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4BCC8]">
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
                  className={`flex-1 py-3 text-xs font-black uppercase rounded-full border transition-all cursor-pointer ${
                    active
                      ? "bg-[#D4BCC8] text-[#17191D] border-[#D4BCC8] shadow-sm"
                      : "border-white/20 text-[#F0E7D5] hover:border-[#D4BCC8]"
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
            className="w-full py-4 rounded-full text-xs font-black uppercase tracking-wider bg-[#D4BCC8] hover:bg-[#FBE4D8] text-[#17191D] transition-all disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed shadow-md active:scale-95"
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
              className="w-full py-4 rounded-full text-xs font-black uppercase tracking-wider bg-white hover:bg-[#F0E7D5] text-[#17191D] transition-all cursor-pointer shadow-md active:scale-95"
            >
              Download Converted File
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
