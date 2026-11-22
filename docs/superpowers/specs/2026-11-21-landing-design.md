# Landing de Synapxix — Diseño

## Intención
Landing pública de Synapxix (plataforma educativa con juego + IA adaptativa) dirigida a
**colegios y docentes**. Objetivo: que entiendan qué es, confíen (respaldo académico,
docente en control, privacidad) y **se contacten para sumarse a las pruebas / la demo**.

## Metas / no-metas / anti-metas
- Metas: lo más parecida posible en estructura y estilo visual a https://kidora.framer.website/,
  con contenido de la presentación "Synapxix — Introducción al proyecto" y colores + logos del brand book.
- No-metas: precios, blog, login, panel. Formulario con backend propio.
- Anti-metas: que suene técnico/inversor (arquitectura en detalle), copiar textos o imágenes de Kidora,
  usar emojis en lugar de íconos.

## Restricciones
- Astro (sitio estático), listo para desplegar en Vercel sin configuración extra.
- Repo: https://github.com/santisigot/Synapxix_page.git (push al terminar).
- Del brand book solo colores y logos. Tipografía, botones y formas siguen a Kidora.
- Paleta: Violeta #715AFF (acción principal), Azul #5887FF, Cielo #55C1FF, Lavanda #A682FF, Noche #102E4A.
  Texto blanco sobre Violeta/Noche; texto Noche sobre Cielo/Lavanda.
- Logos: versión azul en fondos claros, versión clara en fondos oscuros; sin deformar ni sombras.
- Idioma: español (rioplatense, como la presentación).

## Enfoque
Una sola página Astro con un componente por sección y estilos en CSS propio (sin framework CSS),
animaciones ligeras en JS vanilla (contadores, banda en movimiento, aparición al hacer scroll).
Alternativas descartadas: Tailwind (no aporta frente a replicar un diseño concreto) y
un framework de UI (React/Vue) innecesario para una landing estática.

## Secciones (orden de Kidora)
1. Navbar: logo + menú (Proyecto, Cómo funciona, Pilares, Respaldo, Equipo) + botón "Sumá tu escuela".
2. Hero: "Educación personalizada con juego e inteligencia artificial" + botón principal.
3. Banda animada con frases del proyecto.
4. Qué es Synapxix + 4 contadores (16 tipos de juego, 4 pilares, 8 instituciones, 7–9 años en pruebas)
   + tarjetas Gusto / Interés / Nivel.
5. Por qué Synapxix: por qué ahora (Singapur, Países Bajos, nórdicos) + 3 principios
   (todo es trazable, privacidad por diseño, un docente decide).
6. Bloque visual: los 6 pasos de D.A.L.A. (Evidencia → Actualización).
7. Cuatro pilares numerados (01–04) como las tarjetas de programas.
8. Para docentes (en lugar de "features"): beneficios del portal docente y del juego, en lenguaje no técnico.
   La arquitectura queda fuera o como una línea.
9. Respaldo académico (en lugar de testimonios): UNER y UNAM destacadas + resto de instituciones.
10. Hoja de ruta (en lugar del blog): Hoy / Próximamente / Más allá.
11. Equipo: los tres líderes y el project manager.
12. CTA final "Sumá tu escuela a Synapxix" + footer.

## Llamada a la acción
Botones "Sumá tu escuela" → sección de contacto con enlace `mailto:` a un correo configurable
en un solo archivo (`src/config.ts`). Sin backend.

## Decidido por el constructor (calls propios)
- Fuente: la misma familia que usa Kidora (Google Fonts) para títulos y texto.
- Fotos de Kidora reemplazadas por composiciones con la estrella del logo, formas y degradados de la paleta.
- Íconos: SVG inline simples.
- Responsive móvil, metadatos SEO/OG, favicon con el logo.
