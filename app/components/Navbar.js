"use client";


import { useState, useEffect } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(() => {
        if (isMenuOpen) {
            gsap.to(".mobile-menu", {
                clipPath: "circle(150% at 100% 0%)",
                duration: 0.8,
                ease: "power3.inOut",
            });
            gsap.from(".mobile-link", {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                delay: 0.3,
                ease: "power2.out",
            });
        } else {
            gsap.to(".mobile-menu", {
                clipPath: "circle(0% at 100% 0%)",
                duration: 0.8,
                ease: "power3.inOut",
            });
        }
    }, [isMenuOpen]);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 ${isScrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-heading font-bold tracking-tighter text-brand-forest">
                    CLASSIC<span className="text-brand-accent">HORIZON</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    <Link href="/packages" className="text-sm font-medium hover:text-brand-accent transition-colors">Packages</Link>
                    <Link href="/destinations" className="text-sm font-medium hover:text-brand-accent transition-colors">Destinations</Link>
                    <Link href="/about" className="text-sm font-medium hover:text-brand-accent transition-colors">About</Link>
                </div>

                {/* CTA & Menu Toggle */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/booking"
                        className="hidden sm:block px-6 py-2.5 bg-brand-forest text-brand-white text-xs font-bold uppercase tracking-widest hover:bg-brand-charcoal transition-all duration-300"
                    >
                        Travel Enquiry
                    </Link>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="relative z-110 flex flex-col gap-1.5 cursor-pointer"
                    >
                        <span className={`w-8 h-0.5 bg-brand-forest transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                        <span className={`w-8 h-0.5 bg-brand-forest transition-all ${isMenuOpen ? "opacity-0" : ""}`}></span>
                        <span className={`w-8 h-0.5 bg-brand-forest transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className="mobile-menu fixed inset-0 bg-brand-forest text-brand-white z-100 flex flex-col items-center justify-center gap-8 md:gap-12" style={{ clipPath: "circle(0% at 100% 0%)" }}>
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="mobile-link text-4xl font-heading font-bold hover:text-brand-accent transition-colors">Home</Link>
                <Link href="/packages" onClick={() => setIsMenuOpen(false)} className="mobile-link text-4xl font-heading font-bold hover:text-brand-accent transition-colors">Packages</Link>
                <Link href="/destinations" onClick={() => setIsMenuOpen(false)} className="mobile-link text-4xl font-heading font-bold hover:text-brand-accent transition-colors">Destinations</Link>
                <Link href="/about" onClick={() => setIsMenuOpen(false)} className="mobile-link text-4xl font-heading font-bold hover:text-brand-accent transition-colors">About</Link>
                <Link href="/booking" onClick={() => setIsMenuOpen(false)} className="mobile-link mt-4 px-10 py-4 border-2 border-brand-accent text-brand-accent font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-brand-forest transition-all">Enquire Now</Link>
            </div>
        </nav>
    );
}
