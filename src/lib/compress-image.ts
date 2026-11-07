/** Compress an image file to WebP / PNG / JPEG using the Canvas 2D API.
 *  Returns a new Blob; never uploads anything to a server.
 */
export type ImageOutputFormat = "webp" | "png" | "jpeg";
export type CompressionLevel = "low" | "balance" | "high";

function qualityFor(level: CompressionLevel): number {
  // low = High Quality tier (minimal reduction)
  // balance = Mid tier (significant reduction)
  // high = Max savings tier (strong compression)
  return level === "low" ? 0.75 : level === "balance" ? 0.55 : 0.35;
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
      let width = img.naturalWidth;
      let height = img.naturalHeight;

      // When level is high (Max savings) or image is huge (> 1920px), scale down dimensions slightly to guarantee compression
      const maxDim = level === "high" ? 1600 : level === "balance" ? 2048 : 3840;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(blobUrl);
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Smooth scaling interpolation
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      // Note: HTML5 Canvas toBlob ignores quality for image/png because PNG is inherently lossless.
      // If the user selected PNG or format is PNG, encoding to WebP or JPEG produces massive size reduction.
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(blobUrl);
          if (blob) {
            resolve(blob);
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
