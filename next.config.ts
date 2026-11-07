import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude server-side bundling of @ffmpeg/ffmpeg to let it bundle cleanly client-side
  serverExternalPackages: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
};

export default nextConfig;
