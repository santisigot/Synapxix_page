export const nav: { label: string; href: string }[] = [
  { label: "Proyecto", href: "#proyecto" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Pilares", href: "#pilares" },
  { label: "Respaldo", href: "#respaldo" },
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
  { display: "8", target: 8, label: "instituciones y actores tecnológicos vinculados al proyecto" },
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

export const why = {
  eyebrow: "Por qué ahora",
  title: "El momento de sumar la IA a la educación",
  text: "Singapur, los Países Bajos y los países nórdicos ya incorporaron la IA en su educación. Synapxix busca dar ese mismo paso, con una base sólida y estudios científicos que lo respalden.",
};

export const principles: { title: string; text: string }[] = [
  { title: "Todo es trazable", text: "Ningún estado existe sin la evidencia que lo originó." },
  { title: "Privacidad por diseño", text: "Los motores ven un seudónimo y hay consentimiento informado." },
  { title: "Un docente decide", text: "En modo sombra la IA recomienda y una persona aprueba o corrige." },
];

export const dala = {
  eyebrow: "El corazón del proyecto",
  title: "D.A.L.A., el motor adaptativo",
  text: "Dynamic Adaptive Learning Architecture: cada decisión se puede rastrear de punta a punta.",
};

// Resúmenes breves que se muestran al pasar el mouse por cada paso (redactados a partir de la presentación).
export const dalaSteps: { name: string; text: string }[] = [
  { name: "Evidencia", text: "Se recoge lo que el estudiante hace al jugar. Es el punto de partida de todo lo demás." },
  { name: "Estado", text: "Con esa evidencia se estima su gusto, su interés y su nivel. Ningún estado existe sin la evidencia que lo originó." },
  { name: "Decisión", text: "El motor decide qué intervención recomendar a partir de la evidencia, con trazabilidad completa." },
  { name: "Intervención", text: "Se propone la actividad o el ajuste. En modo sombra la IA recomienda y una persona aprueba o corrige." },
  { name: "Resultado", text: "Se observa cómo respondió el estudiante a esa intervención." },
  { name: "Actualización", text: "Con ese resultado se actualiza lo que sabemos del estudiante, y cada cambio queda registrado." },
];

export const pillarsIntro = {
  eyebrow: "Cómo está construido",
  title: "Cuatro pilares",
};

export const pillars: { n: string; title: string; text: string }[] = [
  { n: "01", title: "Experiencia gamificada", text: "Recorridos de aprendizaje con 16 tipos de juegos: lingüísticos, lógicos, espaciales y auditivos." },
  { n: "02", title: "Motor adaptativo D.A.L.A.", text: "Decide qué intervención recomendar a partir de evidencia, con trazabilidad completa." },
  { n: "03", title: "Grafo de conocimiento e IA", text: "Relaciona temas, prerrequisitos y preferencias, y analiza con varios modelos de IA." },
  { n: "04", title: "Portal docente", text: "Métricas por curso y por estudiante, y revisión humana de cada recomendación." },
];

export const teachers = {
  eyebrow: "Para docentes",
  title: "Tecnología que te acompaña, no que te reemplaza",
  text: "Synapxix pone la IA al servicio de tu criterio: vos ves, revisás y decidís.",
};

export const teacherBenefits: { icon: "chart" | "check" | "shield" | "game"; title: string; text: string }[] = [
  { icon: "chart", title: "Métricas claras", text: "Seguí el avance de cada curso y de cada estudiante en un mismo lugar." },
  { icon: "check", title: "Revisión humana", text: "La IA recomienda y una persona aprueba o corrige cada recomendación." },
  { icon: "shield", title: "Privacidad primero", text: "Los motores ven un seudónimo y hay consentimiento informado." },
  { icon: "game", title: "Aprender jugando", text: "16 tipos de juegos que mantienen a los estudiantes enganchados." },
];

export const backersIntro = {
  eyebrow: "Respaldo académico",
  title: "Una red académica detrás del producto",
};

export const backers: { name: string; role: string }[] = [
  { name: "Universidad Nacional de Entre Ríos", role: "Estudios y papers sobre salud mental y ambiental." },
  { name: "UNAM, México", role: "Estudios y papers de psicopedagogía." },
  { name: "Polo Tecnológico La Nube", role: "Vínculo entre universidades, escuelas y actores tecnológicos." },
  { name: "UADER", role: "Articulación académica y práctica educativa." },
  { name: "UTN", role: "Instrumentación conductual y ciencia de datos." },
  { name: "Universidad de Concepción del Uruguay", role: "Adopción docente del aprendizaje adaptativo." },
  { name: "Universidad Militar Nueva Granada", role: "Narrativas interactivas y diseño multimedia." },
  { name: "Politécnico Grancolombiano", role: "Tecnologías adaptativas y analítica del aprendizaje." },
];

export const contact = {
  title: "Sumá tu escuela a Synapxix",
  text: "Escribinos y coordinamos cómo sumar a tu escuela a las pruebas y a la próxima demo.",
  eyebrow: "Sumate al proyecto",
  button: "Escribinos",
  chips: ["Un docente decide", "Privacidad por diseño", "Respaldo de UNER y UNAM"],
  closing: "Bienvenidos a Synapxix.",
};

// Instituciones que se muestran alrededor del logo en el hero (nombres tal como figuran en la presentación).
// `mono` es el monograma que se dibuja en la tarjeta hasta contar con los logos oficiales.
export const unis: { mono: string; name: string }[] = [
  { mono: "UNER", name: "Universidad Nacional de Entre Ríos" },
  { mono: "UNAM", name: "UNAM, México" },
  { mono: "UADER", name: "UADER" },
  { mono: "UTN", name: "UTN" },
  { mono: "UCU", name: "Universidad de Concepción del Uruguay" },
  { mono: "UMNG", name: "Universidad Militar Nueva Granada" },
  { mono: "PG", name: "Politécnico Grancolombiano" },
  { mono: "LN", name: "Polo Tecnológico La Nube" },
];
