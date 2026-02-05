"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#bio", label: "¿Quién es JBD?" },
    { href: "#producciones", label: "Mis Producciones" },
    { href: "#booking", label: "Booking" },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    // Scroll-reveal logic
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const threshold = 450; // Show navbar after scrolling ~450px

            if (scrollY > threshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Check initial scroll position
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Fixed Navbar - Ghost Bar with Scroll Reveal */}
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${isVisible
                        ? "opacity-100 translate-y-0 pointer-events-auto bg-black/80 backdrop-blur-md"
                        : "opacity-0 -translate-y-10 pointer-events-none bg-gradient-to-b from-black/60 to-transparent backdrop-blur-[1px]"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-end gap-6 lg:gap-8">
                    {/* Desktop: Navigation Links + Logo */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-8">
                        {/* Navigation Links */}
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="relative text-white text-sm lg:text-base font-semibold tracking-wide uppercase transition-all duration-300 hover:text-[#C5A059] group"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                {link.label}
                                {/* Glow effect on hover */}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A059] transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(197,160,89,0.8)]"></span>
                            </a>
                        ))}

                        {/* Logo - Far Top Right with Large Spacing */}
                        <a href="#inicio" className="relative ml-16 lg:ml-24">
                            <Image
                                src="/logo.png"
                                alt="JBD Selektah"
                                width={40}
                                height={40}
                                className="h-8 lg:h-10 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                                quality={90}
                            />
                        </a>
                    </div>

                    {/* Mobile: Logo + Hamburger */}
                    <div className="md:hidden flex items-center gap-4">
                        {/* Logo on Mobile */}
                        <a href="#inicio" className="relative">
                            <Image
                                src="/logo.png"
                                alt="JBD Selektah"
                                width={32}
                                height={32}
                                className="h-7 w-auto opacity-80"
                                quality={90}
                            />
                        </a>

                        {/* Hamburger Icon */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-white hover:text-[#C5A059] transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden"
                    >
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="flex flex-col items-center justify-center h-full gap-8 px-6"
                        >
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={handleLinkClick}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                                    className="text-3xl sm:text-4xl font-bold text-white hover:text-[#C5A059] transition-colors duration-300 uppercase tracking-tight"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
