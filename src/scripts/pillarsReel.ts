// Carrusel 3D curvo de los pilares, controlado por el scroll (WebGL con three.js, cargado bajo demanda).
// - Cada pilar es una tarjeta: un plano de 48x24 segmentos curvado como un cilindro en el vertex shader,
//   con esquinas redondeadas (SDF antialiasada) y una textura dibujada con las fuentes y colores del sitio.
// - La "fase" es un índice flotante que persigue al scroll del recorrido (amortiguada con 1 - exp(-13 dt)).
// - Un único requestAnimationFrame; se detiene al ocultar la pestaña o salir de pantalla.
// - Sin WebGL2 o sin JS la sección muestra el listado de tarjetas normal (que también sirve a lectores de pantalla).

type Tono = "cielo" | "lavanda" | "violeta";
type Pilar = { n: string; title: string; text: string; tag: string; tono: Tono };

const FONDOS: Record<Tono, [string, string]> = {
  cielo: ["#eaf7ff", "#cdeaff"],
  lavanda: ["#f4eeff", "#ddd1ff"],
  violeta: ["#eeebff", "#d4cdff"],
};

// Medidas del plano y de la pista (en unidades de la escena, antes de escalar a la pantalla)
const ANCHO = 2.38;
const ALTO = 1.5771;
const FOV = 65.7;
const CAM_Z = 8.1;
const RADIO_PISTA = 3.9;
const PROF_PISTA = 2.0;
const PASO_ANGULO = 0.73;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function hayWebGL2(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!c.getContext("webgl2");
  } catch {
    return false;
  }
}

export function initPillarsReel(): void {
  const section = document.querySelector<HTMLElement>("[data-pillars]");
  const stage = section?.querySelector<HTMLElement>(".pillars__stage") ?? null;
  const canvas = section?.querySelector<HTMLCanvasElement>(".pillars__canvas") ?? null;
  if (!section || !stage || !canvas) return;

  const pilares: Pilar[] = [...section.querySelectorAll<HTMLElement>("[data-pillar]")].map((el) => ({
    n: el.dataset.n ?? "",
    title: el.dataset.title ?? "",
    text: el.dataset.text ?? "",
    tag: el.dataset.tag ?? "",
    tono: (el.dataset.tono as Tono) ?? "cielo",
  }));
  if (pilares.length < 2 || !hayWebGL2()) return; // queda el listado de tarjetas

  section.dataset.reel = "on";

  let limpiar: (() => void) | null = null;
  let cargando = false;
  let cerrado = false;

  const arrancar = async () => {
    cargando = true;
    try {
      const THREE = await import("three");
      if (cerrado) return;
      limpiar = await montar(THREE, section, stage, canvas, pilares);
      if (cerrado) limpiar?.();
    } catch {
      // Si algo falla (red, GPU), se vuelve al listado de tarjetas
      delete section.dataset.reel;
    }
  };

  // three.js (pesado) se descarga solo cuando la sección está por aparecer
  const io = new IntersectionObserver((e) => {
    if (e[0]?.isIntersecting && !cargando) { io.disconnect(); void arrancar(); }
  }, { rootMargin: "800px 0px" });
  io.observe(section);

  window.addEventListener("pagehide", () => { cerrado = true; io.disconnect(); limpiar?.(); }, { once: true });
}

/* -------------------------------------------------------------------------------------------- */

const VERTEX = /* glsl */ `
  uniform float uBend;
  uniform float uTime;
  varying vec2 vUv;
  varying float vShade;
  void main() {
    vUv = uv;
    vec3 p = position;
    float halfW = ${(ANCHO / 2).toFixed(4)};
    float ang = (p.x / halfW) * uBend;
    float r = halfW / uBend;
    p.x = sin(ang) * r;
    p.z += (cos(ang) - 1.0) * r;
    p.y += sin(p.x * 2.2 + uTime * 0.7) * 0.006;
    vShade = abs(ang) / max(uBend, 0.0001);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uAlpha;
  uniform float uAspect;
  varying vec2 vUv;
  varying float vShade;
  float sdRoundBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }
  void main() {
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
    float d = sdRoundBox(p, vec2(uAspect, 1.0) * 0.5, 0.07);
    float aa = fwidth(d);
    float mask = 1.0 - smoothstep(-aa, aa, d);
    vec4 c = texture2D(uMap, vUv);
    float shade = 1.0 - 0.10 * vShade * vShade;
    gl_FragColor = vec4(c.rgb * shade, c.a * mask * uAlpha);
  }
`;

