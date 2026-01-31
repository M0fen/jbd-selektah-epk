"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        id: 1,
        title: "¿Quien es JBD?",
        text: "El Ritmo de la calle, desde Medellín. No solo es un DJ, es un arquitecto de atmósferas. Su origen en El Limonar forjó un sonido auténtico y crudo que hoy lidera la escena nacional.",
        defaultImage: "/carousel/s1-main.jpg",
        hoverImage: "/carousel/s1-hover.jpg",
    },
    {
        id: 2,
        title: "El Sonido",
        text: "JBD representa un estilo fresco y vibrante con los platillos a la vez que robusto con su espeso y autoritario tono de voz.",
        defaultImage: "/carousel/s2-main.jpg",
        hoverImage: "/carousel/s2-hover.jpg",
    },
    {
        id: 3,
        title: "En la Tarima",
        text: "Dominio total del escenario. JBD no pide permiso, toma el control. Una energía visceral que despoja al público de inhibiciones, transformando la pista en una sola masa de movimiento.",
        defaultImage: "/carousel/s3-main.jpg",
        hoverImage: "/carousel/s3-hover.jpg",
    },
    {
        id: 4,
        title: "El Ritual",
        text: "Más que una fiesta, un evento de culto. JBD eleva el estándar, convirtiendo noches convencionales en experiencias inmersivas de alta tensión. La garantía de que la noche estará una chimba.",
        defaultImage: "/carousel/s4-main.jpg",
        hoverImage: "/carousel/s4-hover.jpg",
    },
    {
        id: 5,
        title: "El Sello",
        text: "JBD no es solo un artista, es una garantía de calidad. La fusión perfecta entre la agresividad de la calle y la sofisticación técnica. Es la firma de distinción que separa un evento común de una producción de alto nivel.",
        defaultImage: "/carousel/s5-main.jpg",
        hoverImage: "/carousel/s5-hover.jpg",
    },
];

export default function BioCarousel() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setIndex((prev) => {
            let next = prev + newDirection;
            if (next < 0) next = slides.length - 1;
            if (next >= slides.length) next = 0;
            return next;
        });
    };

    const currentSlide = slides[index];

    return (
        <section className="min-h-screen w-full flex items-center justify-center bg-transparent backdrop-blur-sm relative z-20 px-6 py-12 md:py-0">
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
                {/* Vertical "CAPISCI" Text - Left Side */}
                <h3
                    className="hidden md:block text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-white to-[#C5A059] bg-[length:200%_auto] animate-shine tracking-[0.5em] uppercase font-bold text-xl lg:text-2xl"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                    CAPISCI
                </h3>

                {/* Main Carousel Container */}
                <div className="w-full md:max-w-6xl grid grid-cols-1 md:grid-cols-2 border border-gold/10 relative p-4 sm:p-6 md:p-8">
                    {/* Top-Left Corner Accent */}
                    <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#C5A059]"></div>

                    {/* Top-Right Corner Accent */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#C5A059]"></div>

                    {/* Bottom-Left Corner Accent */}
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#C5A059]"></div>

                    {/* Bottom-Right Corner Accent */}
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#C5A059]"></div>

                    {/* Left: Image Side */}
                    <div
                        className="relative h-[50vh] md:h-[600px] w-full overflow-hidden border-b md:border-b-0 md:border-r border-gold/20"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={currentSlide.id}
                                custom={direction}
                                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="absolute inset-0"
                            >
                                <div className="relative w-full h-full">
                                    {/* Default Image */}
                                    <motion.div
                                        className="absolute inset-0"
                                        animate={{ opacity: isHovered ? 0 : 1 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                        <Image
                                            src={currentSlide.defaultImage}
                                            alt={currentSlide.title}
                                            fill
                                            className="object-cover"
                                            quality={95}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority={index === 0}
                                        />
                                    </motion.div>

                                    {/* Hover Image */}
                                    <motion.div
                                        className="absolute inset-0"
                                        animate={{ opacity: isHovered ? 1 : 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                        <Image
                                            src={currentSlide.hoverImage}
                                            alt={`${currentSlide.title} - Alternate`}
                                            fill
                                            className="object-cover"
                                            quality={95}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </motion.div>

                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right: Text Side */}
                    <div className="relative h-[50vh] md:h-[600px] w-full flex flex-col justify-center px-6 md:px-12">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-white to-[#C5A059] bg-[length:200%_auto] animate-shine mb-6 uppercase leading-tight font-display tracking-tight">
                                    {currentSlide.title}
                                </h2>
                                <p className="text-base md:text-lg text-silver/90 font-light leading-relaxed mb-8">
                                    {currentSlide.text}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Controls */}
                        <div className="flex items-center gap-8 mt-4">
                            <button
                                onClick={() => paginate(-1)}
                                className="group p-4 border border-gold/30 hover:border-gold rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-6 h-6 text-gold group-hover:text-white transition-colors" />
                            </button>

                            <div className="text-gold/50 font-mono text-sm">
                                0{index + 1} / 0{slides.length}
                            </div>

                            <button
                                onClick={() => paginate(1)}
                                className="group p-4 border border-gold/30 hover:border-gold rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-6 h-6 text-gold group-hover:text-white transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
