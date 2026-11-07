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
  low:     { crf: "23", preset: "veryfast", audio: "96k" },
  balance: { crf: "28", preset: "veryfast", audio: "64k" },
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
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
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
      // Load UMD version via script tag to bypass bundler Worker resolution issues
      await loadScript(FFMPEG_JS_URL);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const FFmpegClass = (window as any).FFmpegWASM?.FFmpeg;
      if (!FFmpegClass) {
        throw new Error("FFmpeg not found on global window");
      }

      const ff = new FFmpegClass();
      ffmpegRef.current = ff;

      await ff.load({
        coreURL: `${FFMPEG_CORE_BASE}/ffmpeg-core.js`,
        wasmURL: `${FFMPEG_CORE_BASE}/ffmpeg-core.wasm`,
      });
      setLoaded(true);
    } catch (err) {
      setLoadError(String(err));
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
      if (!ffmpegRef.current) throw new Error("FFmpeg not loaded");
      const ff = ffmpegRef.current;

      const ext = file.name.split(".").pop()?.toLowerCase() ?? "mp4";
      const inputName = `input.${ext}`;
      const outputName = "output.mp4";

      const handleProgress = ({ progress }: { progress: number }) => {
        onProgress?.(Math.min(99, Math.round(progress * 100)));
      };
      ff.on("progress", handleProgress);

      try {
        const fileData = new Uint8Array(await file.arrayBuffer());
        await ff.writeFile(inputName, fileData);
        const { crf, preset, audio } = LEVEL_CONFIGS[level];

        const args = [
          "-i", inputName,
          "-c:v", "libx264",
          "-preset", preset,
          "-crf", crf,
          "-vf", "scale='min(1920,iw)':'min(1920,ih)':force_original_aspect_ratio=decrease",
          "-c:a", "aac",
          "-b:a", audio,
          "-movflags", "+faststart",
          outputName,
        ];

        const ret = await ff.exec(args);
        if (ret !== 0) throw new Error("FFmpeg compression failed");

        const data = await ff.readFile(outputName);
        const result = new Blob([new Uint8Array(data)], {
          type: "video/mp4",
        });

        return result.size < file.size ? result : file;
      } finally {
        ff.off("progress", handleProgress);
        try { await ff.deleteFile(inputName); } catch { /* ok */ }
        try { await ff.deleteFile(outputName); } catch { /* ok */ }
      }
    },
    []
  );

  return { loaded, loading, loadError, load, compressVideo };
}
