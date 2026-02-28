"use client";


import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        destination: "",
        travelDate: "",
        guests: "2 Adults",
        message: ""
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const containerRef = useRef();
    const checkmarkRef = useRef();

    useGSAP(() => {
        // Entrance animation for the form container
        gsap.from(".form-step", {
            x: step > 1 ? 50 : 0,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        });
    }, [step]);

    useGSAP(() => {
        if (isSuccess) {
            const tl = gsap.timeline();
            tl.from(".success-content", {
                scale: 0.9,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            });
            tl.fromTo(checkmarkRef.current,
                { strokeDashoffset: 100 },
                { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" }
            );
        }
    }, [isSuccess]);

    const handleNext = (e) => {
        e.preventDefault();
        if (step < 3) setStep(step + 1);
        else setIsSuccess(true);
    };

    const handleBack = () => setStep(step - 1);

    if (isSuccess) {
        return (
            <div className="pt-40 pb-24 bg-brand-white min-h-screen flex items-center justify-center px-6">
                <div className="success-content bg-white p-12 md:p-20 shadow-2xl border border-brand-charcoal/5 rounded-sm text-center max-w-2xl w-full">
                    <div className="w-24 h-24 mx-auto mb-10 text-brand-forest">
                        <svg viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
                            <path
                                ref={checkmarkRef}
                                d="M30 50 L45 65 L70 35"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeDasharray="100"
                                style={{ strokeDashoffset: 100 }}
                            />
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-forest mb-6">Inquiry Received.</h1>
                    <p className="text-brand-charcoal/60 text-lg mb-12">
                        Thank you for choosing Classic Horizon, {formData.name}. One of our senior travel curators will contact you within 24 hours to craft your bespoke itinerary.
                    </p>
                    <Link href="/" className="inline-block px-12 py-5 bg-brand-forest text-brand-white font-bold uppercase tracking-widest text-xs hover:bg-brand-charcoal transition-all">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="pt-40 pb-24 bg-brand-white min-h-screen">
            <div className="container mx-auto px-6 max-w-3xl">

                {/* Progress Indicator */}
                <div className="flex items-center justify-between mb-20 relative">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-charcoal/5 -z-10"></div>
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`w-10 h-10 flex items-center justify-center text-xs font-bold rounded-full border transition-all duration-500 ${step === s
                                ? "bg-brand-forest text-brand-white border-brand-forest scale-125"
                                : step > s
                                    ? "bg-brand-accent text-brand-forest border-brand-accent"
                                    : "bg-white text-brand-charcoal/30 border-brand-charcoal/10"
                                }`}
                        >
                            {step > s ? "✓" : s}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleNext} className="bg-white p-8 md:p-16 shadow-xl border border-brand-charcoal/5">
                    {step === 1 && (
                        <div className="form-step space-y-8">
                            <h2 className="text-3xl font-heading font-bold text-brand-forest mb-10">Your Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">Full Name</label>
                                    <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" className="w-full border-b-2 border-brand-charcoal/10 py-4 focus:outline-none focus:border-brand-forest transition-colors font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">Email Address</label>
                                    <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" className="w-full border-b-2 border-brand-charcoal/10 py-4 focus:outline-none focus:border-brand-forest transition-colors font-medium" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">Phone Number</label>
                                <input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 00000 00000" className="w-full border-b-2 border-brand-charcoal/10 py-4 focus:outline-none focus:border-brand-forest transition-colors font-medium" />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="form-step space-y-8">
                            <h2 className="text-3xl font-heading font-bold text-brand-forest mb-10">Travel Preferences</h2>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">Where do you want to go?</label>
                                <input required type="text" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} placeholder="e.g., Santorini, Bali, Paris" className="w-full border-b-2 border-brand-charcoal/10 py-4 focus:outline-none focus:border-brand-forest transition-colors font-medium" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">Departure Date</label>
                                    <input required type="date" value={formData.travelDate} onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })} className="w-full border-b-2 border-brand-charcoal/10 py-4 focus:outline-none focus:border-brand-forest transition-colors font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">Travelers</label>
                                    <select value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: e.target.value })} className="w-full border-b-2 border-brand-charcoal/10 py-4 focus:outline-none focus:border-brand-forest transition-colors font-medium bg-transparent">
                                        <option>1 Adult</option>
                                        <option>2 Adults</option>
                                        <option>2 Adults, 1 Child</option>
                                        <option>Family (4+)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="form-step space-y-8">
                            <h2 className="text-3xl font-heading font-bold text-brand-forest mb-10">Final Details</h2>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">Reason for travel / Special Requests</label>
                                <textarea rows="4" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Honeymoon celebration, spiritual journey, dietary requirements etc." className="w-full border-b-2 border-brand-charcoal/10 py-4 focus:outline-none focus:border-brand-forest transition-colors font-medium resize-none"></textarea>
                            </div>
                            <div className="bg-brand-charcoal/5 p-6 space-y-2">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">Summary</p>
                                <p className="text-sm text-brand-charcoal leading-relaxed">
                                    Seeking a <strong>{formData.guests}</strong> journey to <strong>{formData.destination || 'a new horizon'}</strong>.
                                    {formData.travelDate && (
                                        <span> Target departure: <strong>{new Date(formData.travelDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>.</span>
                                    )}
                                </p>
                            </div>

                        </div>
                    )}

                    <div className="mt-16 flex justify-between items-center">
                        {step > 1 ? (
                            <button type="button" onClick={handleBack} className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/40 hover:text-brand-forest transition-colors">
                                ← Back
                            </button>
                        ) : <div />}
                        <button type="submit" className="px-12 py-5 bg-brand-forest text-brand-white font-bold uppercase tracking-widest text-xs hover:bg-brand-charcoal transition-all">
                            {step === 3 ? "Submit Inquiry" : "Continue"}
                        </button>
                    </div>
                </form>

                <p className="mt-12 text-center text-brand-charcoal/30 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Bespoke Travel Planning • Classic Horizon 2026
                </p>
            </div>
        </div>
    );
}
