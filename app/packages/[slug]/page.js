"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import data from "../../data.json";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function PackageDetailPage({ params }) {
    const { slug } = use(params);
    const pkg = data.packages.find(p => p.slug === slug);
    const containerRef = useRef();
    const heroImageRef = useRef();
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    // Itinerary Customization State: { dayIndex: 'luxury' | 'standard' }
    const [customizations, setCustomizations] = useState({});
    const [isCustomizing, setIsCustomizing] = useState(false);

    if (!pkg) {
        notFound();
    }

    const location = data.locations.find(l => l.id === pkg.location);

    const toggleCustomization = (idx, type) => {
        setCustomizations(prev => ({
            ...prev,
            [idx]: type
        }));
    };

    const hasUpgrades = Object.values(customizations).some(v => v === 'luxury');
    const upgradeCount = Object.values(customizations).filter(v => v === 'luxury').length;

    useEffect(() => {
        if (!pkg) return;
        const stored = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");

        const recentPkgs = stored
            .map(s => data.packages.find(p => p.slug === s))
            .filter(p => p && p.slug !== pkg.slug);

        setRecentlyViewed(recentPkgs.slice(0, 3));

        const updated = [pkg.slug, ...stored.filter(s => s !== pkg.slug)].slice(0, 5);
        localStorage.setItem("recentlyViewed", JSON.stringify(updated));
    }, [pkg]);

    useGSAP(() => {
        // Parallax Effect
        gsap.to(heroImageRef.current, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: ".pdp-hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Staggered Reveals
        gsap.from(".reveal-content", {
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: "power4.out",
            clearProps: "all"
        });

        // Section Headers
        gsap.utils.toArray(".section-title").forEach(title => {
            gsap.from(title, {
                opacity: 0,
                x: -30,
                duration: 1,
                scrollTrigger: {
                    trigger: title,
                    start: "top 90%",
                }
            });
        });

        // Itinerary Stagger with Individual Triggers
        gsap.utils.toArray(".itinerary-step").forEach((step, i) => {
            gsap.from(step, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: step,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            });
        });

        // Force refresh on any layout changes
        ScrollTrigger.refresh();

    }, { scope: containerRef, dependencies: [isCustomizing, customizations] });

    return (
        <div ref={containerRef} className="bg-brand-white min-h-screen">
            {/* Immersive Editorial Hero */}
            <section className="pdp-hero relative h-[85vh] flex items-end pb-32 overflow-hidden">
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
                        <span className="text-xl">←</span> Return to Collections
                    </Link>
                    <div className="max-w-5xl">
                        <span className="reveal-content inline-block bg-brand-accent text-brand-forest text-[10px] font-bold uppercase tracking-[0.4em] px-4 py-1.5 mb-6">
                            {pkg.category} • {pkg.duration}
                        </span>
                        <h1 className="reveal-content text-6xl md:text-9xl font-heading font-bold text-brand-white mb-8 tracking-tighter leading-[0.9]">
                            {pkg.title}
                        </h1>
                        <div className="reveal-content flex items-center gap-4">
                            <div className="h-px w-12 bg-brand-accent"></div>
                            <p className="text-brand-white/80 text-xl font-medium uppercase tracking-[0.3em]">
                                {location?.name} • {location?.country}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Classic Horizon Promise Strip */}
            <section className="bg-brand-forest border-y border-brand-white/10 py-10 relative z-20">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { label: "Bespoke Planning", sub: "Tailored to your rhythm" },
                            { label: "Luxury Stays", sub: "Handpicked premium villas" },
                            { label: "Local Expertise", sub: "Deep cultural insights" },
                            { label: "24/7 Concierge", sub: "Unfiltered peace of mind" }
                        ].map((item, i) => (
                            <div key={i} className="text-center lg:text-left">
                                <span className="block text-brand-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-2">{item.label}</span>
                                <span className="block text-brand-white/30 text-[9px] uppercase tracking-widest font-medium leading-relaxed">{item.sub}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="py-32 container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

                    {/* Left side: Detailed Content */}
                    <div className="lg:col-span-8 space-y-32">

                        {/* The Experience & Highlights */}
                        <div className="experience-section">
                            <h2 className="section-title text-brand-charcoal/30 text-xs font-bold uppercase tracking-[0.5em] mb-12 flex items-center gap-4">
                                <span className="h-px w-8 bg-brand-charcoal/20"></span>
                                The Experience
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                <div className="lg:col-span-8">
                                    <p className="text-brand-charcoal/80 text-2xl md:text-3xl leading-relaxed font-light italic">
                                        "{pkg.description}"
                                    </p>
                                </div>
                                <div className="lg:col-span-4 bg-brand-charcoal/3 p-10 border-l-2 border-brand-accent">
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-forest mb-6">Inclusions</h4>
                                    <ul className="space-y-4">
                                        {["Private Transfers", "Premium Lodging", "Expert Guide", "Curated Dining"].map((h, i) => (
                                            <li key={i} className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/50 flex items-center gap-3">
                                                <span className="text-brand-accent">✦</span> {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Redesigned Itinerary with Customization */}
                        <div className="itinerary-container">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                                <div className="max-w-md">
                                    <h2 className="section-title text-brand-charcoal/30 text-xs font-bold uppercase tracking-[0.5em] flex items-center gap-4 mb-4">
                                        <span className="h-px w-8 bg-brand-charcoal/20"></span>
                                        Your Journey
                                    </h2>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 leading-relaxed pl-12">
                                        Each chapter of your journey is fully customizable. Personalize individual days to elevate your experience with luxury upgrades and bespoke arrangements.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setIsCustomizing(!isCustomizing)}
                                    className={`flex items-center gap-4 px-6 py-3 border transition-all duration-300 rounded-full ${isCustomizing ? 'bg-brand-accent border-brand-accent text-brand-forest shadow-lg' : 'bg-white border-brand-charcoal/10 text-brand-forest hover:border-brand-accent shadow-sm'}`}
                                >
                                    <span className="relative flex h-2 w-2">
                                        {isCustomizing && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-forest opacity-75"></span>}
                                        <span className={`relative inline-flex rounded-full h-2 w-2 ${isCustomizing ? 'bg-brand-forest' : 'bg-brand-accent'}`}></span>
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest">
                                        {isCustomizing ? "Confirm Personalization" : "Personalize Journey"}
                                    </span>
                                </button>
                            </div>

                            <div className="space-y-12">
                                {pkg.itinerary.map((step, idx) => {
                                    const isLuxury = customizations[idx] === 'luxury';
                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => isCustomizing && toggleCustomization(idx, isLuxury ? 'standard' : 'luxury')}
                                            className={`itinerary-step group flex flex-col md:flex-row gap-8 md:gap-16 pb-12 border-b border-brand-charcoal/5 last:border-0 transition-all duration-500 p-6 -mx-6 rounded-2xl ${isCustomizing ? 'cursor-pointer hover:scale-[1.01] active:scale-[0.99]' : ''} ${isLuxury ? 'bg-brand-forest/3 border-brand-accent/30 shadow-sm' : 'hover:bg-brand-charcoal/1'}`}
                                        >
                                            <div className="shrink-0 flex md:flex-col items-center justify-between md:justify-start gap-4">
                                                <span className={`text-5xl md:text-7xl font-heading font-black transition-colors duration-500 ${isLuxury ? 'text-brand-accent/40' : 'text-brand-charcoal/4 group-hover:text-brand-accent/20'}`}>
                                                    {String(idx + 1).padStart(2, '0')}
                                                </span>
                                                {isCustomizing && (
                                                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isLuxury ? 'bg-brand-accent border-brand-accent text-brand-forest' : 'border-brand-forest/20 text-brand-forest/30'}`}>
                                                        <span className="text-[10px] font-bold">{isLuxury ? "✓" : "+"}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="pt-2 grow">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <h4 className={`text-2xl md:text-3xl font-heading font-bold transition-colors duration-300 ${isLuxury ? 'text-brand-accent' : 'text-brand-forest group-hover:text-brand-accent'}`}>
                                                        {step.split(':')[0]}
                                                    </h4>
                                                    {isLuxury && (
                                                        <span className="bg-brand-accent/10 text-brand-accent text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full">
                                                            Luxury Upgrade
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-brand-charcoal/60 leading-relaxed max-w-2xl text-lg font-medium">
                                                    {isLuxury
                                                        ? `${step.split(':')[1]} Enhanced with private chauffeured transfers and a personalized champagne reception.`
                                                        : step.split(':')[1]}
                                                </p>

                                                {isLuxury && (
                                                    <div className="mt-6 flex gap-4">
                                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-forest/60 bg-white px-3 py-1.5 rounded-full border border-brand-accent/20">
                                                            <span className="text-brand-accent">✓</span> Private Guide
                                                        </div>
                                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-forest/60 bg-white px-3 py-1.5 rounded-full border border-brand-accent/20">
                                                            <span className="text-brand-accent">✓</span> VIP Access
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right side: Sticky Concierge Sidebar */}
                    <div className="lg:col-span-4 sticky top-32">
                        <div className={`bg-brand-white border border-brand-charcoal/10 p-12 shadow-2xl relative overflow-hidden group transition-all duration-500 ${hasUpgrades ? 'border-brand-accent/40 shadow-brand-accent/5' : ''}`}>
                            <div className={`absolute top-0 right-0 w-48 h-48 rounded-full -mr-24 -mt-24 blur-3xl transition-colors duration-700 ${hasUpgrades ? 'bg-brand-accent/20' : 'bg-brand-accent/5 group-hover:bg-brand-accent/10'}`}></div>

                            <div className="relative z-10">
                                <div className="mb-12 text-center">
                                    <span className="text-brand-charcoal/40 text-[10px] block uppercase tracking-[0.4em] mb-3 font-bold">Estimated Investment</span>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className={`text-7xl font-heading font-bold transition-all duration-500 ${hasUpgrades ? 'text-brand-accent' : 'text-brand-forest'} tracking-tighter`}>
                                            ${pkg.price + (upgradeCount * 250)}
                                        </span>
                                    </div>
                                    <span className="block text-[10px] uppercase tracking-widest text-brand-forest/50 font-bold mt-4 italic">Final estimate pending curation</span>
                                </div>

                                {/* Customization Summary */}
                                {hasUpgrades && (
                                    <div className="mb-10 p-6 bg-brand-forest/3 border-x border-brand-accent/20">
                                        <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">Bespoke Requests</h5>
                                        <div className="space-y-3">
                                            {Object.entries(customizations).map(([day, type]) => {
                                                if (type !== 'luxury') return null;
                                                return (
                                                    <div key={day} className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-brand-forest/70">
                                                        <span>Day {parseInt(day) + 1} Upgrade</span>
                                                        <span>+$250</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-6 mb-12">
                                    {[
                                        { label: "Base Duration", val: pkg.duration },
                                        { label: "Configuration", val: hasUpgrades ? "Bespoke" : "Standard" },
                                        { label: "Service", val: "Private Concierge" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-center py-5 border-b border-brand-charcoal/5 last:border-0">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/30">{item.label}</span>
                                            <span className="text-xs font-bold text-brand-forest uppercase tracking-widest">{item.val}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <Link href="/booking" className={`group flex items-center justify-between w-full p-6 text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl hover:shadow-2xl ${hasUpgrades ? 'bg-brand-accent text-brand-forest' : 'bg-brand-forest text-brand-white hover:bg-brand-charcoal'}`}>
                                        {hasUpgrades ? "Request Bespoke Quote" : "Begin Reservation"}
                                        <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                                    </Link>
                                    <a href="tel:+910000000000" className="block w-full text-center border-2 border-brand-forest text-brand-forest p-6 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-brand-forest hover:text-brand-white transition-all">
                                        Speak to an Expert
                                    </a>
                                </div>

                                <div className="mt-10 pt-8 border-t border-brand-charcoal/5 text-center">
                                    <p className="text-[9px] text-brand-charcoal/30 font-bold uppercase tracking-[0.2em] leading-relaxed">
                                        Protected by our <br /> Flexible Modification Policy
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Recently Viewed Journeys */}
            {recentlyViewed.length > 0 && (
                <section className="py-32 bg-brand-forest/2 border-t border-brand-charcoal/5">
                    <div className="container mx-auto px-6 md:px-12">
                        <h2 className="section-title text-brand-charcoal/30 text-xs font-bold uppercase tracking-[0.5em] mb-16 flex items-center gap-4">
                            <span className="h-px w-8 bg-brand-charcoal/20"></span>
                            Your Recently Explored
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            {recentlyViewed.map(other => (
                                <Link key={other.id} href={`/packages/${other.slug}`} className="group block">
                                    <div className="aspect-16/10 overflow-hidden mb-8 bg-brand-forest/10 relative">
                                        <img src={other.image} alt={other.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-brand-forest/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    </div>
                                    <span className="text-brand-accent text-[10px] font-bold uppercase tracking-[0.3em] block mb-3">{other.category}</span>
                                    <h3 className="text-2xl font-bold font-heading text-brand-forest group-hover:text-brand-accent transition-colors duration-300">{other.title}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Bottom Discovery Section */}
            <section className="py-40 bg-brand-charcoal text-brand-white overflow-hidden relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>

                <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
                    <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.5em] mb-8 block">Endless Horizons</span>
                    <h2 className="text-5xl md:text-8xl font-heading font-bold mb-16 tracking-tighter leading-tight max-w-4xl mx-auto">
                        Your next extraordinary <br /> chapter awaits.
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-8 items-center">
                        <Link href="/packages" className="group text-xs font-bold uppercase tracking-[0.4em] bg-brand-accent text-brand-forest px-12 py-6 hover:bg-brand-white transition-all shadow-xl">
                            Browse All Collections
                        </Link>
                        <Link href="/destinations" className="text-xs font-bold uppercase tracking-[0.4em] border-b-2 border-brand-white/20 pb-2 hover:border-brand-white transition-all">
                            Map our Destinations
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
