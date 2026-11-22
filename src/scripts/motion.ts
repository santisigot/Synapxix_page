export function initMotion(): void {
  const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll<HTMLElement>(".reveal");
  const contadores = document.querySelectorAll<HTMLElement>(".counter__num[data-target]");

  // Sin movimiento o sin IntersectionObserver: todo visible y con el valor final.
  if (reducido || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const ver = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-visible");
        ver.unobserve(e.target);
      }
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => ver.observe(el));

  const contar = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        contar.unobserve(el);
        animar(el);
      }
    },
    { threshold: 0.6 }
  );
  contadores.forEach((el) => contar.observe(el));
}

function animar(el: HTMLElement): void {
  const objetivo = Number(el.dataset.target);
  if (!Number.isFinite(objetivo)) return;
  const duracion = 1400;
  const inicio = performance.now();
  el.textContent = "0";
  const paso = (ahora: number) => {
    const t = Math.min((ahora - inicio) / duracion, 1);
    const suave = 1 - Math.pow(1 - t, 3);
    el.textContent = String(Math.round(objetivo * suave));
    if (t < 1) requestAnimationFrame(paso);
    else el.textContent = el.dataset.final ?? String(objetivo);
  };
  requestAnimationFrame(paso);
}
