import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-6 sm:px-8 border-t border-[#212842]/20 text-center flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#212842] dark:text-[#D4BCC8] max-w-6xl w-full mx-auto mt-16 font-semibold">
      <div className="flex items-center gap-3 select-none">
        <div className="w-8 h-8 rounded-full bg-[#212842] text-[#D4BCC8] flex items-center justify-center font-black">
          ✦
        </div>
        <div className="text-left">
          <span className="font-black text-[#17191D] dark:text-white block text-sm">MiniDocs</span>
          <span className="text-[10px] text-[#535B74] dark:text-[#D4BCC8]/80">© {new Date().getFullYear()} MiniDocs App • 100% In-Browser Privacy</span>
        </div>
      </div>

      <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-[#212842] dark:text-[#F0E7D5]">
        <Link className="hover:text-[#D4BCC8] transition-colors" href="/privacy">
          Privacy Policy
        </Link>
        <span>•</span>
        <Link className="hover:text-[#D4BCC8] transition-colors" href="/terms">
          Terms of Service
        </Link>
        <span>•</span>
        <a className="hover:text-[#D4BCC8] transition-colors" href="#demo">
          Playground
        </a>
      </div>

      <div className="text-xs font-bold text-[#212842] dark:text-[#D4BCC8]">
        Built with WebAssembly &amp; Canvas 2D
      </div>
    </footer>
  );
}
