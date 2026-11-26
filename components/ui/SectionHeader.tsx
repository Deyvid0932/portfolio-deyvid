"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "mb-10 sm:mb-14 flex flex-col gap-3 sm:gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-300 bg-violet-100 px-3.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base lg:text-lg">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
