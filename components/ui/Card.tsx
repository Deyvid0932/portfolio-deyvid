import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
