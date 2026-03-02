import Link from "next/link";

export default function ConciergeCard({
  pkgName,
  basePrice,
  duration,
  customizations,
  upgradeCount,
}) {
  const hasUpgrades = upgradeCount > 0;
  const totalPrice = basePrice + upgradeCount * 250;

  return (
    <div className="lg:col-span-4 sticky top-32">
      <div
        className={`bg-brand-white border border-brand-charcoal/10 p-12 shadow-2xl relative overflow-hidden group transition-all duration-500 ${hasUpgrades ? "border-brand-accent/40 shadow-brand-accent/5" : ""}`}
      >
        <div
          className={`absolute top-0 right-0 w-48 h-48 rounded-full -mr-24 -mt-24 blur-3xl transition-colors duration-700 ${hasUpgrades ? "bg-brand-accent/20" : "bg-brand-accent/5 group-hover:bg-brand-accent/10"}`}
        ></div>

        <div className="relative z-10">
          <div className="mb-12 text-center">
            <span className="text-brand-charcoal/40 text-[10px] block uppercase tracking-[0.4em] mb-3 font-bold">
              Estimated Investment
            </span>
            <div className="flex items-center justify-center gap-2">
              <span
                className={`text-7xl font-heading font-bold transition-all duration-500 ${hasUpgrades ? "text-brand-accent" : "text-brand-forest"} tracking-tighter`}
              >
                ${totalPrice.toLocaleString()}
              </span>
            </div>
            <span className="block text-[10px] uppercase tracking-widest text-brand-forest/50 font-bold mt-4 italic">
              Final estimate pending curation
            </span>
          </div>

          {/* Customization Summary */}
          {hasUpgrades && (
            <div className="mb-10 p-6 bg-brand-forest/3 border-x border-brand-accent/20">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">
                Bespoke Requests
              </h5>
              <div className="space-y-3">
                {Object.entries(customizations).map(([day, type]) => {
                  if (type !== "luxury") return null;
                  return (
                    <div
                      key={day}
                      className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-brand-forest/70"
                    >
                      <span>Day {parseInt(day) + 1} Upgrade</span>
                      <span>+$250</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="space-y-6 mb-12">
            {[
              { label: "Base Duration", val: duration },
              {
                label: "Configuration",
                val: hasUpgrades ? "Bespoke" : "Standard",
              },
              { label: "Service", val: "Private Concierge" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-5 border-b border-brand-charcoal/5 last:border-0"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/30">
                  {item.label}
                </span>
                <span className="text-xs font-bold text-brand-forest uppercase tracking-widest">
                  {item.val}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <Link
              href={`/booking?package=${encodeURIComponent(pkgName)}`}
              className={`group flex items-center justify-between w-full p-6 text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl hover:shadow-2xl ${hasUpgrades ? "bg-brand-accent text-brand-forest" : "bg-brand-forest text-brand-white hover:bg-brand-charcoal"}`}
            >
              {hasUpgrades ? "Request Bespoke Quote" : "Begin Reservation"}
              <span className="group-hover:translate-x-2 transition-transform duration-300">
                -
              </span>
            </Link>
            <a
              href="tel:+910000000000"
              className="block w-full text-center border-2 border-brand-forest text-brand-forest p-6 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-brand-forest hover:text-brand-white transition-all"
            >
              Speak to an Expert
            </a>
          </div>

          <div className="mt-10 pt-8 border-t border-brand-charcoal/5 text-center">
            <p className="text-[9px] text-brand-charcoal/30 font-bold uppercase tracking-[0.2em] leading-relaxed">
              Protected by our <br /> Flexible Modification Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
