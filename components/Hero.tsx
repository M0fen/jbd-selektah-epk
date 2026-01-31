"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="h-screen w-full flex flex-col justify-center items-center text-center relative z-10 px-6">
            {/* Main Title - Massive, Gold, Unbounded 900 */}
            <motion.h1
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-gold tracking-tighter uppercase leading-none drop-shadow-2xl cursor-default relative z-10 max-w-[95%] mx-auto"
                whileHover={{
                    textShadow: [
                        "0px 0px 0px #F5D061",
                        "-2px 0px 0px #ff0000, 2px 0px 0px #0000ff",
                        "2px 0px 0px #ff0000, -2px 0px 0px #0000ff",
                        "0px 0px 0px #F5D061"
                    ],
                    skewX: [0, -5, 5, 0],
                    transition: {
                        duration: 0.2,
                        repeat: Infinity,
                        repeatType: "mirror"
                    }
                }}
            >
                JBD SELEKTAH
            </motion.h1>

            {/* Subtitle - Syne Font, Extra Bold, White */}
            <p
                className="mt-6 md:mt-8 text-sm sm:text-base md:text-xl lg:text-2xl font-extrabold text-white tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.5em] lg:tracking-[0.8em] uppercase opacity-90 relative z-10 max-w-[90%] mx-auto"
                style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
            >
                Pa&apos; la que lo sacuden cuden
            </p>

            {/* Signature Element - Bottom Right */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-12 z-20 -rotate-2">
                <p className="text-xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-white to-[#C5A059] bg-[length:200%_auto] animate-shine uppercase tracking-tight font-display">
                    #NOLAPARE
                </p>
            </div>

            {/* Smooth Gradient Fade Transition - Extremely Transparent */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-transparent via-transparent to-transparent z-20 pointer-events-none"></div>
        </section>
    );
}
