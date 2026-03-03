"use client";

import { useState, useEffect, useRef } from "react";
import { getReviews } from "../lib/data";
import TestimonialSlide from "./testimonials/TestimonialSlide";

export default function Testimonials() {
  const reviews = getReviews();
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef();

  const nextSlide = () => {
    setActiveIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] bg-brand-forest overflow-hidden">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {reviews.map((review, idx) => (
          <TestimonialSlide
            key={review.id}
            review={review}
            isActive={activeIdx === idx}
          />
        ))}
      </div>

      {/* Navigation Layer */}
      <div className="absolute inset-x-0 bottom-20 z-30">
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-end">
          {/* Slide Indicator */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="text-brand-white font-heading font-bold text-4xl">
                {(activeIdx + 1).toString().padStart(2, '0')}
              </span>
              <div className="h-px w-12 bg-brand-accent/40"></div>
              <span className="text-brand-white/20 font-heading font-bold text-2xl">
                {reviews.length.toString().padStart(2, '0')}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-40 h-[2px] bg-brand-white/10 relative">
              <div
                className="absolute top-0 left-0 h-full bg-brand-accent transition-all duration-[8000ms] linear"
                key={activeIdx}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Nav Buttons */}
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="w-16 h-16 border border-brand-white/20 flex items-center justify-center text-brand-white hover:bg-brand-accent hover:border-brand-accent hover:text-brand-forest transition-all"
            >
              <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-16 h-16 border border-brand-white/20 flex items-center justify-center text-brand-white hover:bg-brand-accent hover:border-brand-accent hover:text-brand-forest transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Side Label */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:block z-30">
        <div className="vertical-text text-[10px] font-bold uppercase tracking-[0.6em] text-brand-white/10 whitespace-nowrap">
          The Classic Horizon Guest Register — 2026
        </div>
      </div>
    </section>
  );
}
