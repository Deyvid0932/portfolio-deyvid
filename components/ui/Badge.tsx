import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline" | "accent";
};

const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200",
  outline:
    "border-violet-300 text-violet-700 dark:border-violet-500/30 dark:text-violet-200",
  accent:
    "bg-gradient-to-r from-blue-100 via-violet-100 to-cyan-100 border-violet-300 text-violet-700 dark:from-blue-500/20 dark:via-violet-500/20 dark:to-cyan-500/20 dark:border-violet-500/30 dark:text-violet-100",
};

export default function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
