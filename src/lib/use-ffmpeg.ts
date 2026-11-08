"use client";

import { useCallback, useRef, useState } from "react";

const FFMPEG_CORE_BASE = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
const FFMPEG_JS_URL = "https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/umd/ffmpeg.js";

export type VideoLevel = "low" | "balance" | "high";

interface LevelConfig {
  crf: string;
  preset: string;
  audio: string;
}

const LEVEL_CONFIGS: Record<VideoLevel, LevelConfig> = {
  low:     { crf: "24", preset: "ultrafast", audio: "96k" },
  balance: { crf: "28", preset: "ultrafast", audio: "64k" },
  high:    { crf: "32", preset: "ultrafast", audio: "48k" },
};

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve();
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script`));
    document.body.appendChild(script);
  });
}

export function useFFmpeg() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ffmpegRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (ffmpegRef.current && loaded) return;
    setLoading(true);
    setLoadError(null);
    try {
      await loadScript(FFMPEG_JS_URL);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const FFmpegClass = (window as any).FFmpegWASM?.FFmpeg;
      if (!FFmpegClass) {
        throw new Error("Optimizer core unavailable");
      }

      const ff = new FFmpegClass();
      ffmpegRef.current = ff;

      await ff.load({
        coreURL: `${FFMPEG_CORE_BASE}/ffmpeg-core.js`,
        wasmURL: `${FFMPEG_CORE_BASE}/ffmpeg-core.wasm`,
      });
      setLoaded(true);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [loaded]);

  const compressVideo = useCallback(
    async (
      file: File,
      level: VideoLevel = "balance",
      onProgress?: (pct: number) => void
    ): Promise<Blob> => {
      if (!ffmpegRef.current) throw new Error("Optimizer core not loaded");
      const ff = ffmpegRef.current;

      const ext = file.name.split(".").pop()?.toLowerCase() ?? "mp4";
      const safeInput = `input_${Date.now()}.${ext}`;
      const safeOutput = `output_${Date.now()}.mp4`;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleProgress = ({ progress }: any) => {
        onProgress?.(Math.min(99, Math.max(1, Math.round(progress * 100))));
      };
      ff.on("progress", handleProgress);

      try {
        const fileData = new Uint8Array(await file.arrayBuffer());
        await ff.writeFile(safeInput, fileData);
        const { crf, preset, audio } = LEVEL_CONFIGS[level];

        // Compatible scaling filter with even dimensions for H.264
        const args = [
          "-i", safeInput,
          "-c:v", "libx264",
          "-preset", preset,
          "-crf", crf,
          "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
          "-c:a", "aac",
          "-b:a", audio,
          "-movflags", "+faststart",
          "-pix_fmt", "yuv420p",
          safeOutput,
        ];

        const ret = await ff.exec(args);
        if (ret !== 0) throw new Error("Video compression failed");

        const data = await ff.readFile(safeOutput);
        const result = new Blob([new Uint8Array(data)], {
          type: "video/mp4",
        });

        return result;
      } finally {
        ff.off("progress", handleProgress);
        try { await ff.deleteFile(safeInput); } catch { /* ok */ }
        try { await ff.deleteFile(safeOutput); } catch { /* ok */ }
      }
    },
    []
  );

  return { loaded, loading, loadError, load, compressVideo };
}
