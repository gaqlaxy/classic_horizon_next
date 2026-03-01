"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function ItineraryCustomizer({
    itinerary,
    customizations,
    isCustomizing,
    setIsCustomizing,
    toggleCustomization
}) {
    const containerRef = useRef();

    useGSAP(() => {
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
    }, { scope: containerRef, dependencies: [isCustomizing, customizations] });

    return (
        <div ref={containerRef} className="itinerary-container">
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
                {itinerary.map((step, idx) => {
                    const isLuxury = customizations[idx] === 'luxury';
                    const [title, desc] = step.includes(':') ? step.split(':') : [step, ""];

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
                                        {title}
                                    </h4>
                                    {isLuxury && (
                                        <span className="bg-brand-accent/10 text-brand-accent text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full">
                                            Luxury Upgrade
                                        </span>
                                    )}
                                </div>
                                <p className="text-brand-charcoal/60 leading-relaxed max-w-2xl text-lg font-medium">
                                    {isLuxury
                                        ? `${desc} Enhanced with private chauffeured transfers and a personalized champagne reception.`
                                        : desc}
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
    );
}
