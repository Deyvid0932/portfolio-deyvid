export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  videoDuration?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "pseudovoice",
    title: "PseudoVoice",
    description:
      "Aplicación de escritorio para conversar por voz en tiempo real con personajes personalizables mediante DeepSeek API y Fish Audio, guardando conversaciones, recuerdos e instrucciones por perfil. Integra servidores MCP para conectarse a correos, controlar funciones del PC y automatizar tareas web en el navegador desde un modo agente, construida con TypeScript, Python, Java y Rust.",
    image: "/projects/pseudovoice-v2.png",
    tags: ["TypeScript", "Python", "Java", "Rust", "MCP", "DeepSeek API", "Fish Audio"],
    githubUrl: "https://github.com/Deyvid0932/Pseudovoice",
    videoUrl: "/videos/pseudovoice.mp4",
    videoDuration: "00:49",
    featured: true,
  },
  {
    slug: "app-inventario-textil",
    title: "App Móvil de Gestión de Inventario Textil",
    description:
      "Sistema móvil offline-first diseñado para optimizar la logística de inventario textil. Permite la búsqueda rápida de prendas y el ordenamiento eficiente de cajas y lotes, eliminando errores de stock. Construido con React Native, SQLite local y sincronización con Supabase, con consultas aceleradas mediante Groq API.",
    image: "/projects/app-inventario-v2.png",
    tags: ["React Native", "TypeScript", "Groq API", "SQLite", "Supabase", "Cloudflare"],
    githubUrl: "https://github.com/Deyvid0932/Gestion-Inventario-APP",
    videoUrl: "/videos/topytopkith.mp4",
    videoDuration: "01:07",
    featured: true,
  },
  {
    slug: "generador-posts-linkedin",
    title: "Generador de Posts para LinkedIn con IA",
    description:
      "Automatiza la creación y programación de contenido en LinkedIn. El sistema genera publicaciones a partir de temas definidos por el usuario, ahorrando horas de trabajo manual y garantizando la publicación en la hora establecida. Arquitectura Fullstack con Angular, Spring Boot y PostgreSQL, integrando la API de DeepSeek para el copywriting avanzado.",
    image: "/projects/linkedin-v2.png",
    tags: ["Angular", "Spring Boot", "Java", "DeepSeek API", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/Deyvid0932/linkedin-post",
    videoUrl: "/videos/autopost.mp4",
    videoDuration: "00:56",
    featured: true,
  },
  {
    slug: "asistente-rag-pdfs",
    title: "Asistente RAG Documental con IA Local",
    description:
      "Sistema de recuperación y generación aumentada (RAG) para el análisis profundo de documentos PDF. Procesa archivos mediante segmentación inteligente por chunks y embeddings, ejecutando inferencia privada con IA Local (Ollama / LLM) y almacenando metadatos relacionales en MySQL y bases de datos vectoriales, con una interfaz interactiva en React.",
    image: "/projects/rag-v2.png",
    tags: ["React", "Python", "FastAPI", "IA Local", "Sistemas RAG", "MySQL"],
    githubUrl: "https://github.com/Deyvid0932/CHAT-IA",
    videoUrl: "/videos/iapdf.mp4",
    videoDuration: "01:13",
    featured: true,
  },
];
