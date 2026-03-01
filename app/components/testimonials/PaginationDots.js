"use client";

export default function PaginationDots({ total, current, onChange, className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onChange(idx)}
          aria-label={`Go to testimonial ${idx + 1}`}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            idx === current
              ? "bg-brand-accent w-8"
              : "bg-brand-charcoal/20 hover:bg-brand-charcoal/40"
          }`}
        />
      ))}
    </div>
  );
}
