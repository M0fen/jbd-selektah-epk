/**
 * Próximas fechas de JBD. `fecha` en ISO (YYYY-MM-DD).
 * Añade `tickets` solo si hay link de boletería; si no, se muestra "Próximo".
 */
export type Show = {
  fecha: string; // ISO YYYY-MM-DD
  ciudad: string;
  venue: string;
  estado: "proximo" | "agotado" | "pasado";
  tickets?: string;
};

export const shows: Show[] = [
  { fecha: "2026-07-09", ciudad: "Medellín", venue: "Lion Reggae Bar", estado: "proximo" },
  { fecha: "2026-07-10", ciudad: "Medellín", venue: "Lion Reggae Bar", estado: "proximo" },
  { fecha: "2026-07-11", ciudad: "Medellín", venue: "Lion Reggae Bar", estado: "proximo" },
  { fecha: "2026-07-12", ciudad: "Medellín", venue: "La Séptima", estado: "proximo" },
];
