"use client";

import { useState, useMemo } from "react";
import { getLocations, getPackages } from "../lib/data";
import DestinationsHero from "../components/destinations/DestinationsHero";
import RegionFilter from "../components/destinations/RegionFilter";
import DestinationCard from "../components/destinations/DestinationCard";
import Link from "next/link";

export default function DestinationsPage() {
    const locations = getLocations();
    const packages = getPackages();

    // Extract unique regions for the filter
    const regions = useMemo(() => {
        const uniqueRegions = [...new Set(locations.map(loc => loc.region))];
        return ["All Regions", ...uniqueRegions];
    }, [locations]);

    const [activeRegion, setActiveRegion] = useState("All Regions");

    // Filter locations based on active region
    const filteredLocations = useMemo(() => {
        return activeRegion === "All Regions"
            ? locations
            : locations.filter(loc => loc.region === activeRegion);
    }, [activeRegion, locations]);

    return (
        <main className="bg-brand-white">
            <DestinationsHero />

            <RegionFilter
                regions={regions}
                activeRegion={activeRegion}
                onRegionChange={setActiveRegion}
            />

            <section className="py-24 md:py-32">
                <div className="container mx-auto px-6 md:px-12">
                    {/* Results Count */}
                    <div className="mb-16 flex items-baseline gap-4">
                        <span className="text-4xl md:text-6xl font-heading font-bold text-brand-forest tracking-tighter">
                            {filteredLocations.length.toString().padStart(2, '0')}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-[0.4em] text-brand-charcoal/30">
                            Destinations Found in {activeRegion}
                        </span>
                    </div>

                    {/* Staggered Editorial Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12 transition-all duration-500">
                        {filteredLocations.map((loc, index) => {
                            // Stagger effect via CSS classes based on index
                            const isStaggered = index % 3 === 1;
                            const isThird = index % 3 === 2;

                            // Find a representative image
                            const representativePkg = packages.find(p => p.location === loc.id);
                            const image = representativePkg?.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800";
                            const packagesCount = packages.filter(p => p.location === loc.id).length;

                            return (
                                <div
                                    key={loc.id}
                                    className={`
                                        ${isStaggered ? 'md:translate-y-20' : ''} 
                                        ${isThird ? 'lg:translate-y-40' : ''}
                                        transition-transform duration-1000 ease-in-out
                                    `}
                                >
                                    <DestinationCard
                                        location={loc}
                                        packagesCount={packagesCount}
                                        image={image}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Spacer for staggered grid bottom */}
                    <div className="hidden lg:block h-40"></div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-brand-forest py-32 md:py-48 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <img
                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
                    <div className="max-w-3xl mx-auto">
                        <span className="text-brand-accent font-bold uppercase tracking-[0.4em] text-xs mb-8 block">Tailored Journeys</span>
                        <h2 className="text-4xl md:text-7xl font-heading font-bold text-brand-white mb-10 tracking-tighter leading-tight">
                            Beyond the Visible <br /> Horizon.
                        </h2>
                        <p className="text-brand-white/60 text-lg md:text-xl mb-14 max-w-xl mx-auto font-light leading-relaxed">
                            Can't find your dream destination? Speak to our travel curators and let us craft a journey tailored to your soul.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/booking" className="w-full sm:w-auto px-12 py-6 bg-brand-accent text-brand-forest font-bold uppercase tracking-widest text-xs hover:bg-brand-white transition-all transform hover:-translate-y-1">
                                Design Your Odyssey
                            </Link>
                            <Link href="/about" className="w-full sm:w-auto px-12 py-6 border border-brand-white/20 text-brand-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
                                Our Philosophy
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
