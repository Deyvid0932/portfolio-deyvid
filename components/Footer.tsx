import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/socials";
import Container from "./ui/Container";

const footerNav = [
  { label: "Inicio", href: "#inicio" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Tecnologías", href: "#tecnologias" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white/50 dark:border-white/10 dark:bg-black/40">
      <Container className="py-8 sm:py-12">
        <div className="flex flex-col items-center gap-6 sm:gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
            <Link href="#inicio" className="flex items-center gap-2.5">
              <span className="relative flex h-8 w-8 sm:h-9 sm:w-9 overflow-hidden rounded-xl border border-violet-500/40 shadow-lg shadow-violet-600/25">
                <Image
                  src="/avatar.png"
                  alt={siteConfig.fullName}
                  fill
                  sizes="36px"
                  className="object-cover object-top"
                />
              </span>
              <span className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white">
                {siteConfig.name}
                <span className="text-gradient">.</span>
              </span>
            </Link>
            <p className="max-w-xs text-xs sm:text-sm text-zinc-500">
              {siteConfig.role}
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:text-sm">
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-all duration-300 hover:border-violet-400 hover:text-violet-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:border-violet-500/40 dark:hover:text-white"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col items-center justify-between gap-3 border-t border-zinc-200 pt-6 text-[11px] sm:text-xs text-zinc-600 dark:border-white/10 sm:flex-row text-center sm:text-left">
          <p>
            © {year} {siteConfig.fullName}. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1">
            Hecho con{" "}
            <span className="text-violet-600 dark:text-violet-400">Next.js</span>,{" "}
            <span className="text-cyan-600 dark:text-cyan-400">Tailwind CSS</span> y{" "}
            <span className="text-blue-600 dark:text-blue-400">Framer Motion</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
