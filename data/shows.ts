/**
 * ⚠️ DATOS DE EJEMPLO — REEMPLAZAR CON FECHAS REALES.
 * Las fechas son la moneda del dancehall: mantén esto al día o quítalo.
 * `fecha` en formato ISO (YYYY-MM-DD). El estado 'pasado' se puede derivar
 * de la fecha, pero se deja explícito para poder forzar 'agotado'.
 */
export type Show = {
  fecha: string; // ISO YYYY-MM-DD
  ciudad: string;
  venue: string;
  estado: "proximo" | "agotado" | "pasado";
  /** Link a boletería (opcional; úsalo solo en 'proximo'). */
  tickets?: string;
};

export const shows: Show[] = [
  { fecha: "2026-07-25", ciudad: "Medellín", venue: "Salón Amador", estado: "proximo", tickets: "https://" },
  { fecha: "2026-08-08", ciudad: "Bogotá", venue: "Baum", estado: "proximo", tickets: "https://" },
  { fecha: "2026-08-22", ciudad: "Cali", venue: "La Topa Tolondra", estado: "agotado" },
  { fecha: "2026-06-14", ciudad: "Medellín", venue: "Calle 9+1", estado: "pasado" },
  { fecha: "2026-05-03", ciudad: "Pereira", venue: "Sunset Club", estado: "pasado" },
];
