"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Link from "next/link";

export default function DestinationSlugHero({ destination, heroImage }) {
    const containerRef = useRef();
    const titleRef = useRef();
    const statsRef = useRef();
    const bgRef = useRef();

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(bgRef.current, {
            scale: 1.1,
            opacity: 0,
            duration: 2,
            ease: "power2.out"
        })
            .from(titleRef.current.querySelectorAll(".char"), {
                y: 100,
                opacity: 0,
                stagger: 0.05,
                duration: 1,
                ease: "back.out(1.7)"
            }, "-=1.2")
            .from(statsRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.5");
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-[80vh] min-h-[700px] flex items-center overflow-hidden bg-brand-forest">
            {/* Background Image with Parallax Effect */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0 brightness-50"
                style={{
                    backgroundImage: `url('${heroImage}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            />

            {/* Elegant Gradients */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-forest via-brand-forest/40 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-40 z-10 bg-gradient-to-t from-brand-white to-transparent"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-20">
                <div className="flex flex-col md:flex-row items-end gap-12">
                    <div className="max-w-4xl flex-1">
                        <Link
                            href="/destinations"
                            className="inline-flex items-center gap-3 text-brand-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-12 hover:gap-6 transition-all duration-500"
                        >
                            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            Back to Collections
                        </Link>

                        <div ref={titleRef} className="mb-10">
                            <span className="text-brand-white/40 font-bold uppercase tracking-[0.5em] text-[10px] block mb-6 animate-reveal-up">
                                Exploring the Heart of {destination.region}
                            </span>
                            <h1 className="text-7xl md:text-[10rem] font-heading font-bold text-brand-white leading-[0.85] tracking-tighter">
                                {destination.name.split('').map((char, i) => (
                                    <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
                                ))}
                            </h1>
                        </div>
                    </div>

                    <div
                        ref={statsRef}
                        className="flex flex-col gap-8 md:border-l border-brand-white/20 md:pl-12 pb-12"
                    >
                        <div>
                            <span className="text-brand-white/30 text-[9px] font-bold uppercase tracking-widest block mb-2">Country</span>
                            <span className="text-brand-accent text-xl font-heading font-bold">{destination.country}</span>
                        </div>
                        <div>
                            <span className="text-brand-white/30 text-[9px] font-bold uppercase tracking-widest block mb-2">Vibe</span>
                            <span className="text-brand-white text-xl font-heading font-bold">Timeless & Serene</span>
                        </div>
                        <div>
                            <span className="text-brand-white/30 text-[9px] font-bold uppercase tracking-widest block mb-2">Latitude</span>
                            <span className="text-brand-white text-xl font-heading font-bold">35.0116° N</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vertical Marker */}
            <div className="absolute top-0 right-12 bottom-0 w-[1px] bg-brand-white/10 hidden lg:block">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 vertical-text text-[9px] font-bold uppercase tracking-[0.5em] text-brand-accent/40 whitespace-nowrap">
                    Premium Travel Collection 2026
                </div>
            </div>
        </section>
    );
}
