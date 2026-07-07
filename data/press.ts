/**
 * Venues, festivales y colectivos donde ha sonado JBD.
 * Si consigues los logos (monocromo) ponlos en /public/press/logos/ y referencia
 * en el campo `logo`; si no, se renderiza el nombre con la tipografía de la marca.
 */
export type PressItem = {
  nombre: string;
  logo?: string;
  url?: string;
  categoria: "venue" | "festival" | "colectivo";
};

export const press: PressItem[] = [
  { nombre: "Lion Reggae Bar", categoria: "venue" },
  { nombre: "La Central", categoria: "venue" },
  { nombre: "La Séptima", categoria: "venue" },
  { nombre: "Jamz", categoria: "venue" },
  { nombre: "Dejavu Fest", categoria: "festival" },
  { nombre: "Vamos a Bailar Dancehall", categoria: "colectivo" },
  { nombre: "Helium", categoria: "venue" },
];

export type PressQuote = {
  texto: string;
  fuente: string;
};

// Sin quotes por ahora — agrega reales cuando las tengas.
export const quotes: PressQuote[] = [];
