"use client";

import Link from "next/link";
import { getLocations } from "../lib/data";

export default function CategoryListing({ packages, categoryName }) {
    const locations = getLocations();

    return (
        <section className="py-20 container mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-20">
                <span className="text-brand-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Collection</span>
                <h2 className="text-4xl md:text-6xl font-heading font-bold text-brand-forest mb-6">{categoryName} Packages</h2>
                <div className="h-1 w-20 bg-brand-accent mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {packages.length > 0 ? (
                    packages.map((pkg) => {
                        const location = locations.find(l => l.id === pkg.location);
                        return (
                            <Link key={pkg.id} href={`/packages/${pkg.slug}`} className="pkg-card group block">
                                <div className="relative aspect-[4/5] overflow-hidden mb-6">
                                    <img
                                        src={pkg.image}
                                        alt={pkg.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {pkg.onDiscount && (
                                        <div className="absolute top-6 left-6 bg-brand-accent text-brand-forest text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                                            Special Offer
                                        </div>
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <span className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-1">{pkg.duration}</span>
                                        <p className="text-white/80 text-sm line-clamp-2">{pkg.description}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h3 className="text-xl font-heading font-bold text-brand-charcoal group-hover:text-brand-forest transition-colors mb-2">
                                            {pkg.title}
                                        </h3>
                                        <p className="text-brand-charcoal/40 text-xs font-bold uppercase tracking-widest">
                                            {location?.name}, {location?.country}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-brand-charcoal/40 text-[10px] block uppercase tracking-tighter">From</span>
                                        <span className="text-2xl font-bold font-heading text-brand-forest">₹{pkg.price.toLocaleString()}</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div className="col-span-full py-40 text-center">
                        <p className="text-brand-charcoal/40 font-heading text-3xl italic mb-8">No matching adventures found...</p>
                    </div>
                )}
            </div>
        </section>
    );
}
