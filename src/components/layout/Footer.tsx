import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 px-6 sm:px-8 border-t border-[#D4BCC8]/20 text-center flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#D4BCC8]/80 max-w-6xl w-full mx-auto mt-12 font-light">
      <div className="flex items-center gap-3 select-none">
        <div className="w-7 h-7 rounded-full bg-[#F0E7D5] text-[#000000] flex items-center justify-center text-xs font-normal">
          MD.
        </div>
        <div className="text-left">
          <span className="font-light text-[#F0E7D5] block text-sm">MiniDocs</span>
          <span className="text-[10px] text-[#D4BCC8]/70">© {new Date().getFullYear()} MiniDocs App • Private Media Optimizer</span>
        </div>
      </div>

      <div className="flex items-center gap-6 text-xs text-[#F0E7D5]/80 font-light">
        <Link className="hover:text-[#F0E7D5] transition-colors" href="/privacy">
          Privacy Policy
        </Link>
        <span>•</span>
        <Link className="hover:text-[#F0E7D5] transition-colors" href="/terms">
          Terms of Service
        </Link>
        <span>•</span>
        <Link className="hover:text-[#F0E7D5] transition-colors" href="/how-it-works">
          How it works
        </Link>
      </div>

      <div className="text-xs text-[#D4BCC8]/70 font-light">
        Private • Instant • Zero Data Retention
      </div>
    </footer>
  );
}
