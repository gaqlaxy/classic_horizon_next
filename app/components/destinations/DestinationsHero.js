"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function DestinationsHero() {
    const containerRef = useRef();
    const titleRef = useRef();
    const subtitleRef = useRef();
    const bgRef = useRef();

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(bgRef.current, {
            scale: 1.2,
            duration: 2.5,
            ease: "power2.out"
        })
            .from(titleRef.current.querySelectorAll("span"), {
                y: 100,
                opacity: 0,
                stagger: 0.1,
                duration: 1.2,
                ease: "outfit.out"
            }, "-=1.5")
            .from(subtitleRef.current, {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power2.out"
            }, "-=0.8");
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-brand-forest">
            {/* Cinematic Background */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0 opacity-40 scale-105"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2000')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-forest/60 via-transparent to-brand-white"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-20">
                <div className="max-w-4xl">
                    <span className="text-brand-accent font-bold uppercase tracking-[0.4em] text-xs mb-6 block overflow-hidden">
                        <span className="block animate-reveal-up">Curated Horizons</span>
                    </span>
                    <h1
                        ref={titleRef}
                        className="text-6xl md:text-9xl font-heading font-bold text-brand-white leading-[0.9] tracking-tighter mb-10"
                    >
                        <span className="inline-block mr-4">World-Class</span><br />
                        <span className="inline-block text-brand-accent">Destinations.</span>
                    </h1>
                    <div ref={subtitleRef}>
                        <p className="text-brand-white/80 text-xl md:text-2xl leading-relaxed max-w-2xl font-light">
                            From the spiritual ghats of the Ganges to the emerald waters of the Maldives, we curate experiences in the world's most breathtaking locales.
                        </p>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-12 z-20 flex flex-col items-center gap-4">
                <span className="text-brand-white/40 text-[10px] font-bold uppercase tracking-[0.3em] vertical-text">Scroll to Discover</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-brand-accent to-transparent"></div>
            </div>
        </section>
    );
}
