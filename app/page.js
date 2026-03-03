"use strict";

import Hero from "./components/Hero";
import About from "./components/About";
import Categories from "./components/Categories";
import FeaturedPackages from "./components/FeaturedPackages";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Categories />
      <FeaturedPackages />
      <HowItWorks />

      {/* Visual Break / Story Section */}


      <Testimonials />

      {/* Final Call to Action */}
      <section className="py-24 bg-brand-white text-center">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto border-y border-brand-charcoal/10 py-20 px-6">
            <span className="text-brand-accent font-bold uppercase tracking-[0.4em] text-xs mb-8 block">Newsletter</span>
            <h2 className="text-4xl md:text-7xl font-heading font-bold text-brand-forest mb-12 tracking-tighter">Ready to See the Horizon?</h2>
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-brand-charcoal/5 border-none px-8 py-6 text-brand-charcoal focus:ring-1 focus:ring-brand-accent outline-none"
              />
              <button className="px-12 py-6 bg-brand-forest text-brand-white font-bold uppercase tracking-widest text-xs hover:bg-brand-charcoal transition-all">
                Join the Club
              </button>
            </div>
            <p className="mt-8 text-brand-charcoal/40 text-[10px] uppercase tracking-widest font-bold">
              ✓ Periodic Inspiration &nbsp; - &nbsp; ✓ Exclusive Offers &nbsp; - &nbsp; ✓ Secure Privacy
            </p>
          </div>
        </div>
      </section>
    </>
  );
}