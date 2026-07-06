import type { Metadata } from "next";
import { Unbounded, Space_Grotesk, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import GrainOverlay from "@/components/GrainOverlay";
import Cursor from "@/components/Cursor";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["300", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["800"],
});

// Base URL para OG/canonical. Usa el dominio real automáticamente:
// - NEXT_PUBLIC_SITE_URL si conectas un dominio propio (p. ej. https://jbdselektah.com)
// - si no, el dominio de producción de Vercel (para que el share funcione ya)
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://jbd-selektah-epk.vercel.app");
const siteDescription =
  "EPK oficial de JBD Selektah — selektah/DJ de dancehall y latin dancehall desde El Limonar, Medellín. Booking, producciones, prensa y contacto directo. #NOLAPARE";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JBD SELEKTAH — Selektah de Dancehall | Medellín",
    template: "%s | JBD Selektah",
  },
  description: siteDescription,
  keywords: [
    "JBD Selektah",
    "selektah",
    "dancehall",
    "latin dancehall",
    "DJ dancehall Medellín",
    "DJ Colombia",
    "El Limonar",
    "booking DJ dancehall",
    "sound system",
    "#NOLAPARE",
  ],
  applicationName: "JBD Selektah EPK",
  authors: [{ name: "JBD Selektah" }],
  creator: "JBD Selektah",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "JBD SELEKTAH — Selektah de Dancehall | Medellín",
    description: siteDescription,
    url: siteUrl,
    siteName: "JBD Selektah",
    type: "website",
    locale: "es_CO",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "JBD Selektah — El ritmo de la calle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JBD SELEKTAH — Selektah de Dancehall | Medellín",
    description: siteDescription,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${unbounded.variable} ${spaceGrotesk.variable} ${syne.variable} antialiased bg-black text-silver selection:bg-gold selection:text-black overflow-x-hidden`}
      >
        <Preloader />
        <SmoothScroll />
        {children}
        <GrainOverlay />
        <Cursor />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
