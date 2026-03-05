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
    <div className="sticky top-6 h-fit">
      <div
        className={`bg-brand-white border border-brand-charcoal/10 p-8 md:p-10 shadow-xl relative overflow-hidden group transition-all duration-500 rounded-lg ${hasUpgrades ? "border-brand-accent/40 shadow-brand-accent/10" : ""
          }`}
      >
        <div
          className={`absolute top-0 right-0 w-40 h-40 rounded-full -mr-20 -mt-20 blur-3xl transition-colors duration-700 ${hasUpgrades
              ? "bg-brand-accent/20"
              : "bg-brand-accent/5 group-hover:bg-brand-accent/10"
            }`}
        ></div>

        <div className="relative z-10">
          <div className="mb-10 text-center">
            <span className="text-brand-charcoal/40 text-[10px] block uppercase tracking-[0.4em] mb-2 font-bold">
              Estimated Investment
            </span>
            <div className="flex items-center justify-center gap-2">
              <span
                className={`text-6xl md:text-7xl font-heading font-bold transition-all duration-500 ${hasUpgrades ? "text-brand-accent" : "text-brand-forest"
                  } tracking-tighter`}
              >
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>
            <span className="block text-[9px] uppercase tracking-widest text-brand-forest/50 font-bold mt-3 italic">
              Final estimate pending curation
            </span>
          </div>

          {/* Customization Summary */}
          {hasUpgrades && (
            <div className="mb-8 p-5 bg-brand-forest/3 border-l border-brand-accent/40 rounded">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-3">
                Bespoke Requests
              </h5>
              <div className="space-y-2">
                {Object.entries(customizations).map(([day, type]) => {
                  if (type !== "luxury") return null;
                  return (
                    <div
                      key={day}
                      className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-brand-forest/70"
                    >
                      <span>Day {parseInt(day) + 1} Upgrade</span>
                      <span>+₹250</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="space-y-5 mb-10">
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
                className="flex justify-between items-center py-4 border-b border-brand-charcoal/5 last:border-0"
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

          <div className="space-y-3">
            <Link
              href={`/booking?package=${encodeURIComponent(pkgName)}`}
              className={`group flex items-center justify-between w-full p-5 text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-lg hover:shadow-xl rounded-lg ${hasUpgrades
                  ? "bg-brand-accent text-brand-forest hover:bg-brand-accent/90"
                  : "bg-brand-forest text-brand-white hover:bg-brand-charcoal"
                }`}
            >
              {hasUpgrades ? "Request Bespoke Quote" : "Begin Reservation"}
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
            <a
              href="tel:+910000000000"
              className="block w-full text-center border-2 border-brand-forest text-brand-forest p-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-brand-forest hover:text-brand-white transition-all rounded-lg"
            >
              Speak to an Expert
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-brand-charcoal/5 text-center">
            <p className="text-[9px] text-brand-charcoal/30 font-bold uppercase tracking-[0.2em] leading-relaxed">
              Protected by our <br /> Flexible Modification Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
