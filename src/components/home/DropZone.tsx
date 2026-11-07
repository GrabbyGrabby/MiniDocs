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
  accept = "image/*,video/*",
  label = "Add images or videos",
  sublabel = "WEBP, PNG, JPG, MP4, WebM (up to 500 MB per file)",
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
      className="border-2 border-dashed border-border-base hover:border-brand-indigo/60 dark:hover:border-brand-mint/60 rounded-[36px] p-8 sm:p-14 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 bg-bg-card/70 hover:bg-brand-vanilla/20 dark:hover:bg-brand-indigo/10 group shadow-xs hover:shadow-md"
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      <div className="w-16 h-16 bg-brand-vanilla dark:bg-brand-indigo/50 text-brand-indigo dark:text-brand-vanilla rounded-3xl flex items-center justify-center mb-4 border border-brand-indigo/15 dark:border-white/10 transition-transform duration-300 group-hover:scale-110 shadow-xs">
        <UploadCloud className="w-8 h-8" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-brand-slate dark:text-white">
        {label}
      </h3>
      <p className="text-xs sm:text-sm text-text-muted mt-1.5 font-normal">
        Drag &amp; drop your files here, or click to browse
      </p>
      <span className="text-[11px] font-medium text-text-dim tracking-wider mt-4 block">
        {sublabel}
      </span>
    </div>
  );
}
