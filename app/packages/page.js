"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import Link from "next/link";
import { getLocations, getPackages } from "../lib/data";

gsap.registerPlugin(Flip);

export default function PackagesPage() {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("Featured");
  const [view, setView] = useState("grid");
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const containerRef = useRef();

  // Load recently viewed from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    setRecentlyViewed(stored);
  }, []);

  const locations = getLocations();
  const allPackages = getPackages();
  const regions = ["All", ...new Set(locations.map((l) => l.region))];

  // Filtering logic
  let packages =
    filter === "all"
      ? [...allPackages]
      : allPackages.filter((pkg) => {
          const location = locations.find((l) => l.id === pkg.location);
          return location?.region.toLowerCase() === filter.toLowerCase();
        });

  // Sorting logic
  if (sortBy === "Price: Low to High") {
    packages.sort((a, b) => a.price - b.price);
  } else if (sortBy === "Price: High to Low") {
    packages.sort((a, b) => b.price - a.price);
  } else if (sortBy === "Highest Rated") {
    packages.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "Duration") {
    packages.sort((a, b) => {
      const getDays = (s) => parseInt(s.split(" ")[0]);
      return getDays(b.duration) - getDays(a.duration);
    });
  }

  useGSAP(
    () => {
      gsap.from(".reveal", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: containerRef },
  );

  useLayoutEffect(() => {
    const state = Flip.getState(".pkg-grid-item");
    Flip.from(state, {
      duration: 0.7,
      scale: true,
      ease: "power2.inOut",
      stagger: 0.05,
      absolute: true,
      onEnter: (elements) =>
        gsap.fromTo(
          elements,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6 },
        ),
      onLeave: (elements) =>
        gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.6 }),
    });
  }, [filter, sortBy, view]);

  return (
    <div ref={containerRef} className="bg-brand-white min-h-screen">
      {/* Page Hero Banner */}
      <section className="relative h-105 pt-32 flex flex-col justify-end bg-brand-charcoal overflow-hidden group">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2000"
            alt="Collections Hero"
            className="w-full h-full object-cover transition-transform duration-10000 group-hover:scale-110"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-brand-charcoal to-transparent"></div>
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 pb-16">
          <div className="reveal flex items-center gap-2 text-brand-accent text-[10px] font-bold uppercase tracking-widest mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="opacity-30">/</span>
            <span className="text-white">Collections</span>
          </div>
          <h1 className="reveal text-5xl md:text-7xl font-heading font-bold text-white mb-6 tracking-tight leading-none">
            Our Collections
          </h1>
          <p className="reveal text-white/60 text-lg max-w-2xl leading-relaxed">
            From the peaks of the Himalayas to the sunsets of Santorini,
            discover journeys precisely tailored to your soul.
          </p>
        </div>
      </section>

      {/* Controls Bar */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-brand-charcoal/5">
        <div className="container mx-auto px-6 md:px-12 py-6 flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Region Filters */}
          <div className="flex items-center gap-4 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full lg:w-auto">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setFilter(region.toLowerCase())}
                className={`reveal px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border whitespace-nowrap ${
                  filter === region.toLowerCase()
                    ? "bg-brand-forest text-brand-white border-brand-forest shadow-lg"
                    : "bg-white text-brand-charcoal border-brand-charcoal/10 hover:border-brand-forest"
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          <div className="reveal flex items-center gap-8 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex items-center gap-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-b border-brand-charcoal/10 py-1 text-xs font-bold text-brand-forest focus:outline-none focus:border-brand-accent cursor-pointer"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Rated</option>
                <option>Duration</option>
              </select>
            </div>

            <div className="flex items-center gap-2 border border-brand-charcoal/10 p-1">
              <button
                onClick={() => setView("grid")}
                className={`p-2 transition-colors ${view === "grid" ? "bg-brand-forest text-white" : "text-brand-charcoal/30 hover:text-brand-forest"}`}
              >
                <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                  <div className="bg-current"></div>
                  <div className="bg-current"></div>
                  <div className="bg-current"></div>
                  <div className="bg-current"></div>
                </div>
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 transition-colors ${view === "list" ? "bg-brand-forest text-white" : "text-brand-charcoal/30 hover:text-brand-forest"}`}
              >
                <div className="flex flex-col gap-0.5 w-3 h-3">
                  <div className="bg-current h-0.5 w-full"></div>
                  <div className="bg-current h-0.5 w-full"></div>
                  <div className="bg-current h-0.5 w-full"></div>
                </div>
              </button>
            </div>

            <span className="text-[10px] text-brand-charcoal/40 font-bold uppercase tracking-widest hidden sm:block">
              {packages.length} Journeys
            </span>
          </div>
        </div>
      </section>

      {/* Package Grid */}
      <section className="py-20 container mx-auto px-6 md:px-12">
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              : "flex flex-col gap-8"
          }
        >
          {packages.map((pkg, idx) => {
            const isFeatured = view === "grid" && filter === "all" && idx === 0;
            return (
              <div
                key={pkg.id}
                className={`pkg-grid-item group ${isFeatured ? "md:col-span-2" : ""}`}
              >
                <Link href={`/packages/${pkg.slug}`}>
                  <div
                    className={`relative overflow-hidden bg-brand-charcoal ${view === "grid" ? (isFeatured ? "aspect-16/7" : "aspect-4/5") : "flex flex-col md:flex-row h-auto md:h-64"}`}
                  >
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className={`${view === "grid" ? "w-full h-full" : "w-full md:w-96 h-64 md:h-full"} object-cover transition-transform duration-700 group-hover:scale-105 brightness-90 group-hover:brightness-100`}
                    />

                    {/* Card Content Overlay */}
                    <div
                      className={`absolute inset-0 bg-brand-forest/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center`}
                    >
                      <span className="px-6 py-3 bg-white text-brand-forest text-[10px] font-bold uppercase tracking-widest scale-90 group-hover:scale-100 transition-transform duration-500">
                        View Trip Details -
                      </span>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2 pointer-events-none">
                      <span className="bg-white/95 text-brand-forest text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 shadow-sm">
                        {pkg.duration}
                      </span>
                      {pkg.onDiscount && (
                        <span className="bg-brand-accent text-brand-forest text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 shadow-sm">
                          Limited Offer
                        </span>
                      )}
                    </div>

                    {view === "list" && (
                      <div className="flex-1 p-10 flex flex-col justify-center bg-white border border-brand-charcoal/5 border-l-0">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="text-brand-accent text-[8px] font-bold uppercase tracking-[0.3em] mb-1 block">
                              Rating{" "}
                              <span className="text-brand-forest opacity-50">
                                ★ {pkg.rating}
                              </span>
                            </span>
                            <h3 className="text-2xl md:text-3xl font-heading font-bold text-brand-forest">
                              {pkg.title}
                            </h3>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-brand-charcoal/40 block font-bold uppercase tracking-tighter">
                              From
                            </span>
                            <span className="text-3xl font-heading font-bold text-brand-forest">
                              ${pkg.price}
                            </span>
                          </div>
                        </div>
                        <p className="text-brand-charcoal/60 text-sm line-clamp-2 max-w-xl mb-6">
                          {pkg.description}
                        </p>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40">
                          {locations.find((l) => l.id === pkg.location)?.name} -{" "}
                          {
                            locations.find((l) => l.id === pkg.location)
                              ?.country
                          }
                        </span>
                      </div>
                    )}
                  </div>

                  {view === "grid" && (
                    <div className="mt-6 flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] text-brand-accent font-bold">
                            ★ {pkg.rating}
                          </span>
                          <span className="text-[8px] text-brand-charcoal/30 font-bold uppercase tracking-widest">
                            {
                              locations.find((l) => l.id === pkg.location)
                                ?.region
                            }
                          </span>
                        </div>
                        <h3 className="text-xl font-heading font-bold text-brand-charcoal group-hover:text-brand-forest transition-colors leading-tight">
                          {pkg.title}
                        </h3>
                        <p className="text-brand-charcoal/40 text-[9px] font-bold uppercase tracking-[0.2em] mt-1">
                          {locations.find((l) => l.id === pkg.location)?.name} -{" "}
                          {
                            locations.find((l) => l.id === pkg.location)
                              ?.country
                          }
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold font-heading text-brand-forest leading-none block">
                          ${pkg.price}
                        </span>
                        <span className="text-[8px] uppercase tracking-widest text-brand-charcoal/30 font-bold mt-1 block">
                          Per Person
                        </span>
                      </div>
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </div>

        {packages.length === 0 && (
          <div className="text-center py-40 bg-brand-charcoal/5">
            <p className="text-brand-charcoal/40 font-heading text-3xl italic mb-8">
              No matching adventures found...
            </p>
            <button
              onClick={() => {
                setFilter("all");
                setSortBy("Featured");
              }}
              className="px-12 py-5 bg-brand-forest text-brand-white font-bold uppercase tracking-widest text-xs hover:bg-brand-charcoal transition-all"
            >
              Reset Selection
            </button>
          </div>
        )}
      </section>

      {/* Promise Strip */}
      <section className="bg-brand-charcoal text-brand-white py-16 border-y-2 border-brand-accent">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            {
              icon: "✓",
              title: "Best Price",
              desc: "Find it cheaper? We'll match.",
            },
            { icon: "↺", title: "Flex Book", desc: "Cancel up to 48h before." },
            { icon: "🛡", title: "Protected", desc: "Fully insured bookings." },
            {
              icon: "✈",
              title: "Expert Care",
              desc: "Crafted by specialists.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center group border-r border-white/5 last:border-0"
            >
              <span className="text-2xl text-brand-accent mb-4 block group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-1">
                {item.title}
              </h4>
              <p className="text-[10px] text-white/40">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Quote CTA */}
      <section className="py-32 container mx-auto px-6 md:px-12">
        <div className="border-[3px] border-dashed border-brand-forest/20 p-12 md:p-24 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-forest mb-6">
              Uniquely Yours.
            </h2>
            <p className="text-brand-charcoal/60 text-lg mb-10 leading-relaxed max-w-2xl">
              Our travel curators can design a completely bespoke itinerary -
              tailored to your exact dates, budget, and travel style. No generic
              packages. Just your journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <Link
                href="/booking"
                className="px-12 py-5 bg-brand-forest text-brand-white font-bold uppercase tracking-widest text-xs hover:bg-brand-charcoal transition-all"
              >
                Request Custom Itinerary -
              </Link>
              <span className="text-xs text-brand-charcoal/40 font-bold uppercase">
                or call{" "}
                <strong className="text-brand-forest">+1 800 JOURNEY</strong>
              </span>
            </div>
          </div>
          <div className="w-full lg:w-96 aspect-video bg-brand-charcoal/5 overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1544644013-3536ce48ca72?q=80&w=800"
              alt="Curator"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale"
            />
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="bg-brand-charcoal py-24 border-t border-brand-accent/30 overflow-hidden">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-accent mb-4">
                  Back to explore?
                </h2>
                <h3 className="text-3xl font-heading font-bold text-white">
                  Recently Viewed
                </h3>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("recentlyViewed");
                  setRecentlyViewed([]);
                }}
                className="text-[8px] font-bold uppercase tracking-widest text-white/30 hover:text-brand-accent transition-colors underline"
              >
                Clear History
              </button>
            </div>
            <div className="flex gap-8 overflow-x-auto no-scrollbar pb-10">
              {recentlyViewed.map((slug) => {
                const pkg = allPackages.find((p) => p.slug === slug);
                if (!pkg) return null;
                return (
                  <Link
                    key={pkg.id}
                    href={`/packages/${pkg.slug}`}
                    className="shrink-0 w-80 group"
                  >
                    <div className="aspect-video overflow-hidden mb-6 border border-white/5">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                    <h4 className="text-white font-bold text-lg mb-1 group-hover:text-brand-accent transition-colors">
                      {pkg.title}
                    </h4>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                      ${pkg.price} - {pkg.duration}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
