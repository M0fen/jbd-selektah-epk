/**
 * ⚠️ DATOS DE EJEMPLO — REEMPLAZAR CON VENUES / FESTIVALES / MEDIOS / SELLOS REALES.
 * Ideal: logo en /public/press/logos/*.svg (monocromo). Si no hay logo, se
 * renderiza el nombre en tipografía de la marca como fallback.
 */
export type PressItem = {
  nombre: string;
  /** Ruta a logo monocromo en /public/press/logos/… (opcional). */
  logo?: string;
  /** Link al venue/medio (opcional). */
  url?: string;
  categoria: "venue" | "festival" | "medio" | "colectivo" | "sello";
};

export const press: PressItem[] = [
  { nombre: "Salón Amador", categoria: "venue" },
  { nombre: "Perreo Intenso", categoria: "colectivo" },
  { nombre: "Baum", categoria: "venue" },
  { nombre: "Festival Cordillera", categoria: "festival" },
  { nombre: "Vice Colombia", categoria: "medio" },
  { nombre: "PuntoNeutro", categoria: "sello" },
  { nombre: "Calle 9+1", categoria: "venue" },
  { nombre: "Besame Mucho Fest", categoria: "festival" },
];

/** ⚠️ EJEMPLO — reemplaza por quotes reales de prensa (o deja el array vacío). */
export type PressQuote = {
  texto: string;
  fuente: string;
};

export const quotes: PressQuote[] = [
  {
    texto:
      "JBD no pincha una fiesta, la dirige. El Limonar mandó a su selektah a tomarse la ciudad.",
    fuente: "— Medio de ejemplo, 2024",
  },
];
