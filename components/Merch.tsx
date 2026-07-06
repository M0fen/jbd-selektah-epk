"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { productos, formatCOP, type Producto } from "@/data/merch";

function waLink(p: Producto, mensaje: string) {
    if (p.cta.tipo === "externo") return p.cta.valor;
    return `https://wa.me/${p.cta.valor}?text=${encodeURIComponent(mensaje)}`;
}

function StateBadge({ estado }: { estado: Producto["estado"] }) {
    if (estado === "disponible")
        return (
            <span className="absolute top-3 left-3 z-20 px-3 py-1 text-[0.65rem] font-black uppercase tracking-widest text-black bg-gold rounded-full shadow-[0_0_18px_rgba(245,208,97,0.6)]">
                Drop
            </span>
        );
    if (estado === "agotado")
        return (
            <span className="absolute top-3 left-3 z-20 px-3 py-1 text-[0.65rem] font-black uppercase tracking-widest text-silver/70 border border-silver/30 rounded-full">
                Sold Out
            </span>
        );
    return (
        <span className="absolute top-3 left-3 z-20 px-3 py-1 text-[0.65rem] font-black uppercase tracking-widest text-gold border border-gold/50 rounded-full">
            Próximo
        </span>
    );
}

function Cta({ producto }: { producto: Producto }) {
    const base =
        "block w-full text-center px-4 py-3 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300";

    if (producto.estado === "agotado") {
        return (
            <span className={`${base} text-silver/40 border border-silver/15 cursor-not-allowed select-none`}>
                Agotado
            </span>
        );
    }

    if (producto.estado === "proximo") {
        return (
            <a
                href={waLink(producto, `Hola JBD, avísame cuando salga el ${producto.nombre}`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${base} text-gold border border-gold/40 hover:bg-gold hover:text-black`}
            >
                Avísame
            </a>
        );
    }

    return (
        <a
            href={waLink(
                producto,
                `Hola JBD, quiero el ${producto.nombre}${producto.tallas ? " (talla: ___)" : ""}`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={`${base} text-black bg-gold hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(197,160,89,0.5)]`}
        >
            Comprar por WhatsApp
        </a>
    );
}

function Card({ producto }: { producto: Producto }) {
    const agotado = producto.estado === "agotado";
    return (
        <div className="group flex flex-col">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-gold/15 bg-black/40">
                {/* corner accents */}
                <span className="absolute top-1.5 left-1.5 z-20 w-4 h-4 border-t-2 border-l-2 border-[#C5A059]/70" />
                <span className="absolute top-1.5 right-1.5 z-20 w-4 h-4 border-t-2 border-r-2 border-[#C5A059]/70" />
                <span className="absolute bottom-1.5 left-1.5 z-20 w-4 h-4 border-b-2 border-l-2 border-[#C5A059]/70" />
                <span className="absolute bottom-1.5 right-1.5 z-20 w-4 h-4 border-b-2 border-r-2 border-[#C5A059]/70" />

                <StateBadge estado={producto.estado} />

                {/* main image */}
                <Image
                    src={producto.imagen}
                    alt={producto.nombre}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className={`object-cover transition-opacity duration-500 ${
                        producto.imagenHover ? "group-hover:opacity-0" : ""
                    } ${agotado ? "grayscale" : ""}`}
                />

                {/* hover-reveal image (crossfade, no layout shift) */}
                {producto.imagenHover && (
                    <Image
                        src={producto.imagenHover}
                        alt=""
                        aria-hidden
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className={`object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                            agotado ? "grayscale" : ""
                        }`}
                    />
                )}

                {agotado && <div className="absolute inset-0 z-10 bg-black/50" />}
            </div>

            {/* meta */}
            <div className="mt-4 flex items-start justify-between gap-3">
                <h3 className="font-display font-bold uppercase tracking-tight text-white text-sm sm:text-base leading-tight">
                    {producto.nombre}
                </h3>
                <span className="shrink-0 font-mono text-gold text-sm sm:text-base">
                    {formatCOP(producto.precio)}
                </span>
            </div>

            {producto.tallas && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                    {producto.tallas.map((t) => (
                        <span
                            key={t}
                            className="px-2 py-0.5 text-[0.65rem] font-bold uppercase text-silver/60 border border-silver/15 rounded"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            )}

            <div className="mt-4">
                <Cta producto={producto} />
            </div>
        </div>
    );
}

function Countdown({ target }: { target: string }) {
    const [left, setLeft] = useState<number | null>(null);

    useEffect(() => {
        const [y, m, d] = target.split("-").map(Number);
        const end = new Date(y, m - 1, d).getTime();
        const tick = () => setLeft(Math.max(0, end - Date.now()));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [target]);

    if (left === null || left <= 0) return null;

    const s = Math.floor(left / 1000);
    const parts = [
        { v: Math.floor(s / 86400), l: "días" },
        { v: Math.floor((s % 86400) / 3600), l: "hrs" },
        { v: Math.floor((s % 3600) / 60), l: "min" },
        { v: s % 60, l: "seg" },
    ];

    return (
        <div className="flex items-center justify-center gap-3 sm:gap-5 mt-6">
            {parts.map((p) => (
                <div key={p.l} className="flex flex-col items-center">
                    <span className="font-display font-black tabular-nums text-2xl sm:text-4xl text-gold leading-none">
                        {String(p.v).padStart(2, "0")}
                    </span>
                    <span className="text-[0.6rem] uppercase tracking-widest text-silver/50 mt-1">
                        {p.l}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default function Merch() {
    const nextDrop = productos.find((p) => p.estado === "proximo" && p.fechaDrop);

    return (
        <section
            id="merch"
            className="relative z-10 w-full px-6 py-20 md:py-28 border-t border-gold/10"
        >
            <div className="max-w-7xl mx-auto">
                <Reveal className="text-center mb-4">
                    <h2 className="metallic-title text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight">
                        La Tienda
                    </h2>
                    <p className="text-gold text-xs sm:text-sm uppercase tracking-widest font-bold mt-3">
                        Línea Eme · Drop oficial
                    </p>
                </Reveal>

                {nextDrop?.fechaDrop && <Countdown target={nextDrop.fechaDrop} />}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-12">
                    {productos.map((p) => (
                        <Card key={p.id} producto={p} />
                    ))}
                </div>
            </div>
        </section>
    );
}
