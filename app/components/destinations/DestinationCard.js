"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function DestinationCard({ location, packagesCount, image }) {
    const cardRef = useRef();
    const imageRef = useRef();

    useGSAP(() => {
        gsap.from(cardRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 90%",
            }
        });
    }, { scope: cardRef });

    return (
        <div ref={cardRef} className="group relative overflow-hidden bg-brand-white border border-brand-charcoal/5">
            <Link href={`/destinations/${location.id}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                        ref={imageRef}
                        src={image}
                        alt={location.name}
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                    {/* Country Badge */}
                    <div className="absolute top-6 right-6">
                        <span className="bg-brand-white/90 backdrop-blur-sm text-brand-forest text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 shadow-sm">
                            {location.country}
                        </span>
                    </div>

                    {/* Quick Info (Visible on hover) */}
                    <div className="absolute inset-x-0 bottom-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="h-[1px] w-full bg-brand-white/20 mb-6 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100 origin-left"></div>
                        <div className="flex justify-between items-center text-brand-white">
                            <span className="text-[10px] font-bold uppercase tracking-widest">Discover More</span>
                            <svg className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Info Container */}
                <div className="p-8 pb-10">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-3xl font-heading font-bold text-brand-forest tracking-tighter leading-none group-hover:text-brand-accent transition-colors">
                            {location.name}
                        </h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] w-6 bg-brand-accent"></div>
                        <p className="text-brand-charcoal/40 text-[10px] font-bold uppercase tracking-[0.2em]">
                            {packagesCount} Exclusive Packages
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
