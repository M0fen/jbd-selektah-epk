"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
    return (
        <a
            href="https://wa.me/573239829864?text=Hola%20JBD%2C%20quiero%20cotizar%20una%20fecha%20%2Fbooking"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 p-4 bg-gold hover:bg-green-500 rounded-full text-black hover:text-white shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all duration-300 hover:scale-110 group"
            aria-label="Escríbeme por WhatsApp para booking"
        >
            <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-gold px-3 py-1 rounded-md text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gold/20">
                Booking
            </span>
        </a>
    );
}
