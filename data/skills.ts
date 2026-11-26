import type { IconType } from "react-icons";
import { FaJava, FaNodeJs } from "react-icons/fa6";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiMysql,
  SiSqlite,
  SiSupabase,
  SiCloudflare,
  SiGit,
  SiGithub,
  SiPostgresql,
  SiDocker,
  SiFastapi,
  SiPytorch,
  SiSpringboot,
  SiAngular,
} from "react-icons/si";
import {
  TbBrandReactNative,
  TbBrandFramerMotion,
  TbBrain,
  TbNetwork,
  TbVector,
  TbChartBar,
  TbDatabase,
  TbSparkles,
} from "react-icons/tb";

export type SkillLevel = "Producción" | "Avanzado" | "Intermedio";

export type Skill = {
  name: string;
  icon: IconType;
  iconColor: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  description: string;
  badge: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Desarrollo de interfaces de usuario modernas, interactivas y responsivas con arquitectura SPA y SSR.",
    badge: "text-sky-500 bg-sky-500/10 border-sky-500/20",
    skills: [
      { name: "Next.js", icon: SiNextdotjs, iconColor: "#000000" },
      { name: "React", icon: SiReact, iconColor: "#61DAFB" },
      { name: "TypeScript", icon: SiTypescript, iconColor: "#3178C6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, iconColor: "#06B6D4" },
      { name: "Angular", icon: SiAngular, iconColor: "#c3002f" },
      { name: "JavaScript", icon: SiJavascript, iconColor: "#F7DF1E" },
      { name: "HTML5", icon: SiHtml5, iconColor: "#E34F26" },
      { name: "CSS3", icon: SiCss, iconColor: "#1572B6" },
      { name: "Framer Motion", icon: TbBrandFramerMotion, iconColor: "#0055FF" },
      { name: "React Native", icon: TbBrandReactNative, iconColor: "#61DAFB" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Creación de APIs, lógica de negocio y arquitecturas de microservicios o serverless.",
    badge: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    skills: [
      { name: "Spring Boot", icon: SiSpringboot, iconColor: "#6DB33F" },
      { name: "Node.js", icon: FaNodeJs, iconColor: "#5FA04E" },
      { name: "Python", icon: SiPython, iconColor: "#3776AB" },
      { name: "FastAPI", icon: SiFastapi, iconColor: "#009688" },
      { name: "Java", icon: FaJava, iconColor: "#EA2D2E" },
    ],
  },
  {
    id: "database",
    title: "Bases de Datos",
    description: "Modelado relacional, vector stores y persistencia de datos distribuida.",
    badge: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
    skills: [
      { name: "Supabase", icon: SiSupabase, iconColor: "#3ECF8E" },
      { name: "PostgreSQL", icon: SiPostgresql, iconColor: "#4169E1" },
      { name: "MySQL", icon: SiMysql, iconColor: "#4479A1" },
      { name: "SQLite", icon: SiSqlite, iconColor: "#003B57" },
      { name: "SQL", icon: TbChartBar, iconColor: "#3B82F6" },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    description: "Infraestructura en la nube, CI/CD, contenedorización y almacenamiento.",
    badge: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    skills: [
      { name: "GitHub", icon: SiGithub, iconColor: "#181717" },
      { name: "Git", icon: SiGit, iconColor: "#F05032" },
      { name: "Cloudflare", icon: SiCloudflare, iconColor: "#F38020" },
      { name: "Cloudflare R2", icon: TbDatabase, iconColor: "#F38020" },
      { name: "Docker", icon: SiDocker, iconColor: "#2496ED" },
    ],
  },
  {
    id: "ai",
    title: "IA & Data",
    description: "Sistemas RAG, modelos de lenguaje, procesamiento de datos y arquitecturas de IA.",
    badge: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    skills: [
      { name: "OpenAI API", icon: TbSparkles, iconColor: "#10A37F" },
      { name: "Arquitectura IA", icon: TbNetwork, iconColor: "#A855F7" },
      { name: "Sistemas RAG", icon: TbVector, iconColor: "#8B5CF6" },
      { name: "PyTorch", icon: SiPytorch, iconColor: "#EE4C2C" },
      { name: "IA Aplicada", icon: TbBrain, iconColor: "#EC4899" }
    ],
  },
];
