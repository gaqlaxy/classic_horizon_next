"use client";

import { useState, useEffect } from "react";

export default function CustomItineraryPlanner({ isOpen, onClose, destination }) {
    const [formData, setFormData] = useState({
        destination: "",
        startDate: "",
        endDate: "",
        travelers: "2 Adults, 1 Room",
        specialRequests: "",
        contactInfo: "",
    });

    // Sync destination prop when modal opens
    useEffect(() => {
        if (isOpen && destination) {
            setFormData((prev) => ({ ...prev, destination }));
        }
    }, [isOpen, destination]);

    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Custom itinerary request:", formData);
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            onClose();
        }, 2000);
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative bg-white rounded-none shadow-2xl max-w-lg w-full mx-4 overflow-hidden animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-brand-forest px-8 py-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-forest to-brand-charcoal opacity-80" />
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-white/60 font-bold">Custom Experience</span>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            >
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <h2 className="text-2xl font-heading font-bold text-white tracking-tight">Plan Your Dream Trip</h2>
                        <p className="text-white/60 text-sm mt-1">Tell us what you envision and we&apos;ll craft it.</p>
                    </div>
                </div>

                {isSubmitted ? (
                    /* Success State */
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-forest/10 flex items-center justify-center">
                            <svg className="w-8 h-8 text-brand-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-heading font-bold text-brand-charcoal mb-1">Request Sent!</h3>
                        <p className="text-sm text-brand-charcoal/60">Our travel experts will reach out within 24 hours.</p>
                    </div>
                ) : (
                    /* Form */
                    <form onSubmit={handleSubmit} className="p-8 space-y-5">
                        {/* Destination */}
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 font-bold mb-2">Destination</label>
                            <input
                                name="destination"
                                value={formData.destination}
                                onChange={handleChange}
                                placeholder="Where do you want to go?"
                                className="w-full border-b-2 border-brand-charcoal/10 focus:border-brand-forest px-0 py-2 text-sm font-medium focus:outline-none transition-colors bg-transparent"
                                required
                            />
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 font-bold mb-2">Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="w-full border-b-2 border-brand-charcoal/10 focus:border-brand-forest px-0 py-2 text-sm font-medium focus:outline-none transition-colors bg-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 font-bold mb-2">End Date</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="w-full border-b-2 border-brand-charcoal/10 focus:border-brand-forest px-0 py-2 text-sm font-medium focus:outline-none transition-colors bg-transparent"
                                    required
                                />
                            </div>
                        </div>

                        {/* Travelers */}
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 font-bold mb-2">Travelers</label>
                            <select
                                name="travelers"
                                value={formData.travelers}
                                onChange={handleChange}
                                className="w-full border-b-2 border-brand-charcoal/10 focus:border-brand-forest px-0 py-2 text-sm font-medium focus:outline-none transition-colors bg-transparent appearance-none"
                            >
                                <option>1 Adult, 1 Room</option>
                                <option>2 Adults, 1 Room</option>
                                <option>2 Adults, 2 Rooms</option>
                                <option>Family (2 Adults + Kids)</option>
                                <option>Group (4+)</option>
                            </select>
                        </div>

                        {/* Special Requests */}
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 font-bold mb-2">Special Requests</label>
                            <textarea
                                name="specialRequests"
                                value={formData.specialRequests}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Dietary needs, accessibility, celebrations..."
                                className="w-full border-b-2 border-brand-charcoal/10 focus:border-brand-forest px-0 py-2 text-sm font-medium focus:outline-none transition-colors bg-transparent resize-none placeholder:text-brand-charcoal/30"
                            />
                        </div>

                        {/* Contact */}
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-brand-charcoal/50 font-bold mb-2">Contact Info</label>
                            <input
                                name="contactInfo"
                                value={formData.contactInfo}
                                onChange={handleChange}
                                placeholder="Email or phone number"
                                className="w-full border-b-2 border-brand-charcoal/10 focus:border-brand-forest px-0 py-2 text-sm font-medium focus:outline-none transition-colors bg-transparent placeholder:text-brand-charcoal/30"
                                required
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-3.5 border border-brand-charcoal/15 text-brand-charcoal text-xs font-bold uppercase tracking-widest hover:bg-brand-charcoal/5 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3.5 bg-brand-forest text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-charcoal transition-all"
                            >
                                Submit Request
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
