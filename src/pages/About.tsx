import { motion } from 'motion/react';
import { teamData, clinicSettings } from '../lib/mockData';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, CheckCircle2, Phone, Calendar } from 'lucide-react';

export default function About() {
  const coreValues = [
    {
      title: "Clinical Artistry",
      desc: "We look beyond standard checklists, approaching smile reconstruction with the vision and hand-crafted precision of fine art.",
      icon: "🎨"
    },
    {
      title: "Biomimetic Precision",
      desc: "Our restorations replicate the physical mechanics, structural flexibility, and high light-translucency of natural enamel.",
      icon: "🔬"
    },
    {
      title: "Restrained Comfort",
      desc: "Our space is designed like a calm private club, ensuring your visit is entirely free of stress, sounds, and standard dental smells.",
      icon: "🌿"
    },
    {
      title: "Total Transparency",
      desc: "We respect your time and intelligence. We provide up-front comprehensive diagnoses, clear pricing, and no pressure.",
      icon: "💎"
    }
  ];

  const officePhotos = [
    { url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop", caption: "Advanced Operatory" },
    { url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop", caption: "Premium Patient Lounge" },
    { url: "https://images.unsplash.com/photo-1579684389782-64d84b5e905d?q=80&w=800&auto=format&fit=crop", caption: "Aesthetic Treatment Suite" }
  ];

  return (
    <div className="bg-charcoal text-light-beige">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-44 pb-24 px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden border-b border-dark-gray/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(179,140,97,0.15),transparent)] z-0" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-sans tracking-[0.2em] text-bronze uppercase block mb-6"
          >
            The Practice & Philosophy
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl md:text-7xl lg:text-[83px] leading-tight text-light-beige mb-8"
          >
            Restrained Luxury.<br />Clinical Artistry.
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="w-20 h-px bg-bronze mx-auto mb-10"
          />
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="font-sans text-light-beige/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Aventura Dental Arts was founded on a simple realization: that entering a dental practice should feel calm, inspiring, and completely reassuring. We leave space for peace, precision, and personal care.
          </motion.p>
        </div>
      </section>

      {/* 2. OUR STORY & FOUNDER */}
      <section className="py-24 px-6 md:px-12 max-w-site mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-sm font-sans text-bronze tracking-wider uppercase block">Clinical Heritage</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-light-beige leading-[0.9]">
              Crafting Smiles as a Fine Art
            </h2>
            <div className="w-12 h-px bg-bronze" />
            
            <div className="font-sans text-light-beige/75 space-y-6 leading-relaxed">
              <p>
                Led by Dr. Elena Rostova, our approach centers on the natural beauty of dentistry. We stand against standard, overly-white artificial makeovers. We focus intensely on light translucency, micro-texture, and facial geometry.
              </p>
              <p>
                Dr. Rostova holds a Doctor of Dental Surgery degree from Columbia University and has completed extensive training in biomimetic ceramics. This allows us to structurally fuse ceramic work to natural enamel down to the micron.
              </p>
              <p>
                Our Aventura studio is built as a state-of-the-art biological clinic, designed to minimize chemical smells, sound vibration, and anxiety. Here, your wellness always takes priority.
              </p>
            </div>
            
            <div className="pt-4 flex flex-col md:flex-row gap-6">
              <div className="flex items-center gap-3">
                <Award className="text-bronze h-6 w-6 shrink-0" />
                <span className="font-serif text-base text-light-beige">Columbia University Alumni</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-bronze h-6 w-6 shrink-0" />
                <span className="font-serif text-base text-light-beige">AACD Certified Member</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden bg-near-black border border-dark-gray/30 group">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop" 
                alt="Dr. Elena Rostova in her elements" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-near-black border border-dark-gray p-6 max-w-xs shadow-card">
              <p className="font-serif text-lg text-light-beige">Dr. Elena Rostova, DDS</p>
              <p className="font-sans text-xs text-bronze uppercase tracking-widest mt-1">Practice Founder</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. CORE VALUES STRIP */}
      <section className="bg-near-black py-24 px-6 md:px-12 border-y border-charcoal/50">
        <div className="max-w-site mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-sans text-bronze uppercase tracking-[0.15em] block mb-4">Our Standards</span>
            <h2 className="font-serif text-4xl md:text-5xl text-light-beige">The Pillars of Aventura</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-charcoal border border-dark-gray p-8 flex flex-col items-start gap-4 hover:border-bronze transition-colors"
              >
                <span className="text-4xl">{value.icon}</span>
                <h3 className="font-serif text-xl text-light-beige">{value.title}</h3>
                <p className="font-sans text-sm text-[#DAD5D3]/70 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MEET THE TEAM */}
      <section className="py-24 px-6 md:px-12 max-w-site mx-auto">
        <div className="text-center mb-20">
          <span className="text-sm font-sans text-bronze uppercase tracking-wider block mb-4">The Team</span>
          <h2 className="font-serif text-4xl md:text-[64px] leading-none text-light-beige mb-6">Expert Hands, Calm Spirits</h2>
          <p className="font-sans text-light-beige/70 max-w-xl mx-auto text-base">
            Every clinical specialist at Aventura Dental Arts holds advanced certifications and has been hand-selected for their patient-first empathy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {teamData.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-[#20232B] border border-dark-gray/30 flex flex-col group hover:border-bronze/50 transition-colors"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-charcoal">
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <span className="text-xs font-sans text-bronze uppercase tracking-widest block mb-2">{member.role}</span>
                <h3 className="font-serif text-2xl text-light-beige mb-4">{member.name}</h3>
                <p className="font-sans text-sm text-[#DAD5D3]/70 mb-6 flex-1">{member.shortBio}</p>
                
                <div className="border-t border-dark-gray/20 pt-4">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wide text-light-beige mb-2">Specialties</h4>
                  <ul className="space-y-1">
                    {member.specialties.slice(0, 3).map((spec, sIdx) => (
                      <li key={sIdx} className="font-sans text-xs text-light-beige/65 flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-bronze shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. SPACE TOUR Showcase */}
      <section className="bg-near-black py-24 px-6 md:px-12 border-t border-charcoal/50">
        <div className="max-w-site mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-sans text-bronze uppercase tracking-wider block mb-4">Tour Our Space</span>
            <h2 className="font-serif text-4xl md:text-5xl text-light-beige mb-4">Inside the Dental Studio</h2>
            <p className="font-sans text-light-beige/70 max-w-md mx-auto text-sm">
              We have eliminated the standard clinical aesthetic. Welcome to a space of quiet luxury, absolute clean, and natural materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {officePhotos.map((photo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative aspect-video overflow-hidden border border-dark-gray/30 group"
              >
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute bottom-4 left-6 font-serif text-lg text-light-beige">{photo.caption}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOOKING CTA */}
      <section className="bg-bronze/10 border-t border-bronze/25 py-24 px-6 text-center">
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
            <a href={`tel:${clinicSettings.phoneRaw}`} className="font-serif text-xl tracking-wider text-light-beige hover:text-bronze transition-colors flex items-center gap-2">
              <Phone className="h-5 w-5 text-bronze" /> {clinicSettings.phone}
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
