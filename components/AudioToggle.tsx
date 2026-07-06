"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { audioReactive } from "@/lib/audio";

// Track preview lives here. Drop a short (~15–30s) JBD clip at this path.
const TRACK_SRC = "/audio/preview.mp3";

export default function AudioToggle() {
    const [on, setOn] = useState(false);

    const toggle = async () => {
        const active = await audioReactive.toggle(TRACK_SRC);
        setOn(active);
    };

    return (
        <button
            onClick={toggle}
            aria-label={on ? "Silenciar el fondo" : "Activar el fondo audio-reactivo"}
            aria-pressed={on}
            className={`fixed bottom-8 left-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-110 ${
                on
                    ? "border-gold bg-gold/15 text-gold shadow-[0_0_24px_rgba(245,208,97,0.5)]"
                    : "border-white/25 bg-white/5 text-white/80 hover:border-gold hover:text-gold"
            }`}
        >
            {on ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            <span className="sr-only">{on ? "Audio activo" : "Audio en silencio"}</span>
        </button>
    );
}
