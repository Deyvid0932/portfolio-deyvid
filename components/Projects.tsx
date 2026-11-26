"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuGithub,
  LuExternalLink,
  LuPlay,
  LuX,
  LuClock,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import { projects, type Project } from "@/data/projects";
import Container from "./ui/Container";
import SectionHeader from "./ui/SectionHeader";
import Badge from "./ui/Badge";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(projects.length > 1);

  const updateScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollPrev(scrollLeft > 4);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 4);

    const firstCard = el.firstElementChild as HTMLElement | null;
    if (firstCard) {
      const cardStep = firstCard.offsetWidth + 24; // gap-6 = 24px
      const index = Math.round(scrollLeft / cardStep);
      setActiveIndex(Math.min(Math.max(index, 0), projects.length - 1));
    }
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  const scrollByCard = (direction: "prev" | "next") => {
    const el = carouselRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth;
    el.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const target = el.children[index] as HTMLElement | undefined;
    if (target) {
      el.scrollTo({
        left: target.offsetLeft - el.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setSelectedProject(null);
    }
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject, handleKeyDown]);

  return (
    <section id="proyectos" className="relative py-12 sm:py-16 lg:py-16">
      <Container>
        <SectionHeader
          title="Proyectos de Impacto"
          description="Una selección de proyectos donde combino ingeniería de software con inteligencia artificial para crear productos con impacto real."
          className="mb-6 sm:mb-8"
        />

        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Indicadores del carrusel de proyectos">
            {projects.map((project, index) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={`Ir al proyecto ${index + 1}: ${project.title}`}
                aria-selected={activeIndex === index}
                className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-7 bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500"
                    : "w-2 bg-zinc-300 hover:bg-zinc-400 dark:bg-white/20 dark:hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard("prev")}
              disabled={!canScrollPrev}
              aria-label="Proyecto anterior"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-zinc-200/80 bg-white/80 text-zinc-700 shadow-sm backdrop-blur-md transition-all hover:border-violet-500/50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-35 dark:border-white/10 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:border-violet-400/40 dark:hover:text-violet-300"
            >
              <LuChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("next")}
              disabled={!canScrollNext}
              aria-label="Siguiente proyecto"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-zinc-200/80 bg-white/80 text-zinc-700 shadow-sm backdrop-blur-md transition-all hover:border-violet-500/50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-35 dark:border-white/10 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:border-violet-400/40 dark:hover:text-violet-300"
            >
              <LuChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          onScroll={updateScrollState}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="group glass relative flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-zinc-200/80 shadow-sm transition-all duration-300 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/15 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] dark:border-white/10 dark:hover:border-violet-400/40 dark:hover:shadow-violet-500/25"
            >
              {/* Miniatura del Proyecto con Botón de Play integrado */}
              <div
                onClick={() => {
                  if (project.videoUrl) setSelectedProject(project);
                }}
                className="relative aspect-video overflow-hidden bg-zinc-950 cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Ver demostración en video de ${project.title}`}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && project.videoUrl) {
                    setSelectedProject(project);
                  }
                }}
              >
                <Image
                  src={project.image}
                  alt={`Captura del proyecto ${project.title}`}
                  fill
                  priority={i < 2}
                  quality={90}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Sombreado ambiental */}
                <div className="absolute inset-0 bg-zinc-950/30 transition-colors duration-300 group-hover:bg-zinc-950/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent" />

                {/* Tag de Duración */}
                {project.videoDuration && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-md border border-white/10 bg-black/65 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-md">
                    <LuClock size={12} />
                    <span>{project.videoDuration}</span>
                  </div>
                )}

                {/* Botón de Play Minimalista */}
                {project.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-violet-600 to-cyan-500 text-white shadow-xl shadow-violet-600/40 backdrop-blur-md transition-all duration-300 group-hover:scale-115 group-hover:shadow-violet-600/60">
                      <span className="absolute inset-0 rounded-full bg-violet-400 opacity-0 transition-opacity duration-300 group-hover:opacity-40 group-hover:animate-ping" />
                      <LuPlay size={20} className="ml-0.5 fill-white text-white drop-shadow-sm" />
                    </div>
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
                {/* Micro-badge de Destacado sutil integrado */}
                {project.featured && (
                  <div className="flex items-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200/90 bg-violet-50/90 px-2.5 py-0.5 text-[11px] font-semibold text-violet-700 shadow-xs dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-500" />
                      </span>
                      Destacado
                    </span>
                  </div>
                )}

                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-300">
                  {project.title}
                </h3>

                <p className="flex-1 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Barra de Acciones: Video Demo + Código + Demo Web */}
                <div className="mt-1 flex flex-wrap items-center gap-4 border-t border-zinc-200/80 pt-3 dark:border-white/10">

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Código fuente de ${project.title}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                    >
                      <LuGithub size={15} />
                      Código
                    </a>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Demo de ${project.title}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                      Demo web
                      <LuExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>

      {/* Modal Lightbox de Video (Lazy Loaded - Cero impacto de carga inicial) */}
      <AnimatePresence>
        {selectedProject && selectedProject.videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl sm:p-6 lg:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-zinc-900/95 shadow-2xl shadow-violet-500/10"
            >
              {/* Encabezado del Modal */}
              <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-3.5 sm:px-6">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
                  </span>
                  <h4 className="text-sm sm:text-base font-semibold text-white">
                    {selectedProject.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  aria-label="Cerrar video"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                >
                  <LuX size={18} />
                </button>
              </div>

              {/* Reproductor de Video Inteligente: Archivo Directo (MP4/WebM) o Iframe (YouTube/Loom) */}
              <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-black">
                {selectedProject.videoUrl.endsWith(".mp4") ||
                selectedProject.videoUrl.endsWith(".webm") ||
                selectedProject.videoUrl.endsWith(".ogg") ||
                selectedProject.videoUrl.startsWith("/videos/") ? (
                  <video
                    key={selectedProject.slug}
                    src={selectedProject.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[75vh] w-full object-contain bg-black"
                  >
                    Tu navegador no soporta el formato de video.
                  </video>
                ) : (
                  <iframe
                    key={selectedProject.slug}
                    src={`${selectedProject.videoUrl}${selectedProject.videoUrl.includes("?") ? "&" : "?"}autoplay=1&rel=0`}
                    title={selectedProject.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="aspect-video max-h-[75vh] w-full border-0"
                  />
                )}
              </div>

              {/* Pie del Modal */}
              <div className="flex shrink-0 flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-white/5 bg-zinc-950/60 px-5 py-3 sm:px-6">
                <p className="text-xs text-zinc-400 line-clamp-1 max-w-xl">
                  {selectedProject.description}
                </p>
                <span className="hidden sm:inline-block text-[11px] text-zinc-500 shrink-0">
                  Presiona <kbd className="rounded border border-white/15 bg-white/5 px-1 py-0.5 font-mono text-zinc-300">Esc</kbd> para cerrar
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