async function montar(
  THREE: typeof import("three"),
  section: HTMLElement,
  stage: HTMLElement,
  canvas: HTMLCanvasElement,
  pilares: Pilar[]
): Promise<() => void> {
  const N = pilares.length;
  const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 40);
  camera.position.set(0, 0, CAM_Z);
  const scene = new THREE.Scene();

  const texturas = await crearTexturas(THREE, pilares, renderer.capabilities.getMaxAnisotropy());

  const geometria = new THREE.PlaneGeometry(ANCHO, ALTO, 48, 24);
  const tarjetas = texturas.map((t) => {
    const material = new THREE.ShaderMaterial({
      uniforms: { uMap: { value: t }, uBend: { value: 0.3 }, uTime: { value: 0 }, uAlpha: { value: 1 }, uAspect: { value: ANCHO / ALTO } },
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide, // las caras que miran hacia atrás no se dibujan
    });
    const malla = new THREE.Mesh(geometria, material);
    scene.add(malla);
    return malla;
  });

  const ac = new AbortController();
  const opt = { signal: ac.signal };

  // ---------- medidas que dependen de la pantalla ----------
  let escala = 1;
  const ajustar = () => {
    const w = Math.max(1, stage.clientWidth);
    const h = Math.max(1, stage.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // La tarjeta central ocupa ~40% del ancho en escritorio y 77% en móvil
    const frac = w >= 900 ? 0.4 : w <= 520 ? 0.77 : 0.77 + ((w - 520) / 380) * (0.4 - 0.77);
    const k = 2 * Math.tan((FOV * Math.PI) / 360) * camera.aspect;
    escala = (frac * k * CAM_Z) / (ANCHO + frac * k * (PROF_PISTA - 0.28));
  };
  ajustar();
  const ro = new ResizeObserver(() => { ajustar(); pedirFrame(); });
  ro.observe(stage);

  // ---------- fase (índice flotante) y objetivo (progreso del scroll) ----------
  let fase = 0;
  const run = () => Math.max(1, section.offsetHeight - stage.clientHeight);
  const objetivo = () => clamp(-section.getBoundingClientRect().top / run(), 0, 1) * (N - 1);
  fase = objetivo();

  let indiceVisible = -1;
  const describir = (i: number) => {
    if (i === indiceVisible) return;
    indiceVisible = i;
    const p = pilares[i];
    canvas.setAttribute("aria-label", `Pilar ${i + 1} de ${N}: ${p.title}. ${p.text}`);
  };

  const actualizar = (dt: number, ahora: number) => {
    const meta = objetivo();
    if (reducido) fase = meta;
    else fase += (meta - fase) * (1 - Math.exp(-13 * dt));
    const vel = meta - fase; // "velocidad" aproximada: lo que falta por recorrer
    const bend = 0.3 + clamp(Math.abs(vel) * 0.12, 0, 0.12);
    const lean = reducido ? 0 : clamp(vel * 0.05, -0.1, 0.1);
    const paso = 0.52 * escala;
    describir(clamp(Math.round(fase), 0, N - 1));

    tarjetas.forEach((m, i) => {
      let rel = i - fase;
      rel = ((((rel + N / 2) % N) + N) % N) - N / 2; // envuelto a [-N/2, N/2)
      const theta = rel * PASO_ANGULO;
      const rotY = Math.atan2(PROF_PISTA * Math.sin(theta), RADIO_PISTA * Math.cos(theta));
      m.position.set(Math.sin(theta) * RADIO_PISTA * escala, rel * paso, (Math.cos(theta) * PROF_PISTA - 0.28) * escala);
      m.rotation.order = "YXZ";
      m.rotation.set(rel * -0.01 + lean * 0.4, rotY, lean);
      m.scale.setScalar(escala);
      const u = (m.material as import("three").ShaderMaterial).uniforms;
      u.uBend.value = bend;
      u.uTime.value = reducido ? 0 : ahora / 1000;
      // se desvanecen al acercarse al punto donde la pista "da la vuelta" (evita el salto al envolver)
      const alfa = clamp((N / 2 - Math.abs(rel)) / 0.7, 0, 1);
      u.uAlpha.value = alfa;
      m.visible = Math.cos(rotY) > 0.05 && alfa > 0.01;
    });
  };

  // ---------- un único requestAnimationFrame ----------
  let raf = 0;
  let ultimo = 0;
  let enPantalla = true;
  const activo = () => enPantalla && !document.hidden;

  const frame = (ahora: number) => {
    raf = 0;
    if (!activo()) return;
    const dt = Math.min((ahora - ultimo) / 1000, 0.05);
    ultimo = ahora;
    actualizar(dt, ahora);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };
  function pedirFrame() {
    if (raf || !activo()) return;
    ultimo = performance.now(); // sin acumular el tiempo que estuvo detenido
    raf = requestAnimationFrame(frame);
  }
  const parar = () => { cancelAnimationFrame(raf); raf = 0; };

  const io = new IntersectionObserver((e) => {
    enPantalla = e[0]?.isIntersecting ?? false;
    if (enPantalla) pedirFrame(); else parar();
  });
  io.observe(section);
  document.addEventListener("visibilitychange", () => { if (document.hidden) parar(); else pedirFrame(); }, opt);
  pedirFrame();

  // ---------- navegación: el scroll del recorrido es la única fuente de verdad ----------
  const topAbsoluto = () => window.scrollY + section.getBoundingClientRect().top;
  const irA = (indice: number) => {
    const i = clamp(Math.round(indice), 0, N - 1);
    window.scrollTo({ top: topAbsoluto() + (i * run()) / (N - 1), behavior: reducido ? "auto" : "smooth" });
  };

  // Al soltar o dejar de hacer scroll, la fase se asienta en el proyecto más cercano
  let arrastrando = false;
  let temporizador = 0;
  const asentar = () => {
    if (arrastrando) return;
    const p = -section.getBoundingClientRect().top / run();
    if (p <= 0 || p >= 1) return; // fuera del recorrido no se interviene
    const i = clamp(Math.round(p * (N - 1)), 0, N - 1);
    const y = topAbsoluto() + (i * run()) / (N - 1);
    if (Math.abs(window.scrollY - y) > 6) window.scrollTo({ top: y, behavior: reducido ? "auto" : "smooth" });
  };
  window.addEventListener("scroll", () => { pedirFrame(); window.clearTimeout(temporizador); temporizador = window.setTimeout(asentar, 170); }, { ...opt, passive: true });

  // Arrastre horizontal: izquierda avanza. Se traduce a scroll para no tener dos fuentes de verdad.
  let ox = 0;
  let pid: number | null = null;
  canvas.addEventListener("pointerdown", (e) => {
    pid = e.pointerId; ox = e.clientX; arrastrando = true;
    try { canvas.setPointerCapture(e.pointerId); } catch { /* ya liberado */ }
  }, opt);
  canvas.addEventListener("pointermove", (e) => {
    if (e.pointerId !== pid) return;
    const dx = e.clientX - ox; ox = e.clientX;
    const unProyecto = Math.max(1, stage.clientWidth * 0.45); // píxeles de arrastre por proyecto
    window.scrollBy({ top: (-dx * run()) / (N - 1) / unProyecto, behavior: "auto" });
  }, opt);
  const soltar = (e: PointerEvent) => {
    if (e.pointerId !== pid) return;
    pid = null; arrastrando = false;
    try { canvas.releasePointerCapture(e.pointerId); } catch { /* ya liberado */ }
    asentar();
  };
  canvas.addEventListener("pointerup", soltar, opt);
  canvas.addEventListener("pointercancel", soltar, opt);
  canvas.addEventListener("lostpointercapture", soltar, opt);

  // Teclado: flechas avanzan un proyecto completo; Inicio vuelve al primero. Hacer clic no abre nada.
  canvas.addEventListener("keydown", (e) => {
    const actual = clamp(Math.round(objetivo()), 0, N - 1);
    if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); irA(actual + 1); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); irA(actual - 1); }
    else if (e.key === "Home") { e.preventDefault(); irA(0); }
  }, opt);

  // ---------- limpieza ----------
  return () => {
    ac.abort();
    parar();
    io.disconnect();
    ro.disconnect();
    window.clearTimeout(temporizador);
    geometria.dispose();
    tarjetas.forEach((m) => (m.material as import("three").Material).dispose());
    texturas.forEach((t) => t.dispose());
    renderer.dispose();
    renderer.forceContextLoss();
  };
}

