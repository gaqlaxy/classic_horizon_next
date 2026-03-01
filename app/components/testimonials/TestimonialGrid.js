"use client";

import TestimonialCard from "./TestimonialCard";

export default function TestimonialGrid({ reviews, className = "" }) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {reviews.map((review) => (
        <TestimonialCard key={review.id} review={review} featured={false} />
      ))}
    </div>
  );
}
