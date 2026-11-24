export const nav: { label: string; href: string }[] = [
  { label: "Proyecto", href: "#proyecto" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Pilares", href: "#pilares" },
  { label: "Respaldo", href: "#respaldo" },
];

export const ctaLabel = "Sumá tu escuela";

export const hero = {
  name: "Synapxix",
  phrase: "Educación personalizada con juego e inteligencia artificial",
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

// Cosas clave del proyecto que flotan (desordenadas) por la pantalla al entrar, y se dispersan al hacer scroll.
//  kind: uni (institución) | pilar (los 4 pilares) | dato (dato clave, violeta) | dato2 (dato clave, celeste)
//  x, y: posición en escritorio (% de la pantalla); mx, my: posición en móvil (si falta, no se muestra en móvil)
//  r: giro en grados; z: "profundidad" (cuánto se mueve al dispersarse). `mono` es el monograma hasta tener los logos oficiales.
export type Flotante = {
  kind: "uni" | "pilar" | "dato" | "dato2";
  text: string;
  mono?: string;
  n?: string;
  big?: string;
  x: number; y: number; r: number; z: number;
  mx?: number; my?: number;
};

export const floaters: Flotante[] = [
  { kind: "uni", mono: "UNER", text: "Universidad Nacional de Entre Ríos", x: 6, y: 19, r: -4, z: 1.1, mx: 6, my: 31 },
  { kind: "uni", mono: "UNAM", text: "UNAM, México", x: 70, y: 14, r: 3, z: 0.9, mx: 50, my: 9 },
  { kind: "uni", mono: "UADER", text: "UADER", x: 24, y: 12, r: 2, z: 1.3 },
  { kind: "uni", mono: "UTN", text: "UTN", x: 80, y: 33, r: -3, z: 1.2, mx: 56, my: 66 },
  { kind: "uni", mono: "UCU", text: "Universidad de Concepción del Uruguay", x: 3, y: 45, r: 3, z: 0.8, mx: 50, my: 84 },
  { kind: "uni", mono: "UMNG", text: "Universidad Militar Nueva Granada", x: 74, y: 60, r: -2, z: 1.0 },
  { kind: "uni", mono: "PG", text: "Politécnico Grancolombiano", x: 12, y: 79, r: -3, z: 1.2 },
  { kind: "uni", mono: "LN", text: "Polo Tecnológico La Nube", x: 58, y: 85, r: 4, z: 0.9 },
  { kind: "pilar", n: pillars[0].n, text: pillars[0].title, x: 27, y: 30, r: -5, z: 1.4, mx: 4, my: 12 },
  { kind: "pilar", n: pillars[1].n, text: pillars[1].title, x: 60, y: 24, r: 4, z: 1.0, mx: 4, my: 67 },
  { kind: "pilar", n: pillars[2].n, text: pillars[2].title, x: 20, y: 62, r: 3, z: 1.3 },
  { kind: "pilar", n: pillars[3].n, text: pillars[3].title, x: 68, y: 73, r: -4, z: 1.1, mx: 2, my: 88 },
  { kind: "dato", big: "16", text: "tipos de juegos", x: 44, y: 11, r: 2, z: 0.9, mx: 34, my: 22 },
  { kind: "dato", text: "Un docente decide", x: 80, y: 48, r: -5, z: 1.2, mx: 52, my: 30 },
  { kind: "dato2", text: "Privacidad por diseño", x: 36, y: 87, r: 3, z: 1.0, mx: 20, my: 76 },
  { kind: "dato2", big: "7–9", text: "años de edad", x: 7, y: 31, r: 5, z: 0.8 },
  { kind: "dato", text: "Todo es trazable", x: 82, y: 84, r: 3, z: 1.0 },
];
