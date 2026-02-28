"use client";


import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function About() {
    const containerRef = useRef();

    useGSAP(() => {
        gsap.from(".about-animate", {
            y: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });

        gsap.from(".about-line", {
            scaleX: 0,
            transformOrigin: "left",
            duration: 1.5,
            ease: "expo.inOut",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 md:py-32 bg-brand-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="about-line h-1 w-20 bg-brand-accent"></div>
                        <h2 className="about-animate text-4xl md:text-6xl font-heading font-bold text-brand-forest leading-tight">
                            Crafting Bespoke Journeys for the Discerning Traveler.
                        </h2>
                        <p className="about-animate text-brand-charcoal/70 text-lg leading-relaxed">
                            At Classic Horizon, we believe travel is more than just visiting a place; it's about the stories you bring home. Our agency is dedicated to creating immersive, tailor-made experiences that resonate with your individual spirit.
                        </p>
                        <div className="about-animate flex items-center gap-4">
                            <span className="text-brand-forest font-bold text-5xl">15+</span>
                            <span className="text-brand-charcoal/60 text-sm uppercase tracking-widest font-bold">Years of <br /> Excellence</span>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="about-animate aspect-[4/5] overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200"
                                alt="Travel experience"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <div className="about-animate absolute -bottom-10 -left-10 w-64 aspect-square border-8 border-brand-white z-10 hidden md:block">
                            <img
                                src="https://images.unsplash.com/photo-1545063914-a1a6ec821c88?q=80&w=600"
                                alt="Portrait"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
