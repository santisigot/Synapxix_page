// Filas desplegables de D.A.L.A. (<details>/<summary> nativos) con apertura animada.
// - Cada fila tiene su propio intent / from / to / value / start. Activar el <summary> alterna el intent:
//   se captura el valor normalizado actual como `from`, se fija `to` = 1 o 0 y `start` = ahora.
// - details.open = true antes de medir o animar en cualquier sentido; solo se pone en false al llegar al final del cierre.
// - Durante 450 ms: value = from + (to - from) * ease(clamp((ahora - start) / 450, 0, 1)),
//   con cubic-bezier(0.32, 0.72, 0, 1) resuelta por su coordenada x (no tratando el parámetro como tiempo).
// - Alto del cuerpo = alto medido del párrafo * value; opacidad = clamp(value * 2, 0, 1); el contenido va recortado.
// - Puede haber varias filas abiertas. Un solo requestAnimationFrame, activo solo mientras hay movimiento.
// - Con "reducir movimiento" cada fila queda al instante en su destino. Sin JS, details/summary siguen funcionando.

const DURACION = 450;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/** Curva cúbica de Bézier tipo CSS: dado x (progreso en el tiempo) devuelve y (progreso del valor). */
function bezier(x1: number, y1: number, x2: number, y2: number): (x: number) => number {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const X = (t: number) => ((ax * t + bx) * t + cx) * t;
  const Y = (t: number) => ((ay * t + by) * t + cy) * t;
  const dX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) { // Newton-Raphson sobre x(t) = x
      const e = X(t) - x;
      if (Math.abs(e) < 1e-6) return Y(t);
      const d = dX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= e / d;
    }
    let lo = 0, hi = 1; // respaldo: bisección
    t = x;
    for (let i = 0; i < 32; i++) {
      const e = X(t) - x;
      if (Math.abs(e) < 1e-6) break;
      if (e > 0) hi = t; else lo = t;
      t = (lo + hi) / 2;
    }
    return Y(t);
  };
}
const ease = bezier(0.32, 0.72, 0, 1);

type Fila = {
  det: HTMLDetailsElement;
  sum: HTMLElement;
  resp: HTMLElement;
  p: HTMLElement;
  intent: boolean; // true = quiere estar abierta
  from: number;
  to: number;
  value: number; // 0 (cerrada) .. 1 (abierta)
  start: number;
  animando: boolean;
  alto: number; // alto medido del párrafo (se mide fuera del bucle de dibujo)
};

export function initDalaRows(): void {
  const section = document.querySelector<HTMLElement>("[data-dala]");
  if (!section) return;
  const dets = [...section.querySelectorAll<HTMLDetailsElement>("details.dala__row")];
  if (dets.length === 0) return;

  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reducido = mql.matches;
  let raf = 0;
  const ac = new AbortController();
  const opt = { signal: ac.signal };

  const filas: Fila[] = dets.map((det) => {
    const sum = det.querySelector<HTMLElement>("summary")!;
    const resp = det.querySelector<HTMLElement>(".dala__answer")!;
    const p = resp.querySelector<HTMLElement>("p")!;
    const abierta = det.open;
    det.dataset.intent = abierta ? "open" : "closed";
    return { det, sum, resp, p, intent: abierta, from: abierta ? 1 : 0, to: abierta ? 1 : 0, value: abierta ? 1 : 0, start: 0, animando: false, alto: 0 };
  });

  // ---- medición (fuera del bucle): con la fila abierta, el alto natural del párrafo ----
  const medir = (f: Fila) => {
    f.det.open = true; // un <details> cerrado no renderiza su contenido
    f.alto = f.p.offsetHeight;
  };

  const aplicar = (f: Fila) => {
    f.resp.style.height = `${f.alto * f.value}px`;
    f.resp.style.opacity = String(clamp(f.value * 2, 0, 1));
  };

  // Estado de reposo: abierta con altura natural (se adapta sola al cambiar el ancho) o cerrada de verdad.
  const asentar = (f: Fila) => {
    f.animando = false;
    f.value = f.to;
    if (f.to === 0 && !f.intent) {
      f.det.open = false; // solo al llegar al final del cierre
    }
    f.resp.style.height = "";
    f.resp.style.opacity = "";
  };

  // ---- un único requestAnimationFrame, activo solo mientras haya filas en movimiento ----
  const hayMovimiento = () => filas.some((f) => f.animando);
  const frame = (ahora: number) => {
    raf = 0;
    for (const f of filas) {
      if (!f.animando) continue;
      const t = clamp((ahora - f.start) / DURACION, 0, 1);
      f.value = f.from + (f.to - f.from) * ease(t);
      if (t >= 1) asentar(f);
      else aplicar(f);
    }
    if (hayMovimiento() && !document.hidden) raf = requestAnimationFrame(frame);
  };
  const pedirFrame = () => { if (!raf && !document.hidden) raf = requestAnimationFrame(frame); };

  // ---- alternar: la activación nativa del <summary> (clic, Enter o Espacio) cambia el intent ----
  const alternar = (f: Fila) => {
    f.intent = !f.intent;
    f.det.dataset.intent = f.intent ? "open" : "closed"; // el icono (+/−) y el color cambian al instante
    f.from = f.value;
    f.to = f.intent ? 1 : 0;
    f.start = performance.now();
    medir(f); // details.open = true antes de medir o animar, en ambos sentidos
    if (reducido) { asentar(f); return; }
    f.animando = true;
    aplicar(f); // sin salto: arranca desde el valor actual
    pedirFrame();
  };

  filas.forEach((f) => {
    f.sum.addEventListener("click", (e) => {
      e.preventDefault(); // evita el cambio instantáneo nativo; lo gobierna el intent
      alternar(f);
    }, opt);
  });

  // ---- re-medición tras redimensionar o cargar las fuentes ----
  const remedir = () => {
    for (const f of filas) {
      if (!f.det.open) continue;
      if (f.animando) {
        f.alto = f.p.offsetHeight; // en movimiento: se actualiza lo medido sin romper la reversión
        aplicar(f);
      }
      // en reposo y abierta la altura es automática: ya se adapta sola
    }
  };
  const ro = new ResizeObserver(remedir);
  ro.observe(section);
  void document.fonts?.ready.then(remedir);

  // ---- movimiento reducido: ahora y si cambia mientras se usa la página ----
  const alCambiarMovimiento = () => {
    reducido = mql.matches;
    if (reducido) for (const f of filas) if (f.animando) asentar(f);
  };
  mql.addEventListener("change", alCambiarMovimiento, opt);

  // ---- pestaña oculta: se detiene el bucle; al volver se retoma según el tiempo real (sin acumular) ----
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
    else if (hayMovimiento()) pedirFrame();
  }, opt);

  // ---- limpieza ----
  window.addEventListener("pagehide", () => {
    ac.abort();
    ro.disconnect();
    cancelAnimationFrame(raf);
    raf = 0;
  }, { once: true });
}
