"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import data from "../../data.json";

export default function DestinationDetailPage({ params }) {
    const { slug } = use(params);
    const destination = data.locations.find(l => l.id === slug);
    const containerRef = useRef();

    if (!destination) {
        notFound();
    }

    // Filter packages for this destination
    const destinationPackages = data.packages.filter(p => p.location === slug);

    // Find a representative image (first package image)
    const heroImage = destinationPackages[0]?.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200";

    useGSAP(() => {
        gsap.from(".reveal-content", {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(".package-card", {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".packages-grid",
                start: "top 80%",
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-brand-white min-h-screen">
            {/* Immersive Hero */}
            <section className="relative h-[60vh] flex items-end pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt={destination.name}
                        className="w-full h-full object-cover brightness-75 scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-brand-forest/90 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <Link href="/destinations" className="reveal-content inline-flex items-center gap-2 text-brand-white/70 hover:text-brand-accent text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
                        <span className="text-lg">←</span> Back to Destinations
                    </Link>
                    <div className="max-w-4xl">
                        <span className="reveal-content inline-block bg-brand-accent text-brand-forest text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-4">
                            {destination.region} • {destination.country}
                        </span>
                        <h1 className="reveal-content text-6xl md:text-9xl font-heading font-bold text-brand-white mb-6 tracking-tighter leading-tight">
                            {destination.name}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Packages Section */}
            <section className="py-24 container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-accent mb-4">Curated Experiences</h2>
                        <h3 className="text-4xl md:text-5xl font-heading font-bold text-brand-forest">
                            Available Packages in {destination.name}
                        </h3>
                    </div>
                    <p className="text-brand-charcoal/50 font-medium uppercase tracking-widest text-xs">
                        {destinationPackages.length} Bespoke Journeys
                    </p>
                </div>

                {destinationPackages.length > 0 ? (
                    <div className="packages-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {destinationPackages.map((pkg) => (
                            <Link key={pkg.id} href={`/packages/${pkg.slug}`} className="package-card group">
                                <div className="relative aspect-4/5 overflow-hidden mb-6 bg-brand-forest/5">
                                    <img
                                        src={pkg.image}
                                        alt={pkg.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute top-6 right-6">
                                        <span className="bg-brand-white text-brand-forest text-[10px] font-bold uppercase tracking-widest px-3 py-2">
                                            from ${pkg.price}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-brand-forest/0 group-hover:bg-brand-forest/20 transition-all duration-500"></div>
                                </div>

                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h4 className="text-2xl font-heading font-bold text-brand-forest mb-2 group-hover:text-brand-accent transition-colors">
                                            {pkg.title}
                                        </h4>
                                        <p className="text-brand-charcoal/40 text-[10px] font-bold uppercase tracking-widest">
                                            {pkg.category} • {pkg.duration}
                                        </p>
                                    </div>
                                    <div className="h-10 w-10 flex items-center justify-center border border-brand-charcoal/10 rounded-full group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-brand-forest transition-all duration-300">
                                        <span className="text-lg">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center border-2 border-dashed border-brand-charcoal/10">
                        <p className="text-brand-charcoal/40 font-heading text-2xl italic">
                            New experiences for {destination.name} are being curated.
                        </p>
                        <Link href="/destinations" className="inline-block mt-8 text-xs font-bold uppercase tracking-widest border-b-2 border-brand-accent pb-1">
                            Explore other destinations
                        </Link>
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <section className="mt-24 bg-brand-forest py-24 px-6 text-center">
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-white mb-8">Ready to explore {destination.name}?</h2>
                    <p className="text-brand-white/60 text-lg mb-12 max-w-xl mx-auto">
                        Our travel curators are ready to help you plan the perfect journey to {destination.name}.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/booking" className="px-12 py-5 bg-brand-accent text-brand-forest font-bold uppercase tracking-widest text-xs hover:bg-brand-white transition-all">
                            Start Planning
                        </Link>
                        <Link href="/packages" className="px-12 py-5 border-2 border-brand-white text-brand-white font-bold uppercase tracking-widest text-xs hover:bg-brand-white hover:text-brand-forest transition-all">
                            View All Collections
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
