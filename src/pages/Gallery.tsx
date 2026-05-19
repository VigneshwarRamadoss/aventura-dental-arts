import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { galleryData, clinicSettings } from '../lib/mockData';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Filter, X, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Phone } from 'lucide-react';

export default function Gallery() {
  const [selectedFilter, setSelectedFilter] = React.useState<string>('all');
  const [activeIdx, setActiveIdx] = React.useState<number | null>(null);
  const [sliderVal, setSliderVal] = React.useState<number>(50);

  const filters = [
    { label: 'All Cases', value: 'all' },
    { label: 'Porcelain Veneers', value: 'veneers' },
    { label: 'Teeth Whitening', value: 'whitening' },
    { label: 'Clear Aligners', value: 'invisalign' },
    { label: 'Dental Implants', value: 'implants' },
    { label: 'Biomimetic Restoration', value: 'restorative' },
  ];

  // Filter gallery items
  const filteredItems = React.useMemo(() => {
    if (selectedFilter === 'all') return galleryData;
    return galleryData.filter(item => item.treatmentType === selectedFilter);
  }, [selectedFilter]);

  // Navigate lightbox items
  const handlePrev = React.useCallback(() => {
    if (activeIdx === null) return;
    setActiveIdx(activeIdx === 0 ? filteredItems.length - 1 : activeIdx - 1);
    setSliderVal(50); // reset slider to middle
  }, [activeIdx, filteredItems]);

  const handleNext = React.useCallback(() => {
    if (activeIdx === null) return;
    setActiveIdx(activeIdx === filteredItems.length - 1 ? 0 : activeIdx + 1);
    setSliderVal(50); // reset slider to middle
  }, [activeIdx, filteredItems]);

  const handleClose = React.useCallback(() => {
    setActiveIdx(null);
    setSliderVal(50);
  }, []);

  // Keyboard navigation support
  React.useEffect(() => {
    if (activeIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, handleClose, handleNext, handlePrev]);

  // The active item resolved
  const activeItem = React.useMemo(() => {
    if (activeIdx === null) return null;
    return filteredItems[activeIdx];
  }, [activeIdx, filteredItems]);

  return (
    <div className="bg-charcoal text-light-beige min-h-[90vh]">
      
      {/* 1. HERO HEADER */}
      <section className="relative pt-44 pb-16 px-6 md:px-12 text-center border-b border-dark-gray/25">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_50%_-15%,rgba(179,140,97,0.12),transparent)] z-0" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-sm font-sans tracking-[0.2em] text-bronze uppercase block mb-6">Case Studies</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[83px] leading-tight mb-6">Smile Transformations</h1>
          <div className="w-16 h-px bg-bronze mx-auto mb-8" />
          <p className="font-sans text-light-beige/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A visual register of our biological and cosmetic artistry. Real patients, real smile adjustments, documented with legal consent details.
          </p>
        </div>
      </section>

      {/* 2. FILTER PILLS BAR */}
      <section className="py-8 px-6 max-w-site mx-auto relative z-10 flex flex-wrap gap-2 justify-center items-center">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => {
              setSelectedFilter(filter.value);
              setActiveIdx(null);
            }}
            className={`px-5 py-2 font-serif text-sm border transition-all rounded-full hover:border-bronze ${
              selectedFilter === filter.value 
                ? 'bg-light-beige text-charcoal border-light-beige' 
                : 'bg-transparent text-light-beige border-dark-gray/40'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </section>

      {/* 3. MASONRY / SYMMETRICAL GALLERY GRID */}
      <section className="pb-24 px-6 md:px-12 max-w-site mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-[#20232B] border border-dark-gray/30 overflow-hidden cursor-pointer hover:border-bronze transition-colors flex flex-col justify-between"
                onClick={() => {
                  setActiveIdx(idx);
                  setSliderVal(50);
                }}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-charcoal relative">
                  <img 
                    src={item.afterImage} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="font-serif text-lg text-light-beige bg-near-black/85 border border-bronze/50 px-6 py-2">
                      Interact Smile ↔
                    </span>
                  </div>
                  <span className="absolute top-4 left-4 bg-bronze text-charcoal font-sans font-semibold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded">
                    {item.treatmentLabel}
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-serif text-xl text-light-beige group-hover:text-bronze transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#DAD5D3]/70 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <span className="text-[10px] font-sans text-light-beige/40 block pt-2 uppercase tracking-widest">
                    ID: {item.consentId}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. LIGHTBOX PORTAL WITH BEFORE/AFTER SLIDER */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/98 backdrop-blur-md p-4 md:p-8 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-near-black border border-dark-gray max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 relative shadow-2xl"
            >
              
              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-light-beige hover:text-bronze p-2 z-30"
                aria-label="Close modal"
              >
                <X className="h-8 w-8" />
              </button>

              {/* Slider / Image Col (lg:col-span-7) */}
              <div className="lg:col-span-7 flex flex-col justify-center items-center">
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-dark-gray/30 select-none bg-charcoal">
                  
                  {/* AFTER Image (Full background) */}
                  <img 
                    src={activeItem.afterImage} 
                    alt="After Treatment" 
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                  
                  {/* BEFORE Image (Foreground, clipped by sliding polygon) */}
                  <div 
                    className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                    style={{ clipPath: `polygon(0 0, ${sliderVal}% 0, ${sliderVal}% 100%, 0 100%)` }}
                  >
                    <img 
                      src={activeItem.beforeImage} 
                      alt="Before Treatment" 
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                  </div>

                  {/* Vertical Divider line & Handle */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-bronze cursor-ew-resize flex items-center justify-center pointer-events-none z-10"
                    style={{ left: `${sliderVal}%` }}
                  >
                    <div className="h-9 w-9 rounded-full bg-bronze border-2 border-charcoal text-light-beige flex items-center justify-center text-xs font-semibold shadow-lg">
                      ↔
                    </div>
                  </div>

                  {/* Label Overlays */}
                  <span className="absolute bottom-4 left-4 bg-charcoal/80 border border-dark-gray/30 text-xs font-sans text-light-beige px-3 py-1 font-semibold pointer-events-none z-10">
                    Before
                  </span>
                  <span className="absolute bottom-4 right-4 bg-charcoal/80 border border-dark-gray/30 text-xs font-sans text-light-beige px-3 py-1 font-semibold pointer-events-none z-10">
                    After
                  </span>

                  {/* Input Range Overlay capturing dragging events */}
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    value={sliderVal}
                    onChange={(e) => setSliderVal(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                    aria-label="Before and After slide comparison"
                  />
                </div>
                <p className="font-sans text-xs text-light-beige/50 mt-4 italic text-center">
                  Drag left or right across the image to interactively compare before & after states.
                </p>
              </div>

              {/* Information Column (lg:col-span-5) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-xs font-sans text-bronze uppercase tracking-[0.15em] block mb-2">
                    {activeItem.treatmentLabel}
                  </span>
                  <h2 className="font-serif text-3xl text-light-beige leading-tight mb-4">
                    {activeItem.title}
                  </h2>
                  <div className="w-12 h-px bg-bronze mb-6" />
                  <p className="font-sans text-sm text-[#DAD5D3]/80 leading-relaxed">
                    {activeItem.description}
                  </p>

                  <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-3 text-xs font-sans text-[#DAD5D3]/70">
                      <ShieldCheck className="h-4 w-4 text-bronze" />
                      <span>Patient HIPAA Release Signed</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-sans text-[#DAD5D3]/70">
                      <CheckCircle2 className="h-4 w-4 text-bronze" />
                      <span>Consent Ref ID: {activeItem.consentId}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="pt-6 border-t border-dark-gray/25 flex items-center justify-between">
                  <div className="flex gap-2">
                    <button 
                      onClick={handlePrev}
                      className="p-2 border border-dark-gray/50 text-light-beige hover:border-bronze hover:text-bronze transition-all"
                      aria-label="Previous image"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={handleNext}
                      className="p-2 border border-dark-gray/50 text-light-beige hover:border-bronze hover:text-bronze transition-all"
                      aria-label="Next image"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                  <Button as={Link} to="/contact" variant="primary">
                    Book Smile Check
                  </Button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. BOOKING CTA */}
      <section className="bg-bronze/10 border-t border-bronze/25 py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-[64px] text-light-beige mb-6">Are You Ready to Transform?</h2>
          <p className="font-sans text-light-beige/70 mb-10">
            Every clinical transformation starts with a thorough 3D visual diagnostic consultation. Connect with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button as={Link} to="/contact" variant="primary">
              Book Appointment
            </Button>
            <span className="text-light-beige/50 font-sans mx-2">or</span>
            <a href={`tel:${clinicSettings.phoneRaw}`} className="font-serif text-xl tracking-wider text-light-beige hover:text-bronze transition-colors flex items-center gap-2">
              <Phone className="h-5 w-5 text-bronze" /> {clinicSettings.phone}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
