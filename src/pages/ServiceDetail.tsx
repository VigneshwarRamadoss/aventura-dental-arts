import * as React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { getServiceBySlug, servicesData, clinicSettings } from '../lib/mockData';
import Button from '../components/ui/Button';
import * as Icons from 'lucide-react';
import { ArrowLeft, Phone, HelpCircle, ChevronRight } from 'lucide-react';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(null);

  // Lookup service data based on URL parameter
  const service = React.useMemo(() => {
    if (!slug) return undefined;
    return getServiceBySlug(slug);
  }, [slug]);

  // Reset FAQ state when slug changes
  React.useEffect(() => {
    setOpenFaqIdx(null);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="pt-44 pb-32 px-6 max-w-site mx-auto text-center min-h-[80vh] flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(179,140,97,0.1),transparent)] z-0" />
        <div className="relative z-10 max-w-md">
          <span className="text-4xl">🔍</span>
          <h1 className="font-serif text-4xl md:text-5xl text-light-beige mt-6 mb-4">Treatment Not Found</h1>
          <p className="font-sans text-light-beige/70 text-sm md:text-base mb-8">
            The dental service you are looking for does not exist or has been reorganized. Please select from our core treatments.
          </p>
          <Button as={Link} to="/services" variant="primary">
            View All Services
          </Button>
        </div>
      </div>
    );
  }

  // Find recommended services
  const relatedServices = React.useMemo(() => {
    return servicesData.filter(s => service.relatedSlugs.includes(s.slug));
  }, [service]);

  return (
    <div className="bg-charcoal text-light-beige">
      
      {/* BACK BUTTON ROW */}
      <div className="max-w-site mx-auto pt-36 px-6 lg:px-12 relative z-10">
        <Link 
          to="/services" 
          className="inline-flex items-center gap-2 font-sans text-sm text-bronze hover:text-light-beige transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </Link>
      </div>

      {/* 1. HERO HERO BANNER */}
      <section className="pt-8 pb-20 px-6 lg:px-12 max-w-site mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-sans text-bronze uppercase tracking-[0.2em] font-semibold border border-bronze/30 px-3 py-1 rounded-full inline-block">
              {service.category} Dentistry
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none text-light-beige">
              {service.title}
            </h1>
            <p className="font-sans text-[#DAD5D3]/85 text-base md:text-lg leading-relaxed max-w-2xl">
              {service.overview}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button as={Link} to="/contact" variant="primary">
                Book Consultation
              </Button>
              <a href={`tel:${clinicSettings.phoneRaw}`} className="inline-flex items-center justify-center border border-dark-gray h-12 px-8 font-serif text-base text-light-beige hover:bg-light-beige hover:text-charcoal transition-all">
                Call {clinicSettings.phone}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden border border-dark-gray/30 bg-[#20232B]">
            <img 
              src={service.heroImage} 
              alt={service.title} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* 2. BENEFITS STRIP */}
      <section className="bg-near-black py-20 px-6 lg:px-12 border-y border-charcoal/50">
        <div className="max-w-site mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-sans text-bronze uppercase tracking-widest block mb-2">Our Standard</span>
            <h2 className="font-serif text-3xl md:text-4xl text-light-beige">Direct Clinical Benefits</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.benefits.map((benefit, idx) => {
              const BenIcon = (Icons as any)[benefit.iconName] || Icons.Sparkles;
              return (
                <div key={idx} className="bg-charcoal border border-dark-gray/20 p-6 space-y-4 hover:border-bronze/30 transition-colors">
                  <div className="p-2.5 bg-near-black/50 border border-dark-gray/20 text-bronze rounded w-fit">
                    <BenIcon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg text-light-beige">{benefit.label}</h3>
                  <p className="font-sans text-xs text-[#DAD5D3]/65 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. THE TREATMENT JOURNEY PROCESS */}
      <section className="py-24 px-6 lg:px-12 max-w-site mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-sans text-bronze uppercase tracking-widest block mb-2">Step-by-Step</span>
          <h2 className="font-serif text-4xl md:text-5xl text-light-beige">Your Clinical Roadmap</h2>
        </div>

        <div className="relative border-l border-dark-gray/30 max-w-3xl mx-auto pl-8 space-y-12">
          {service.process.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {/* Dot */}
              <div className="absolute -left-[41px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal border border-bronze text-[10px] font-sans font-bold text-bronze">
                {step.stepNumber}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-serif text-xl md:text-2xl text-light-beige">{step.title}</h3>
                <p className="font-sans text-sm md:text-base text-[#DAD5D3]/70 leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. FAQ ACCORDION WITH FRAMER MOTION */}
      <section className="bg-near-black py-24 px-6 lg:px-12 border-t border-charcoal/50">
        <div className="max-w-site mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 space-y-4">
            <div className="p-3 bg-charcoal border border-dark-gray text-bronze rounded w-fit">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-light-beige">Frequently Asked Questions</h2>
            <p className="font-sans text-sm text-[#DAD5D3]/70 leading-relaxed">
              Find answers to the most common questions regarding clinical approaches, recovery schedules, and safety.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-4">
              {service.faq.map((faqItem, idx) => {
                const isExpanded = openFaqIdx === idx;
                return (
                  <div key={idx} className="border-b border-dark-gray/30 pb-4">
                    <button
                      onClick={() => setOpenFaqIdx(isExpanded ? null : idx)}
                      className="w-full text-left flex justify-between items-center py-4 text-light-beige font-serif text-lg md:text-xl group"
                    >
                      <span className="group-hover:text-bronze transition-colors pr-6">{faqItem.question}</span>
                      <span className="text-bronze text-xl shrink-0 transition-transform duration-300">
                        {isExpanded ? '−' : '+'}
                      </span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="font-sans text-sm md:text-base text-[#DAD5D3]/75 leading-relaxed pb-4">
                            {faqItem.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 5. RELATED TREATMENTS */}
      {relatedServices.length > 0 && (
        <section className="py-24 px-6 lg:px-12 max-w-site mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-sans text-bronze uppercase tracking-widest block mb-2">Continue Exploring</span>
            <h2 className="font-serif text-3xl md:text-4xl text-light-beige">Related Dental Scope</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedServices.map((relService) => (
              <Link
                key={relService.id}
                to={`/services/${relService.slug}`}
                className="group bg-near-black/20 border border-dark-gray/20 p-6 flex flex-col justify-between hover:border-bronze/50 transition-colors"
              >
                <div className="space-y-4">
                  <h3 className="font-serif text-xl text-light-beige group-hover:text-bronze transition-colors">
                    {relService.title}
                  </h3>
                  <p className="font-sans text-xs text-[#DAD5D3]/65 line-clamp-2">
                    {relService.shortDescription}
                  </p>
                </div>
                <div className="pt-6 flex items-center justify-between font-sans text-xs text-bronze mt-4 border-t border-dark-gray/10">
                  <span>View Details</span>
                  <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
