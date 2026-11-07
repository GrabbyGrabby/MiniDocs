"use client";
import JSZip from "jszip";

export async function downloadZip(
  files: { name: string; blob: Blob }[]
): Promise<void> {
  const zip = new JSZip();
  for (const { name, blob } of files) {
    zip.file(name, blob);
  }
  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = "minifolio-compressed.zip";
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadSingle(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
