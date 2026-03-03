"use client";

export default function RegionFilter({ regions, activeRegion, onRegionChange }) {
    return (
        <div className="relative z-40 bg-brand-white border-b border-brand-charcoal/5 py-6">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex items-center justify-between">
                    <div className="flex gap-8 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        {regions.map((region) => (
                            <button
                                key={region}
                                onClick={() => onRegionChange(region)}
                                className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all whitespace-nowrap relative pb-2 ${activeRegion === region
                                    ? "text-brand-forest scale-110"
                                    : "text-brand-charcoal/30 hover:text-brand-forest/60"
                                    }`}
                            >
                                {region}
                                {activeRegion === region && (
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent animate-width-grow"></span>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/20">
                        {activeRegion === "All Regions" ? "Showing All Locations" : `Exploring ${activeRegion}`}
                    </div>
                </div>
            </div>
        </div>
    );
}
