"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, use, useEffect, useState } from "react";
import { notFound } from "next/navigation";

// Data and Components
import { getLocations, getPackages } from "../../lib/data";
import PackageHero from "../../components/pdp/PackageHero";
import PromiseStrip from "../../components/pdp/PromiseStrip";
import TabNavigation from "../../components/pdp/TabNavigation";
import ExperienceSection from "../../components/pdp/ExperienceSection";
import InclusionsGrid from "../../components/pdp/InclusionsGrid";
import ItineraryCustomizer from "../../components/pdp/ItineraryCustomizer";
import ConciergeCard from "../../components/pdp/ConciergeCard";
import RecentlyViewed from "../../components/pdp/RecentlyViewed";
import DiscoveryCTA from "../../components/pdp/DiscoveryCTA";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function PackageDetailPage({ params }) {
    const { slug } = use(params);
    const packages = getPackages();
    const locations = getLocations();
    const pkg = packages.find(p => p.slug === slug);
    const containerRef = useRef();

    // State
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [customizations, setCustomizations] = useState({});
    const [isCustomizing, setIsCustomizing] = useState(false);

    if (!pkg) {
        notFound();
    }

    const location = locations.find(l => l.id === pkg.location);

    const toggleCustomization = (idx, type) => {
        setCustomizations(prev => ({
            ...prev,
            [idx]: type
        }));
    };

    const upgradeCount = Object.values(customizations).filter(v => v === 'luxury').length;

    useEffect(() => {
        if (!pkg) return;
        const stored = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");

        const recentPkgs = stored
            .map(s => packages.find(p => p.slug === s))
            .filter(p => p && p.slug !== pkg.slug);

        setRecentlyViewed(recentPkgs.slice(0, 3));

        const updated = [pkg.slug, ...stored.filter(s => s !== pkg.slug)].slice(0, 5);
        localStorage.setItem("recentlyViewed", JSON.stringify(updated));
    }, [pkg]);

    useGSAP(() => {
        // Section Headers Fade-in
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

        // Force refresh ScrollTrigger on layout shifts
        ScrollTrigger.refresh();

    }, { scope: containerRef, dependencies: [isCustomizing, customizations] });

    return (
        <div ref={containerRef} className="bg-brand-white min-h-screen">
            {/* HERO SECTION */}
            <PackageHero pkg={pkg} location={location} />

            {/* BRANDING STRIP */}
            <PromiseStrip />

            {/* TAB NAVIGATION */}
            <TabNavigation />

            {/* MAIN CONTENT WITH FLOATING SIDEBAR */}
            <section className="py-16 md:py-24 container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
                    {/* Left Column: Content (8 cols) */}
                    <div className="lg:col-span-8 space-y-16 md:space-y-24">
                        {/* Experience Section */}
                        <ExperienceSection description={pkg.description} />

                        {/* Inclusions Grid */}
                        <InclusionsGrid />

                        {/* Itinerary Customizer */}
                        <ItineraryCustomizer
                            itinerary={pkg.itinerary}
                            customizations={customizations}
                            isCustomizing={isCustomizing}
                            setIsCustomizing={setIsCustomizing}
                            toggleCustomization={toggleCustomization}
                        />
                    </div>

                    {/* Right Column: Floating Sticky Sidebar (4 cols) */}
                    <div className="lg:col-span-4">
                        <ConciergeCard
                            pkgName={pkg.title}
                            basePrice={pkg.price}
                            duration={pkg.duration}
                            customizations={customizations}
                            upgradeCount={upgradeCount}
                        />
                    </div>
                </div>
            </section>

            {/* RECENTLY VIEWED */}
            <RecentlyViewed packages={recentlyViewed} />

            {/* DISCOVERY CTA */}
            <DiscoveryCTA />
        </div>
    );
}
