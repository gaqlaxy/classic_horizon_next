"use client";

import { useState } from "react";

export default function TabNavigation() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "details", label: "Experience Details" },
    { id: "itinerary", label: "Itinerary" },
    { id: "reviews", label: "Reviews" },
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Increased for sticky header + tab nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="border-b border-brand-charcoal/10 sticky top-[72px] bg-brand-white/80 backdrop-blur-md z-40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex gap-0 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-6 md:px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all border-b-2 whitespace-nowrap ${activeTab === tab.id
                ? "border-brand-accent text-brand-forest"
                : "border-transparent text-brand-charcoal/40 hover:text-brand-forest"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
