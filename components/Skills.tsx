"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import Container from "./ui/Container";
import SectionHeader from "./ui/SectionHeader";
import { cn } from "@/utils/cn";

export default function Skills() {
  return (
    <section id="tecnologias" className="relative py-16 sm:py-24 lg:py-32">
      <Container>
        <SectionHeader
          title="Habilidades & Especialidades"
          description="Ecosistema de tecnologías y herramientas que domino divididas por área de especialización."
        />

        <div className="flex flex-col gap-6 sm:gap-8">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl sm:rounded-3xl border border-zinc-200/80 p-6 sm:p-8 lg:p-10 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-violet-500/30 dark:border-white/10 dark:hover:border-violet-500/30"
            >
              <div className="grid gap-6 sm:gap-8 lg:grid-cols-[310px_1fr] lg:items-center">
                {/* Info de la Categoría */}
                <div className="flex flex-col justify-center border-b border-zinc-200/70 pb-5 sm:pb-6 dark:border-white/10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8 lg:py-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider",
                        category.badge,
                      )}
                    >
                      {category.title}
                    </span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                      {category.skills.length} herramientas
                    </span>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-sm">
                    {category.description}
                  </p>
                </div>

                {/* Fila de Tecnologías (Grid adaptativo) */}
                <div className="grid grid-cols-2 gap-3 sm:gap-3.5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05, y: -3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      className="group relative flex flex-col items-center justify-center gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl border border-zinc-200/90 bg-white/80 p-3.5 sm:p-4 text-center shadow-xs backdrop-blur-md transition-all duration-200 hover:border-violet-400/50 hover:bg-white hover:shadow-lg hover:shadow-violet-500/5 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-violet-500/40 dark:hover:bg-white/[0.08]"
                    >
                      {/* Contenedor del Icono con tamaño consistente y centrado estricto */}
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-zinc-100/90 shadow-inner transition-transform duration-300 group-hover:scale-110 dark:bg-white/5 shrink-0">
                        <skill.icon
                          className={cn(
                            "h-6 w-6 shrink-0 transition-transform duration-200 drop-shadow-xs",
                            skill.name === "GitHub" || skill.name === "Next.js"
                              ? "text-zinc-900 dark:text-white"
                              : ""
                          )}
                          style={
                            skill.name === "GitHub" || skill.name === "Next.js"
                              ? undefined
                              : { color: skill.iconColor }
                          }
                        />
                      </div>

                      {/* Nombre de la tecnología centrado */}
                      <span className="text-xs sm:text-sm font-semibold tracking-tight text-zinc-800 transition-colors group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white truncate max-w-full">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
