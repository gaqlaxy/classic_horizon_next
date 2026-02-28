"use client";


import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Link from "next/link";
import data from "../data.json";

export default function Categories() {
    const containerRef = useRef();

    useGSAP(() => {
        gsap.from(".cat-card", {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 bg-brand-charcoal text-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">Explore by Experience</h2>
                        <p className="text-brand-white/60 text-lg">Whether you seek tranquility or adrenaline, we have a curated journey for your specific travel style.</p>
                    </div>
                    <Link href="/packages" className="px-8 py-3 bg-brand-accent text-brand-forest font-bold uppercase tracking-widest text-xs hover:bg-white transition-all">
                        View All Categories
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {data.categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/packages?category=${category.id}`}
                            className="cat-card group relative aspect-[3/4] overflow-hidden"
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-90"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-2xl font-bold font-heading group-hover:text-brand-accent transition-colors">
                                    {category.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
