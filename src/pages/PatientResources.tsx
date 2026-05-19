import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { clinicSettings } from '../lib/mockData';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { FileDown, ShieldCheck, HeartHandshake, Phone, ArrowUpRight, HelpCircle } from 'lucide-react';

export default function PatientResources() {
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(null);

  const mockForms = [
    { title: "New Patient Registration Form", size: "1.2 MB", desc: "Basic contact, demographic info, and HIPAA disclosure authorizations." },
    { title: "Comprehensive Medical History", size: "940 KB", desc: "Outline of previous conditions, surgeries, and current medical prescriptions." },
    { title: "HIPAA Privacy Notice", size: "480 KB", desc: "Detailed breakdown of patient rights, records security, and data handling protocols." }
  ];

  const insurances = [
    { name: "Delta Dental", tier: "Premium Provider" },
    { name: "Cigna Dental", tier: "In-Network & Out-of-Network" },
    { name: "Aetna PPO", tier: "Out-of-Network Specialist" },
    { name: "MetLife Dental", tier: "Full Reimbursement Support" },
    { name: "Humana Dental", tier: "Claims Direct-Filing" },
    { name: "UnitedHealthcare", tier: "Aesthetic Diagnostics Claims" }
  ];

  const policyFaqs = [
    {
      q: "What should I expect during my very first visit?",
      a: "Your first visit is dedicated to comprehensive diagnostics and relationship-building. It includes low-radiation digital X-rays, a 3D intraoral scan, an oral cancer screening, and a detailed clinical consultation with Dr. Elena Rostova. We review your goals without any pressure or rush."
    },
    {
      q: "Which insurance providers do you accept?",
      a: "We work with most major dental PPO insurance plans. We direct-file claims on your behalf to maximize your reimbursement. Since we prioritize optimal clinical care and high-end materials, we advise checking with our Player Experience team to verify your specific coverage details before your visit."
    },
    {
      q: "How does out-of-network insurance reimbursement work?",
      a: "If we are out-of-network for your plan, don't worry. The majority of our PPO patients receive significant out-of-network reimbursements. Our Patient Experience Director, Victoria, handles all paperwork and claims submissions to ensure your insurance pays back your benefits directly to you."
    },
    {
      q: "Do you offer flexible financing plans for cosmetic or implant restorations?",
      a: "Yes. We partner with top-tier healthcare financing services (such as CareCredit and LendingClub) to offer low-interest and interest-free installment plans. This allows you to split your premium porcelain veneers or dental implant investments into comfortable monthly payments."
    },
    {
      q: "What is Aventura Dental Arts' cancellation and rescheduling policy?",
      a: "Because we practice 'slow dentistry' and reserve dedicated slots exclusively for one patient at a time, we require at least 48 business hours' notice for cancellations or rescheduling. This allows us to offer the slot to another patient on our waiting list."
    },
    {
      q: "Is Aventura Dental Arts fully HIPAA compliant?",
      a: "Yes, 100%. We employ bank-level, encrypted digital file hosting systems and strictly adhere to HIPAA regulations to safeguard your personal health information. We never share your records or clinical imagery without your explicit, written consent."
    },
    {
      q: "How do you manage patients with severe dental anxiety or past trauma?",
      a: "Anxiety reduction is built into our architecture. We provide sound-canceling headphones, custom aromatherapy, warm blankets, and highly patient, empathetic care. We explain every clinical tool before usage and check in with you constantly to ensure absolute comfort."
    },
    {
      q: "Are the clinical materials you use BPA-free and mercury-free?",
      a: "Yes. We are a strictly biomimetic, biological practice. All filling composites are entirely BPA-free, and we do not use mercury amalgams. We only utilize biocompatible ceramics, titanium, and resins designed to merge safely with your body's biology."
    },
    {
      q: "What advanced sterilization and clinical sanitation protocols do you follow?",
      a: "We adhere strictly to OSHA and CDC sterilization standards. Our operatory rooms undergo rigorous pharmaceutical-grade disinfection between every appointment, and we utilize state-of-the-art dental water line filtration systems to ensure absolute biological purity."
    },
    {
      q: "Do you accept emergency dental walk-ins?",
      a: "While we prioritize scheduled appointments, we reserve express emergency slots every day. If you are experiencing acute dental trauma or severe pain, please call us immediately so we can adjust our schedule to treat you immediately."
    },
    {
      q: "How do I request copies of my digital records, scans, or X-rays?",
      a: "You can request your complete digital record file by emailing our Patient Experience Director or calling our office. Under HIPAA guidelines, we will securely encrypt and transfer your records to you or your designated specialist within 48 business hours."
    },
    {
      q: "Do you offer pediatric dental services for children?",
      a: "Yes. We treat children of all ages starting from their first tooth. Dr. Rostova utilizes highly gentle, kid-friendly education, positive reinforcement, and fun demonstrations to establish early positive dental associations."
    },
    {
      q: "What is Swiss Guided Biofilm Therapy (GBT)?",
      a: "GBT is an advanced clinical cleaning method that swaps heavy scraping tools for a warm, soft spray of water and erythritol powder. It painlessly cleans plaque and bacterial biofilm from hard-to-reach gum pockets, providing an incredibly comfortable cleaning session."
    },
    {
      q: "Can I complete my new patient registration forms online before arriving?",
      a: "Absolutely. We highly recommend downloading the registration PDFs on this page, filling them out digitally or printing them, and emailing them to us before your visit. This minimizes check-in paperwork and maximizes your face-to-face time with Dr. Rostova."
    },
    {
      q: "Is patient parking available at your Aventura studio?",
      a: "Yes. We provide complimentary valet parking and dedicated, secure client parking spaces directly behind our medical building suite. When you arrive, simply follow the 'Aventura Dental Arts Client Parking' signs."
    }
  ];

  // Handle mock PDF download triggering a visual cue
  const triggerMockDownload = (fileName: string) => {
    alert(`Triggering secure mock download for: ${fileName}. In production, this fetches from the secure HIPAA asset bucket.`);
  };

  return (
    <div className="bg-charcoal text-light-beige min-h-[90vh]">
      
      {/* 1. HERO HEADER */}
      <section className="relative pt-44 pb-16 px-6 md:px-12 text-center border-b border-dark-gray/25">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_50%_-15%,rgba(179,140,97,0.12),transparent)] z-0" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-sm font-sans tracking-[0.2em] text-bronze uppercase block mb-6">Patient Portal</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[83px] leading-tight mb-6">Resources & Guidelines</h1>
          <div className="w-16 h-px bg-bronze mx-auto mb-8" />
          <p className="font-sans text-light-beige/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Everything required to streamline your clinical visits. Download new patient registration forms, check insurance partners, and read deep practice guidelines.
          </p>
        </div>
      </section>

      {/* 2. DOWNLOADABLE FORMS */}
      <section className="py-20 px-6 md:px-12 max-w-site mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-sans text-bronze uppercase tracking-widest block mb-2">Paperwork Preparation</span>
          <h2 className="font-serif text-3xl md:text-4xl text-light-beige">Downloadable Patient Forms</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockForms.map((form, idx) => (
            <div
              key={idx}
              className="bg-[#20232B] border border-dark-gray/30 p-8 flex flex-col justify-between hover:border-bronze transition-colors group"
            >
              <div className="space-y-4">
                <div className="p-3 bg-charcoal border border-dark-gray text-bronze rounded w-fit group-hover:border-bronze/50 transition-colors">
                  <FileDown className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl text-light-beige">{form.title}</h3>
                <p className="font-sans text-xs text-[#DAD5D3]/65 leading-relaxed">
                  {form.desc}
                </p>
              </div>

              <div className="pt-8 mt-6 border-t border-dark-gray/10 flex items-center justify-between">
                <span className="font-sans text-[10px] text-light-beige/40">PDF Format • {form.size}</span>
                <button
                  onClick={() => triggerMockDownload(form.title)}
                  className="font-serif text-sm text-bronze hover:text-light-beige transition-colors inline-flex items-center gap-1.5"
                >
                  Download File <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INSURANCE PARTNERS */}
      <section className="bg-near-black py-20 px-6 md:px-12 border-y border-charcoal/50">
        <div className="max-w-site mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-sans text-bronze uppercase tracking-widest block mb-2">Financial Coverage</span>
            <h2 className="font-serif text-3xl md:text-4xl text-light-beige">Approved Dental Insurances</h2>
            <p className="font-sans text-[#DAD5D3]/70 text-xs md:text-sm max-w-lg mx-auto mt-2">
              We process and file PPO claims directly to simplify reimbursement. Below are some of our most frequently billed providers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {insurances.map((ins, idx) => (
              <div 
                key={idx} 
                className="bg-charcoal border border-dark-gray/30 p-6 flex flex-col justify-center items-center text-center space-y-2 hover:border-bronze/50 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-near-black flex items-center justify-center text-bronze font-bold font-serif text-xs border border-dark-gray/20">
                  ★
                </div>
                <h4 className="font-serif text-base text-light-beige">{ins.name}</h4>
                <span className="font-sans text-[9px] text-[#DAD5D3]/50 uppercase tracking-wider">{ins.tier}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OFFICE POLICIES FAQ ACCORDION (15 QUESTIONS) */}
      <section className="py-24 px-6 md:px-12 max-w-site mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left col - Info block */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24 h-fit">
            <div className="p-3 bg-near-black border border-dark-gray text-bronze rounded w-fit">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-light-beige leading-tight">
              Practice Policies & Guidelines
            </h2>
            <div className="w-12 h-px bg-bronze" />
            <p className="font-sans text-sm text-[#DAD5D3]/70 leading-relaxed">
              We respect your intelligence and transparency. Here is an exhaustive, 15-question register outlining everything regarding billing, claims, anxiety, sterilization, and child care.
            </p>
            
            <div className="pt-6 space-y-2">
              <div className="flex items-center gap-3 text-xs font-sans text-light-beige/70">
                <ShieldCheck className="h-4.5 w-4.5 text-bronze" />
                <span>Fully Secure HIPAA Data Systems</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-sans text-light-beige/70">
                <HeartHandshake className="h-4.5 w-4.5 text-bronze" />
                <span>Slow Dentistry Practice Standards</span>
              </div>
            </div>
          </div>

          {/* Right col - 15 Accordion Items */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {policyFaqs.map((faq, idx) => {
                const isExpanded = openFaqIdx === idx;
                return (
                  <div key={idx} className="border-b border-dark-gray/25 pb-4">
                    <button
                      onClick={() => setOpenFaqIdx(isExpanded ? null : idx)}
                      className="w-full text-left flex justify-between items-center py-4 text-light-beige font-serif text-lg md:text-xl group"
                    >
                      <span className="group-hover:text-bronze transition-colors pr-6">{faq.q}</span>
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
                            {faq.a}
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

      {/* 5. CTA */}
      <section className="bg-bronze/10 border-t border-bronze/25 py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-[64px] text-light-beige mb-6">Need Further Clarification?</h2>
          <p className="font-sans text-light-beige/70 mb-10">
            Our Patient Experience Director is available to answer any administrative, scheduling, or insurance question over the phone.
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
