"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { shows, type Show } from "@/data/shows";

const dayFmt = new Intl.DateTimeFormat("es-CO", { day: "2-digit" });
const monFmt = new Intl.DateTimeFormat("es-CO", { month: "short" });
const yearFmt = new Intl.DateTimeFormat("es-CO", { year: "numeric" });

function parse(d: string) {
    // Treat ISO date as local to avoid TZ off-by-one.
    const [y, m, day] = d.split("-").map(Number);
    return new Date(y, m - 1, day);
}

const rank: Record<Show["estado"], number> = { proximo: 0, agotado: 0, pasado: 1 };

const ordered = [...shows].sort((a, b) => {
    if (rank[a.estado] !== rank[b.estado]) return rank[a.estado] - rank[b.estado];
    const da = parse(a.fecha).getTime();
    const db = parse(b.fecha).getTime();
    // Upcoming ascending, past descending.
    return rank[a.estado] === 0 ? da - db : db - da;
});

function StatusBadge({ show }: { show: Show }) {
    if (show.estado === "agotado") {
        return (
            <span className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-widest text-silver/50 border border-silver/20 grayscale">
                Agotado
            </span>
        );
    }
    if (show.estado === "pasado") {
        return (
            <span className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-widest text-silver/30">
                Pasado
            </span>
        );
    }
    // proximo
    return show.tickets ? (
        <a
            href={show.tickets}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-black bg-gold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(197,160,89,0.5)]"
        >
            Boletas
        </a>
    ) : (
        <span className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-widest text-gold border border-gold/40 rounded-full">
            Próximo
        </span>
    );
}

export default function TourDates() {
    const reduceMotion = useReducedMotion();

    return (
        <section
            id="shows"
            className="relative z-10 w-full px-6 py-20 md:py-28 border-t border-gold/10"
        >
            <div className="max-w-4xl mx-auto">
                <Reveal mask className="mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-white to-[#C5A059] bg-[length:200%_auto] animate-shine">
                        Próximas fechas
                    </h2>
                </Reveal>

                <ul className="flex flex-col">
                    {ordered.map((show, i) => {
                        const date = parse(show.fecha);
                        const dim = show.estado === "pasado";
                        return (
                            <motion.li
                                key={`${show.fecha}-${show.ciudad}`}
                                initial={reduceMotion ? undefined : { opacity: 0, x: -20 }}
                                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3), ease: "easeOut" }}
                                className={`group flex items-center gap-4 sm:gap-6 py-5 border-b border-gold/10 ${dim ? "opacity-50" : ""}`}
                            >
                                {/* Date block */}
                                <div className="flex flex-col items-center justify-center w-16 sm:w-20 shrink-0 border-r border-gold/15 pr-4 sm:pr-6">
                                    <span className="font-display font-black text-2xl sm:text-3xl leading-none text-gold">
                                        {dayFmt.format(date)}
                                    </span>
                                    <span className="text-[0.65rem] uppercase tracking-widest text-silver/60 mt-1">
                                        {monFmt.format(date).replace(".", "")} {yearFmt.format(date)}
                                    </span>
                                </div>

                                {/* City + venue */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-display font-bold text-lg sm:text-2xl uppercase tracking-tight text-white truncate group-hover:text-[#C5A059] transition-colors">
                                        {show.ciudad}
                                    </p>
                                    <p className="text-sm text-silver/60 truncate">{show.venue}</p>
                                </div>

                                {/* Status / CTA */}
                                <div className="shrink-0">
                                    <StatusBadge show={show} />
                                </div>
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
