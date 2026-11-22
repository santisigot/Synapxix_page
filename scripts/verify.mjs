import { readFileSync, existsSync } from 'node:fs';

const file = 'dist/index.html';
const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };

check(existsSync(file), `no existe ${file}`);
const html = existsSync(file) ? readFileSync(file, 'utf8') : '';
const has = (s) => html.includes(s);

// --- aserciones por tarea ---
check(has('Synapxix'), 'falta "Synapxix"');

if (failures.length) {
  console.error('verify: FALLÓ\n - ' + failures.join('\n - '));
  process.exit(1);
}
console.log('verify: OK');
