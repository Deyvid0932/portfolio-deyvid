import Link from "next/link";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = BaseProps & {
  href: string;
  external?: boolean;
  download?: boolean | string;
  onClick?: () => void;
};

type ButtonAsButton = BaseProps & {
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const baseClasses =
  "group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:brightness-110",
  secondary:
    "border border-zinc-300 bg-white text-zinc-700 shadow-sm backdrop-blur-md hover:border-violet-400 hover:text-violet-700 dark:border-white/15 dark:bg-white/5 dark:text-zinc-100 dark:shadow-none dark:hover:border-violet-500/50 dark:hover:bg-white/10 dark:hover:text-white",
  ghost: "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(baseClasses, variants[variant], sizes[size], className);

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="pointer-events-none absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </>
  );

  if ("href" in rest) {
    const { href, external, download, onClick } = rest;
    if (external || download) {
      return (
        <motion.a
          href={href}
          download={download}
          className={cn(classes, "relative")}
          onClick={onClick}
          target={download ? undefined : "_blank"}
          rel="noopener noreferrer"
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <motion.div whileTap={{ scale: 0.96 }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Link href={href} className={cn(classes, "relative")} onClick={onClick}>
          {content}
        </Link>
      </motion.div>
    );
  }

  const { type = "button", onClick, disabled } = rest;
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(classes, "relative")}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {content}
    </motion.button>
  );
}
