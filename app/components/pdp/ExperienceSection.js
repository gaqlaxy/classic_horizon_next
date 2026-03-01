export default function ExperienceSection({ description }) {
    const inclusions = ["Private Transfers", "Premium Lodging", "Expert Guide", "Curated Dining"];

    return (
        <div className="experience-section">
            <h2 className="section-title text-brand-charcoal/30 text-xs font-bold uppercase tracking-[0.5em] mb-12 flex items-center gap-4">
                <span className="h-px w-8 bg-brand-charcoal/20"></span>
                The Experience
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8">
                    <p className="text-brand-charcoal/80 text-2xl md:text-3xl leading-relaxed font-light italic">
                        "{description}"
                    </p>
                </div>
                <div className="lg:col-span-4 bg-brand-charcoal/3 p-10 border-l-2 border-brand-accent shadow-sm">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-forest mb-6">Inclusions</h4>
                    <ul className="space-y-4">
                        {inclusions.map((h, i) => (
                            <li key={i} className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/50 flex items-center gap-3">
                                <span className="text-brand-accent">✦</span> {h}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
