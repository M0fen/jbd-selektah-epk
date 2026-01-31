import type { Metadata } from "next";
import { Unbounded, Space_Grotesk, Syne } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["300", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  // Space Grotesk is a variable font by default usually, but we can specify if needed.
  // Default is fine.
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["800"],
});

export const metadata: Metadata = {
  title: "JBD SELEKTAH | El Ritmo de la Calle",
  description: "Official EPK of JBD Selektah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${unbounded.variable} ${spaceGrotesk.variable} ${syne.variable} antialiased bg-black text-silver selection:bg-gold selection:text-black overflow-x-hidden`}
      >
        {/* Fixed Global Logo - Top Right */}
        <div className="fixed top-6 right-6 z-50 pointer-events-none">
          <div className="relative w-16 md:w-20 h-16 md:h-20">
            <Image
              src="/logo.png"
              alt="JBD Selektah"
              fill
              className="object-contain opacity-60 mix-blend-lighten"
              quality={90}
            />
          </div>
        </div>

        {children}
      </body>
    </html>
  );
}
