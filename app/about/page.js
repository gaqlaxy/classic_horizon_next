"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Link from "next/link";

import HowItWorks from "../components/HowItWorks";

export default function AboutPage() {
    const containerRef = useRef();

    useGSAP(() => {
        const sections = gsap.utils.toArray(".about-section");

        sections.forEach((section) => {
            gsap.from(section.querySelectorAll(".reveal"), {
                opacity: 0,
                y: 30,
                stagger: 0.15,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                }
            });
        });

        // Special parallax for the big image
        gsap.to(".parallax-img", {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: ".parallax-container",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-brand-white pt-40 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">

                {/* Intro Section */}
                <section className="about-section mb-40">
                    <div className="max-w-4xl">
                        <span className="reveal text-brand-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Story</span>
                        <h1 className="reveal text-5xl md:text-8xl font-heading font-bold text-brand-forest mb-12 leading-tight tracking-tighter">
                            Modern Journeys. <br /> Classic Soul.
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                            <p className="reveal text-xl text-brand-charcoal font-medium leading-relaxed">
                                Founded on the belief that travel is the ultimate art form, Classic Horizon curators luxury experiences that resonate long after the journey ends.
                            </p>
                            <p className="reveal text-brand-charcoal/60 leading-relaxed">
                                We began as a small boutique outfit specializing in spiritual journeys across India. Today, we are a global name in bespoke travel, yet our core remains the same: a relentless pursuit of the authentic, the hidden, and the sublime.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Big Visual Section */}
                <section className="parallax-container relative h-[80vh] mb-40 -mx-6 md:-mx-12 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000"
                        alt="The art of travel"
                        className="parallax-img w-full h-[120%] object-cover brightness-75 scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="max-w-3xl text-center px-6">
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-white leading-tight italic">
                                "Travel is not just where you go, <br /> but how you see the world."
                            </h2>
                        </div>
                    </div>
                </section>

                {/* Philosophy Section */}
                <section className="about-section mb-40">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="relative aspect-square">
                                <img
                                    src="https://images.unsplash.com/photo-1519677191238-7125022327d5?q=80&w=1200"
                                    alt="Our Philosophy"
                                    className="reveal w-full h-full object-cover border border-brand-charcoal/5"
                                />
                                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-forest p-10 hidden md:flex flex-col justify-end">
                                    <span className="text-brand-accent text-5xl font-heading font-bold mb-4">10+</span>
                                    <p className="text-brand-white/60 text-xs font-bold uppercase tracking-widest">Years of Crafting Memories</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-12">
                            <div>
                                <h3 className="reveal text-xs font-bold uppercase tracking-[0.4em] text-brand-charcoal/30 mb-8">Our Philosophy</h3>
                                <h2 className="reveal text-4xl font-heading font-bold text-brand-forest mb-6">Intentional Discovery</h2>
                                <p className="reveal text-brand-charcoal/70 text-lg leading-relaxed">
                                    We don't do bucket lists. We do itineraries that breathe. We believe in spending an extra hour at a local market, in taking the slow train through the mountains, and in luxury that is felt rather than flaunted.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ring-1 ring-brand-charcoal/5 p-8">
                                <div>
                                    <h4 className="reveal font-bold text-brand-forest mb-2">Bespoke Only</h4>
                                    <p className="reveal text-sm text-brand-charcoal/60 italic">Every trip is built from scratch, never off a shelf.</p>
                                </div>
                                <div>
                                    <h4 className="reveal font-bold text-brand-forest mb-2">Local Synergy</h4>
                                    <p className="reveal text-sm text-brand-charcoal/60 italic">Direct partnerships with local communities and artisans.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team / Why Section */}
                <section className="about-section py-32 border-t border-brand-charcoal/10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="reveal text-4xl md:text-6xl font-heading font-bold text-brand-forest mb-6">Why Classic Horizon?</h2>
                        <div className="reveal h-1 w-20 bg-brand-accent mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <div className="reveal text-center">
                            <span className="text-4xl mb-6 block">✦</span>
                            <h4 className="text-xl font-heading font-bold text-brand-forest mb-3">Senior Curators</h4>
                            <p className="text-sm text-brand-charcoal/60 leading-relaxed">Your journey is designed by experts who have personally lived the location.</p>
                        </div>
                        <div className="reveal text-center">
                            <span className="text-4xl mb-6 block">✦</span>
                            <h4 className="text-xl font-heading font-bold text-brand-forest mb-3">24/7 Concierge</h4>
                            <p className="text-sm text-brand-charcoal/60 leading-relaxed">From lost passports to last-minute dinner reservations, we are your safety net.</p>
                        </div>
                        <div className="reveal text-center">
                            <span className="text-4xl mb-6 block">✦</span>
                            <h4 className="text-xl font-heading font-bold text-brand-forest mb-3">Private Access</h4>
                            <p className="text-sm text-brand-charcoal/60 leading-relaxed">Exclusive entry to private estates, museums, and local ceremonies unreachable by others.</p>
                        </div>
                    </div>
                </section>

                <HowItWorks />

                {/* Final CTA */}
                <section className="about-section py-40 text-center">
                    <h2 className="reveal text-4xl md:text-5xl font-heading font-bold text-brand-forest mb-12">Ready to write your next chapter?</h2>
                    <Link href="/packages" className="reveal inline-block px-12 py-5 bg-brand-forest text-brand-white font-bold uppercase tracking-widest text-xs hover:bg-brand-charcoal transition-all">
                        View Collections
                    </Link>
                </section>

            </div>
        </div>
    );
}
