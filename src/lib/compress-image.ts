/** Compress an image file to WebP / PNG / JPEG using the Canvas 2D API.
 *  Returns a new Blob; never uploads anything to a server.
 */
export type ImageOutputFormat = "webp" | "png" | "jpeg";
export type CompressionLevel = "low" | "balance" | "high";

function qualityFor(level: CompressionLevel): number {
  return level === "low" ? 0.9 : level === "balance" ? 0.7 : 0.5;
}

export function compressImage(
  file: File,
  format: ImageOutputFormat = "webp",
  level: CompressionLevel = "balance",
  customQuality?: number
): Promise<Blob> {
  const quality = customQuality ?? qualityFor(level);
  const mimeType = `image/${format}`;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const blobUrl = URL.createObjectURL(file);

    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(blobUrl);
        reject(new Error("Could not get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(blobUrl);
          if (blob) {
            // Don't return a larger file than the original
            if (blob.size >= file.size && format === "png") {
              resolve(file); // PNG lossless: keep original if no gain
            } else {
              resolve(blob);
            }
          } else {
            reject(new Error("Compression failed"));
          }
        },
        mimeType,
        format === "png" ? undefined : quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(blobUrl);
      reject(new Error("Could not load image"));
    };

    img.src = blobUrl;
  });
}
