"use client";

import TestimonialCard from "./TestimonialCard";

export default function FeaturedTestimonial({ review, className = "" }) {
  return (
    <div className={className}>
      <TestimonialCard review={review} featured={true} className="h-full" />
    </div>
  );
}
