"use client";


import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, use, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import data from "../../data.json";

export default function PackageDetailPage({ params }) {
    const { slug } = use(params);
    const pkg = data.packages.find(p => p.slug === slug);
    const containerRef = useRef();


    if (!pkg) {
        notFound();
    }

    const location = data.locations.find(l => l.id === pkg.location);

    // Persist recently viewed
    useEffect(() => {
        if (!pkg) return;
        const stored = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
        // Keep only last 4, avoid duplicates, and put current at the front
        const updated = [pkg.slug, ...stored.filter(s => s !== pkg.slug)].slice(0, 4);
        localStorage.setItem("recentlyViewed", JSON.stringify(updated));
    }, [pkg]);

    useGSAP(() => {
        gsap.from(".reveal-content", {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-brand-white min-h-screen">
            {/* Immersive Hero */}
            <section className="relative h-[70vh] flex items-end pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover brightness-75 scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-brand-forest/80 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <Link href="/packages" className="reveal-content inline-flex items-center gap-2 text-brand-white/70 hover:text-brand-accent text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
                        <span className="text-lg">←</span> Back to Collections
                    </Link>
                    <div className="max-w-4xl">
                        <span className="reveal-content inline-block bg-brand-accent text-brand-forest text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-4">
                            {pkg.category} • {pkg.duration}
                        </span>
                        <h1 className="reveal-content text-5xl md:text-8xl font-heading font-bold text-brand-white mb-6 tracking-tighter leading-tight">
                            {pkg.title}
                        </h1>
                        <p className="reveal-content text-brand-white/80 text-xl font-medium uppercase tracking-[0.2em]">
                            {location?.name} • {location?.country}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="py-24 container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">

                    {/* Left: Description & Itinerary */}
                    <div className="lg:col-span-2 space-y-20">
                        <div>
                            <h2 className="text-3xl font-heading font-bold text-brand-forest mb-8 border-b border-brand-charcoal/10 pb-4">The Experience</h2>
                            <p className="text-brand-charcoal/70 text-lg leading-relaxed first-letter:text-5xl first-letter:font-heading first-letter:font-bold first-letter:text-brand-forest first-letter:mr-3 first-letter:float-left">
                                {pkg.description}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-heading font-bold text-brand-forest mb-12">Itinerary</h2>
                            <div className="space-y-0 relative border-l-2 border-brand-accent ml-4 pl-12 py-4">
                                {pkg.itinerary.map((step, idx) => (
                                    <div key={idx} className="relative pb-12 last:pb-0">
                                        <div className="absolute -left-[58px] top-0 w-10 h-10 bg-brand-forest text-brand-white flex items-center justify-center text-xs font-bold rounded-full border-4 border-brand-white">
                                            {idx + 1}
                                        </div>
                                        <p className="text-brand-charcoal font-bold text-xl mb-2">{step.split(':')[0]}</p>
                                        <p className="text-brand-charcoal/60 text-sm">{step.split(':')[1]}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Booking Sidebar */}
                    <div className="sticky top-32 bg-white/50 backdrop-blur-sm border border-brand-charcoal/10 p-10 shadow-xl">
                        <div className="mb-10 text-center">
                            <span className="text-brand-charcoal/40 text-[10px] block uppercase tracking-widest mb-1">Starting from</span>
                            <span className="text-5xl font-heading font-bold text-brand-forest">${pkg.price}</span>
                            <span className="block text-[10px] uppercase tracking-widest text-brand-charcoal/40 font-bold mt-2">Per Person • Inclusive of taxes</span>
                        </div>

                        <div className="space-y-4 mb-10">
                            <div className="flex justify-between items-center py-4 border-y border-brand-charcoal/5">
                                <span className="text-xs font-bold uppercase text-brand-charcoal/40">Duration</span>
                                <span className="text-sm font-bold text-brand-forest">{pkg.duration}</span>
                            </div>
                            <div className="flex justify-between items-center py-4 border-b border-brand-charcoal/5">
                                <span className="text-xs font-bold uppercase text-brand-charcoal/40">Rating</span>
                                <span className="text-sm font-bold text-brand-accent">★ {pkg.rating}</span>
                            </div>
                            <div className="flex justify-between items-center py-4 border-b border-brand-charcoal/5">
                                <span className="text-xs font-bold uppercase text-brand-charcoal/40">Group Size</span>
                                <span className="text-sm font-bold text-brand-forest">Max 12 People</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Link href="/booking" className="block w-full text-center bg-brand-forest text-brand-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-charcoal transition-all">
                                Enquire Now
                            </Link>
                            <a href="tel:+910000000000" className="block w-full text-center border-2 border-brand-forest text-brand-forest py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-forest hover:text-brand-white transition-all">
                                Call for Best Price
                            </a>
                        </div>

                        <p className="mt-8 text-center text-[10px] text-brand-charcoal/40 italic">
                            * Get a customized quote within 24 hours of enquiry.
                        </p>
                    </div>

                </div>
            </section>

            {/* Recommended Section */}
            <section className="py-24 bg-brand-charcoal text-brand-white">
                <div className="container mx-auto px-6 md:px-12">
                    <h2 className="text-3xl font-heading font-bold mb-16">Other Premium Discoveries</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {data.packages.filter(p => p.id !== pkg.id).slice(0, 4).map(other => (
                            <Link key={other.id} href={`/packages/${other.slug}`} className="group block">
                                <div className="aspect-3/4 overflow-hidden mb-4 border border-brand-white/10">
                                    <img src={other.image} alt={other.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                </div>
                                <h3 className="text-lg font-bold font-heading group-hover:text-brand-accent transition-colors">{other.title}</h3>
                                <p className="text-[10px] text-brand-white/40 uppercase tracking-widest mt-1">${other.price}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
