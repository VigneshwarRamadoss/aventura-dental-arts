import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { clinicSettings } from '../lib/mockData';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { 
  FileDown, 
  ShieldCheck, 
  HeartHandshake, 
  Phone, 
  ArrowUpRight, 
  HelpCircle, 
  Search, 
  Lock, 
  RotateCw,
  CheckCircle,
  FileText,
  ShieldAlert
} from 'lucide-react';

export default function PatientResources() {
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(null);
  const [insuranceSearch, setInsuranceSearch] = React.useState('');
  const [faqSearch, setFaqSearch] = React.useState('');
  const [selectedFaqCat, setSelectedFaqCat] = React.useState('all');
  const [downloadingForms, setDownloadingForms] = React.useState<Record<string, 'securing' | 'decrypting' | 'completed' | null>>({});

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
      a: "Your first visit is dedicated to comprehensive diagnostics and relationship-building. It includes low-radiation digital X-rays, a 3D intraoral scan, an oral cancer screening, and a detailed clinical consultation with Dr. Vigneshwar. We review your goals without any pressure or rush.",
      cat: "comfort"
    },
    {
      q: "Which insurance providers do you accept?",
      a: "We work with most major dental PPO insurance plans. We direct-file claims on your behalf to maximize your reimbursement. Since we prioritize optimal clinical care and high-end materials, we advise checking with our Player Experience team to verify your specific coverage details before your visit.",
      cat: "finance"
    },
    {
      q: "How does out-of-network insurance reimbursement work?",
      a: "If we are out-of-network for your plan, don't worry. The majority of our PPO patients receive significant out-of-network reimbursements. Our Patient Experience Director, Victoria, handles all paperwork and claims submissions to ensure your insurance pays back your benefits directly to you.",
      cat: "finance"
    },
    {
      q: "Do you offer flexible financing plans for cosmetic or implant restorations?",
      a: "Yes. We partner with top-tier healthcare financing services (such as CareCredit and LendingClub) to offer low-interest and interest-free installment plans. This allows you to split your premium porcelain veneers or dental implant investments into comfortable monthly payments.",
      cat: "finance"
    },
    {
      q: "What is Aventura Dental Arts' cancellation and rescheduling policy?",
      a: "Because we practice 'slow dentistry' and reserve dedicated slots exclusively for one patient at a time, we require at least 48 business hours' notice for cancellations or rescheduling. This allows us to offer the slot to another patient on our waiting list.",
      cat: "policies"
    },
    {
      q: "Is Aventura Dental Arts fully HIPAA compliant?",
      a: "Yes, 100%. We employ bank-level, encrypted digital file hosting systems and strictly adhere to HIPAA regulations to safeguard your personal health information. We never share your records or clinical imagery without your explicit, written consent.",
      cat: "policies"
    },
    {
      q: "How do you manage patients with severe dental anxiety or past trauma?",
      a: "Anxiety reduction is built into our architecture. We provide sound-canceling headphones, custom aromatherapy, warm blankets, and highly patient, empathetic care. We explain every clinical tool before usage and check in with you constantly to ensure absolute comfort.",
      cat: "comfort"
    },
    {
      q: "Are the clinical materials you use BPA-free and mercury-free?",
      a: "Yes. We are a strictly biomimetic, biological practice. All filling composites are entirely BPA-free, and we do not use mercury amalgams. We only utilize biocompatible ceramics, titanium, and resins designed to merge safely with your body's biology.",
      cat: "policies"
    },
    {
      q: "What advanced sterilization and clinical sanitation protocols do you follow?",
      a: "We adhere strictly to OSHA and CDC sterilization standards. Our operatory rooms undergo rigorous pharmaceutical-grade disinfection between every appointment, and we utilize state-of-the-art dental water line filtration systems to ensure absolute biological purity.",
      cat: "policies"
    },
    {
      q: "Do you accept emergency dental walk-ins?",
      a: "While we prioritize scheduled appointments, we reserve express emergency slots every day. If you are experiencing acute dental trauma or severe pain, please call us immediately so we can adjust our schedule to treat you immediately.",
      cat: "policies"
    },
    {
      q: "How do I request copies of my digital records, scans, or X-rays?",
      a: "You can request your complete digital record file by emailing our Patient Experience Director or calling our office. Under HIPAA guidelines, we will securely encrypt and transfer your records to you or your designated specialist within 48 business hours.",
      cat: "policies"
    },
    {
      q: "Do you offer pediatric dental services for children?",
      a: "Yes. We treat children of all ages starting from their first tooth. Dr. Vigneshwar utilizes highly gentle, kid-friendly education, positive reinforcement, and fun demonstrations to establish early positive dental associations.",
      cat: "comfort"
    },
    {
      q: "What is Swiss Guided Biofilm Therapy (GBT)?",
      a: "GBT is an advanced clinical cleaning method that swaps heavy scraping tools for a warm, soft spray of water and erythritol powder. It painlessly cleans plaque and bacterial biofilm from hard-to-reach gum pockets, providing an incredibly comfortable cleaning session.",
      cat: "comfort"
    },
    {
      q: "Can I complete my new patient registration forms online before arriving?",
      a: "Absolutely. We highly recommend downloading the registration PDFs on this page, filling them out digitally or printing them, and emailing them to us before your visit. This minimizes check-in paperwork and maximizes your face-to-face time with Dr. Vigneshwar.",
      cat: "policies"
    },
    {
      q: "Is patient parking available at your Aventura studio?",
      a: "Yes. We provide complimentary valet parking and dedicated, secure client parking spaces directly behind our medical building suite. When you arrive, simply follow the 'Aventura Dental Arts Client Parking' signs.",
      cat: "comfort"
    }
  ];

  const faqCategories = [
    { label: 'All Guidelines', value: 'all' },
    { label: 'First Visit & Comfort', value: 'comfort' },
    { label: 'Insurance & Finance', value: 'finance' },
    { label: 'Practice Policies', value: 'policies' }
  ];

  const triggerMockDownload = (title: string) => {
    if (downloadingForms[title]) return;

    setDownloadingForms(prev => ({ ...prev, [title]: 'securing' }));

    setTimeout(() => {
      setDownloadingForms(prev => ({ ...prev, [title]: 'decrypting' }));
      setTimeout(() => {
        setDownloadingForms(prev => ({ ...prev, [title]: 'completed' }));
        setTimeout(() => {
          alert(`Secure HIPAA transaction complete. Decrypted: ${title}`);
          setDownloadingForms(prev => ({ ...prev, [title]: null }));
        }, 1200);
      }, 1500);
    }, 1200);
  };

  const filteredInsurances = React.useMemo(() => {
    if (!insuranceSearch.trim()) return insurances;
    return insurances.filter(ins => 
      ins.name.toLowerCase().includes(insuranceSearch.toLowerCase())
    );
  }, [insuranceSearch]);

  const filteredFaqs = React.useMemo(() => {
    let result = policyFaqs;
    
    if (selectedFaqCat !== 'all') {
      result = result.filter(faq => faq.cat === selectedFaqCat);
    }
    
    if (faqSearch.trim()) {
      const q = faqSearch.toLowerCase();
      result = result.filter(faq => 
        faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q)
      );
    }
    
    return result;
  }, [selectedFaqCat, faqSearch]);

  return (
    <div className="bg-charcoal text-light-beige min-h-[90vh] overflow-hidden">
      
      {/* 1. HERO HEADER WITH BRAND STAR DIVIDER */}
      <section className="relative pt-48 pb-20 px-6 md:px-12 text-center border-b border-dark-gray/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-15%,rgba(179,140,97,0.18),transparent)] z-0" />
        {/* Symmetrical glowing ambient element behind header */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-bronze/5 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <span className="text-xs md:text-sm font-sans tracking-[0.25em] text-bronze uppercase block mb-2 font-semibold">Patient Portal</span>
          <h1 className="font-serif italic text-6xl md:text-7xl lg:text-[90px] leading-[0.95] text-light-beige select-none">
            Resources <span className="text-bronze font-serif italic font-normal">&</span> Guidelines
          </h1>
          
          {/* Luxury Divider */}
          <div className="flex items-center justify-center gap-4 w-full max-w-xs mx-auto py-2">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-bronze/50 flex-1" />
            <span className="text-bronze text-base">✦</span>
            <div className="h-[1px] bg-gradient-to-l from-transparent to-bronze/50 flex-1" />
          </div>

          <p className="font-sans text-light-beige/75 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Everything required to streamline your clinical visits. Download new patient registration forms, check insurance partners, and read deep practice guidelines.
          </p>
        </div>
      </section>

      {/* 2. DOWNLOADABLE FORMS WITH GLOW BACKGROUND */}
      <section className="py-28 px-6 md:px-12 max-w-site mx-auto relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-bronze/5 rounded-full blur-[160px] pointer-events-none z-0" />

        <div className="text-center mb-20 space-y-3 relative z-10">
          <span className="text-xs font-sans text-bronze uppercase tracking-[0.2em] font-semibold block">Paperwork Preparation</span>
          <h2 className="font-serif text-4xl md:text-5xl text-light-beige">Downloadable Patient Forms</h2>
          <div className="w-12 h-px bg-bronze/50 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {mockForms.map((form, idx) => (
            <div
              key={idx}
              className="bg-[#1C1D24]/85 backdrop-blur-md border border-dark-gray/30 p-8 md:p-10 flex flex-col justify-between hover:border-bronze hover:shadow-[0_12px_40px_rgba(179,140,97,0.06)] transition-all duration-500 group relative overflow-hidden rounded-2xl"
            >
              {/* Shimmer sweep effect */}
              <div className="absolute inset-0 w-[45px] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[600%] transition-transform duration-[1500ms] ease-out pointer-events-none" />
              
              <div className="space-y-6">
                <div className="p-4 bg-charcoal/90 border border-dark-gray/50 text-bronze rounded-xl w-fit group-hover:border-bronze/50 group-hover:bg-charcoal transition-all duration-300 shadow-inner">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-light-beige tracking-wide leading-snug">{form.title}</h3>
                <p className="font-sans text-sm text-[#DAD5D3]/65 leading-relaxed">
                  {form.desc}
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-dark-gray/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="font-sans text-xs text-light-beige/40">PDF • {form.size}</span>
                
                {downloadingForms[form.title] ? (
                  <div className="flex items-center gap-2.5 text-bronze font-sans text-sm font-medium">
                    {downloadingForms[form.title] === 'securing' && (
                      <>
                        <Lock className="h-4 w-4 animate-pulse" />
                        <span className="animate-pulse">Securing HIPAA...</span>
                      </>
                    )}
                    {downloadingForms[form.title] === 'decrypting' && (
                      <>
                        <RotateCw className="h-4 w-4 animate-spin text-bronze" />
                        <span>Decrypting PDF...</span>
                      </>
                    )}
                    {downloadingForms[form.title] === 'completed' && (
                      <>
                        <CheckCircle className="h-4 w-4 text-emerald-500 animate-bounce" />
                        <span className="text-emerald-500">Decrypted</span>
                      </>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => triggerMockDownload(form.title)}
                    className="font-serif text-base text-bronze hover:text-light-beige transition-colors inline-flex items-center gap-2 group/btn cursor-pointer font-medium"
                  >
                    Download File 
                    <FileDown className="h-4 w-4 transform group-hover/btn:translate-y-0.5 transition-transform duration-300" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INSURANCE PARTNERS */}
      <section className="bg-[#101013] py-28 px-6 md:px-12 border-y border-charcoal/50 relative">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-bronze/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-site mx-auto relative z-10">
          <div className="text-center mb-20 space-y-4">
            <span className="text-xs font-sans text-bronze uppercase tracking-[0.2em] font-semibold block">Financial Coverage</span>
            <h2 className="font-serif text-4xl md:text-5xl text-light-beige">Approved Dental Insurances</h2>
            <div className="w-12 h-px bg-bronze/50 mx-auto my-4" />
            <p className="font-sans text-[#DAD5D3]/70 text-base max-w-xl mx-auto leading-relaxed">
              We process and file PPO claims directly to simplify reimbursement. Below are some of our most frequently billed providers.
            </p>
            
            {/* Live Search with Glassmorphism */}
            <div className="max-w-md mx-auto pt-6 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search your insurance provider..."
                  value={insuranceSearch}
                  onChange={(e) => setInsuranceSearch(e.target.value)}
                  className="w-full bg-[#1C1D24]/60 border border-dark-gray/30 rounded-full py-3.5 pl-12 pr-6 text-sm text-light-beige placeholder-light-beige/35 focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze/30 transition-all duration-300"
                />
                <Search className="absolute left-4.5 top-4 h-4 w-4 text-light-beige/40" />
              </div>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredInsurances.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
              >
                {filteredInsurances.map((ins) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={ins.name} 
                    className="bg-[#1C1D24]/80 border border-dark-gray/30 p-6 flex flex-col justify-center items-center text-center space-y-4 hover:border-bronze/50 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] transition-all duration-300 rounded-2xl relative group overflow-hidden"
                  >
                    {/* Glowing highlight on tile hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-bronze/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="h-10 w-10 rounded-full bg-near-black flex items-center justify-center text-bronze font-bold font-serif text-sm border border-dark-gray/25 shadow-inner">
                      ✦
                    </div>
                    <h4 className="font-serif text-lg text-light-beige tracking-wide leading-tight">{ins.name}</h4>
                    <span className="font-sans text-[10px] text-[#DAD5D3]/50 uppercase tracking-wider font-semibold">{ins.tier}</span>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <ShieldAlert className="h-12 w-12 text-bronze/50 mx-auto mb-4" />
                <p className="font-sans text-base text-[#DAD5D3]/65">No providers match your search.</p>
                <p className="font-sans text-sm text-[#DAD5D3]/40 mt-1">Please call our Patient Experience Director to check your plan.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. OFFICE POLICIES FAQ ACCORDION */}
      <section className="py-28 px-6 md:px-12 max-w-site mx-auto relative">
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-bronze/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
          
          {/* Left col - Premium plaque/info block */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 h-fit bg-[#1C1D24]/40 border border-dark-gray/20 p-8 rounded-3xl backdrop-blur-sm">
            <div className="p-4 bg-near-black border border-dark-gray/30 text-bronze rounded-xl w-fit shadow-inner">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl text-light-beige leading-tight">
              Practice Policies <br /><span className="text-bronze font-serif italic font-normal">&</span> Guidelines
            </h2>
            <div className="w-12 h-px bg-bronze/50" />
            <p className="font-sans text-sm md:text-base text-[#DAD5D3]/70 leading-relaxed">
              We respect your intelligence and transparency. Here is an exhaustive, 15-question register outlining everything regarding billing, claims, anxiety, sterilization, and child care.
            </p>
            
            <div className="pt-4 space-y-4 border-t border-dark-gray/10">
              <div className="flex items-center gap-3.5 text-sm font-sans text-light-beige/75">
                <ShieldCheck className="h-5 w-5 text-bronze shrink-0" />
                <span>Fully Secure HIPAA Data Systems</span>
              </div>
              <div className="flex items-center gap-3.5 text-sm font-sans text-light-beige/75">
                <HeartHandshake className="h-5 w-5 text-bronze shrink-0" />
                <span>Slow Dentistry Practice Standards</span>
              </div>
            </div>
          </div>

          {/* Right col - Tabs, Search & FAQ Accordion */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Search and Category Tabs Wrapper */}
            <div className="space-y-6 bg-[#1C1D24]/60 backdrop-blur-sm border border-dark-gray/20 p-6 md:p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
              {/* Search Accordion */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search policies (e.g., parking, anxiety, HIPAA)..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="w-full bg-charcoal/80 border border-dark-gray/30 rounded-full py-3.5 pl-12 pr-6 text-sm text-light-beige placeholder-light-beige/35 focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze/20 transition-all duration-300"
                />
                <Search className="absolute left-4.5 top-4 h-4 w-4 text-light-beige/40" />
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 pt-2">
                {faqCategories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      setSelectedFaqCat(cat.value);
                      setOpenFaqIdx(null);
                    }}
                    className={`px-5 py-2.5 font-serif text-sm border transition-all rounded-full hover:border-bronze cursor-pointer ${
                      selectedFaqCat === cat.value 
                        ? 'bg-light-beige text-charcoal border-light-beige shadow-md font-medium' 
                        : 'bg-transparent text-light-beige border-dark-gray/30'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion list */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq) => {
                    const originalIdx = policyFaqs.findIndex(f => f.q === faq.q);
                    const isExpanded = openFaqIdx === originalIdx;
                    return (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        key={faq.q} 
                        className="border-b border-dark-gray/15 pb-4"
                      >
                        <button
                          onClick={() => setOpenFaqIdx(isExpanded ? null : originalIdx)}
                          className="w-full text-left flex justify-between items-center py-5 text-light-beige font-serif text-xl md:text-2xl group cursor-pointer"
                        >
                          <span className={`group-hover:text-bronze transition-colors pr-6 ${isExpanded ? 'text-bronze' : ''}`}>{faq.q}</span>
                          <span className={`text-bronze text-3xl shrink-0 transition-transform duration-300 leading-none ${isExpanded ? 'rotate-45' : ''}`}>
                            +
                          </span>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <p className="font-sans text-sm md:text-base text-[#DAD5D3]/75 leading-relaxed pb-6 pl-1 pr-4">
                                {faq.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <HelpCircle className="h-12 w-12 text-bronze/50 mx-auto mb-4" />
                    <p className="font-sans text-base text-[#DAD5D3]/65">No guidelines match your query.</p>
                    <p className="font-sans text-sm text-[#DAD5D3]/40 mt-1">Try keywords like "first visit", "cancel", or "payment".</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* 5. CTA */}
      <section className="bg-bronze/10 border-t border-bronze/25 py-28 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-bronze/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-2xl mx-auto flex flex-col items-center relative z-10 space-y-6">
          <h2 className="font-serif text-5xl md:text-[72px] text-light-beige leading-tight">Need Further Clarification?</h2>
          <p className="font-sans text-light-beige/75 text-base md:text-lg leading-relaxed max-w-xl">
            Our Patient Experience Director is available to answer any administrative, scheduling, or insurance question over the phone.
          </p>
          
          {/* Symmetrical divider */}
          <div className="flex items-center justify-center gap-4 w-full max-w-[150px] py-2">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-bronze/50 flex-1" />
            <span className="text-bronze text-sm">✦</span>
            <div className="h-[1px] bg-gradient-to-l from-transparent to-bronze/50 flex-1" />
          </div>

          <div className="flex flex-col sm:flex-row gap-5 items-center pt-4">
            <Button as={Link} to="/contact" variant="primary" className="shadow-[0_4px_25px_rgba(234,232,232,0.1)] hover:shadow-[0_4px_30px_rgba(234,232,232,0.2)]">
              Book Appointment
            </Button>
            <span className="text-light-beige/50 font-sans mx-2">or</span>
            <a href={`tel:${clinicSettings.phoneRaw}`} className="font-serif text-2xl tracking-wider text-light-beige hover:text-bronze transition-colors flex items-center gap-2.5">
              <Phone className="h-5 w-5 text-bronze" /> {clinicSettings.phone}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
