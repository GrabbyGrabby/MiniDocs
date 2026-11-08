export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

export function reductionPct(original: number, compressed: number): number {
  if (original === 0) return 0;
  return Math.round(((original - compressed) / original) * 100);
}

export function outputFileName(original: string, ext: string): string {
  const base = original.replace(/\.[^.]+$/, "");
  return `${base}-minifolio.${ext}`;
}

export function isVideoFile(file: File): boolean {
  if (file.type && file.type.startsWith("video/")) return true;
  const ext = file.name.split(".").pop()?.toLowerCase();
  return ["mp4", "webm", "mov", "m4v", "avi", "mkv", "quicktime"].includes(ext || "");
}

export function isImageFile(file: File): boolean {
  if (file.type && file.type.startsWith("image/")) return true;
  const ext = file.name.split(".").pop()?.toLowerCase();
  return ["png", "jpg", "jpeg", "webp", "gif", "bmp", "avif"].includes(ext || "");
}
