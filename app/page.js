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
      <section className="relative py-32 bg-brand-forest text-brand-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-accent/5 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-tight">Every Milestone <br /> Deserves a Map.</h2>
            <p className="text-brand-white/70 text-lg mb-12 max-w-lg leading-relaxed">
              Whether it's a honeymoon in the Maldives or a spiritual retreat in the Himalayas, we precisely craft every moment so you can focus on the memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/booking" className="px-10 py-5 bg-brand-accent text-brand-forest font-bold uppercase tracking-widest text-xs hover:bg-white transition-all text-center">
                Start Your Journey
              </Link>
              <Link href="/about" className="px-10 py-5 border border-brand-white/20 text-brand-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all text-center">
                Our Philosophy
              </Link>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-6">
            <div className="aspect-3/4 overflow-hidden translate-y-12">
              <img src="https://images.unsplash.com/photo-1512100356956-c1227c331f01?q=80&w=800" alt="Travel" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="aspect-3/4 overflow-hidden -translate-y-12">
              <img src="https://images.unsplash.com/photo-1540202404-a2f29036bb52?q=80&w=800" alt="Travel" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
        </div>
      </section>

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