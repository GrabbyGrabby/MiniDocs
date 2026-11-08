"use client";

import { useCallback, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

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

export function useFFmpeg() {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (ffmpegRef.current && loaded) return;
    setLoading(true);
    setLoadError(null);
    try {
      const ff = new FFmpeg();
      ffmpegRef.current = ff;

      ff.on("log", ({ message }: { message: string }) => {
        if (process.env.NODE_ENV !== "production") {
          console.log("[Engine log]:", message);
        }
      });

      // Load from local public directory first (instant & same-origin), fallback to CDN if needed
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      let coreURL: string;
      let wasmURL: string;

      try {
        coreURL = await toBlobURL(`${origin}/ffmpeg/ffmpeg-core.js`, "text/javascript");
        wasmURL = await toBlobURL(`${origin}/ffmpeg/ffmpeg-core.wasm`, "application/wasm");
      } catch {
        const unpkgBase = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
        coreURL = await toBlobURL(`${unpkgBase}/ffmpeg-core.js`, "text/javascript");
        wasmURL = await toBlobURL(`${unpkgBase}/ffmpeg-core.wasm`, "application/wasm");
      }

      await ff.load({ coreURL, wasmURL });
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

        // Safe args:
        // -map 0:v:0 to grab primary video stream
        // -map 0:a? to safely grab audio if present, without failing on silent videos
        // scale to max 1080p and ensure even dimensions for H.264
        const args = [
          "-i", safeInput,
          "-map", "0:v:0",
          "-map", "0:a?",
          "-c:v", "libx264",
          "-preset", preset,
          "-crf", crf,
          "-vf", "scale='min(1920,iw)':-2:flags=lanczos,scale=trunc(iw/2)*2:trunc(ih/2)*2",
          "-c:a", "aac",
          "-b:a", audio,
          "-movflags", "+faststart",
          "-pix_fmt", "yuv420p",
          safeOutput,
        ];

        const ret = await ff.exec(args);
        if (ret !== 0) throw new Error("Video compression failed");

        const data = await ff.readFile(safeOutput);
        const binaryData = typeof data === "string" ? new TextEncoder().encode(data) : data;
        const result = new Blob([binaryData.buffer as ArrayBuffer], {
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
