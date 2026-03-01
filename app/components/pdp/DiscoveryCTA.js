import Link from "next/link";

export default function DiscoveryCTA() {
    return (
        <section className="py-40 bg-brand-charcoal text-brand-white overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
                <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.5em] mb-8 block">Endless Horizons</span>
                <h2 className="text-5xl md:text-8xl font-heading font-bold mb-16 tracking-tighter leading-tight max-w-4xl mx-auto">
                    Your next extraordinary <br /> chapter awaits.
                </h2>
                <div className="flex flex-col sm:flex-row justify-center gap-8 items-center">
                    <Link href="/packages" className="group text-xs font-bold uppercase tracking-[0.4em] bg-brand-accent text-brand-forest px-12 py-6 hover:bg-brand-white transition-all shadow-xl">
                        Browse All Collections
                    </Link>
                    <Link href="/destinations" className="text-xs font-bold uppercase tracking-[0.4em] border-b-2 border-brand-white/20 pb-2 hover:border-brand-white transition-all">
                        Map our Destinations
                    </Link>
                </div>
            </div>
        </section>
    );
}
