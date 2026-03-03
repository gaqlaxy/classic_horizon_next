"use client";

import RatingStars from "./RatingStars";

export default function TestimonialCard({ review, featured = false, className = "" }) {
  if (!review) return null;

  const glassClasses = "bg-white/40 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(27,67,50,0.05)]";
  const featuredClasses = featured ? "p-10 md:p-14" : "p-8";

  return (
    <div className={`group relative ${glassClasses} ${featuredClasses} ${className} transition-all duration-700 hover:-translate-y-2 hover:bg-white/60 hover:shadow-[0_20px_40px_rgba(27,67,50,0.1)]`}>
      {/* Decorative Accent */}
      <div className="absolute top-0 left-0 w-2 h-0 bg-brand-accent group-hover:h-full transition-all duration-700"></div>

      {/* Rating */}
      <div className="mb-8 flex justify-between items-center">
        <RatingStars rating={review.rating} size={featured ? "lg" : "md"} />
        {featured && (
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-charcoal/20">Featured Story</span>
        )}
      </div>

      {/* Quote Text */}
      <div className="relative mb-10">
        <p className={`text-brand-forest/90 ${featured ? "text-2xl md:text-3xl" : "text-base"} font-heading font-medium leading-relaxed italic`}>
          "{review.text}"
        </p>
      </div>

      {/* Author Footer */}
      <div className="flex items-center gap-6 mt-auto">
        <div className="relative group/avatar">
          <div className={`${featured ? "w-16 h-16" : "w-12 h-12"} bg-brand-forest text-brand-white flex items-center justify-center font-bold text-lg tracking-tighter transition-transform duration-500 group-hover/avatar:scale-110`}>
            {review.initials}
          </div>
          <div className="absolute -inset-2 border border-brand-accent/0 group-hover/avatar:border-brand-accent/40 transition-all duration-500"></div>
        </div>

        <div className="min-w-0">
          <p className="font-heading font-bold text-brand-forest text-lg tracking-tight mb-1">
            {review.author}
          </p>
          <div className="flex items-center gap-3">
            <div className="h-px w-4 bg-brand-accent"></div>
            <p className="text-brand-charcoal/40 text-[9px] font-bold uppercase tracking-[0.2em] line-clamp-1">
              {review.trip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
