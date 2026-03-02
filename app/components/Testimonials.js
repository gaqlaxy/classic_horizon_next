"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { getReviews } from "../lib/data";
import FeaturedTestimonial from "./testimonials/FeaturedTestimonial";
import TestimonialGrid from "./testimonials/TestimonialGrid";
import PaginationDots from "./testimonials/PaginationDots";

export default function Testimonials() {
  const containerRef = useRef();
  const [currentFeaturedIdx, setCurrentFeaturedIdx] = useState(0);

  const reviews = getReviews();
  // Get featured testimonial and remaining ones
  const featuredReview = reviews[currentFeaturedIdx];
  const otherReviews = reviews.filter((_, idx) => idx !== currentFeaturedIdx);

  useGSAP(() => {
    // Fade in section title
    gsap.from(".testi-title", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    // Featured card entrance
    gsap.from(".featured-card-wrapper", {
      opacity: 0,
      x: -40,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });

    // Grid cards staggered entrance
    gsap.from(".testimonial-grid-item", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".testimonial-grid-wrapper",
        start: "top 80%",
      },
    });

    // Pagination dots
    gsap.from(".pagination-wrapper", {
      opacity: 0,
      y: 10,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.3,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
    });
  }, { scope: containerRef });

  const handleFeaturedChange = (idx) => {
    setCurrentFeaturedIdx(idx);
  };

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 lg:py-40 bg-brand-white overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="testi-title mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-8 bg-brand-charcoal/20"></span>
            <span className="text-brand-charcoal/40 text-xs font-bold uppercase tracking-[0.3em]">
              Traveler Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-brand-forest leading-tight">
            Voices from<br className="hidden md:block" /> Our Community
          </h2>
        </div>

        {/* Featured + Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-12">
          {/* Featured Testimonial - Larger on left */}
          <div className="featured-card-wrapper lg:col-span-1">
            <FeaturedTestimonial review={featuredReview} />
          </div>

          {/* Other Testimonials - Grid on right */}
          <div className="testimonial-grid-wrapper lg:col-span-2">
            <TestimonialGrid
              reviews={otherReviews}
              className="[&>div]:testimonial-grid-item"
            />
          </div>
        </div>

        {/* Pagination Dots */}
        {reviews.length > 1 && (
          <div className="pagination-wrapper flex justify-center md:justify-start">
            <PaginationDots
              total={reviews.length}
              current={currentFeaturedIdx}
              onChange={handleFeaturedChange}
              className="mt-8"
            />
          </div>
        )}

        {/* Secondary CTA */}
        <div className="mt-16 md:mt-20 text-center md:text-left">
          <a
            href="#"
            className="inline-flex items-center gap-3 text-brand-accent font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all duration-300"
          >
            Read All {reviews.length} Reviews
            <span>-&gt;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
