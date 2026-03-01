"use client";

import RatingStars from "./RatingStars";

export default function TestimonialCard({ review, featured = false, className = "" }) {
  if (!review) return null;

  const baseClasses = "bg-brand-white border border-brand-charcoal/10 transition-all duration-300 hover:shadow-xl hover:scale-105";
  const featuredClasses = featured ? "p-8 md:p-12" : "p-6";
  const textSize = featured ? "text-xl md:text-2xl leading-relaxed" : "text-sm leading-relaxed";
  const titleSize = featured ? "text-lg md:text-xl" : "text-sm";
  const avatarSize = featured ? "w-16 h-16 text-lg" : "w-10 h-10 text-xs";

  return (
    <div className={`${baseClasses} ${featuredClasses} ${className}`}>
      {/* Rating */}
      <div className="mb-4">
        <RatingStars rating={review.rating} size={featured ? "lg" : "md"} />
      </div>

      {/* Quote Mark */}
      {featured && (
        <span className="text-brand-accent text-5xl font-serif leading-none mb-4 block">"</span>
      )}

      {/* Quote Text */}
      <p className={`text-brand-charcoal/80 ${textSize} font-medium italic mb-6 md:mb-8`}>
        {featured ? review.text : `"${review.text}"`}
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className={`${avatarSize} bg-brand-forest text-brand-white flex items-center justify-center font-bold rounded-full shrink-0`}>
          {review.initials}
        </div>
        <div className="min-w-0">
          <p className={`font-bold text-brand-charcoal ${titleSize}`}>
            {review.author}
          </p>
          <p className={`text-brand-charcoal/50 ${featured ? "text-xs" : "text-[10px]"} uppercase tracking-widest line-clamp-2`}>
            {review.trip}
          </p>
        </div>
      </div>
    </div>
  );
}
