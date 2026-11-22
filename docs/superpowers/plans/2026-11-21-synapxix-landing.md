# Landing de Synapxix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Landing estática en Astro para colegios y docentes, visualmente lo más parecida posible a https://kidora.framer.website/, con el contenido de Synapxix y los colores y logos del brand book, lista para importar en Vercel.

**Architecture:** Una sola página `src/pages/index.astro` que compone un componente por sección. Todo el texto vive en `src/content.ts`, y el correo de contacto en `src/config.ts`. Estilos en CSS propio con variables de la paleta. JS vanilla mínimo para contadores, banda animada y aparición al scroll.

**Tech Stack:** Astro 5 (salida estática), TypeScript, CSS propio, Google Fonts, Node 22.

**Spec:** `docs/superpowers/specs/2026-11-21-landing-design.md`

## Global Constraints

- Salida **estática** (`output: 'static'`), sin adaptador: Vercel detecta Astro solo, no se crea `vercel.json`.
- Paleta (variables CSS): `--violeta:#715AFF` (acción principal), `--azul:#5887FF`, `--cielo:#55C1FF`, `--lavanda:#A682FF`, `--noche:#102E4A`.
- Texto blanco sobre Violeta y Noche; texto Noche sobre Cielo y Lavanda. Nunca blanco sobre Lavanda.
- Logo azul (`public/logo-azul.png`) en fondos claros; logo claro (`public/logo-claro.png`) en fondos oscuros. Sin deformar, sin sombras, sin contornos.
- Del brand book solo colores y logos. Tipografía, botones, formas y movimiento siguen a Kidora.
- Sin emojis como íconos; íconos en SVG inline.
- Sin sección de precios ni blog. Idioma español rioplatense.
- No copiar textos, imágenes ni código de Kidora (plantilla comercial de RedDevs): solo estructura y estilo.
- Remoto: `https://github.com/santisigot/Synapxix_page.git`, rama `main`.
- Cada botón "Sumá tu escuela" apunta a `#contacto`; el bloque de contacto usa `mailto:` con el correo de `src/config.ts`.

## Review Focus

- Correo de contacto sin configurar (`placeholder`): el `mailto:` debe seguir siendo un enlace válido y el build no debe fallar.
- Pantalla de 360 px de ancho: ninguna sección produce scroll horizontal (la banda animada y el diagrama D.A.L.A. son los riesgos).
- Usuario con `prefers-reduced-motion`: contadores muestran el valor final y la banda no se mueve.
- JS desactivado: los contadores muestran el valor final y el contenido con aparición al scroll es visible.
- Logo claro sobre fondo claro por error de composición: cada uso del logo debe elegir variante según el fondo de su sección.

---

### Task 1: Proyecto Astro, git y verificación

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `src/config.ts`, `scripts/verify.mjs`, `public/logo-azul.png`, `public/logo-claro.png`, `public/favicon.png`, `README.md`
- Create: `src/pages/index.astro` (placeholder `<h1>Synapxix</h1>`)

**Interfaces:**
- Produces: `export const CONTACT_EMAIL: string` en `src/config.ts` (valor inicial `"contacto@synapxix.example"`); script `npm run verify` = `astro build && node scripts/verify.mjs`.

- [ ] **Step 1: Crear el proyecto Astro mínimo** en la carpeta actual (`npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict`, luego `npm install`). Confirmar que no pisa `docs/`.
- [ ] **Step 2: Copiar logos.** `1.png` (azul) → `public/logo-azul.png` y `public/logo-claro.png` ← `2.png`, desde `C:\Users\santi\AppData\Local\Temp\claude\632c8ee2613ef870\4c3afae2-e3d5-4ede-a2e3-013fd6bdaa7b\images\`. `public/favicon.png` = copia del azul.
- [ ] **Step 3: Escribir `scripts/verify.mjs`** que lee `dist/index.html` y falla (exit 1) con mensaje claro si no cumple cada aserción. En este task solo: existe `dist/index.html` y contiene `Synapxix`. Cada task siguiente agrega sus aserciones.
- [ ] **Step 4: Ejecutar `npm run verify`.** Esperado: build OK y `verify: OK`.
- [ ] **Step 5: Inicializar git** (`git init -b main`, `git remote add origin https://github.com/santisigot/Synapxix_page.git`), `.gitignore` con `node_modules`, `dist`, `.astro`, `.vercel`. Commit `chore: scaffold astro project`. **No hacer push todavía.**

### Task 2: Base visual, layout, navbar y footer

**Files:**
- Create: `src/styles/global.css`, `src/layouts/Base.astro`, `src/components/Navbar.astro`, `src/components/Footer.astro`, `src/components/Button.astro`, `src/content.ts`
- Modify: `src/pages/index.astro` (usa `Base`)

