"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LuMenu, LuX, LuDownload } from "react-icons/lu";
import { siteConfig } from "@/data/site";
import { cn } from "@/utils/cn";
import ThemeToggle from "./ThemeToggle";
import Button from "./ui/Button";
import Container from "./ui/Container";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Tecnologías", href: "#tecnologias" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-zinc-200 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-black/60"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="#inicio" className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 overflow-hidden rounded-xl border border-violet-500/40 shadow-lg shadow-violet-600/25">
            <Image
              src="/avatar.png"
              alt={siteConfig.fullName}
              fill
              sizes="36px"
              className="object-cover object-top"
              priority
            />
          </span>
          <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
            {siteConfig.name}
            <span className="text-gradient">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition-colors duration-300 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
            >
              <span>{link.label}</span>
              <span className="absolute inset-x-3.5 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button
            href={siteConfig.cvUrl}
            download="CV-Deyvid-Jair-Chupillon-Silva.pdf"
            size="sm"
            className="hidden lg:inline-flex"
          >
            <LuDownload size={16} />
            Descargar CV
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-white/5 dark:text-white dark:shadow-none lg:hidden"
          >
            {open ? <LuX size={18} /> : <LuMenu size={18} />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-zinc-200 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-black/95 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-200 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-3 border-t border-zinc-200/60 dark:border-white/10 flex justify-center w-full lg:hidden">
                <Button
                  href={siteConfig.cvUrl}
                  download="CV-Deyvid-Jair-Chupillon-Silva.pdf"
                  className="w-full justify-center text-center text-xs sm:text-sm py-2.5 sm:py-3"
                >
                  <LuDownload size={15} />
                  Descargar CV
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
