"use client";


import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef();
    const titleRef = useRef();
    const subRef = useRef();
    const imgRef = useRef();
    const searchRef = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        // Entrance animation
        tl.fromTo(imgRef.current,
            { scale: 1.2, filter: "brightness(0.4)" },
            { scale: 1, filter: "brightness(0.6)", duration: 2.5, ease: "power2.out" }
        );

        tl.fromTo(".reveal-span",
            { y: 100 },
            { y: 0, duration: 1.2, stagger: 0.1, ease: "expo.out" },
            "-=2"
        );

        tl.fromTo(subRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1 },
            "-=1"
        );

        tl.fromTo(searchRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1 },
            "-=0.8"
        );

        // Parallax on scroll
        gsap.to(imgRef.current, {
            y: "30%",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Immersive Background */}
            <div
                ref={imgRef}
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2543')" }}
            ></div>

            {/* Content Overlay */}
            <div className="relative z-10 text-center px-6">
                <h1 ref={titleRef} className="text-5xl md:text-8xl text-brand-white font-heading font-bold mb-6 tracking-tight leading-[1.1]">
                    <div className="reveal-text">
                        <span className="reveal-span">Your Next</span>
                    </div>
                    <div className="reveal-text">
                        <span className="reveal-span">Adventure Awaits</span>
                    </div>
                </h1>

                <p ref={subRef} className="text-brand-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
                    Search from 120+ handpicked destinations across 6 continents. Elevate your travel story with Classic Horizon.
                </p>

                {/* Hero Search Bar */}
                <div
                    ref={searchRef}
                    className="bg-white/95 backdrop-blur-sm p-2 md:p-3 flex flex-col md:flex-row shadow-2xl max-w-4xl mx-auto border border-white/20"
                >
                    <div className="flex-1 border-b md:border-b-0 md:border-r border-brand-charcoal/10 p-4 text-left">
                        <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 font-bold mb-1">Where To?</label>
                        <input type="text" placeholder="Explore destinations..." className="bg-transparent w-full text-sm font-medium focus:outline-none placeholder:text-brand-charcoal/30" />
                    </div>
                    <div className="flex-1 border-b md:border-b-0 md:border-r border-brand-charcoal/10 p-4 text-left">
                        <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 font-bold mb-1">Departure</label>
                        <input type="date" className="bg-transparent w-full text-sm font-medium focus:outline-none" />
                    </div>
                    <div className="flex-1 p-4 text-left">
                        <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 font-bold mb-1">Travelers</label>
                        <select className="bg-transparent w-full text-sm font-medium focus:outline-none appearance-none">
                            <option>2 Adults, 1 Room</option>
                            <option>1 Adult, 1 Room</option>
                            <option>2 Adults, 2 Rooms</option>
                        </select>
                    </div>
                    <button className="bg-brand-forest text-brand-white px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-brand-charcoal transition-all">
                        Search
                    </button>
                </div>

                {/* Popular Chips */}
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <span className="text-brand-white/60 text-xs font-bold uppercase tracking-widest self-center mr-2">Popular:</span>
                    {["Bali", "Paris", "Kyoto", "Santorini"].map((city) => (
                        <button key={city} className="px-5 py-1.5 border border-brand-white/30 text-brand-white text-xs hover:bg-brand-white hover:text-brand-forest transition-all duration-300">
                            {city}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
