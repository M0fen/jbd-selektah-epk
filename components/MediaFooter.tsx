"use client";

export default function MediaFooter() {
    const videos = [
        { id: "irK0_4iP13s", title: "JBD Selektah - Tokiti" }, // Tokiti - Top of pyramid
        { id: "znRUNuI5hbY", title: "Production 2" },
        { id: "IYQQ-Gf5_Eo", title: "Cacaote - Zig Zag | Jbd Selektah" },
    ];

    return (
        <footer className="relative z-10 bg-transparent pt-24 pb-12 px-6 border-t border-gold/10">
            <div className="max-w-7xl mx-auto text-center">
                {/* Media Section */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-white to-[#C5A059] bg-[length:200%_auto] animate-shine mb-12 md:mb-16 uppercase tracking-tight">
                    MIS PRODUCCIONES
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
                    {videos.map((video, index) => (
                        <div
                            key={video.id}
                            className={`group relative aspect-video w-full overflow-hidden border-2 border-gold/30 hover:border-gold transition-colors duration-500 rounded-sm ${index === 0 ? 'md:col-span-2 md:max-w-3xl md:mx-auto' : ''
                                }`}
                        >
                            <iframe
                                src={`https://www.youtube.com/embed/${video.id}`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Notable Gold Divider - Separates Watch from Listen */}
                <div className="w-full max-w-2xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent my-12 md:my-16"></div>

                {/* Spotify Section */}
                <div className="w-full max-w-3xl mx-auto mb-24 md:mb-32 border border-[#C5A059]/50 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(197,160,89,0.15)] bg-black/80 backdrop-blur-sm px-2 py-2">
                    <iframe
                        style={{ borderRadius: "12px" }}
                        src="https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO1S0cU1?si=BqhvDOYYTtuOJr_0iVA0fw"
                        width="100%"
                        height="352"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </footer>
    );
}
