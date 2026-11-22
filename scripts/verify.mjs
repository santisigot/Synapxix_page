import { readFileSync, existsSync } from 'node:fs';

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
for (const a of ['#proyecto', '#como-funciona', '#pilares', '#respaldo', '#equipo'])
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
// T5: docentes, respaldo, hoja de ruta, equipo, contacto
for (const a of ['respaldo', 'equipo', 'contacto']) check(has(`id="${a}"`), `falta id="${a}"`);
for (const w of ['Universidad Nacional de Entre Ríos', 'UNAM', 'Fernando Hirschfeld', 'Hacia la demo'])
  check(has(w), `falta "${w}"`);
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
