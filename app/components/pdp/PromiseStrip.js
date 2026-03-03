export default function PromiseStrip() {
    const promises = [
        { label: "Bespoke Planning", sub: "Tailored to your rhythm" },
        { label: "Luxury Stays", sub: "Handpicked premium villas" },
        { label: "Local Expertise", sub: "Deep cultural insights" },
        { label: "24/7 Concierge", sub: "Unfiltered peace of mind" }
    ];

    return (
        <section className="bg-brand-forest border-y border-brand-white/10 py-8 md:py-10 relative z-20">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {promises.map((item, i) => (
                        <div key={i} className="text-center lg:text-left">
                            <span className="block text-brand-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-2">{item.label}</span>
                            <span className="block text-brand-white/30 text-[9px] uppercase tracking-widest font-medium leading-relaxed">{item.sub}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
