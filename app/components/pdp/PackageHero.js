"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function PackageHero({ pkg, location }) {
    const heroImageRef = useRef();
    const containerRef = useRef();

    useGSAP(() => {
        // Parallax Effect
        gsap.to(heroImageRef.current, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Entrance Animations
        const tl = gsap.timeline();
        tl.from(".reveal-content", {
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: "power4.out",
            clearProps: "all"
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="pdp-hero relative h-[85vh] flex items-end pb-32 overflow-hidden">
            <div className="absolute inset-0 z-0 h-[110%]">
                <img
                    ref={heroImageRef}
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover brightness-90"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-forest via-brand-forest/30 to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <Link href="/packages" className="reveal-content inline-flex items-center gap-3 text-brand-white/60 hover:text-brand-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-12 transition-all">
                    <span className="text-xl"><-</span> Return to Collections
                </Link>
                <div className="max-w-5xl">
                    <span className="reveal-content inline-block bg-brand-accent text-brand-forest text-[10px] font-bold uppercase tracking-[0.4em] px-4 py-1.5 mb-6">
                        {pkg.category} - {pkg.duration}
                    </span>
                    <h1 className="reveal-content text-6xl md:text-9xl font-heading font-bold text-brand-white mb-8 tracking-tighter leading-[0.9]">
                        {pkg.title}
                    </h1>
                    <div className="reveal-content flex items-center gap-4">
                        <div className="h-px w-12 bg-brand-accent"></div>
                        <p className="text-brand-white/80 text-xl font-medium uppercase tracking-[0.3em]">
                            {location?.name} - {location?.country}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
