import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MiniDocs — Compress files. Store nothing.",
  description:
    "An editorial, browser-cached image & video optimizer. Your media assets never touch external servers, safeguarding your privacy while eliminating upload bottlenecks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth bg-black text-[#F0E7D5]">
      <body
        className={`${poppins.variable} font-sans min-h-screen bg-black text-[#F0E7D5] antialiased selection:bg-[#D4BCC8] selection:text-black`}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
