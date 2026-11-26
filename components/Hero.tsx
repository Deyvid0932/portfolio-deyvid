"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LuArrowRight, LuMail, LuMapPin, LuSparkles } from "react-icons/lu";
import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/socials";
import Container from "./ui/Container";
import Button from "./ui/Button";

const roles = [
  "Ingeniero de Software",
  "Arquitecto de IA",
  "Desarrollador Fullstack",
  "Especialista en RAG",
];

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) {
            setTimeout(() => setDeleting(true), 1400);
          }
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setIndex((i) => (i + 1) % words.length);
          }
        }
      },
      deleting ? 40 : 90,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(roles);

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      {/* Background gradients and grid pattern */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-blue-400/15 via-violet-400/15 to-transparent blur-3xl dark:from-blue-600/20 dark:via-violet-600/20" />
        <div className="absolute right-0 top-1/4 h-[450px] w-[450px] rounded-full bg-gradient-to-bl from-violet-400/15 via-pink-400/10 to-transparent blur-3xl dark:from-violet-500/15 dark:via-cyan-500/10" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/10" />
        
        {/* Subtle grid pattern visible in both light & dark modes */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,#000_70%,transparent_100%)] opacity-70 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] dark:opacity-40"
        />
      </div>

      <Container className="relative z-10 pt-20 sm:pt-24 pb-16 sm:pb-20 lg:pt-24 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 sm:mb-6 flex items-center gap-2"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Disponible para proyectos
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl"
            >
              Hola, soy{" "}
              <span className="text-gradient">{siteConfig.fullName}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 sm:mt-4 flex min-h-[2.2rem] items-center text-lg font-medium text-zinc-700 dark:text-zinc-300 sm:text-2xl"
            >
              <span className="text-violet-500 dark:text-violet-400">{"< "}</span>
              <span>{typed}</span>
              <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-cyan-500 dark:bg-cyan-400 sm:h-7" />
              <span className="text-violet-500 dark:text-violet-400">{" />"}</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 sm:mt-6 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg"
            >
              {siteConfig.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <Button href="#proyectos" className="w-full sm:w-auto justify-center">
                Ver proyectos
                <LuArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
              <Button href="#contacto" variant="secondary" className="w-full sm:w-auto justify-center">
                <LuMail size={16} />
                Contáctame
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-500 sm:gap-6"
            >
              <span className="inline-flex items-center gap-1.5">
                <LuMapPin size={15} className="text-violet-500 dark:text-violet-400 shrink-0" />
                {siteConfig.location}
              </span>
              <span className="h-4 w-px bg-zinc-300 dark:bg-white/10" />
              <div className="flex items-center gap-4">
                {socialLinks.slice(0, 3).map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex items-center gap-1.5 text-zinc-500 transition-colors hover:text-violet-700 dark:text-zinc-400 dark:hover:text-white"
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative mx-auto hidden lg:block"
          >
            <div className="relative h-80 w-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 via-violet-600 to-cyan-500 opacity-70 blur-2xl dark:opacity-80" />
              <div className="absolute inset-0 overflow-hidden rounded-full border border-zinc-200/80 bg-white/95 shadow-2xl shadow-violet-500/10 backdrop-blur-xl dark:border-white/15 dark:bg-white/5 dark:shadow-none">
                <Image
                  src="/avatar.png"
                  alt={siteConfig.fullName}
                  fill
                  sizes="320px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute -right-2 top-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-300/80 bg-white/90 shadow-lg shadow-violet-500/10 backdrop-blur-xl dark:border-violet-500/30 dark:bg-violet-500/20">
                <LuSparkles className="text-violet-600 dark:text-violet-300" size={28} />
              </div>
              <div className="absolute -left-4 bottom-10 rounded-2xl border border-zinc-200/80 bg-white/95 px-4 py-3 shadow-xl shadow-zinc-900/5 backdrop-blur-xl dark:border-white/15 dark:bg-white/5 dark:shadow-none">
                <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                  Construyendo
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  IA en producción
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