**Interfaces:**
- Produces: `Base.astro` con props `{ title: string; description: string }` y `<slot />`; `Button.astro` con props `{ href: string; variant?: 'primary' | 'secondary' }` (píldora con flecha en círculo, como "Enroll now" de Kidora); `content.ts` exporta `nav: {label:string;href:string}[]` con hrefs `#proyecto #como-funciona #pilares #respaldo #equipo`.

- [ ] **Step 1: Medir Kidora.** Con el navegador integrado en `https://kidora.framer.website/`, leer con `javascript_tool` los `font-family`, tamaños y pesos de `h1`, `h2`, párrafo y botón, y el radio y padding de tarjetas y botón. Anotarlos como variables en `global.css` (`--font`, `--radius-card`, `--radius-pill`, etc.). Cargar la misma familia desde Google Fonts en `Base.astro`.
- [ ] **Step 2: Implementar `global.css`** con las 5 variables de paleta, reset, tipografía fluida y utilidades `.container`, `.reveal`.
- [ ] **Step 3: Implementar `Base`, `Button`, `Navbar`** (logo azul a la izquierda, menú con las anclas de `nav`, botón primario "Sumá tu escuela" → `#contacto`; menú hamburguesa en móvil) y `Footer` (logo claro sobre Noche, enlaces, correo de `config.ts`).
- [ ] **Step 4: Extender `verify.mjs`:** el HTML contiene `href="#contacto"`, las 5 anclas de `nav`, `logo-azul.png` y `logo-claro.png`.
- [ ] **Step 5: `npm run verify`** → `verify: OK`. Revisar en `astro dev` + navegador integrado a 1280 px y 375 px. Commit `feat: base layout, navbar and footer`.

### Task 3: Hero, banda animada y "Qué es Synapxix"

**Files:**
- Create: `src/components/Hero.astro`, `Marquee.astro`, `About.astro`
- Modify: `src/content.ts`, `src/pages/index.astro`

**Interfaces:**
- Produces en `content.ts`: `hero: {title:string;subtitle:string;cta:string}`, `marquee: string[]`, `counters: {value:number;suffix:string;label:string}[]` (valores del spec: 16 tipos de juego, 4 pilares, 8 instituciones, `7–9` años como texto), `triad: {title:string;text:string}[]` (Gusto, Interés, Nivel con los textos de la presentación).
- Anclas: `About` lleva `id="proyecto"`.

- [ ] **Step 1: Hero** con título "Educación personalizada con juego e inteligencia artificial", fondo Noche, estrella del logo y formas/degradados de la paleta en lugar de las fotos de Kidora, botón primario y secundario.
- [ ] **Step 2: Marquee** con `marquee` repetido (duplicado para bucle sin salto), animación CSS lineal infinita, fondo Cielo, texto Noche.
- [ ] **Step 3: About** con texto, 4 contadores (`data-target`, `data-suffix`) y las tres tarjetas Gusto / Interés / Nivel. El HTML inicial ya contiene el **valor final** (el JS del Task 6 solo anima desde 0).
- [ ] **Step 4: Extender `verify.mjs`:** aparecen "Educación personalizada", "Gusto", "Interés", "Nivel", "16", y `id="proyecto"`.
- [ ] **Step 5: `npm run verify`**; revisar a 360 px que la banda no genere scroll horizontal (`overflow:hidden` en su contenedor). Commit `feat: hero, marquee and about sections`.

### Task 4: Por qué ahora, D.A.L.A. y pilares

**Files:**
- Create: `src/components/Why.astro`, `Dala.astro`, `Pillars.astro`
- Modify: `src/content.ts`, `src/pages/index.astro`

**Interfaces:**
- Produces en `content.ts`: `why: {title:string;text:string}`, `principles: {title:string;text:string}[]` (3: "Todo es trazable", "Privacidad por diseño", "Un docente decide"), `dalaSteps: string[]` (Evidencia, Estado, Decisión, Intervención, Resultado, Actualización), `pillars: {n:string;title:string;text:string;tag:string}[]` (4, `n` = "01".."04").
- Anclas: `Dala` → `id="como-funciona"`, `Pillars` → `id="pilares"`.

- [ ] **Step 1: Why:** "Por qué ahora" con Singapur, Países Bajos y países nórdicos, y los 3 principios como tarjetas.
- [ ] **Step 2: Dala:** los 6 pasos como flujo/diagrama visual que en móvil se apila vertical (sin scroll horizontal).
- [ ] **Step 3: Pillars:** 4 tarjetas numeradas con etiqueta, igual composición que "programas" de Kidora; textos de la presentación, sin jerga de arquitectura.
- [ ] **Step 4: Extender `verify.mjs`:** `id="como-funciona"`, `id="pilares"`, los 6 pasos en orden, y "Un docente decide".
- [ ] **Step 5: `npm run verify`.** Commit `feat: why-now, D.A.L.A. and pillars sections`.

### Task 5: Docentes, respaldo, hoja de ruta, equipo y contacto

