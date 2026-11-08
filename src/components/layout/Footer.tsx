import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 px-6 sm:px-8 border-t border-black/5 dark:border-white/10 text-center flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#212842]/70 dark:text-[#D4BCC8] max-w-6xl w-full mx-auto mt-12 font-light">
      <div className="flex items-center gap-3 select-none">
        <div className="w-7 h-7 rounded-full bg-[#212842] text-[#D4BCC8] flex items-center justify-center text-xs font-normal">
          MD.
        </div>
        <div className="text-left">
          <span className="font-normal text-[#17191D] dark:text-white block text-sm">MiniDocs</span>
          <span className="text-[10px] text-[#535B74] dark:text-[#D4BCC8]/70">© {new Date().getFullYear()} MiniDocs App • In-Browser Media Optimizer</span>
        </div>
      </div>

      <div className="flex items-center gap-6 text-xs text-[#212842]/80 dark:text-[#F0E7D5]/80 font-light">
        <Link className="hover:text-[#17191D] dark:hover:text-white transition-colors" href="/privacy">
          Privacy Policy
        </Link>
        <span>•</span>
        <Link className="hover:text-[#17191D] dark:hover:text-white transition-colors" href="/terms">
          Terms of Service
        </Link>
        <span>•</span>
        <a className="hover:text-[#17191D] dark:hover:text-white transition-colors" href="#demo">
          Playground
        </a>
      </div>

      <div className="text-xs text-[#212842]/60 dark:text-[#D4BCC8]/60 font-light">
        Private . Instant . Zero Data Retention
      </div>
    </footer>
  );
}
