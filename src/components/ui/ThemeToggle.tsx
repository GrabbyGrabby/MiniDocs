"use client";
import { toggleTheme } from "@/lib/theme";
import { useState } from "react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);

  function handleToggle() {
    const next = toggleTheme();
    setIsDark(next === "dark");
  }

  return (
    <button
      onClick={handleToggle}
      className={`p-1.5 text-text-muted hover:text-text-base hover:bg-bg-card border border-transparent rounded-full transition-all cursor-pointer ${className}`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 110 10A5 5 0 0112 7z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}
