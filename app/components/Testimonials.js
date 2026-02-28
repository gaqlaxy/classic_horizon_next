"use client";


import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import data from "../data.json";

export default function Testimonials() {
    const containerRef = useRef();

    useGSAP(() => {
        gsap.from(".testi-card", {
            opacity: 0,
            x: -30,
            stagger: 0.2,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });

        gsap.from(".quote-large", {
            opacity: 0,
            scale: 0.9,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 md:py-32 bg-brand-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-20 items-start">

                    {/* Main Featured Testimonial */}
                    <div className="flex-1">
                        <span className="text-brand-accent text-5xl font-serif mb-8 block select-none">“</span>
                        <blockquote className="quote-large text-3xl md:text-5xl font-heading font-medium text-brand-forest leading-tight mb-12">
                            {data.reviews[0].text}
                        </blockquote>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-brand-forest text-brand-white flex items-center justify-center text-xl font-bold rounded-full">
                                {data.reviews[0].initials}
                            </div>
                            <div>
                                <p className="text-xl font-bold font-heading text-brand-charcoal">{data.reviews[0].author}</p>
                                <p className="text-brand-charcoal/50 text-sm">{data.reviews[0].trip}</p>
                            </div>
                        </div>
                        <div className="mt-16 flex gap-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <span key={i} className="text-brand-accent text-2xl">★</span>
                            ))}
                        </div>
                    </div>

                    {/* Side Mini Testimonials */}
                    <div className="w-full lg:w-96 space-y-8">
                        <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-charcoal/40 mb-10">More Traveler Stories</h3>
                        {data.reviews.slice(1).map((review) => (
                            <div key={review.id} className="testi-card p-8 border border-brand-charcoal/5 hover:bg-brand-white hover:shadow-xl transition-all duration-500">
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <span key={i} className="text-brand-accent text-xs">★</span>
                                    ))}
                                </div>
                                <p className="text-brand-charcoal/70 text-sm italic mb-6 leading-relaxed">
                                    "{review.text}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-brand-charcoal/5 text-brand-charcoal flex items-center justify-center text-xs font-bold rounded-full">
                                        {review.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-brand-charcoal">{review.author}</p>
                                        <p className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest">{review.trip.split('·')[0]}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-4 border border-brand-charcoal/20 text-brand-charcoal text-xs font-bold uppercase tracking-widest hover:bg-brand-charcoal hover:text-brand-white transition-all">
                            Watch Video Stories
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