/* ---------------------------------- texturas ---------------------------------- */

async function crearTexturas(THREE: typeof import("three"), pilares: Pilar[], anisotropia: number) {
  await Promise.all([
    document.fonts.load('800 120px "Plus Jakarta Sans"'),
    document.fonts.load('700 60px "Plus Jakarta Sans"'),
    document.fonts.load('400 40px "Nunito Sans"'),
  ]).catch(() => undefined);

  let logo: HTMLImageElement | null = null;
  try {
    const img = new Image();
    img.src = "/logo-azul.png";
    await img.decode();
    logo = img;
  } catch { /* se dibuja sin logo */ }

  return pilares.map((p) => {
    const t = new THREE.CanvasTexture(dibujar(p, logo));
    t.anisotropy = anisotropia;
    t.generateMipmaps = true;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.needsUpdate = true;
    return t;
  });
}

function envolver(g: CanvasRenderingContext2D, texto: string, x: number, y: number, maxAncho: number, interlinea: number): number {
  const palabras = texto.split(/\s+/);
  let linea = "";
  let yy = y;
  for (const pal of palabras) {
    const prueba = linea ? `${linea} ${pal}` : pal;
    if (g.measureText(prueba).width > maxAncho && linea) {
      g.fillText(linea, x, yy);
      linea = pal;
      yy += interlinea;
    } else linea = prueba;
  }
  if (linea) g.fillText(linea, x, yy);
  return yy;
}

