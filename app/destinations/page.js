"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Link from "next/link";
import data from "../data.json";

export default function DestinationsPage() {
    const containerRef = useRef();

    // Group locations by region
    const regions = data.locations.reduce((acc, loc) => {
        if (!acc[loc.region]) acc[loc.region] = [];
        acc[loc.region].push(loc);
        return acc;
    }, {});

    useGSAP(() => {
        gsap.from(".region-section", {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-brand-white min-h-screen pt-40 pb-24">
            <div className="container mx-auto px-6 md:px-12">
                {/* Hero Header */}
                <div className="max-w-4xl mb-24">
                    <span className="text-brand-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Reach</span>
                    <h1 className="text-5xl md:text-8xl font-heading font-bold text-brand-forest mb-8 leading-tight tracking-tighter">
                        World-Class <br /> Destinations.
                    </h1>
                    <p className="text-brand-charcoal/60 text-xl leading-relaxed max-w-2xl">
                        From the spiritual ghats of the Ganges to the emerald waters of the Maldives, we curate experiences in the world's most breathtaking locales.
                    </p>
                </div>

                {/* Regions Grid */}
                <div className="space-y-32">
                    {Object.entries(regions).map(([region, locations]) => (
                        <div key={region} className="region-section">
                            <div className="flex items-center gap-6 mb-12">
                                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-charcoal/30 whitespace-nowrap">{region}</h2>
                                <div className="h-[1px] w-full bg-brand-charcoal/10"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                {locations.map((loc) => {
                                    // Find a representative image from the packages for this location
                                    const representativePkg = data.packages.find(p => p.location === loc.id);
                                    const image = representativePkg?.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800";

                                    return (
                                        <div key={loc.id} className="group cursor-pointer">
                                            <div className="relative aspect-video overflow-hidden mb-6 border border-brand-charcoal/5">
                                                <img
                                                    src={image}
                                                    alt={loc.name}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                                />
                                                <div className="absolute inset-0 bg-brand-forest/0 group-hover:bg-brand-forest/20 transition-all duration-500"></div>
                                                <div className="absolute bottom-6 left-6">
                                                    <span className="bg-brand-white text-brand-forest text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                                                        {loc.country}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <h3 className="text-3xl font-heading font-bold text-brand-forest mb-2">{loc.name}</h3>
                                                    <p className="text-brand-charcoal/40 text-[10px] font-bold uppercase tracking-widest">
                                                        {data.packages.filter(p => p.location === loc.id).length} Available Packages
                                                    </p>
                                                </div>
                                                <Link
                                                    href={`/packages?location=${loc.id}`}
                                                    className="text-xs font-bold uppercase tracking-widest text-brand-forest border-b-2 border-brand-accent pb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0"
                                                >
                                                    Explore
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-40 bg-brand-forest p-12 md:p-24 text-center">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-white mb-8">Can't decide where to go?</h2>
                    <p className="text-brand-white/60 text-lg mb-12 max-w-xl mx-auto">
                        Speak to our destination experts and let us craft a journey tailored to your soul.
                    </p>
                    <Link href="/booking" className="inline-block px-12 py-5 bg-brand-accent text-brand-forest font-bold uppercase tracking-widest text-xs hover:bg-brand-white transition-all">
                        Talk to a Travel Curator
                    </Link>
                </div>
            </div>
        </div>
    );
}
