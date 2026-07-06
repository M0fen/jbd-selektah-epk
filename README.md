# JBD Selektah — EPK

Electronic Press Kit oficial de **JBD Selektah**, selektah/DJ de dancehall y latin dancehall desde El Limonar, Medellín. Pieza premium orientada a cerrar bookings: carga rápida en 4G, share perfecto en WhatsApp/Instagram y prueba social para promotores.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion 12** — animaciones de sección
- **Swiper 12** — carruseles de multimedia
- **React Three Fiber + drei + three** — fondo geométrico WebGL
- **react-compiler** (babel-plugin-react-compiler)
- Deploy en **Vercel**

## Scripts

```bash
npm run dev     # servidor de desarrollo (http://localhost:3000)
npm run build   # build de producción
npm run start   # sirve el build de producción
npm run lint    # ESLint
```

## Estructura

```
app/            # layout, page, estilos globales, metadata
components/     # Hero, Navbar, BioCarousel, MultimediaCarousels, ConnectSection, Background, Footer, WhatsAppFloat
public/
  carousel/     # imágenes del bio-carrusel (WebP optimizado)
  logo.png      # wordmark / logo
```

## Assets e imágenes

Las imágenes se optimizan **antes** de commitear (nada crudo > 500KB). El carrusel usa WebP (lado largo 2000px, calidad 80) generado con `sharp`. Para regenerar tras añadir nuevos JPG a `public/carousel/`:

```js
// optimize-carousel.mjs (ejecutar con: node optimize-carousel.mjs)
import sharp from 'sharp';
import { readdir, unlink } from 'fs/promises';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'carousel');
for (const f of (await readdir(dir)).filter((f) => /\.jpe?g$/i.test(f))) {
  await sharp(path.join(dir, f))
    .rotate()
    .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(dir, f.replace(/\.jpe?g$/i, '.webp')));
  await unlink(path.join(dir, f));
}
```

## Marca

- **Color:** dorado (`#F5D061` / `#C5A059`) + plata (`#E5E5E5`) sobre negro (`#050505`).
- **Tipografía:** Unbounded 900 (display) · Syne · Space Grotesk (body).
- **Voz:** paisa/urbano auténtico — Selektah con K, El Limonar, #NOLAPARE.

## Deploy

Deploy automático en **Vercel** desde la rama principal. `npm run build` debe pasar limpio (sin warnings) antes de mergear.
