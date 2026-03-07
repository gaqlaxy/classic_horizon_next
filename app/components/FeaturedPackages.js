"use client";


import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { getLocations, getPackages } from "../lib/data";

export default function FeaturedPackages() {
    const containerRef = useRef();

    useGSAP(() => {
        gsap.from(".pkg-card", {
            opacity: 0,
            scale: 0.95,
            y: 30,
            stagger: 0.15,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });
    }, { scope: containerRef });

    const locations = getLocations();
    // Get top 3 featured packages
    const featuredPkgs = getPackages().slice(0, 3);

    return (
        <section ref={containerRef} className="py-24 bg-brand-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="text-brand-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Handpicked for you</span>
                    <h2 className="text-4xl md:text-6xl font-heading font-bold text-brand-forest mb-6">Featured Packages</h2>
                    <div className="h-1 w-20 bg-brand-accent mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {featuredPkgs.map((pkg) => {
                        const location = locations.find(l => l.id === pkg.location);
                        return (
                            <Link key={pkg.id} href={`/packages/${pkg.slug}`} className="pkg-card group block bg-white rounded-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                                <div className="relative aspect-[4/5] overflow-hidden mb-6 rounded-t-lg">
                                    <img
                                        src={pkg.image}
                                        alt={`Luxury travel package: ${pkg.title} in ${location?.name || ''}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {pkg.onDiscount && (
                                        <div className="absolute top-6 left-6 bg-brand-accent text-brand-forest text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow-md">
                                            Special Offer
                                        </div>
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <span className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-1">{pkg.duration}</span>
                                        <p className="text-white/90 text-sm line-clamp-2">{pkg.description}</p>
                                    </div>
                                </div>
                                <div className="p-4 pt-0 flex justify-between items-start gap-4">
                                    <div>
                                        <h3 className="text-xl font-heading font-bold text-brand-charcoal group-hover:text-brand-forest transition-colors mb-2">
                                            {pkg.title}
                                        </h3>
                                        <p className="text-brand-charcoal/40 text-xs font-bold uppercase tracking-widest">
                                            {location?.name}, {location?.country}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-brand-charcoal/40 text-[10px] block uppercase tracking-tighter">From</span>
                                        <span className="text-2xl font-bold font-heading text-brand-forest">₹{pkg.price.toLocaleString()}</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-20 text-center">
                    <Link
                        href="/packages"
                        className="group relative inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-forest"
                    >
                        Browse All Collections
                        <span className="w-10 h-[1px] bg-brand-forest transition-all group-hover:w-16"></span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
