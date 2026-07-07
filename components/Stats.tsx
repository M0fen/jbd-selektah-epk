"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { stats, type Stat } from "@/data/stats";

const nf = new Intl.NumberFormat("es-CO");

function StatItem({ stat }: { stat: Stat }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const reduceMotion = useReducedMotion();
    const [animated, setAnimated] = useState(0);

    // Reduced motion: mostrar la cifra real de inmediato, sin count-up.
    const value = reduceMotion ? stat.value : animated;

    useEffect(() => {
        if (reduceMotion || !inView) return;
        const controls = animate(0, stat.value, {
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => setAnimated(v),
        });
        return () => controls.stop();
    }, [inView, reduceMotion, stat.value]);

    return (
        <div ref={ref} className="flex flex-col items-center text-center">
            <span className="font-display font-black tabular-nums leading-[0.95] text-5xl sm:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-[#F5D061] to-[#C5A059] drop-shadow-[0_2px_20px_rgba(245,208,97,0.15)]">
                {nf.format(Math.round(value))}
                {stat.suffix}
            </span>
            <span className="mt-3 text-[0.7rem] sm:text-xs uppercase tracking-[0.28em] text-silver/55">
                {stat.label}
            </span>
        </div>
    );
}

export default function Stats() {
    return (
        <section id="stats" className="relative z-10 w-full px-6 py-16 md:py-24">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-y-12 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-8">
                {stats.map((stat) => (
                    <StatItem key={stat.label} stat={stat} />
                ))}
            </div>
        </section>
    );
}
