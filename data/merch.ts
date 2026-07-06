/**
 * ⚠️ PRODUCTOS DE EJEMPLO — REEMPLAZAR CON EL DROP REAL (línea Eme / PuntoNeutro).
 * Imágenes en /public/merch/*.webp (misma regla: optimizadas, < 400KB).
 * Las imágenes actuales son placeholders de marca: cámbialas por foto de producto.
 */
export type Producto = {
  id: string;
  nombre: string;
  precio: number; // COP
  imagen: string; // /merch/*.webp
  imagenHover?: string; // reveal al hover, como BioCarousel
  tallas?: string[];
  estado: "disponible" | "agotado" | "proximo";
  /** Solo para 'proximo': fecha ISO del drop → alimenta el countdown. */
  fechaDrop?: string;
  cta: { tipo: "whatsapp" | "externo"; valor: string };
};

// Número de WhatsApp de booking/ventas (mismo del resto del sitio).
const WA = "573239829864";

export const productos: Producto[] = [
  {
    id: "camiseta-nolapare",
    nombre: "Camiseta #NOLAPARE",
    precio: 89000,
    imagen: "/merch/camiseta-nolapare.webp",
    imagenHover: "/merch/camiseta-nolapare-hover.webp",
    tallas: ["S", "M", "L", "XL"],
    estado: "disponible",
    cta: { tipo: "whatsapp", valor: WA },
  },
  {
    id: "hoodie-limonar",
    nombre: "Hoodie El Limonar",
    precio: 159000,
    imagen: "/merch/hoodie-limonar.webp",
    imagenHover: "/merch/hoodie-limonar-hover.webp",
    tallas: ["S", "M", "L", "XL"],
    estado: "disponible",
    cta: { tipo: "whatsapp", valor: WA },
  },
  {
    id: "gorra-selektah",
    nombre: "Gorra Selektah",
    precio: 69000,
    imagen: "/merch/gorra-selektah.webp",
    imagenHover: "/merch/gorra-selektah-hover.webp",
    estado: "agotado",
    cta: { tipo: "whatsapp", valor: WA },
  },
  {
    id: "mixtape-vol1",
    nombre: "Mixtape Vol.1",
    precio: 45000,
    imagen: "/merch/mixtape-vol1.webp",
    imagenHover: "/merch/mixtape-vol1-hover.webp",
    estado: "proximo",
    fechaDrop: "2026-08-15",
    cta: { tipo: "whatsapp", valor: WA },
  },
];

/** Formatea COP sin decimales: 89000 → "$89.000". */
export function formatCOP(precio: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(precio);
}
