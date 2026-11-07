"use client";

export function getTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function setTheme(theme: "dark" | "light"): void {
  if (typeof window === "undefined") return;
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  try {
    localStorage.setItem("theme", theme);
  } catch { /* ok */ }
}

export function toggleTheme(): "dark" | "light" {
  const next = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}
