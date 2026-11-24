// Animación de arranque del hero (inspirada en las apps: cargador -> logo -> contenido).
//   ring  : solo un anillo violeta que respira
//   logo  : el anillo se convierte en el logo de Synapxix
//   text  : aparece el título, el subtítulo y los enlaces
//   cards : las instituciones salen del logo hacia su lugar, escalonadas
//   done  : estado final, con las tarjetas flotando suavemente
// El script en línea de Hero.astro pone data-intro="ring" antes del primer pintado; aquí solo se avanza de fase.
// Sin JS o con "reducir movimiento" no hay secuencia: se ve el estado final.

const FASES: [string, number][] = [
  ["logo", 1300],
  ["text", 2000],
  ["cards", 2350],
  ["done", 4300],
];

export function initHeroIntro(): void {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!hero || hero.dataset.intro !== "ring") return; // sin intro (reducir movimiento, ancla, etc.)
  hero.dataset.started = "1";

  const timers: number[] = [];
  const ac = new AbortController();
  let terminada = false;

  const terminar = () => {
    if (terminada) return;
    terminada = true;
    timers.forEach((t) => window.clearTimeout(t));
    ac.abort();
    hero.dataset.intro = "done";
  };

  // Si la página se abre ya desplazada (recarga a mitad de página), no hay intro
  if (window.scrollY > 120) { terminar(); return; }

  // Vector desde cada tarjeta hasta el centro del logo: de ahí salen
  const tile = hero.querySelector<HTMLElement>(".hero__tile");
  const unis = [...hero.querySelectorAll<HTMLElement>(".uni")];
  if (tile) {
    const t = tile.getBoundingClientRect();
    const cx = t.left + t.width / 2;
    const cy = t.top + t.height / 2;
    for (const u of unis) {
      const r = u.getBoundingClientRect();
      u.style.setProperty("--fx", `${(cx - (r.left + r.width / 2)).toFixed(1)}px`);
      u.style.setProperty("--fy", `${(cy - (r.top + r.height / 2)).toFixed(1)}px`);
    }
  }

  for (const [fase, ms] of FASES) {
    timers.push(window.setTimeout(() => { if (!terminada) hero.dataset.intro = fase; if (fase === "done") terminar(); }, ms));
  }

  // Cualquier interacción salta al final (nadie queda esperando)
  const saltar = () => terminar();
  const opt = { signal: ac.signal, passive: true } as AddEventListenerOptions;
  window.addEventListener("wheel", saltar, opt);
  window.addEventListener("touchstart", saltar, opt);
  window.addEventListener("keydown", saltar, { signal: ac.signal });
  window.addEventListener("pointerdown", saltar, opt);

  window.addEventListener("pagehide", terminar, { once: true });
}
