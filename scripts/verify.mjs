import { readFileSync, existsSync, readdirSync } from 'node:fs';

const file = 'dist/index.html';
const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };

check(existsSync(file), `no existe ${file}`);
const html = existsSync(file) ? readFileSync(file, 'utf8') : '';
const has = (s) => html.includes(s);

// --- aserciones por tarea ---
check(has('Synapxix'), 'falta "Synapxix"');
// T2: base
check(has('href="#contacto"'), 'falta botón a #contacto');
for (const a of ['#proyecto', '#como-funciona', '#pilares', '#respaldo'])
  check(has(`href="${a}"`), `falta ancla de menú ${a}`);
check(has('logo-azul.png'), 'falta logo azul');
check(has('logo-claro.png'), 'falta logo claro');
// T3: hero, banda, about
check(has('Educación personalizada con juego e inteligencia artificial'), 'falta título del hero');
for (const w of ['Gusto', 'Interés', 'Nivel', 'Aprender jugando'])
  check(has(w), `falta "${w}"`);
check(has('data-target="16"'), 'falta contador de 16 juegos');
check(!/counter__plus/.test(html), 'los contadores no deben llevar "+" (la presentación da cifras exactas)');
check(has('id="proyecto"'), 'falta id="proyecto"');
// Revisión final
check(html.search(/<h2/) !== -1 && html.search(/<h2/) < html.search(/<h[34]/), 'el primer título tras el h1 debe ser h2 (no saltar niveles)');
check((html.match(/class="marquee__group/g) ?? []).length >= 4, 'la banda necesita 4 copias para cubrir pantallas anchas');
check(!/background:var\(--azul\);color:#fff/.test(html), 'blanco sobre Azul rompe la regla de contraste');
check(!/instituciones académicas/.test(html), 'el contador no debe llamar "académicas" al Polo Tecnológico');
if (html.includes('.example')) console.warn('verify: AVISO — el correo de contacto sigue siendo el de ejemplo (src/config.ts).');
// T5: docentes, respaldo, contacto
for (const a of ['respaldo', 'contacto']) check(has(`id="${a}"`), `falta id="${a}"`);
for (const w of ['Universidad Nacional de Entre Ríos', 'UNAM', 'UADER', 'UTN', 'Polo Tecnológico La Nube'])
  check(has(w), `falta "${w}"`);
// Secciones y marcas quitadas a pedido
check(!has('id="equipo"') && !has('Hacia la demo') && !has('Fernando Hirschfeld'), 'no deben aparecer las secciones "Qué sigue" ni "El equipo"');
check(!has('Confirmada'), 'ninguna institución debe llevar el sello "Confirmada"');
check((html.match(/class="backer /g) ?? []).length === 8, 'deben verse las 8 instituciones con el mismo formato');
check(!/why__card--blanco/.test(html), 'la tarjeta "Un docente decide" no puede ser blanca sobre fondo casi blanco');
{
  const css = existsSync('dist/_astro')
    ? readdirSync('dist/_astro').filter((f) => f.endsWith('.css')).map((f) => readFileSync(`dist/_astro/${f}`, 'utf8')).join('\n')
    : '';
  check(/100svh\s*-\s*72px/.test(html + css), 'el hero debe ocupar la pantalla (100svh menos la barra de 72px)');
}
check(/href="mailto:[^"]+"/.test(html), 'falta enlace mailto:');
check(!/Precio|\$100|Suscrib/i.test(html), 'aparece contenido de precios/suscripción');
// T4: por qué, D.A.L.A., pilares
check(has('id="como-funciona"'), 'falta id="como-funciona"');
check(has('id="pilares"'), 'falta id="pilares"');
check(has('Un docente decide'), 'falta "Un docente decide"');
{
  const pasos = ['Evidencia', 'Estado', 'Decisión', 'Intervención', 'Resultado', 'Actualización'];
  const pos = pasos.map((p) => html.search(new RegExp(`<span class="dala__label"[^>]*>${p}</span>`)));
  check(pos.every((p, i) => p >= 0 && (i === 0 || p > pos[i - 1])), 'los 6 pasos de D.A.L.A. faltan o están desordenados');
}

if (failures.length) {
  console.error('verify: FALLÓ\n - ' + failures.join('\n - '));
  process.exit(1);
}
console.log('verify: OK');
