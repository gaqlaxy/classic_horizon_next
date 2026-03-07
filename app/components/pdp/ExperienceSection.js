export default function ExperienceSection({ description }) {
  return (
    <div id="overview" className="experience-section scroll-mt-32">
      <h2 className="section-title text-brand-charcoal/30 text-xs font-bold uppercase tracking-[0.5em] mb-8 md:mb-12 flex items-center gap-4">
        <span className="h-px w-8 bg-brand-charcoal/20"></span>
        The Experience
      </h2>
      <p className="text-brand-charcoal/80 text-xl md:text-2xl lg:text-3xl leading-relaxed font-light italic max-w-3xl">
        "{description}"
      </p>
    </div>
  );
}
