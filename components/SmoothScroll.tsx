"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

/**
 * Cinematic smooth scroll (Lenis). Mounted once, renders nothing.
 * Fully disabled under prefers-reduced-motion — native scroll takes over.
 */
export default function SmoothScroll() {
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (reduceMotion) return;

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        let rafId = 0;
        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        // Route in-page anchor clicks through Lenis for smooth section jumps.
        const onClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
            if (!anchor) return;
            const href = anchor.getAttribute("href");
            if (!href || href === "#") return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                lenis.scrollTo(target as HTMLElement, { offset: 0 });
            }
        };
        document.addEventListener("click", onClick);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener("click", onClick);
            lenis.destroy();
        };
    }, [reduceMotion]);

    return null;
}
