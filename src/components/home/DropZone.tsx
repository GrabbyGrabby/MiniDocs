"use client";
import { useRef } from "react";
import { UploadCloud } from "lucide-react";

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  maxSizeMB?: number;
  label?: string;
  sublabel?: string;
}

export default function DropZone({
  onFilesSelected,
  accept = "image/*,video/*,image/png,image/jpeg,image/webp,video/mp4,video/quicktime,video/webm",
  label = "Add image or video",
  sublabel = "PNG, JPG, WEBP, MP4, WebM, MOV",
}: DropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(Array.from(e.dataTransfer.files));
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
      e.target.value = "";
    }
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className="border border-dashed border-[#D4BCC8]/30 hover:border-[#D4BCC8] rounded-[28px] p-8 sm:p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 bg-[#0d0d0f] hover:bg-[#121214] group"
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      <div className="w-12 h-12 bg-[#D4BCC8]/15 text-[#F0E7D5] rounded-full flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
        <UploadCloud className="w-6 h-6 text-[#D4BCC8]" />
      </div>
      <h3 className="text-base sm:text-lg font-normal text-[#F0E7D5]">
        {label}
      </h3>
      <p className="text-xs text-[#D4BCC8]/75 mt-1 font-light">
        Drag &amp; drop your files here, or tap to browse
      </p>
      <span className="text-[11px] font-light text-[#F0E7D5]/50 mt-2 block">
        {sublabel}
      </span>
    </div>
  );
}
