import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MiniDocs — Compress Without Compromise | Modern In-Browser Media Optimizer",
  description:
    "Compress files online in browser with zero server uploads. MiniDocs delivers instant client-side image and video optimization with high privacy and zero data leakage.",
  keywords: [
    "MiniDocs",
    "file compress online in browser",
    "image compress online",
    "video compress online",
    "client-side file compressor",
    "private media optimizer",
  ],
  authors: [{ name: "MiniDocs" }],
  creator: "MiniDocs",
  publisher: "MiniDocs",
  robots: "index, follow",
  openGraph: {
    title: "MiniDocs — Compress Without Compromise",
    description:
      "Modern, client-side, zero-upload media optimizer with ultra-sleek design.",
    siteName: "MiniDocs",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');if(s==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} font-sans min-h-full flex flex-col bg-bg-base text-text-base antialiased selection:bg-[#D4BCC8]/40 selection:text-[#17191D]`}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
