"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLocations, getPackages } from "../lib/data";
import CustomItineraryPlanner from "./CustomItineraryPlanner";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const router = useRouter();
    const containerRef = useRef();
    const titleRef = useRef();
    const subRef = useRef();
    const imgRef = useRef();
    const searchRef = useRef();
    const dropdownRef = useRef();

    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [showPlanner, setShowPlanner] = useState(false);

    // Build a flat list of searchable items (locations + package titles)
    const allDestinations = getLocations().map((loc) => ({
        type: "location",
        id: loc.id,
        name: loc.name,
        subtitle: `${loc.country} - ${loc.region}`,
    }));

    const allPackages = getPackages().map((pkg) => ({
        type: "package",
        id: pkg.id,
        slug: pkg.slug,
        name: pkg.title,
        subtitle: `${pkg.duration} - From ₹${pkg.price}`,
        locationId: pkg.location,
    }));

    const allItems = [...allDestinations, ...allPackages];

    // Filter logic
    const filteredItems = searchTerm.trim()
        ? allItems.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : allItems;

    const isNotFound = searchTerm.trim().length > 0 && filteredItems.length === 0;

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelectItem = useCallback((item) => {
        setSearchTerm(item.name);
        setShowDropdown(false);
    }, []);

    const navigateToItem = useCallback((item) => {
        if (!item) return;
        if (item.type === "location") {
            router.push(`/destinations/${item.id}`);
            return;
        }

        if (item.type === "package" && item.slug) {
            router.push(`/packages/${item.slug}`);
        }
    }, [router]);

    const handleSearch = useCallback(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) {
            setShowDropdown(true);
            return;
        }

        const exactLocation = allDestinations.find(
            (item) => item.name.toLowerCase() === term
        );
        if (exactLocation) {
            navigateToItem(exactLocation);
            return;
        }

        const exactPackage = allPackages.find(
            (item) => item.name.toLowerCase() === term
        );
        if (exactPackage) {
            navigateToItem(exactPackage);
            return;
        }

        if (filteredItems.length > 0) {
            navigateToItem(filteredItems[0]);
            return;
        }

        setShowDropdown(false);
        setShowPlanner(true);
    }, [searchTerm, allDestinations, allPackages, filteredItems, handleSelectItem]);

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
                    {/* Where To - with dropdown */}
                    <div className="relative flex-1 border-b md:border-b-0 md:border-r border-brand-charcoal/10 p-4 text-left" ref={dropdownRef}>
                        <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 font-bold mb-1">Where To?</label>
                        <input
                            type="text"
                            placeholder="Explore destinations..."
                            className="bg-transparent w-full text-sm font-medium focus:outline-none placeholder:text-brand-charcoal/30"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setShowDropdown(true);
                            }}
                            onFocus={() => setShowDropdown(true)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleSearch();
                                }
                            }}
                        />

                        {/* Dropdown */}
                        {showDropdown && (
                            <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-2xl border border-brand-charcoal/10 max-h-72 overflow-y-auto z-50 animate-in slide-in-from-top-2 duration-200">
                                {isNotFound ? (
                                    /* Not Found State */
                                    <div className="p-6 text-center">
                                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-brand-forest/10 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-brand-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-semibold text-brand-charcoal mb-1">
                                            &quot;{searchTerm}&quot; isn&apos;t listed yet
                                        </p>
                                        <p className="text-xs text-brand-charcoal/60 mb-4">
                                            But we can organize a custom trip for you!
                                        </p>
                                        <button
                                            onClick={() => {
                                                setShowPlanner(true);
                                                setShowDropdown(false);
                                            }}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-forest text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-brand-charcoal transition-all duration-300"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Plan Custom Itinerary
                                        </button>
                                    </div>
                                ) : (
                                    /* Results List */
                                    <div className="py-2">
                                        {/* Locations Section */}
                                        {filteredItems.filter(i => i.type === "location").length > 0 && (
                                            <>
                                                <div className="px-4 py-1.5">
                                                    <span className="text-[10px] uppercase tracking-widest text-brand-charcoal/40 font-bold">Destinations</span>
                                                </div>
                                                {filteredItems.filter(i => i.type === "location").map((item) => (
                                                    <button
                                                        key={`loc-${item.id}`}
                                                        onClick={() => handleSelectItem(item)}
                                                        className="w-full text-left px-4 py-2.5 hover:bg-brand-forest/5 transition-colors flex items-center gap-3 group"
                                                    >
                                                        <span className="w-8 h-8 rounded-full bg-brand-forest/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-forest/20 transition-colors">
                                                            <svg className="w-4 h-4 text-brand-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </span>
                                                        <div>
                                                            <p className="text-sm font-semibold text-brand-charcoal">{item.name}</p>
                                                            <p className="text-xs text-brand-charcoal/50">{item.subtitle}</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </>
                                        )}

                                        {/* Packages Section */}
                                        {filteredItems.filter(i => i.type === "package").length > 0 && (
                                            <>
                                                <div className="px-4 py-1.5 mt-1 border-t border-brand-charcoal/5">
                                                    <span className="text-[10px] uppercase tracking-widest text-brand-charcoal/40 font-bold">Packages</span>
                                                </div>
                                                {filteredItems.filter(i => i.type === "package").map((item) => (
                                                    <button
                                                        key={`pkg-${item.id}`}
                                                        onClick={() => handleSelectItem(item)}
                                                        className="w-full text-left px-4 py-2.5 hover:bg-brand-forest/5 transition-colors flex items-center gap-3 group"
                                                    >
                                                        <span className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                                                            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                        </span>
                                                        <div>
                                                            <p className="text-sm font-semibold text-brand-charcoal">{item.name}</p>
                                                            <p className="text-xs text-brand-charcoal/50">{item.subtitle}</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
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
                    <button
                        onClick={handleSearch}
                        className="bg-brand-forest text-brand-white px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-brand-charcoal transition-all"
                    >
                        Search
                    </button>
                </div>

                {/* Popular Chips */}
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <span className="text-brand-white/60 text-xs font-bold uppercase tracking-widest self-center mr-2">Popular:</span>
                    {["Bali", "Paris", "Kyoto", "Santorini"].map((city) => (
                        <button
                            key={city}
                            onClick={() => {
                                setSearchTerm(city);
                                setShowDropdown(true);
                            }}
                            className="px-5 py-1.5 border border-brand-white/30 text-brand-white text-xs hover:bg-brand-white hover:text-brand-forest transition-all duration-300"
                        >
                            {city}
                        </button>
                    ))}
                </div>
            </div>

            {/* Custom Itinerary Planner Modal */}
            <CustomItineraryPlanner
                isOpen={showPlanner}
                onClose={() => setShowPlanner(false)}
                destination={searchTerm}
            />
        </div>
    );
}
