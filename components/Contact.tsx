"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { LuSend, LuMail, LuCheck, LuLoader, LuCircleAlert } from "react-icons/lu";
import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/socials";
import Container from "./ui/Container";
import SectionHeader from "./ui/SectionHeader";
import { cn } from "@/utils/cn";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const inputClasses =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 shadow-xs backdrop-blur-sm transition-colors focus:border-violet-500/60 focus:outline-none focus:ring-1 focus:ring-violet-500/40 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:placeholder-zinc-400 dark:focus:border-violet-400/70 dark:shadow-none";

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (values: FormState): FormErrors => {
    const next: FormErrors = {};
    if (values.name.trim().length < 2) {
      next.name = "Escribe tu nombre (mínimo 2 caracteres).";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Ingresa un correo electrónico válido.";
    }
    if (values.subject.trim().length < 3) {
      next.subject = "El asunto debe tener al menos 3 caracteres.";
    }
    if (values.message.trim().length < 10) {
      next.message = "El mensaje debe tener al menos 10 caracteres.";
    }
    return next;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Ocurrió un error al enviar el mensaje.");
      }

      setSent(true);
      setForm(initialForm);
      setTimeout(() => setSent(false), 5000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error al conectar con el servidor.";
      setServerError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (serverError) {
      setServerError(null);
    }
  };

  return (
    <section id="contacto" className="relative py-16 sm:py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="radial-glow absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <SectionHeader
          title="Trabajemos juntos"
          description="¿Tienes un proyecto en mente o una oportunidad? Cuéntame tu idea y te respondo lo antes posible."
        />

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 sm:gap-6"
          >
            <div className="glass rounded-2xl border border-zinc-200/70 p-5 sm:p-6 dark:border-white/10">
              <h3 className="mb-1 text-base sm:text-lg font-semibold text-zinc-900 dark:text-white">
                Hablemos por correo
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                La forma más rápida de contactarme.
              </p>
              <a
                href={siteConfig.gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 sm:mt-4 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-violet-700 transition-colors hover:text-violet-900 dark:text-violet-300 dark:hover:text-violet-100 break-all"
              >
                <LuMail size={16} className="shrink-0" />
                {siteConfig.email}
              </a>
            </div>

            <div className="glass rounded-2xl border border-zinc-200/70 p-5 sm:p-6 dark:border-white/10">
              <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-zinc-900 dark:text-white">
                Redes sociales
              </h3>
              <ul className="flex flex-col gap-2.5 sm:gap-3">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 transition-all duration-300 hover:border-violet-400/60 hover:bg-violet-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-violet-500/40 dark:hover:bg-white/10"
                    >
                      <span className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-200">
                        <social.icon
                          size={18}
                          className="shrink-0 text-zinc-400 transition-colors group-hover:text-violet-600 dark:text-zinc-500 dark:group-hover:text-violet-300"
                        />
                        {social.label}
                      </span>
                      <span className="text-[11px] sm:text-xs text-zinc-500 truncate max-w-[140px] sm:max-w-none">
                        {social.handle}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="glass flex flex-col gap-4 sm:gap-5 rounded-2xl border border-white/10 p-5 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Tu nombre"
                  className={cn(inputClasses, errors.name && "border-red-500/60")}
                />
                {errors.name && (
                  <span className="text-xs text-red-400">{errors.name}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="tu@correo.com"
                  className={cn(inputClasses, errors.email && "border-red-500/60")}
                />
                {errors.email && (
                  <span className="text-xs text-red-400">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
                <label
                  htmlFor="subject"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                >
                  Asunto
                </label>
              <input
                id="subject"
                type="text"
                value={form.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                placeholder="¿De qué quieres hablar?"
                className={cn(inputClasses, errors.subject && "border-red-500/60")}
              />
              {errors.subject && (
                <span className="text-xs text-red-400">{errors.subject}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                >
                  Mensaje
                </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Cuéntame sobre tu proyecto..."
                className={cn(
                  inputClasses,
                  "resize-none",
                  errors.message && "border-red-500/60",
                )}
              />
              {errors.message && (
                <span className="text-xs text-red-400">{errors.message}</span>
              )}
            </div>

            {serverError && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                <LuCircleAlert size={16} />
                <span>{serverError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-all duration-300 hover:brightness-110 hover:shadow-violet-600/40 active:scale-95 disabled:pointer-events-none disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LuLoader size={19} className="animate-spin" />
                  Enviando...
                </>
              ) : sent ? (
                <>
                  <LuCheck size={19} />
                  ¡Mensaje enviado con éxito!
                </>
              ) : (
                <>
                  <LuSend size={19} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  Enviar mensaje
                </>
              )}
            </button>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}
