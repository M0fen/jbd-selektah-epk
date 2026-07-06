"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Single, site-wide section entrance: fade + rise, with an optional overflow
 * "mask" wipe for headings. Respects prefers-reduced-motion (fade only).
 * Replaces the scattered ad-hoc whileInView animations across sections.
 */
export default function Reveal({
    children,
    className,
    delay = 0,
    mask = false,
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
    mask?: boolean;
}) {
    const reduceMotion = useReducedMotion();

    const variants: Variants = {
        hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: mask ? "100%" : 40 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: mask ? 0.9 : 0.7, ease: EASE, delay },
        },
    };

    if (mask) {
        return (
            <span className={`block overflow-hidden ${className ?? ""}`}>
                <motion.span
                    className="block"
                    variants={variants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {children}
                </motion.span>
            </span>
        );
    }

    return (
        <motion.div
            className={className}
            variants={variants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
        >
            {children}
        </motion.div>
    );
}
