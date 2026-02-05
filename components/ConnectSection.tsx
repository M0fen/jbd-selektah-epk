"use client";

import { Mail, MessageCircle, Instagram, Video } from "lucide-react";

export default function ConnectSection() {
    return (
        <section id="booking" className="relative z-10 py-20 md:py-32 px-6 bg-transparent">
            <div className="max-w-5xl mx-auto">
                {/* Glass Box Container */}
                <div className="border border-[#C5A059]/30 bg-gradient-to-b from-[#1a1405] to-[#080500] shadow-[inset_0_0_50px_rgba(0,0,0,0.6)] backdrop-blur-lg rounded-3xl p-8 md:p-12 lg:p-16 text-center">
                    {/* Header */}
                    <div className="mb-12 md:mb-16">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#C5A059] to-white bg-[length:200%_auto] animate-shine">
                            SINTONIZA
                        </h2>
                        <p className="text-gold text-xs sm:text-sm md:text-base uppercase tracking-widest font-bold">
                            BOOKING & MANAGEMENT
                        </p>
                    </div>

                    {/* Social Sphere - Circular Glassmorphism Buttons */}
                    <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-12 md:mb-16">
                        <SocialOrb
                            href="https://www.tiktok.com/@jbdselektah"
                            icon={
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            }
                            label="TikTok"
                        />
                        <SocialOrb
                            href="https://www.instagram.com/jbdselektah/"
                            icon={<Instagram className="w-5 h-5 sm:w-6 sm:h-6" />}
                            label="Instagram"
                        />
                        <SocialOrb
                            href="https://www.facebook.com/SelektahJBD?locale=es_LA"
                            icon={
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            }
                            label="Facebook"
                        />
                        <SocialOrb
                            href="https://www.youtube.com/watch?v=IYQQ-Gf5_Eo"
                            icon={
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            }
                            label="YouTube"
                        />
                    </div>

                    {/* Business Action Buttons - Pill-shaped */}
                    <div className="flex flex-col md:flex-row justify-center items-stretch md:items-center gap-4 max-w-2xl mx-auto">
                        <ActionButton
                            href="mailto:booking@jbdselektah.com"
                            variant="gold"
                            icon={<Mail className="w-4 h-4 sm:w-5 sm:h-5" />}
                        >
                            CONTÁCTAME POR EMAIL
                        </ActionButton>
                        <ActionButton
                            href="https://wa.me/573000000000"
                            variant="green"
                            icon={<MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
                        >
                            O ESCRÍBEME AL WHATSAPP
                        </ActionButton>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Social Orb Component - Circular Glassmorphism
function SocialOrb({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="group relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-md hover:border-[#C5A059] hover:bg-[#C5A059]/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(197,160,89,0.4)]"
        >
            <div className="text-white/80 group-hover:text-[#C5A059] transition-colors duration-300">
                {icon}
            </div>
        </a>
    );
}

// Action Button Component - Pill-shaped
function ActionButton({
    href,
    variant,
    icon,
    children,
}: {
    href: string;
    variant: "gold" | "green";
    icon: React.ReactNode;
    children: React.ReactNode;
}) {
    const goldStyles = "border-[#C5A059]/60 text-white hover:text-[#C5A059] hover:border-[#C5A059] hover:shadow-[0_0_40px_rgba(197,160,89,0.3)]";
    const greenStyles = "border-[#C5A059]/60 text-[#C5A059] hover:text-green-500 hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]";

    return (
        <a
            href={href}
            target={variant === "green" ? "_blank" : undefined}
            rel={variant === "green" ? "noopener noreferrer" : undefined}
            className={`
                group relative px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center gap-2 sm:gap-3 rounded-full
                border-2 bg-transparent backdrop-blur-sm w-full sm:w-auto
                font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase
                transition-all duration-500
                hover:scale-105 hover:-translate-y-1
                ${variant === "gold" ? goldStyles : greenStyles}
            `}
        >
            <span className="transition-transform duration-300 group-hover:rotate-12">
                {icon}
            </span>
            {children}
        </a>
    );
}
