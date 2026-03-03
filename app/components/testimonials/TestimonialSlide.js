"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const TRIP_IMAGES = {
    "Bali & Lombok Odyssey - March 2026": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000",
    "Paris City Break - Feb 2026": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000",
    "Maldives Honeymoon - Jan 2026": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2000"
};

export default function TestimonialSlide({ review, isActive }) {
    const containerRef = useRef();
    const bgRef = useRef();
    const contentRef = useRef();

    useGSAP(() => {
        if (isActive) {
            const tl = gsap.timeline();

            tl.fromTo(bgRef.current,
                { scale: 1.1, opacity: 0 },
                { scale: 1, opacity: 0.6, duration: 2, ease: "power2.out" }
            )
                .fromTo(contentRef.current.querySelectorAll(".anim-text"),
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "outfit.out" },
                    "-=1.5"
                );
        }
    }, [isActive]);

    const bgImage = TRIP_IMAGES[review.trip] || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000";

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
            {/* Background Image */}
            <div
                ref={bgRef}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${bgImage}')` }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-brand-forest/70 backdrop-blur-[2px]"></div>

            {/* Content */}
            <div className="container mx-auto px-6 md:px-12 h-full flex flex-col justify-center relative z-20">
                <div className="max-w-4xl" ref={contentRef}>
                    <span className="anim-text text-brand-accent font-bold uppercase tracking-[0.5em] text-[10px] block mb-8">
                        The Traveler's Journal
                    </span>
                    <h3 className="anim-text text-brand-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-4">
                        {review.trip}
                    </h3>
                    <p className="anim-text text-4xl md:text-7xl font-heading font-bold text-brand-white leading-[1.1] tracking-tighter mb-12 italic">
                        "{review.text}"
                    </p>

                    <div className="anim-text flex items-center gap-6">
                        <div className="w-16 h-16 bg-brand-accent text-brand-forest flex items-center justify-center font-bold text-xl tracking-tighter">
                            {review.initials}
                        </div>
                        <div>
                            <h4 className="font-heading font-bold text-brand-white text-xl leading-none mb-1">{review.author}</h4>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <span key={i} className="text-brand-accent text-[10px]">★</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
