"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MIN_MS = 650; // avoid a jarring flash if assets are already cached
const MAX_MS = 1800; // hard cap — never block longer than this

export default function Preloader() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const start = performance.now();
        let hardCap = 0;

        const hide = () => {
            const elapsed = performance.now() - start;
            const wait = Math.max(0, MIN_MS - elapsed);
            window.setTimeout(() => setVisible(false), wait);
        };

        if (document.readyState === "complete") {
            hide();
        } else {
            window.addEventListener("load", hide, { once: true });
        }
        hardCap = window.setTimeout(() => setVisible(false), MAX_MS);

        return () => {
            window.removeEventListener("load", hide);
            window.clearTimeout(hardCap);
        };
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="preloader"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    onClick={() => setVisible(false)}
                    role="status"
                    aria-label="Cargando"
                    className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-black cursor-pointer"
                >
                    {/* Spinning vinyl */}
                    <div className="relative h-28 w-28">
                        <div className="absolute inset-0 rounded-full border border-gold/20" />
                        <div
                            className="absolute inset-0 rounded-full animate-[spin_1.2s_linear_infinite]"
                            style={{
                                background:
                                    "repeating-radial-gradient(circle at center, #0c0c0c 0 3px, #050505 3px 6px)",
                                boxShadow: "inset 0 0 30px rgba(0,0,0,0.9)",
                            }}
                        />
                        <div className="absolute inset-[38%] rounded-full bg-gradient-to-br from-[#F5D061] to-[#C5A059]" />
                        <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
                    </div>

                    <p className="mt-8 font-display text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-white to-[#C5A059]">
                        JBD Selektah
                    </p>
                    <p className="mt-2 text-[0.65rem] uppercase tracking-[0.5em] text-gold/70 animate-pulse">
                        Sintonizando…
                    </p>

                    <span className="absolute bottom-8 text-[0.6rem] uppercase tracking-widest text-silver/40">
                        Toca para saltar
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