**Files:**
- Create: `src/components/Teachers.astro`, `Backers.astro`, `Roadmap.astro`, `Team.astro`, `Contact.astro`
- Modify: `src/content.ts`, `src/pages/index.astro`

**Interfaces:**
- Produces en `content.ts`: `teacherBenefits: {title:string;text:string}[]` (4, redactados a partir del portal docente: métricas por curso y por estudiante, revisión humana de cada recomendación, modo sombra, privacidad con consentimiento), `backers: {name:string;role:string;confirmed:boolean}[]` (8 de la presentación; UNER y UNAM con `confirmed:true`), `roadmap: {when:string;text:string}[]` (Hoy / Próximamente / Más allá), `team: {name:string;role:string;area:string}[]` (Sofia Perez, Santiago Sigot, Felipe Schenberger; Fernando Hirschfeld como project manager en `Team`).
- Consumes: `CONTACT_EMAIL` de `src/config.ts`.
- Anclas: `Backers` → `id="respaldo"`, `Team` → `id="equipo"`, `Contact` → `id="contacto"`.

- [ ] **Step 1: Teachers** (4 beneficios, estilo "features" de Kidora, con ícono SVG por tarjeta).
- [ ] **Step 2: Backers** (tarjetas destacadas para las 2 confirmadas, lista para el resto, estilo "testimonios") y **Roadmap** en 3 columnas.
- [ ] **Step 3: Team** con 3 tarjetas más la línea del project manager.
- [ ] **Step 4: Contact:** título "Sumá tu escuela a Synapxix", fondo Violeta con texto blanco, botón con `mailto:${CONTACT_EMAIL}?subject=Quiero sumar mi escuela a Synapxix`.
- [ ] **Step 5: Extender `verify.mjs`:** `id="respaldo"`, `id="equipo"`, `id="contacto"`, "Universidad Nacional de Entre Ríos", "UNAM", "Fernando Hirschfeld", un `mailto:` y **ausencia** de "Precio" y "$100".
- [ ] **Step 6: `npm run verify`.** Commit `feat: teachers, backers, roadmap, team and contact`.

### Task 6: Movimiento, responsive, SEO y entrega

**Files:**
- Create: `src/scripts/motion.ts`, `public/og.png` (imagen 1200×630 con logo sobre Noche)
- Modify: `src/layouts/Base.astro`, `src/styles/global.css`, `README.md`

**Interfaces:**
- Consumes: elementos `[data-target]` (contadores) y `.reveal`.
- Produces: `export function initMotion(): void` en `motion.ts`, importado desde `Base.astro`.

- [ ] **Step 1: Implementar `initMotion`:** cuenta de 0 al valor final con `IntersectionObserver`; añade `.is-visible` a `.reveal`. Si `matchMedia('(prefers-reduced-motion: reduce)')` coincide: no anima, deja valores finales y desactiva la animación de la banda por CSS.
- [ ] **Step 2: Garantizar el caso sin JS:** el CSS de `.reveal` solo oculta bajo `html.js` (la clase la agrega un script inline mínimo en `<head>`).
- [ ] **Step 3: SEO:** `<title>`, `description`, Open Graph y Twitter con `og.png`, `lang="es"`, favicon, `theme-color` Noche.
- [ ] **Step 4: Revisión visual completa** con el navegador integrado en `astro dev` a 1280, 768 y 360 px, comparando contra Kidora sección por sección; verificar a 360 px con `document.documentElement.scrollWidth <= window.innerWidth`. Corregir lo que difiera.
- [ ] **Step 5: README** con: `npm install`, `npm run dev`, dónde cambiar el correo (`src/config.ts`) y los textos (`src/content.ts`), y pasos para Vercel (Import Project → framework Astro detectado → Deploy).
- [ ] **Step 6: Verificación final:** `npm run verify` → `verify: OK`. Commit `feat: motion, seo and docs`.
- [ ] **Step 7: Push** con `git push -u origin main` (el usuario ya pidió subirlo a ese repo). Si exige credenciales o el remoto no está vacío, **no forzar**: informar al usuario.

---

## Self-review

- **Cobertura del spec:** las 12 secciones están (navbar y footer en T2, hero/banda/about en T3, por qué/D.A.L.A./pilares en T4, docentes/respaldo/hoja de ruta/equipo/CTA en T5), más CTA por `mailto:`, correo en un solo archivo, responsive, SEO y favicon en T6.
- **Consistencia de nombres:** `CONTACT_EMAIL`, `nav`, `initMotion`, `data-target` y los `id` de ancla se usan igual en todas las tareas.
- **Proporción:** sin bloques de código; cada paso fija nombres, valores y la verificación.
- **Aviso:** `public/logo-claro.png` viene de la imagen que pasó el usuario, que se ve muy clara sobre fondo blanco (es correcto: es para fondos oscuros). Si se ve mal sobre Noche, se extrae del PDF del book.
