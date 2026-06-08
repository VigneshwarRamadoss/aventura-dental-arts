import { motion } from 'motion/react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Calendar, Phone, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import dentalDoc from './hero_section/dentaldoc 1.png';
import serviceBg from './hero_section/service-bg.png';
import drAbout from './hero_section/dr-about.png';

export default function Home() {
  const services = [
    { title: 'Cosmetic Dentistry', desc: 'Veneers, whitening, and smile makeovers.', icon: '✨', slug: 'cosmetic' },
    { title: 'General Dentistry', desc: 'Comprehensive care for optimal oral health.', icon: '🦷', slug: 'general' },
    { title: 'Restorative Care', desc: 'Implants, crowns, and bridges to restore function.', icon: '🛡️', slug: 'restorative' },
    { title: 'Emergency Services', desc: 'Immediate attention for urgent dental needs.', icon: '⚡', slug: 'emergency' }
  ];

  const testimonials = [
    { text: "The team here is incredible. I've never felt more comfortable at a dentist's office. My veneers look perfectly natural.", author: "Sarah M.", rating: 5 },
    { text: "Premium experience from the moment you walk in. The attention to detail is unmatched in Aventura.", author: "James D.", rating: 5 },
    { text: "Pain-free root canal. I didn't think it was possible. Dr. Smith is an absolute artist.", author: "Elena R.", rating: 5 }
  ];

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0F15]/45 via-[#0E0F15]/80 to-[#0E0F15] z-10" />
          <motion.img 
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 1 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            src={dentalDoc} 
            alt="Aventura Dental Arts Practice" 
            className="fixed top-0 left-0 w-full h-screen object-cover object-center pointer-events-none"
            style={{ 
              willChange: 'transform',
              filter: 'brightness(0.55) contrast(1.1) saturate(0.9)'
            }}
          />
          {/* Seductive luxury ambient radial glow behind typography */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-bronze/10 rounded-full blur-[150px] pointer-events-none z-[15]" />
        </div>

        <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl mx-auto mt-20">
          {/* Glassmorphic location pill with pulse and shimmer sweep */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-near-black/60 border border-bronze/30 backdrop-blur-md mb-8 shadow-[0_4px_30px_rgba(179,140,97,0.12)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 w-[40px] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer pointer-events-none" />
            <span className="w-2 h-2 rounded-full bg-bronze animate-pulse" />
            <span className="font-sans text-xs md:text-sm text-bronze tracking-[0.2em] uppercase font-semibold">
              Aventura, Florida
            </span>
          </motion.div>

          {/* Premium contrast custom title */}
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="font-serif italic text-6xl md:text-8xl lg:text-[108px] xl:text-[120px] leading-[0.92] md:leading-[0.88] xl:leading-[0.85] tracking-tight text-light-beige mb-8 select-none"
          >
            Artistry <span className="text-bronze font-serif italic font-normal">in</span> <br /> Dentistry.
          </motion.h1>

          {/* Luxury Diamond Star Brand Divider */}
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center justify-center gap-4 w-full max-w-xs mb-8"
          >
            <div className="h-[1px] bg-gradient-to-r from-transparent to-bronze/50 flex-1" />
            <span className="text-bronze text-base">✦</span>
            <div className="h-[1px] bg-gradient-to-l from-transparent to-bronze/50 flex-1" />
          </motion.div>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="font-sans text-off-white/90 max-w-2xl text-lg md:text-xl lg:text-2xl leading-relaxed mb-12"
          >
            Experience a new standard of dental care. Restrained luxury meets clinical excellence to craft your perfect smile.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button as={Link} to="/contact" variant="primary" className="shadow-[0_4px_25px_rgba(234,232,232,0.15)] hover:shadow-[0_4px_30px_rgba(234,232,232,0.25)]">
              Book Appointment
            </Button>
            <Button as={Link} to="/services" variant="secondary" className="hover:border-bronze transition-colors">
              View Services
            </Button>
          </motion.div>

          {/* Floating HUD Symmetrical Trust Cards */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16 max-w-2xl w-full text-left"
          >
            <div className="bg-near-black/55 border border-bronze/10 hover:border-bronze/30 backdrop-blur-md p-4 rounded-xl flex items-center gap-4 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(179,140,97,0.08)] group relative overflow-hidden">
              <div className="absolute inset-0 w-[40px] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer pointer-events-none" />
              <div className="h-11 w-11 rounded-lg bg-bronze/10 flex items-center justify-center group-hover:bg-bronze/20 transition-colors">
                <Star className="text-bronze h-5 w-5 fill-bronze animate-pulse" />
              </div>
              <div>
                <p className="font-serif text-lg text-light-beige leading-none">4.9 Google Rating</p>
                <p className="font-sans text-xs text-light-beige/50 mt-1.5">500+ Verified Patient Reviews</p>
              </div>
            </div>

            <div className="bg-near-black/55 border border-bronze/10 hover:border-bronze/30 backdrop-blur-md p-4 rounded-xl flex items-center gap-4 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(179,140,97,0.08)] group relative overflow-hidden">
              <div className="absolute inset-0 w-[40px] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer pointer-events-none" />
              <div className="h-11 w-11 rounded-lg bg-bronze/10 flex items-center justify-center group-hover:bg-bronze/20 transition-colors">
                <ShieldCheck className="text-bronze h-6 w-6 animate-pulse" />
              </div>
              <div>
                <p className="font-serif text-lg text-light-beige leading-none">Columbia DDS</p>
                <p className="font-sans text-xs text-light-beige/50 mt-1.5">AACD Clinical Board Certified</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-bronze/60 text-xs tracking-widest font-sans uppercase">Scroll</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-bronze/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="bg-near-black border-y border-charcoal/50 py-10 px-6 relative z-30 -mt-1">
        <div className="max-w-site mx-auto flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-off-white border-2 border-light-beige flex items-center justify-center">
              <Star className="text-bronze h-6 w-6 fill-bronze" />
            </div>
            <div>
              <p className="font-serif text-2xl text-light-beige">4.9 Google</p>
              <p className="font-sans text-sm text-dark-gray">500+ Verified Reviews</p>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-charcoal"></div>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-off-white border-2 border-light-beige flex items-center justify-center">
              <span className="text-bronze font-serif text-2xl">15+</span>
            </div>
            <div>
              <p className="font-serif text-2xl text-light-beige">Years</p>
              <p className="font-sans text-sm text-dark-gray">Clinical Experience</p>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-charcoal"></div>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-off-white border-2 border-light-beige flex items-center justify-center">
              <ShieldCheck className="text-bronze h-8 w-8" />
            </div>
            <div>
              <p className="font-serif text-2xl text-light-beige">ADA</p>
              <p className="font-sans text-sm text-dark-gray">Certified Practice</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES OVERVIEW */}
      <section className="relative z-30 py-24 px-6 overflow-hidden bg-charcoal">
        {/* Luxury Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src={serviceBg} 
            alt="Services Background Texture" 
            className="w-full h-full object-cover object-center opacity-45 select-none pointer-events-none"
            style={{ filter: 'brightness(0.32) contrast(1.15)' }}
          />
          {/* Dark luxury gradient overlays for smooth boundaries */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-near-black z-10" />
        </div>

        <div className="max-w-site mx-auto relative z-20">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <span className="font-sans text-sm text-bronze uppercase tracking-[0.1em] block mb-4">Our Expertise</span>
            <h2 className="font-serif text-5xl md:text-[83px] text-light-beige leading-[0.9]">Elevating<br/>Dental Care</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#181A22]/85 backdrop-blur-md border border-dark-gray/30 p-8 hover:border-bronze/60 hover:shadow-[0_8px_30px_rgba(179,140,97,0.06)] transition-all duration-300 group cursor-pointer"
              >
                <div className="text-3xl mb-6">{service.icon}</div>
                <h3 className="font-serif text-2xl text-light-beige mb-3">{service.title}</h3>
                <p className="font-sans text-sm text-[#DAD5D3]/70 mb-6 min-h-[40px]">{service.desc}</p>
                <Link to={`/services/${service.slug}`} className="font-sans text-sm text-bronze group-hover:underline underline-offset-4 flex items-center">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button as={Link} to="/services" variant="secondary" className="hover:border-bronze transition-colors">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* 4. ABOUT TEASER */}
      <section className="relative z-30 bg-near-black py-24 px-6 overflow-hidden">
        {/* Subtle decorative backing radial glow */}
        <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-bronze/5 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-site mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="font-sans text-sm text-bronze uppercase tracking-[0.2em] font-semibold block mb-4">About Our Practice</span>
            <h2 className="font-serif text-[48px] md:text-[80px] leading-[0.95] text-light-beige mb-8 select-none">
              Refined,<br/>
              <span className="text-bronze font-serif italic font-normal">Personalized</span><br/>
              Care.
            </h2>
            
            {/* Elegant brand star divider */}
            <div className="flex items-center gap-4 w-full max-w-[200px] mb-8">
              <div className="h-[1px] bg-gradient-to-r from-transparent to-bronze/50 flex-1" />
              <span className="text-bronze text-sm">✦</span>
              <div className="h-[1px] bg-gradient-to-l from-transparent to-bronze/50 flex-1" />
            </div>

            <p className="font-sans text-light-beige/80 mb-8 max-w-md leading-relaxed">
              "We believe that dentistry is not just a clinical procedure, but an art form. Our approach centers on the harmony of health, function, and aesthetics."
            </p>
            <p className="font-serif text-3xl text-bronze italic mb-8 font-normal tracking-wide pl-4 border-l-2 border-bronze/40">— Dr. Vigneshwar</p>
            <Button as={Link} to="/about" variant="secondary" className="hover:border-bronze transition-colors">
              Meet Our Team
            </Button>
          </motion.div>

          {/* Premium gallery-framed portrait container */}
          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 w-full aspect-[4/5] bg-[#181A22] relative p-3 border border-dark-gray/20 shadow-2xl overflow-hidden group"
          >
            {/* Subtle overlay backing glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-bronze/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="w-full h-full overflow-hidden border border-bronze/10 relative">
              {/* Shimmer sweep effect */}
              <div className="absolute inset-0 w-[45px] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[600%] transition-transform duration-[1200ms] ease-out pointer-events-none" />
              
              <img 
                src={drAbout} 
                alt="Dr. Vigneshwar" 
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-[800ms] scale-[1.02] group-hover:scale-100" 
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="relative z-30 py-24 px-6 bg-charcoal">
        <div className="max-w-site mx-auto">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-[64px] text-light-beige">Patient Stories</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-near-black border border-dark-gray p-10 flex flex-col"
              >
                <div className="font-serif text-5xl text-bronze opacity-60 mb-4">"</div>
                <p className="font-sans text-sm text-light-beige italic flex-1 mb-8">
                  {testimonial.text}
                </p>
                <div className="w-full h-px bg-dark-gray mb-6" />
                <div className="flex justify-between items-center">
                  <span className="font-serif text-base text-light-beige">{testimonial.author}</span>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-bronze fill-bronze" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOOKING CTA */}
      <section className="relative z-30 bg-[#1c1815] border-y border-bronze/20 py-24 px-6 text-center">
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true }}
           className="max-w-2xl mx-auto flex flex-col items-center"
        >
          <h2 className="font-serif text-4xl md:text-[64px] text-light-beige mb-6">Ready for Your Best Smile?</h2>
          <p className="font-sans text-light-beige/70 mb-10">
            Schedule your consultation today and take the first step towards a healthier, more confident you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button as={Link} to="/contact" variant="primary">
              Book Appointment
            </Button>
            <span className="text-light-beige/50 font-sans mx-2">or</span>
            <a href="tel:3055550128" className="font-serif text-xl tracking-wider text-light-beige hover:text-bronze transition-colors flex items-center gap-2">
              <Phone className="h-5 w-5 text-bronze" /> (305) 555-0128
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
