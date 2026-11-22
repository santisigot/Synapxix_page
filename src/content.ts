export const nav: { label: string; href: string }[] = [
  { label: "Proyecto", href: "#proyecto" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Pilares", href: "#pilares" },
  { label: "Respaldo", href: "#respaldo" },
  { label: "Equipo", href: "#equipo" },
];

export const ctaLabel = "Sumá tu escuela";

export const hero = {
  title: "Educación personalizada con juego e inteligencia artificial",
  subtitle:
    "Synapxix adapta el aprendizaje a cada estudiante según su gusto, su interés y su nivel, y siempre con un docente que decide.",
  cta: ctaLabel,
  secondary: "Conocé el proyecto",
};

export const marquee: string[] = [
  "Aprender jugando",
  "Aprendizaje adaptativo",
  "IA con criterio docente",
  "Cada decisión, trazable",
  "Privacidad por diseño",
];

// `target` anima de 0 al valor final; sin `target` se muestra `display` tal cual.
export const counters: { display: string; target?: number; label: string }[] = [
  { display: "16", target: 16, label: "tipos de juegos: lingüísticos, lógicos, espaciales y auditivos" },
  { display: "4", target: 4, label: "pilares que sostienen la plataforma" },
  { display: "8", target: 8, label: "instituciones académicas detrás del proyecto" },
  { display: "7–9", label: "años: edad de los chicos que ya lo están probando" },
];

export const about = {
  title: "Una plataforma donde jugar es aprender, y cada estudiante tiene su propio camino",
  text: "Synapxix combina juego e inteligencia artificial para adaptar el aprendizaje a cada estudiante, con base científica y con la revisión de un docente en cada recomendación.",
};

export const triad: { title: string; text: string }[] = [
  { title: "Gusto", text: "Las preferencias de aprendizaje de cada estudiante." },
  { title: "Interés", text: "Los temas que lo motivan y lo mantienen enganchado." },
  { title: "Nivel", text: "Su dominio actual de cada contenido curricular." },
];
