// Inclinación 2.5D de las tarjetas [data-tilt] con el mouse (o arrastre táctil), sin reflejos.
// Misma mecánica que la tarjeta del hero: el tilt se normaliza por el tamaño del viewport,
// las variables CSS se escriben directo y la transición del transform interpola.
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export function initTilt(): void {
  const raiz = document.querySelector<HTMLElement>(".about");
  const items = [...document.querySelectorAll<HTMLElement>("[data-tilt]")];
  if (!raiz || items.length === 0) return;
  // Con "reducir movimiento" las tarjetas quedan quietas.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ac = new AbortController();
  const opt = { signal: ac.signal };

  const aplicar = (el: HTMLElement, x: number, y: number, hover: number) => {
    const s = el.style;
    s.setProperty("--ry", `${(13 * x).toFixed(2)}deg`);
    s.setProperty("--rx", `${(-9 * y).toFixed(2)}deg`);
    s.setProperty("--tz", `${(30 * hover).toFixed(1)}px`);
    s.setProperty("--s", (1 + 0.03 * hover).toFixed(3));
    s.setProperty("--hover", hover.toFixed(3));
  };
  const reposoTodas = () => items.forEach((el) => aplicar(el, 0, 0, 0));

  // Mouse: todas las tarjetas siguen al puntero; la que está debajo se levanta.
  raiz.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    for (const el of items) {
      const r = el.getBoundingClientRect();
      const x = clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2), -1, 1);
      const y = clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2), -1, 1);
      const dentro = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      aplicar(el, x, y, dentro ? 1 : 0);
    }
  }, opt);
  raiz.addEventListener("pointerleave", reposoTodas, opt);

  // Táctil/lápiz: arrastre horizontal sobre la tarjeta (el vertical queda para el scroll: touch-action: pan-y).
  for (const el of items) {
    let tid: number | null = null, ox = 0, oy = 0;
    el.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse") return;
      tid = e.pointerId; ox = e.clientX; oy = e.clientY;
      try { el.setPointerCapture(e.pointerId); } catch { /* puntero ya liberado */ }
      aplicar(el, 0, 0, 1);
    }, opt);
    el.addEventListener("pointermove", (e) => {
      if (e.pointerId !== tid) return;
      const r = el.getBoundingClientRect();
      aplicar(el, clamp((e.clientX - ox) / (r.width * 0.55), -1, 1), clamp((e.clientY - oy) / (r.height * 0.55), -1, 1), 1);
    }, opt);
    const soltar = (e: PointerEvent) => { if (e.pointerId !== tid) return; tid = null; aplicar(el, 0, 0, 0); };
    el.addEventListener("pointerup", soltar, opt);
    el.addEventListener("pointercancel", soltar, opt);
    el.addEventListener("lostpointercapture", soltar, opt);
  }

  // Reposo al perder el foco, ocultar la pestaña o salir de pantalla.
  window.addEventListener("blur", reposoTodas, opt);
  document.addEventListener("visibilitychange", () => { if (document.hidden) reposoTodas(); }, opt);
  const io = new IntersectionObserver((entradas) => { if (!entradas[0]?.isIntersecting) reposoTodas(); });
  io.observe(raiz);

  window.addEventListener("pagehide", () => { ac.abort(); io.disconnect(); }, { once: true });
}
