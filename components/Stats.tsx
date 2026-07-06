"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { stats, type Stat } from "@/data/stats";

const nf = new Intl.NumberFormat("es-CO");

function StatTile({ stat }: { stat: Stat }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const reduceMotion = useReducedMotion();
    const [animated, setAnimated] = useState(0);

    // Reduced motion: show the real figure immediately, no count-up.
    const value = reduceMotion ? stat.value : animated;

    useEffect(() => {
        if (reduceMotion || !inView) return;
        const controls = animate(0, stat.value, {
            duration: 1.6,
            ease: "easeOut",
            onUpdate: (v) => setAnimated(v),
        });
        return () => controls.stop();
    }, [inView, reduceMotion, stat.value]);

    return (
        <div
            ref={ref}
            className="relative flex flex-col items-center justify-center px-4 py-8 sm:py-10"
        >
            <span className="font-display font-black tabular-nums leading-none text-4xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white via-[#F5D061] to-[#C5A059]">
                {nf.format(Math.round(value))}
                {stat.suffix}
            </span>
            <span className="mt-3 text-[0.7rem] sm:text-xs uppercase tracking-[0.2em] text-silver/70 text-center">
                {stat.label}
            </span>
        </div>
    );
}

export default function Stats() {
    return (
        <section
            id="stats"
            className="relative z-10 w-full px-6 py-20 md:py-28 border-t border-gold/10"
        >
            <Reveal className="relative max-w-6xl mx-auto border border-gold/15 bg-black/30 backdrop-blur-sm px-4 sm:px-8 py-6">
                {/* Corner accents — brand system */}
                <span className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#C5A059]" />
                <span className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#C5A059]" />
                <span className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#C5A059]" />
                <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#C5A059]" />

                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gold/10">
                    {stats.map((stat) => (
                        <StatTile key={stat.label} stat={stat} />
                    ))}
                </div>
            </Reveal>
        </section>
    );
}
