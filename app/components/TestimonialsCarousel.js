"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TestimonialCard from "./testimonials/TestimonialCard";

export default function TestimonialsCarousel({ reviews }) {
  const containerRef = useRef();
  const slideRef = useRef();

  // GSAP animation for entry
  useGSAP(() => {
    gsap.from(".carousel-card", {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });
  }, { scope: containerRef });

  const scrollBy = (dir) => {
    if (!slideRef.current) return;
    const width = slideRef.current.clientWidth;
    slideRef.current.scrollBy({ left: dir * width, behavior: "smooth" });
  };

  // Optional auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => scrollBy(1), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="flex overflow-x-auto scroll-snap-x mandatory scrollbar-hide gap-4"
        ref={slideRef}
        style={{ scrollSnapType: "x mandatory" }}
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="carousel-card flex-shrink-0 w-full md:w-80"
            style={{ scrollSnapAlign: "start" }}
          >
            <TestimonialCard review={review} featured={false} />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => scrollBy(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-brand-forest text-brand-white p-2 rounded-full hover:bg-brand-charcoal transition-all z-10"
        aria-label="Previous"
      >
        <
      </button>
      <button
        onClick={() => scrollBy(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-brand-forest text-brand-white p-2 rounded-full hover:bg-brand-charcoal transition-all z-10"
        aria-label="Next"
      >
        >
      </button>
    </div>
  );
}
