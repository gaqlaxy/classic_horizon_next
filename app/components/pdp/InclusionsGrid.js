export default function InclusionsGrid() {
  const inclusions = [
    { title: "Private Transfers", desc: "Luxury ground transportation throughout your stay" },
    { title: "Premium Lodging", desc: "Hand-picked 5-star accommodations" },
    { title: "Expert Guide", desc: "Local cultural & spiritual expert guidance" },
    { title: "Curated Dining", desc: "Authentic local cuisine & special meals" },
  ];

  return (
    <div>
      <h3 className="section-title text-brand-charcoal/30 text-xs font-bold uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
        <span className="h-px w-8 bg-brand-charcoal/20"></span>
        What's Included
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inclusions.map((item, i) => (
          <div key={i} className="bg-brand-charcoal/2 border border-brand-charcoal/5 p-6 rounded-lg hover:border-brand-accent/20 transition-all">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-forest mb-3">
              {item.title}
            </h4>
            <p className="text-[10px] text-brand-charcoal/60 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
