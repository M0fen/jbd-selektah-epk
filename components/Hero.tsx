"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useReducedMotion,
    type Variants,
} from "framer-motion";

const NAME = "JBD SELEKTAH";
const TAG = "Pa' la que lo sacuden cuden";
const META = "MEDELLÍN · DANCEHALL · SOUND SYSTEM";
const GLYPHS = "▓█▒░/\\|<>#@*+=×÷";

// reveal: las palabras suben en máscara · glitch: un barrido de "sintonía"
// recorre el nombre ya revelado · done: estado final asentado.
type Mode = "reveal" | "glitch" | "done";

const HOLD_MS = 220; // pausa tras el reveal antes del glitch
const GLITCH_MS = 620; // duración del barrido
const REVEAL_FALLBACK_MS = 1500; // red de seguridad si onAnimationComplete no dispara

const container: Variants = {
    hidden: {},
    in: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const wordVar: Variants = {
    hidden: { y: "115%" },
    in: { y: "0%", transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Barrido de "sintonía": una banda estrecha de glyphs recorre el nombre de
 * izquierda a derecha. En t=0 y t=1 el texto es 100% NAME, así que el enlace
 * reveal→glitch→done es sin costuras y el nombre nunca desaparece.
 */
function sweep(target: string, t: number): string {
    const cursor = t * (target.length + 3) - 1.5;
    let out = "";
    for (let i = 0; i < target.length; i++) {
        const ch = target[i];
        if (ch === " ") {
            out += " ";
            continue;
        }
        out += Math.abs(i - cursor) < 1.5 ? GLYPHS[(Math.random() * GLYPHS.length) | 0] : ch;
    }
    return out;
}

export default function Hero() {
    const prefersReduced = useReducedMotion();
    const reduced = prefersReduced === true; // coerce null → false, evita doble arranque

    const [mode, setMode] = useState<Mode>("reveal");
    // Bajo reduced-motion saltamos directo al final, sin setState en efecto.
    const activeMode: Mode = reduced ? "done" : mode;
    const showFinal = activeMode === "done";

    const advanced = useRef(false);
    const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const rafId = useRef(0);
    const glitchRef = useRef<HTMLSpanElement>(null);

    // Parallax (solo puntero fino / desktop)
    const px = useMotionValue(0);
    const py = useMotionValue(0);
    const spx = useSpring(px, { stiffness: 55, damping: 15, mass: 0.4 });
    const spy = useSpring(py, { stiffness: 55, damping: 15, mass: 0.4 });
    const nameX = useTransform(spx, (v) => v * 16);
    const nameY = useTransform(spy, (v) => v * 10);
    const tagX = useTransform(spx, (v) => v * 9);
    const tagY = useTransform(spy, (v) => v * 6);
    const sigX = useTransform(spx, (v) => v * 22);
    const sigY = useTransform(spy, (v) => v * 14);

    const clearTimers = useCallback(() => {
        if (holdTimer.current) clearTimeout(holdTimer.current);
        if (rafId.current) cancelAnimationFrame(rafId.current);
    }, []);

    const advanceToGlitch = useCallback(() => {
        if (advanced.current) return;
        advanced.current = true;
        holdTimer.current = setTimeout(() => setMode("glitch"), HOLD_MS);
    }, []);

    // Red de seguridad: avanza aunque onAnimationComplete no dispare.
    useEffect(() => {
        if (reduced) return;
        const fb = setTimeout(advanceToGlitch, REVEAL_FALLBACK_MS);
        return () => clearTimeout(fb);
    }, [reduced, advanceToGlitch]);

    // Barrido glitch — escribe a textContent vía ref (cero re-renders por frame).
    useEffect(() => {
        if (activeMode !== "glitch") return;
        const el = glitchRef.current;
        if (!el) return;

        const start = performance.now();
        let last = 0;
        el.textContent = sweep(NAME, 0);

        const tick = (now: number) => {
            if (now - last >= 32) {
                last = now;
                const t = Math.min(1, (now - start) / GLITCH_MS);
                el.textContent = sweep(NAME, t);
                if (t >= 1) {
                    el.textContent = NAME;
                    setMode("done");
                    return;
                }
            }
            rafId.current = requestAnimationFrame(tick);
        };
        rafId.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId.current);
    }, [activeMode]);

    // Parallax listener (solo puntero fino)
    useEffect(() => {
        if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
        const onMove = (e: MouseEvent) => {
            px.set(e.clientX / window.innerWidth - 0.5);
            py.set(e.clientY / window.innerHeight - 0.5);
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
    }, [reduced, px, py]);

    // Limpieza al desmontar
    useEffect(() => clearTimers, [clearTimers]);

    // Tap/click para saltar la intro (clave en mobile)
    const skipIntro = () => {
        if (activeMode === "done") return;
        advanced.current = true;
        clearTimers();
        setMode("done");
    };

    const words = NAME.split(" ");
    // Caja compartida entre modos para que no haya salto de layout.
    const nameBox = "inline-block align-top pb-[0.1em] will-change-transform";

    return (
        <section
            id="inicio"
            onClick={skipIntro}
            className="h-screen w-full flex flex-col justify-center items-center text-center relative z-10 px-6"
        >
            {/* NOMBRE */}
            <motion.div style={{ x: nameX, y: nameY }} className="relative z-10 max-w-[95%] mx-auto">
                <h1
                    aria-label={NAME}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-gold tracking-tighter uppercase leading-none drop-shadow-2xl cursor-default select-none min-h-[1.1em]"
                >
                    {activeMode === "reveal" ? (
                        <motion.span
                            aria-hidden
                            variants={container}
                            initial="hidden"
                            animate="in"
                            onAnimationComplete={advanceToGlitch}
                            className="inline-block"
                        >
                            {words.map((word, i) => (
                                <span key={i} className="inline-block overflow-hidden align-top pb-[0.1em]">
                                    <motion.span variants={wordVar} className="inline-block will-change-transform">
                                        {word}
                                        {i < words.length - 1 ? " " : ""}
                                    </motion.span>
                                </span>
                            ))}
                        </motion.span>
                    ) : activeMode === "glitch" ? (
                        <span ref={glitchRef} aria-hidden className={nameBox} />
                    ) : (
                        <span aria-hidden className={nameBox}>
                            {NAME}
                        </span>
                    )}
                </h1>
            </motion.div>

            {/* TAGLINE */}
            <motion.p
                style={{ x: tagX, y: tagY, fontFamily: "var(--font-syne)", fontWeight: 800 }}
                initial={false}
                animate={showFinal ? { opacity: 0.9 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: reduced ? 0 : 0.05, ease: "easeOut" }}
                className="mt-6 md:mt-8 text-sm sm:text-base md:text-xl lg:text-2xl font-extrabold text-white tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.5em] lg:tracking-[0.8em] uppercase relative z-10 max-w-[90%] mx-auto select-none"
            >
                {TAG}
            </motion.p>

            {/* METADATA */}
            <motion.p
                initial={false}
                animate={showFinal ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.6, delay: reduced ? 0 : 0.18, ease: "easeOut" }}
                className="mt-4 md:mt-5 text-[10px] sm:text-xs md:text-sm font-mono tracking-[0.28em] md:tracking-[0.34em] uppercase text-[#A0824A] relative z-10 select-none"
            >
                {META}
            </motion.p>

            {/* SIGNATURE #NOLAPARE */}
            <motion.div
                style={{ x: sigX, y: sigY }}
                initial={false}
                animate={showFinal ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: reduced ? 0 : 0.32 }}
                className="absolute bottom-4 right-4 md:bottom-8 md:right-12 z-20 -rotate-2 select-none"
            >
                <p className="text-xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-white to-[#C5A059] bg-[length:200%_auto] animate-shine uppercase tracking-tight font-display">
                    #NOLAPARE
                </p>
            </motion.div>

            {/* SCROLL CUE */}
            <motion.div
                initial={false}
                animate={showFinal ? { opacity: 0.7 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: reduced ? 0 : 0.5 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                aria-hidden="true"
            >
                <motion.span
                    className="block w-px h-7 bg-gradient-to-b from-gold to-transparent origin-top"
                    animate={reduced ? undefined : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </section>
    );
}
