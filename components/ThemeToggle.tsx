"use client";

import { LuSun, LuMoon } from "react-icons/lu";

export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.classList.toggle("dark");
    localStorage.setItem("portfolio-theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Cambiar tema"
      className="relative flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-zinc-300 bg-white text-zinc-600 shadow-sm backdrop-blur-md transition-colors hover:border-violet-400 hover:text-violet-700 dark:border-white/15 dark:bg-white/5 dark:text-zinc-200 dark:shadow-none dark:hover:border-violet-500/50 dark:hover:text-white"
    >
      <LuSun size={18} className="hidden dark:block" />
      <LuMoon size={18} className="block dark:hidden" />
    </button>
  );
}
