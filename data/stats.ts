export type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

// Oyentes: dato del artista (Spotify).
// Reproducciones: suma verificada de las vistas de YouTube de los videos del sitio
//   (2.48M, snapshot 2026-07) — conservador, no incluye Spotify ni otros canales.
// Shows: estimado del artista.
export const stats: Stat[] = [
  { label: "Oyentes mensuales", value: 56463 },
  { label: "Reproducciones", value: 2480413, suffix: "+" },
  { label: "Shows en tarima", value: 200, suffix: "+" },
];
