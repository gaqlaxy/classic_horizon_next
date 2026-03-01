"use client";

export default function RatingStars({ rating = 5, size = "md", className = "" }) {
  const sizeClass = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl"
  }[size];

  return (
    <div className={`flex gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`${sizeClass} ${i <= rating ? "text-brand-accent" : "text-brand-charcoal/20"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
