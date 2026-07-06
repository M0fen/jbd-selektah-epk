"use client";

import { FileText, Images, ClipboardList } from "lucide-react";
import Reveal from "./Reveal";

type Download = {
    titulo: string;
    detalle: string;
    href: string;
    icon: React.ReactNode;
};

// Los archivos se sirven desde /public/press/. Deja caer los reales ahí:
//   press-kit-jbd-selektah.pdf · fotos-alta-jbd-selektah.zip · rider-tecnico-jbd-selektah.pdf
const downloads: Download[] = [
    {
        titulo: "Press Kit",
        detalle: "PDF · Bio, logos y contacto",
        href: "/press/press-kit-jbd-selektah.pdf",
        icon: <FileText className="w-6 h-6" />,
    },
    {
        titulo: "Fotos en alta",
        detalle: "ZIP · Set de prensa para publicar",
        href: "/press/fotos-alta-jbd-selektah.zip",
        icon: <Images className="w-6 h-6" />,
    },
    {
        titulo: "Rider técnico",
        detalle: "PDF · Requerimientos de tarima",
        href: "/press/rider-tecnico-jbd-selektah.pdf",
        icon: <ClipboardList className="w-6 h-6" />,
    },
];

export default function PressKit() {
    return (
        <section
            id="presskit"
            className="relative z-10 w-full px-6 py-20 md:py-28 border-t border-gold/10"
        >
            <div className="max-w-5xl mx-auto">
                <div className="border border-[#C5A059]/30 bg-gradient-to-b from-[#1a1405] to-[#080500] shadow-[inset_0_0_50px_rgba(0,0,0,0.6)] backdrop-blur-lg rounded-3xl p-8 md:p-12 lg:p-16">
                    <Reveal className="mb-10 md:mb-12 text-center">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#C5A059] to-white bg-[length:200%_auto] animate-shine uppercase">
                            Press Kit
                        </h2>
                        <p className="text-gold text-xs sm:text-sm md:text-base uppercase tracking-widest font-bold">
                            Material de prensa para promotores
                        </p>
                    </Reveal>

                    <div className="grid gap-4 md:gap-6 md:grid-cols-3">
                        {downloads.map((d) => (
                            <a
                                key={d.titulo}
                                href={d.href}
                                download
                                className="group relative flex flex-col items-start gap-4 p-6 border border-white/10 bg-white/[0.03] rounded-2xl transition-all duration-500 hover:border-[#C5A059] hover:bg-[#C5A059]/10 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(197,160,89,0.25)]"
                            >
                                {/* corner accents */}
                                <span className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#C5A059]/0 group-hover:border-[#C5A059] transition-colors duration-500" />
                                <span className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#C5A059]/0 group-hover:border-[#C5A059] transition-colors duration-500" />

                                <span className="text-gold group-hover:scale-110 transition-transform duration-300">
                                    {d.icon}
                                </span>
                                <span>
                                    <span className="block font-display font-black uppercase tracking-tight text-white text-lg group-hover:text-[#C5A059] transition-colors">
                                        {d.titulo}
                                    </span>
                                    <span className="block text-sm text-silver/60 mt-1">{d.detalle}</span>
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
