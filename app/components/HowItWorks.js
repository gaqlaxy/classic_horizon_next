"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function HowItWorks() {
    const containerRef = useRef();

    useGSAP(() => {
        gsap.from(".step-card", {
            opacity: 0,
            y: 40,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
            }
        });
    }, { scope: containerRef });

    const steps = [
        {
            number: "01",
            title: "Curate",
            desc: "Browse our editorially-vetted collections of spiritual, luxury, and adventure journeys designed by experts.",
            icon: "✦"
        },
        {
            number: "02",
            title: "Personalize",
            desc: "Work with a senior curator to adjust the rhythm, luxury upgrades, and bespoke inclusions of your trip.",
            icon: "✧"
        },
        {
            number: "03",
            title: "Embark",
            desc: "Travel with 24/7 global concierge support and exclusive access to the world's most hidden experiences.",
            icon: "❖"
        }
    ];

    return (
        <section ref={containerRef} className="py-32 bg-brand-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-3xl mb-24">
                    <span className="text-brand-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">The Process</span>
                    <h2 className="text-4xl md:text-6xl font-heading font-bold text-brand-forest mb-8 leading-tight tracking-tighter">
                        The Journey to <br /> the Horizon.
                    </h2>
                    <p className="text-brand-charcoal/50 text-lg max-w-xl">
                        A seamless, high-touch experience from the first spark of inspiration to the moment you return home.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[15%] left-[10%] right-[10%] h-px bg-brand-charcoal/5 z-0"></div>

                    {steps.map((step, idx) => (
                        <div key={idx} className="step-card group relative z-10">
                            <div className="bg-white border border-brand-charcoal/5 p-10 md:p-12 hover:border-brand-accent/30 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2">
                                <div className="flex justify-between items-start mb-12">
                                    <span className="text-5xl font-heading font-bold text-brand-charcoal/5 transition-colors group-hover:text-brand-accent/10">{step.number}</span>
                                    <span className="text-2xl text-brand-accent">{step.icon}</span>
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-brand-forest mb-6 uppercase tracking-tighter">{step.title}</h3>
                                <p className="text-brand-charcoal/60 leading-relaxed text-sm">
                                    {step.desc}
                                </p>

                                <div className="mt-12 h-[2px] w-0 bg-brand-accent group-hover:w-full transition-all duration-700"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
