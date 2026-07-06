"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { press, quotes } from "@/data/press";

export default function Press() {
    return (
        <section
            id="prensa"
            className="relative z-10 w-full px-6 py-20 md:py-28 border-t border-gold/10"
        >
            <div className="max-w-6xl mx-auto">
                <Reveal mask className="mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-white to-[#C5A059] bg-[length:200%_auto] animate-shine">
                        Han sonado con JBD
                    </h2>
                </Reveal>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-gold/10 border border-gold/10">
                    {press.map((item) => {
                        const content = item.logo ? (
                            <Image
                                src={item.logo}
                                alt={item.nombre}
                                width={160}
                                height={64}
                                className="h-10 w-auto object-contain opacity-70 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                            />
                        ) : (
                            <span className="font-display font-black text-sm sm:text-base uppercase tracking-tight text-silver/50 transition duration-500 group-hover:text-[#C5A059] group-hover:[text-shadow:0_0_18px_rgba(197,160,89,0.5)]">
                                {item.nombre}
                            </span>
                        );

                        const inner = (
                            <div className="group flex h-24 sm:h-28 items-center justify-center bg-black/50 px-4 text-center transition-colors duration-500 hover:bg-black/20">
                                {content}
                            </div>
                        );

                        return item.url ? (
                            <a
                                key={item.nombre}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={item.nombre}
                            >
                                {inner}
                            </a>
                        ) : (
                            <div key={item.nombre}>{inner}</div>
                        );
                    })}
                </div>

                {quotes.length > 0 && (
                    <div className="mt-16 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                        {quotes.map((q, i) => (
                            <Reveal key={q.fuente} delay={i * 0.08}>
                                <blockquote className="relative border-l-2 border-[#C5A059]/50 pl-6">
                                    <p className="text-lg md:text-xl text-silver/90 font-light italic leading-relaxed">
                                        “{q.texto}”
                                    </p>
                                    <footer className="mt-3 text-xs uppercase tracking-[0.2em] text-gold/70">
                                        {q.fuente}
                                    </footer>
                                </blockquote>
                            </Reveal>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
