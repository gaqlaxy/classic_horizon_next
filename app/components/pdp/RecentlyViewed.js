import Link from "next/link";

export default function RecentlyViewed({ packages }) {
    if (!packages || packages.length === 0) return null;

    return (
        <section id="reviews" className="py-20 md:py-32 bg-brand-forest/2 border-t border-brand-charcoal/5 scroll-mt-32">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="section-title text-brand-charcoal/30 text-xs font-bold uppercase tracking-[0.5em] mb-12 md:mb-16 flex items-center gap-4">
                    <span className="h-px w-8 bg-brand-charcoal/20"></span>
                    Your Recently Explored
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
                    {packages.map(other => (
                        <Link key={other.id} href={`/packages/${other.slug}`} className="group block">
                            <div className="aspect-16/10 overflow-hidden mb-6 md:mb-8 bg-brand-forest/10 relative rounded-lg">
                                <img
                                    src={other.image}
                                    alt={other.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-brand-forest/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            </div>
                            <span className="text-brand-accent text-[10px] font-bold uppercase tracking-[0.3em] block mb-2 md:mb-3">{other.category}</span>
                            <h3 className="text-lg md:text-2xl font-bold font-heading text-brand-forest group-hover:text-brand-accent transition-colors duration-300">{other.title}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
