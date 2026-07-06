"use client";

import dynamic from "next/dynamic";

// three.js / R3F / drei / postprocessing are heavy and the WebGL field is purely
// ambient (behind content, never the LCP element). Load it client-side only, as a
// separate async chunk, so it stays out of the initial payload and streams in under
// the preloader.
const Background = dynamic(() => import("./Background"), { ssr: false });

export default function BackgroundLazy() {
    return <Background />;
}
