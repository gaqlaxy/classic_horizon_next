import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-brand-charcoal text-brand-white pt-20 pb-10">
            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Brand Column */}
                <div>
                    <Link href="/" className="text-2xl font-heading font-bold tracking-tighter block mb-6">
                        CLASSIC<span className="text-brand-accent">HORIZON</span>
                    </Link>
                    <p className="text-brand-white/60 text-sm leading-relaxed mb-8">
                        Curating extraordinary journeys across the globe since 2010. We specialize in bespoke travel experiences that create lasting memories.
                    </p>
                    <div className="flex gap-4">
                        {["FB", "IG", "TW", "YT"].map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="w-10 h-10 border border-brand-white/20 flex items-center justify-center text-xs hover:border-brand-accent hover:text-brand-accent transition-all"
                            >
                                {social}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Explore Column */}
                <div>
                    <h4 className="text-lg font-bold mb-6 border-b border-brand-white/10 pb-2">Explore</h4>
                    <ul className="space-y-4">
                        <li><Link href="/packages" className="text-brand-white/60 hover:text-brand-accent text-sm transition-colors">All Destinations</Link></li>
                        <li><Link href="/packages?category=luxury" className="text-brand-white/60 hover:text-brand-accent text-sm transition-colors">Luxury Travel</Link></li>
                        <li><Link href="/packages?category=spiritual" className="text-brand-white/60 hover:text-brand-accent text-sm transition-colors">Spiritual Retreats</Link></li>
                        <li><Link href="/packages?category=adventure" className="text-brand-white/60 hover:text-brand-accent text-sm transition-colors">Adventure Tours</Link></li>
                    </ul>
                </div>

                {/* Company Column */}
                <div>
                    <h4 className="text-lg font-bold mb-6 border-b border-brand-white/10 pb-2">Company</h4>
                    <ul className="space-y-4">
                        <li><Link href="/about" className="text-brand-white/60 hover:text-brand-accent text-sm transition-colors">About Us</Link></li>
                        <li><Link href="/careers" className="text-brand-white/60 hover:text-brand-accent text-sm transition-colors">Careers</Link></li>
                        <li><Link href="/blog" className="text-brand-white/60 hover:text-brand-accent text-sm transition-colors">Travel Blog</Link></li>
                        <li><Link href="/contact" className="text-brand-white/60 hover:text-brand-accent text-sm transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Newsletter Column */}
                <div>
                    <h4 className="text-lg font-bold mb-6 border-b border-brand-white/10 pb-2">Newsletter</h4>
                    <p className="text-brand-white/60 text-sm mb-6">Join 50,000+ travelers for exclusive deals.</p>
                    <div className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="bg-brand-white/5 border border-brand-white/20 px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                        />
                        <button className="bg-brand-forest text-brand-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-brand-forest transition-all">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-brand-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-brand-white/40 text-xs">
                    © {new Date().getFullYear()} Classic Horizon Travel Agency - All rights reserved
                </p>
                <div className="flex gap-8">
                    <Link href="/privacy" className="text-brand-white/40 hover:text-brand-white text-xs transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="text-brand-white/40 hover:text-brand-white text-xs transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
