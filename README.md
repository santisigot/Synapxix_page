# Synapxix — Landing

Landing estática de Synapxix para colegios y docentes. Hecha con [Astro](https://astro.build).

## Probarla en tu computadora

```powershell
npm install
npm run dev
```

Se abre en http://localhost:4321.

## Qué cambiar antes de publicar

- **Correo de contacto:** `src/config.ts` (`CONTACT_EMAIL`). Hoy es un correo de ejemplo.
- **Textos de la página:** `src/content.ts`. Todo el contenido está ahí.
- **Colores y medidas:** variables al principio de `src/styles/global.css`.
- **Imagen al compartir el enlace (`public/og.png`):** cuando tengas dominio, agregá `site: "https://tu-dominio"` dentro de `defineConfig({ ... })` en `astro.config.mjs`. Con eso la imagen y la URL salen absolutas y las redes la toman bien.

## Verificar que todo está bien

```powershell
npm run verify
```

Construye el sitio y comprueba que estén las secciones, los enlaces y los logos.

## Publicar en Vercel

1. Entrá a https://vercel.com/new e importá el repositorio `Synapxix_page`.
2. Vercel detecta Astro solo: dejá todo como está.
3. Tocá **Deploy**.

No hace falta `vercel.json`. Cada `git push` a `main` vuelve a publicar la página.
