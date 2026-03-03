"use client";

import { use, useRef } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLocationById, getPackagesByLocation } from "../../lib/data";
import DestinationSlugHero from "../../components/destinations/DestinationSlugHero";

export default function DestinationDetailPage({ params }) {
    const { slug } = use(params);
    const destination = getLocationById(slug);
    const containerRef = useRef();

    if (!destination) {
        notFound();
    }

    const destinationPackages = getPackagesByLocation(slug);
    const heroImage = destinationPackages[0]?.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200";

    return (
        <main ref={containerRef} className="bg-brand-white min-h-screen">
            <DestinationSlugHero destination={destination} heroImage={heroImage} />

            {/* Packages Section */}
            <section className="py-32 md:py-48">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-8">
                        <div className="max-w-3xl">
                            <span className="text-brand-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">The Collection</span>
                            <h2 className="text-5xl md:text-7xl font-heading font-bold text-brand-forest tracking-tighter leading-tight">
                                Bespoke Journeys in <br /> {destination.name}.
                            </h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-6xl font-heading font-bold text-brand-forest/10">{destinationPackages.length.toString().padStart(2, '0')}</span>
                            <p className="text-brand-charcoal/40 font-bold uppercase tracking-widest text-[10px]">
                                Curated <br /> Experiences
                            </p>
                        </div>
                    </div>

                    {destinationPackages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 gap-x-12">
                            {destinationPackages.map((pkg, index) => {
                                const isStaggered = index % 2 === 1;

                                return (
                                    <div
                                        key={pkg.id}
                                        className={`group relative ${isStaggered ? 'md:translate-y-24' : ''} transition-transform duration-1000`}
                                    >
                                        <Link href={`/packages/${pkg.slug}`} className="block">
                                            {/* Visual Container */}
                                            <div className="relative aspect-[4/5] overflow-hidden mb-10">
                                                <img
                                                    src={pkg.image}
                                                    alt={pkg.title}
                                                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                                                />
                                                <div className="absolute inset-0 bg-brand-forest/20 group-hover:bg-brand-forest/0 transition-colors duration-700"></div>

                                                {/* Price Badge */}
                                                <div className="absolute top-0 right-0 p-8">
                                                    <div className="bg-brand-white/90 backdrop-blur-sm px-6 py-4 flex flex-col items-end">
                                                        <span className="text-brand-charcoal/40 text-[8px] font-bold uppercase tracking-widest leading-none mb-1">From</span>
                                                        <span className="text-brand-forest text-xl font-heading font-bold leading-none">${pkg.price}</span>
                                                    </div>
                                                </div>

                                                {/* Category Overlay */}
                                                <div className="absolute bottom-8 left-8">
                                                    <span className="text-brand-white text-[10px] font-bold uppercase tracking-[0.3em] bg-brand-forest/40 backdrop-blur-md px-4 py-2">
                                                        {pkg.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Text Content */}
                                            <div className="px-2">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="h-[1px] w-8 bg-brand-accent group-hover:w-16 transition-all duration-700"></div>
                                                    <span className="text-brand-charcoal/40 text-[9px] font-bold uppercase tracking-[0.2em]">{pkg.duration}</span>
                                                </div>
                                                <h3 className="text-3xl font-heading font-bold text-brand-forest mb-4 tracking-tighter group-hover:text-brand-accent transition-colors">
                                                    {pkg.title}
                                                </h3>
                                                <p className="text-brand-charcoal/60 text-sm leading-relaxed line-clamp-2 font-light">
                                                    {pkg.description}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-40 text-center border border-brand-charcoal/5">
                            <h3 className="text-4xl font-heading font-bold text-brand-forest/20 mb-8 italic">New horizons coming soon to {destination.name}.</h3>
                            <Link href="/destinations" className="px-12 py-6 bg-brand-forest text-brand-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-brand-accent transition-all">
                                Return to Collections
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Cinematic Story Section */}
            <section className="py-48 bg-brand-forest relative overflow-hidden">
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                        <div className="relative aspect-[3/4] overflow-hidden lg:scale-110">
                            <img
                                src={heroImage}
                                alt="Atmosphere"
                                className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 transition-all duration-1000"
                            />
                            <div className="absolute inset-x-8 bottom-8">
                                <span className="text-brand-white/40 text-[10px] font-bold uppercase tracking-[0.4em] block mb-4">Milestone: {destination.name}</span>
                                <div className="h-[1px] w-full bg-brand-white/10"></div>
                            </div>
                        </div>

                        <div className="max-w-xl">
                            <span className="text-brand-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">The Curator's Note</span>
                            <h2 className="text-5xl md:text-7xl font-heading font-bold text-brand-white mb-10 tracking-tighter leading-tight">
                                A Dialogue with <br /> {destination.name}.
                            </h2>
                            <p className="text-brand-white/60 text-lg md:text-xl font-light leading-relaxed mb-12 italic">
                                "{destination.name} isn't just a location on a map; it's a conversation with history, a texture for the soul. We invite you to experience it through our curated lens."
                            </p>
                            <Link href="/booking" className="inline-block px-12 py-6 bg-brand-accent text-brand-forest font-bold uppercase tracking-widest text-[10px] hover:bg-brand-white transition-all">
                                Consult a Curator
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