// Portada del pilar: franja superior (logo + etiqueta), número, título y descripción, con el logo grande a la derecha.
function dibujar(p: Pilar, logo: HTMLImageElement | null): HTMLCanvasElement {
  const W = 2048;
  const H = Math.round(W * (ALTO / ANCHO)); // 1357
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  const [a, b] = FONDOS[p.tono];

  const fondo = g.createLinearGradient(0, 0, W, H);
  fondo.addColorStop(0, a);
  fondo.addColorStop(1, b);
  g.fillStyle = fondo;
  g.fillRect(0, 0, W, H);

  // círculos concéntricos detrás del logo
  g.strokeStyle = "rgba(113, 90, 255, 0.16)";
  g.lineWidth = 3;
  for (const r of [780, 580, 400]) { g.beginPath(); g.arc(W * 0.8, H * 0.52, r, 0, Math.PI * 2); g.stroke(); }
  if (logo) {
    const s = 660;
    g.drawImage(logo, W * 0.8 - s / 2, H * 0.52 - (s * logo.naturalHeight) / logo.naturalWidth / 2, s, (s * logo.naturalHeight) / logo.naturalWidth);
  }

  // franja superior
  g.textBaseline = "middle";
  if (logo) g.drawImage(logo, 96, 70, 80, (80 * logo.naturalHeight) / logo.naturalWidth);
  g.fillStyle = "#102e4a";
  g.font = '700 46px "Plus Jakarta Sans", sans-serif';
  g.fillText("Synapxix", 196, 112);
  g.font = '700 30px "Plus Jakarta Sans", sans-serif';
  const etiqueta = p.tag.toUpperCase();
  const ancho = g.measureText(etiqueta).width + 80;
  g.fillStyle = "#ffffff";
  g.beginPath();
  g.roundRect(W - 96 - ancho, 70, ancho, 84, 42);
  g.fill();
  g.fillStyle = "#102e4a";
  g.fillText(etiqueta, W - 96 - ancho + 40, 113);
  g.fillStyle = "rgba(16, 46, 74, 0.14)";
  g.fillRect(96, 196, W - 192, 3);

  // número, título y descripción
  g.textBaseline = "alphabetic";
  g.fillStyle = "#715aff";
  g.font = '800 400px "Plus Jakarta Sans", sans-serif';
  g.fillText(p.n, 86, 610);
  g.fillStyle = "#102e4a";
  g.font = '800 120px "Plus Jakarta Sans", sans-serif';
  const yTitulo = envolver(g, p.title, 96, 770, 1130, 132);
  g.fillStyle = "rgba(16, 46, 74, 0.82)";
  g.font = '400 54px "Nunito Sans", sans-serif';
  envolver(g, p.text, 96, yTitulo + 100, 1120, 74);
  return c;
}
