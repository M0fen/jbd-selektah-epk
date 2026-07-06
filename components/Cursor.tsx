"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Gold dot with a soft lerp-trailing ring that swells over interactive elements.
 * Desktop / fine-pointer only; disabled entirely under reduced-motion.
 * Renders hidden by default and activates from an effect (no render-blocking state).
 */
export default function Cursor() {
    const reduceMotion = useReducedMotion();
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (reduceMotion) return;
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        document.body.style.cursor = "none";

        const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const pos = { x: mouse.x, y: mouse.y };
        let hovering = false;
        let rafId = 0;

        const place = (el: HTMLElement, x: number, y: number, scale = 1) => {
            el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
        };
        place(dot, mouse.x, mouse.y);
        place(ring, pos.x, pos.y);
        dot.style.opacity = "1";
        ring.style.opacity = "0.55";

        const onMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            place(dot, mouse.x, mouse.y);
        };
        const onOver = (e: MouseEvent) => {
            hovering = !!(e.target as HTMLElement)?.closest?.(
                "a, button, [role=button], input, textarea, select, label, .cursor-pointer"
            );
        };
        const loop = () => {
            pos.x += (mouse.x - pos.x) * 0.18;
            pos.y += (mouse.y - pos.y) * 0.18;
            place(ring, pos.x, pos.y, hovering ? 1.8 : 1);
            ring.style.opacity = hovering ? "1" : "0.55";
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseover", onOver);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
            document.body.style.cursor = "";
            dot.style.opacity = "0";
            ring.style.opacity = "0";
        };
    }, [reduceMotion]);

    return (
        <>
            <div
                ref={dotRef}
                aria-hidden
                className="pointer-events-none fixed left-0 top-0 z-[10000] h-1.5 w-1.5 rounded-full bg-gold opacity-0"
                style={{ willChange: "transform" }}
            />
            <div
                ref={ringRef}
                aria-hidden
                className="pointer-events-none fixed left-0 top-0 z-[10000] h-8 w-8 rounded-full border border-gold/60 opacity-0 transition-opacity duration-200"
                style={{ willChange: "transform" }}
            />
        </>
    );
}
