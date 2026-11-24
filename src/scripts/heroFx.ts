// Hero animado:
//   1. load  : solo el logo, que se "carga" (se llena de abajo hacia arriba)
//   2. pop   : el logo da un pequeño salto
//   3. float : cosas clave del proyecto salen del logo y se reparten, desordenadas, por la pantalla
//   4. done  : quedan flotando suavemente
//   Al hacer scroll (sección fija durante un tramo corto) el progreso --p (0..1) las dispersa y revela
//   el hero final: logo, "Synapxix" y una frase.
// El script en línea de Hero.astro activa data-fx/data-intro antes del primer pintado. Sin JS o con
// "reducir movimiento" no se activa nada y se ve el hero final. No se intercepta la rueda del mouse.

const FASES: [string, number][] = [
  ["pop", 1600],
  ["float", 1950],
  ["done", 4800],
];

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export function initHeroFx(): void {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  const stage = hero?.querySelector<HTMLElement>(".hero__stage") ?? null;
  if (!hero || !stage || hero.dataset.fx !== "on") return; // modo estático
  hero.dataset.started = "1";

  const ac = new AbortController();
  const opt = { signal: ac.signal };
  const timers: number[] = [];
  let raf = 0;

  // ---- progreso del scroll -> --p (un único requestAnimationFrame, solo mientras se hace scroll) ----
  const actualizar = () => {
    raf = 0;
    const recorrido = Math.max(1, hero.offsetHeight - stage.clientHeight);
    // el último 20% del tramo mantiene el hero final fijo, para que se lea
    const p = clamp(-hero.getBoundingClientRect().top / (recorrido * 0.8), 0, 1);
    hero.style.setProperty("--p", p.toFixed(4));
  };
  const pedir = () => { if (!raf) raf = requestAnimationFrame(actualizar); };
  window.addEventListener("scroll", pedir, { ...opt, passive: true });
  window.addEventListener("resize", pedir, opt);
  actualizar();

  // ---- pausa la flotación fuera de pantalla ----
  const io = new IntersectionObserver((e) => { hero.dataset.vis = e[0]?.isIntersecting ? "1" : "0"; });
  io.observe(hero);

  // ---- secuencia de entrada ----
  const saltar = () => {
    timers.forEach((t) => window.clearTimeout(t));
    timers.length = 0;
    hero.dataset.intro = "done";
  };

  if (hero.dataset.intro === "load") {
    if (window.scrollY > 120) {
      saltar(); // página abierta ya desplazada (recarga a mitad de página): sin intro
    } else {
      // Vector desde cada elemento hasta el centro del logo: de ahí salen
      const logo = hero.querySelector<HTMLElement>(".hero__logo");
      if (logo) {
        const l = logo.getBoundingClientRect();
        const cx = l.left + l.width / 2;
        const cy = l.top + l.height / 2;
        for (const f of hero.querySelectorAll<HTMLElement>(".floater")) {
          const r = f.getBoundingClientRect();
          f.style.setProperty("--fx", `${(cx - (r.left + r.width / 2)).toFixed(1)}px`);
          f.style.setProperty("--fy", `${(cy - (r.top + r.height / 2)).toFixed(1)}px`);
        }
      }
      for (const [fase, ms] of FASES) {
        timers.push(window.setTimeout(() => { hero.dataset.intro = fase; }, ms));
      }
      // Quien empieza a hacer scroll o toca algo no espera: los flotantes aparecen al instante
      const interrumpir = () => {
        if (hero.dataset.intro === "done") return;
        saltar();
      };
      window.addEventListener("wheel", interrumpir, { ...opt, passive: true });
      window.addEventListener("touchstart", interrumpir, { ...opt, passive: true });
      window.addEventListener("keydown", interrumpir, opt);
    }
  }

  // ---- limpieza ----
  window.addEventListener("pagehide", () => {
    ac.abort();
    io.disconnect();
    timers.forEach((t) => window.clearTimeout(t));
    cancelAnimationFrame(raf);
  }, { once: true });
}
