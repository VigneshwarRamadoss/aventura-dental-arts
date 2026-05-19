import { motion } from 'motion/react';
import { servicesData, clinicSettings } from '../lib/mockData';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import * as Icons from 'lucide-react';
import { ArrowRight, Phone } from 'lucide-react';

export default function Services() {
  const technologies = [
    {
      title: "Guided Biofilm Therapy",
      desc: "Swiss-engineered warm water and fine erythritol spray, cleaning teeth and gums without sharp instruments or enamel scratching.",
      icon: "Wind"
    },
    {
      title: "3D Digital Imaging (iTero)",
      desc: "Instant 3D mouth mapping to replace uncomfortable traditional impressions and preview your post-orthodontics smile.",
      icon: "Tv"
    },
    {
      title: "Biomimetic Restoration",
      desc: "We use biocompatible composite resins and ceramic restorations that physically bond with your tooth's enamel to replicate nature.",
      icon: "Cpu"
    }
  ];

  return (
    <div className="bg-charcoal text-light-beige">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-44 pb-20 px-6 md:px-12 text-center border-b border-dark-gray/25">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_-15%,rgba(179,140,97,0.15),transparent)] z-0" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-sans tracking-[0.2em] text-bronze uppercase block mb-6"
          >
            Clinical Scope
          </motion.span>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl md:text-7xl lg:text-[83px] leading-tight mb-6"
          >
            Comprehensive Dentistry
          </motion.h1>
          <div className="w-16 h-px bg-bronze mx-auto mb-8" />
          <p className="font-sans text-light-beige/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Delivering advanced dental treatments in a sensory-calming, premium environment. We customize every detail of your care, from shade chemistry to local sedation.
          </p>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="py-24 px-6 md:px-12 max-w-site mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, idx) => {
            // Dynamically resolve the Lucide icon from mockData strings
            const IconComponent = (Icons as any)[service.iconName] || Icons.Sparkles;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group flex flex-col justify-between bg-near-black/40 border border-dark-gray/30 p-8 hover:border-bronze hover:bg-near-black/75 transition-all duration-300"
              >
                <div className="space-y-6">
                  {/* Icon & Category Tag */}
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-charcoal border border-dark-gray/30 text-bronze rounded-md group-hover:border-bronze/50 transition-colors">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-sans text-bronze uppercase tracking-[0.2em] font-semibold border border-bronze/30 px-2.5 py-0.5 rounded-full">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Text */}
                  <div>
                    <h3 className="font-serif text-2xl text-light-beige group-hover:text-white transition-colors mb-4">
                      {service.title}
                    </h3>
                    <p className="font-sans text-sm text-[#DAD5D3]/75 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-8 mt-4 border-t border-dark-gray/10 group-hover:border-bronze/10 transition-colors flex items-center justify-between">
                  <Link 
                    to={`/services/${service.slug}`} 
                    className="font-serif text-base text-bronze hover:text-light-beige transition-colors flex items-center gap-2 group/link"
                  >
                    Explore Treatment
                    <ArrowRight className="h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. TECHNOLOGY HIGHLIGHTS */}
      <section className="bg-near-black py-24 px-6 md:px-12 border-y border-charcoal/50">
        <div className="max-w-site mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            
            {/* Title block */}
            <div className="space-y-6 lg:sticky lg:top-32">
              <span className="text-sm font-sans text-bronze uppercase tracking-widest block">Modern Diagnostics</span>
              <h2 className="font-serif text-4xl md:text-5xl text-light-beige leading-tight">
                Advanced Clinical Technology
              </h2>
              <div className="w-12 h-px bg-bronze" />
              <p className="font-sans text-sm text-[#DAD5D3]/75 leading-relaxed">
                By investing in state-of-the-art clinical devices, we guarantee extreme diagnostics accuracy, dramatically reduced procedural times, and completely painless sessions.
              </p>
            </div>

            {/* List block */}
            <div className="lg:col-span-2 space-y-10">
              {technologies.map((tech, idx) => {
                const TechIcon = (Icons as any)[tech.icon] || Icons.Cpu;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    className="flex gap-6 items-start"
                  >
                    <div className="p-4 bg-charcoal border border-dark-gray text-bronze shrink-0 mt-1">
                      <TechIcon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl text-light-beige">{tech.title}</h3>
                      <p className="font-sans text-sm text-[#DAD5D3]/70 leading-relaxed">{tech.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="bg-bronze/10 border-t border-bronze/25 py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-[64px] text-light-beige mb-6">Experience Better Care</h2>
          <p className="font-sans text-light-beige/70 mb-10">
            Let us design a customized wellness and aesthetic program tailored exactly to your smile structure and personal comfort goals.
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
