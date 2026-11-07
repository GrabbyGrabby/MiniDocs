# MiniDocs — Compress Without Compromise

An in-browser media compression and format conversion engine built with Next.js, WebAssembly (FFmpeg), Canvas 2D, Tailwind CSS, and Framer Motion. 100% private with zero server uploads.

## Features

- **100% Client-Side Processing**: Media never leaves your device memory (RAM).
- **Video Compression**: In-browser H.264 transcoding via WebAssembly FFmpeg (`@ffmpeg/core`).
- **Image Compression & Conversion**: Native Canvas 2D engine supporting WebP, JPEG, PNG, and SVG.
- **Batch Export**: Instant multi-file ZIP archive creation with `jszip`.
- **Interactive Playground**: Real-time split-screen slider comparing raw vs. optimized quality.
- **Modern UI**: Styled with Poppins typography, curved card aesthetics, and Midnight Indigo / Soft Lilac color palettes.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Engine**: `@ffmpeg/ffmpeg`, WebAssembly, Canvas 2D API
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page or [http://localhost:3000/home](http://localhost:3000/home) for the compression workspace.

## Build for Production

```bash
pnpm build
pnpm start
```

## License

MIT
