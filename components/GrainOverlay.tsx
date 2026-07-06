/**
 * Global grain + scanlines. Purely decorative, pointer-events-none, low opacity.
 * Animation is frozen under prefers-reduced-motion (see globals.css).
 */
export default function GrainOverlay() {
    return (
        <>
            <div className="fx-overlay fx-scanlines" aria-hidden />
            <div className="fx-overlay fx-grain" aria-hidden />
        </>
    );
}
