/**
 * ⚠️ DATOS DE EJEMPLO — REEMPLAZAR CON CIFRAS REALES DE JBD ANTES DE PUBLICAR.
 * Son la prueba social que lee un promotor: si no son verificables, bájalas.
 */
export type Stat = {
  label: string;
  value: number;
  suffix?: string;
  /** Nota interna de la fuente del dato (no se renderiza). */
  fuente?: string;
};

export const stats: Stat[] = [
  { label: "Oyentes mensuales", value: 45000, suffix: "+", fuente: "Spotify for Artists" },
  { label: "Seguidores Instagram", value: 80000, suffix: "+", fuente: "@jbdselektah" },
  { label: "Reproducciones acumuladas", value: 2500000, suffix: "+", fuente: "YouTube + Spotify" },
  { label: "Shows en tarima", value: 250, suffix: "+", fuente: "2019–hoy" },
];
