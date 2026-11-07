/** Compress an image file to WebP / PNG / JPEG.
 *  Uses UPNG.js (quantization & palette reduction like pngquant) for real PNG compression in browser,
 *  and Canvas 2D API for WebP / JPEG.
 *  Returns a new Blob; never uploads anything to a server.
 */
export type ImageOutputFormat = "webp" | "png" | "jpeg";
export type CompressionLevel = "low" | "balance" | "high";

function qualityFor(level: CompressionLevel): number {
  return level === "low" ? 0.8 : level === "balance" ? 0.6 : 0.4;
}

// Colors palette for lossy PNG quantization (similar to pngquant/TinyPNG)
function colorsForPng(level: CompressionLevel): number {
  // high = Max savings: 64 colors
  // balance = Mid: 128 colors
  // low = High Q: 256 colors
  return level === "high" ? 64 : level === "balance" ? 128 : 256;
}

export async function compressImage(
  file: File,
  format: ImageOutputFormat = "webp",
  level: CompressionLevel = "balance",
  customQuality?: number
): Promise<Blob> {
  const quality = customQuality ?? qualityFor(level);

  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const blobUrl = URL.createObjectURL(file);

    img.onload = async () => {
      try {
        let width = img.naturalWidth;
        let height = img.naturalHeight;

        // Downscale oversized images if requested high compression
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
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          URL.revokeObjectURL(blobUrl);
          reject(new Error("Could not get canvas context"));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(blobUrl);

        // REAL PNG COMPRESSION via UPNG.js (Color Quantization)
        if (format === "png") {
          try {
            const UPNG = await import("upng-js");
            const imgData = ctx.getImageData(0, 0, width, height);
            const numColors = colorsForPng(level);
            // UPNG.encode(bufs, w, h, cnum, dither)
            const pngBuffer = (UPNG.default || UPNG).encode(
              [imgData.data.buffer],
              width,
              height,
              numColors
            );
            const blob = new Blob([pngBuffer], { type: "image/png" });
            resolve(blob);
            return;
          } catch (pngErr) {
            console.warn("UPNG fallback to canvas:", pngErr);
          }
        }

        // WebP / JPEG compression via Canvas toBlob
        const mimeType = `image/${format}`;
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Compression failed"));
            }
          },
          mimeType,
          quality
        );
      } catch (err) {
        URL.revokeObjectURL(blobUrl);
        reject(err instanceof Error ? err : new Error("Failed compressing image"));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(blobUrl);
      reject(new Error("Could not load image"));
    };

    img.src = blobUrl;
  });
}
