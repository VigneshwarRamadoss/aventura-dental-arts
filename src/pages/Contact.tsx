import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { clinicSettings, servicesData } from '../lib/mockData';
import Button from '../components/ui/Button';
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2, FileText, X, ArrowUpRight } from 'lucide-react';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  insurance: string;
  notes: string;
  hipaaConsent: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  service?: string;
  preferredDate?: string;
  preferredTime?: string;
  hipaaConsent?: string;
}

export default function Contact() {
  const [form, setForm] = React.useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    insurance: '',
    notes: '',
    hipaaConsent: false,
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [confirmationCode, setConfirmationCode] = React.useState<string | null>(null);

  // Validate fields
  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!form.firstName.trim()) {
      tempErrors.firstName = "First name is required.";
      isValid = false;
    }
    if (!form.lastName.trim()) {
      tempErrors.lastName = "Last name is required.";
      isValid = false;
    }
    
    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      tempErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      tempErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Phone digits check
    const phoneRegex = /^\d{10}$/;
    const digitsOnly = form.phone.replace(/\D/g, '');
    if (!form.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (digitsOnly.length < 10) {
      tempErrors.phone = "Please enter a valid 10-digit phone number.";
      isValid = false;
    }

    if (!form.service) {
      tempErrors.service = "Please select a service interest.";
      isValid = false;
    }

    if (!form.preferredDate) {
      tempErrors.preferredDate = "Please choose a preferred date.";
      isValid = false;
    } else {
      // Check if selected date is in the past
      const selected = new Date(form.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        tempErrors.preferredDate = "Preferred date cannot be in the past.";
        isValid = false;
      }
    }

    if (!form.preferredTime) {
      tempErrors.preferredTime = "Please select your preferred time of day.";
      isValid = false;
    }

    if (!form.hipaaConsent) {
      tempErrors.hipaaConsent = "You must accept the HIPAA consent terms to proceed.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm(prev => ({ ...prev, [name]: checked }));
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    }
  };

  // Submit form handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate HIPAA encrypted secure network submission with a luxury delay
    setTimeout(() => {
      setIsSubmitting(false);
      // Generate a unique booking confirmation reference code
      const uniqueCode = `CONF-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmationCode(uniqueCode);
    }, 1600);
  };

  // Close and reset form
  const handleCloseConfirmation = () => {
    setConfirmationCode(null);
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      preferredDate: '',
      preferredTime: '',
      insurance: '',
      notes: '',
      hipaaConsent: false,
    });
  };

  return (
    <div className="bg-charcoal text-light-beige min-h-screen">
      
      {/* 1. HERO HEADER */}
      <section className="relative pt-44 pb-16 px-6 md:px-12 text-center border-b border-dark-gray/25">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_50%_-15%,rgba(179,140,97,0.12),transparent)] z-0" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-sm font-sans tracking-[0.2em] text-bronze uppercase block mb-6">Connect & Book</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[83px] leading-tight mb-6">Book Appointment</h1>
          <div className="w-16 h-px bg-bronze mx-auto mb-8" />
          <p className="font-sans text-light-beige/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Experience our restrained luxury dental care. Schedule your comprehensive visual diagnosis and consultations securely.
          </p>
        </div>
      </section>

      {/* 2. SPLIT LAYOUT */}
      <section className="py-20 px-6 md:px-12 max-w-site mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Practice Details & Map (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-12">
            
            <div className="space-y-8">
              <h2 className="font-serif text-4xl md:text-5xl text-light-beige">Practice Details</h2>
              <div className="w-16 h-px bg-bronze" />
              
              <div className="space-y-8 font-sans text-base md:text-lg text-[#DAD5D3]">
                <div className="flex gap-4 items-start">
                  <MapPin className="h-7 w-7 text-bronze shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-light-beige text-lg md:text-xl">Location Address</p>
                    <p className="mt-2 leading-relaxed">
                      {clinicSettings.address.street}<br />
                      {clinicSettings.address.city}, {clinicSettings.address.state} {clinicSettings.address.zip}
                    </p>
                    <p className="text-sm text-light-beige/65 mt-2 italic">
                      Complimentary Valet & Secured client spaces available.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Phone className="h-7 w-7 text-bronze shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-light-beige text-lg md:text-xl">Direct Concierge</p>
                    <p className="mt-2 text-lg md:text-xl">
                      <a href={`tel:${clinicSettings.phoneRaw}`} className="hover:text-bronze transition-colors font-medium">
                        {clinicSettings.phone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Mail className="h-7 w-7 text-bronze shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-light-beige text-lg md:text-xl">Email Address</p>
                    <p className="mt-2 text-lg md:text-xl">
                      <a href={`mailto:${clinicSettings.email}`} className="hover:text-bronze transition-colors font-medium">
                        {clinicSettings.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Clock className="h-7 w-7 text-bronze shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-light-beige text-lg md:text-xl">Office Operating Hours</p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-3 text-base md:text-lg text-[#DAD5D3]/90">
                      {clinicSettings.hours.map((item, idx) => (
                        <React.Fragment key={idx}>
                          <span className="font-bold text-light-beige/85">{item.day}</span>
                          <span>{item.hours}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Google Map with Grayscale custom styling to fit luxury dark mode */}
            <div className="relative aspect-video w-full overflow-hidden border border-dark-gray/30 bg-[#20232B] select-none">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2sAventura,+FL!5m2!1s!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(100%) contrast(90%)" }} 
                allowFullScreen={false} 
                loading="lazy" 
                title="Aventura Dental Arts Office Location Map"
                className="opacity-70 hover:opacity-100 transition-opacity duration-500"
              />
            </div>

          </div>

          {/* Right Column: Appointment Form (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <div className="bg-[#14151D] border border-dark-gray/25 p-8 md:p-14 relative shadow-2xl max-w-[640px] mx-auto lg:ml-auto">
              
              <div className="flex justify-between items-start mb-10 border-b border-dark-gray/15 pb-8">
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl text-light-beige">Request Consultation</h3>
                  <p className="font-sans text-sm md:text-base text-dark-gray mt-3 leading-relaxed">
                    Complete this secure intake sheet. Our Patient Experience team will reach out directly.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm font-sans text-bronze border border-bronze/30 px-4 py-1.5 rounded-full shrink-0">
                  <ShieldCheck className="h-5 w-5" /> HIPAA Encrypted
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2 relative">
                    <label className="block font-sans text-base uppercase tracking-[0.06em] text-light-beige/70 font-semibold" htmlFor="firstName">
                      First Name *
                    </label>
                    <input 
                      type="text" 
                      id="firstName"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className={`w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 text-lg md:text-xl font-sans text-light-beige h-20 px-0 pb-3 pt-6 focus:ring-0 focus:outline-none focus:border-light-beige placeholder:text-dark-gray/60 transition-colors ${
                        errors.firstName ? 'border-error' : 'border-dark-gray/60'
                      }`}
                    />
                    {errors.firstName && <p className="text-sm md:text-base text-error font-medium mt-2">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-2 relative">
                    <label className="block font-sans text-base uppercase tracking-[0.06em] text-light-beige/70 font-semibold" htmlFor="lastName">
                      Last Name *
                    </label>
                    <input 
                      type="text" 
                      id="lastName"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className={`w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 text-lg md:text-xl font-sans text-light-beige h-20 px-0 pb-3 pt-6 focus:ring-0 focus:outline-none focus:border-light-beige placeholder:text-dark-gray/60 transition-colors ${
                        errors.lastName ? 'border-error' : 'border-dark-gray/60'
                      }`}
                    />
                    {errors.lastName && <p className="text-sm md:text-base text-error font-medium mt-2">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2 relative">
                    <label className="block font-sans text-base uppercase tracking-[0.06em] text-light-beige/70 font-semibold" htmlFor="email">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={`w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 text-lg md:text-xl font-sans text-light-beige h-20 px-0 pb-3 pt-6 focus:ring-0 focus:outline-none focus:border-light-beige placeholder:text-dark-gray/60 transition-colors ${
                        errors.email ? 'border-error' : 'border-dark-gray/60'
                      }`}
                    />
                    {errors.email && <p className="text-sm md:text-base text-error font-medium mt-2">{errors.email}</p>}
                  </div>

                  <div className="space-y-2 relative">
                    <label className="block font-sans text-base uppercase tracking-[0.06em] text-light-beige/70 font-semibold" htmlFor="phone">
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(305) 555-0128"
                      className={`w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 text-lg md:text-xl font-sans text-light-beige h-20 px-0 pb-3 pt-6 focus:ring-0 focus:outline-none focus:border-light-beige placeholder:text-dark-gray/60 transition-colors ${
                        errors.phone ? 'border-error' : 'border-dark-gray/60'
                      }`}
                    />
                    {errors.phone && <p className="text-sm md:text-base text-error font-medium mt-2">{errors.phone}</p>}
                  </div>
                </div>

                {/* Service Interest dropdown */}
                <div className="space-y-2 relative">
                  <label className="block font-sans text-base uppercase tracking-[0.06em] text-light-beige/70 font-semibold" htmlFor="service">
                    Service Interest *
                  </label>
                  <select 
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 text-lg md:text-xl font-sans text-light-beige h-20 px-0 pb-3 pt-6 focus:ring-0 focus:outline-none focus:border-light-beige transition-colors appearance-none cursor-pointer ${
                      errors.service ? 'border-error' : 'border-dark-gray/60'
                    }`}
                  >
                    <option value="" className="bg-charcoal text-dark-gray text-base md:text-lg">Select treatment category...</option>
                    {servicesData.map(s => (
                      <option key={s.id} value={s.slug} className="bg-charcoal text-light-beige text-base md:text-lg">{s.title}</option>
                    ))}
                  </select>
                  {errors.service && <p className="text-sm md:text-base text-error font-medium mt-2">{errors.service}</p>}
                </div>

                {/* Preferred Date & Time slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2 relative">
                    <label className="block font-sans text-base uppercase tracking-[0.06em] text-light-beige/70 font-semibold" htmlFor="preferredDate">
                      Preferred Date *
                    </label>
                    <input 
                      type="date" 
                      id="preferredDate"
                      name="preferredDate"
                      value={form.preferredDate}
                      onChange={handleChange}
                      className={`w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 text-lg md:text-xl font-sans text-light-beige h-20 px-0 pb-3 pt-6 focus:ring-0 focus:outline-none focus:border-light-beige transition-colors ${
                        errors.preferredDate ? 'border-error' : 'border-dark-gray/60'
                      }`}
                    />
                    {errors.preferredDate && <p className="text-sm md:text-base text-error font-medium mt-2">{errors.preferredDate}</p>}
                  </div>

                  <div className="space-y-2 relative">
                    <label className="block font-sans text-base uppercase tracking-[0.06em] text-light-beige/70 font-semibold" htmlFor="preferredTime">
                      Preferred Time of Day *
                    </label>
                    <select 
                      id="preferredTime"
                      name="preferredTime"
                      value={form.preferredTime}
                      onChange={handleChange}
                      className={`w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 text-lg md:text-xl font-sans text-light-beige h-20 px-0 pb-3 pt-6 focus:ring-0 focus:outline-none focus:border-light-beige transition-colors appearance-none cursor-pointer ${
                        errors.preferredTime ? 'border-error' : 'border-dark-gray/60'
                      }`}
                    >
                      <option value="" className="bg-charcoal text-dark-gray text-base md:text-lg">Select slot preference...</option>
                      <option value="Morning" className="bg-charcoal text-light-beige text-base md:text-lg">Morning (8:00 AM - 12:00 PM)</option>
                      <option value="Afternoon" className="bg-charcoal text-light-beige text-base md:text-lg">Afternoon (12:00 PM - 4:00 PM)</option>
                      <option value="Evening" className="bg-charcoal text-light-beige text-base md:text-lg">Late Session (4:00 PM - 5:00 PM)</option>
                    </select>
                    {errors.preferredTime && <p className="text-sm md:text-base text-error font-medium mt-2">{errors.preferredTime}</p>}
                  </div>
                </div>

                {/* Optional Insurance Provider input */}
                <div className="space-y-2 relative">
                  <label className="block font-sans text-base uppercase tracking-[0.06em] text-light-beige/70 font-semibold" htmlFor="insurance">
                    Insurance Provider (Optional)
                  </label>
                  <input 
                    type="text" 
                    id="insurance"
                    name="insurance"
                    value={form.insurance}
                    onChange={handleChange}
                    placeholder="e.g. Delta Dental PPO"
                    className="w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 text-lg md:text-xl font-sans text-light-beige h-20 px-0 pb-3 pt-6 focus:ring-0 focus:outline-none focus:border-light-beige placeholder:text-dark-gray/60 transition-colors border-dark-gray/60"
                  />
                </div>

                {/* Notes/Comments Textarea */}
                <div className="space-y-2 relative">
                  <label className="block font-sans text-base uppercase tracking-[0.06em] text-light-beige/70 font-semibold" htmlFor="notes">
                    Personal Health / Aesthetic Goals (Optional)
                  </label>
                  <textarea 
                    id="notes"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your smile goals or any special comfort requests..."
                    className="w-full bg-transparent border-b border-t-0 border-l-0 border-r-0 text-lg md:text-xl font-sans text-light-beige px-0 pb-3 focus:ring-0 focus:outline-none focus:border-light-beige placeholder:text-dark-gray/60 transition-colors border-dark-gray/60 resize-none pt-8"
                  />
                </div>

                {/* HIPAA Consent Checkbox */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-4 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      name="hipaaConsent"
                      checked={form.hipaaConsent}
                      onChange={handleChange}
                      className="mt-1 h-6 w-6 shrink-0 border border-dark-gray/60 text-bronze focus:ring-0 focus:ring-offset-0 bg-transparent rounded-none cursor-pointer checked:bg-bronze checked:border-bronze transition-colors"
                    />
                    <span className="font-sans text-sm md:text-base text-dark-gray/95 leading-relaxed">
                      I authorize the transmission of my contact and scheduling metadata. I understand this information is protected securely under digital privacy guidelines. *
                    </span>
                  </label>
                  {errors.hipaaConsent && <p className="text-sm md:text-base text-error font-medium">{errors.hipaaConsent}</p>}
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full justify-center h-16 rounded-full font-serif text-xl tracking-wider uppercase font-semibold"
                    loading={isSubmitting}
                  >
                    Submit Booking Request
                  </Button>
                </div>

              </form>

            </div>
          </div>

        </div>
      </section>

      {/* 3. SUCCESS / CONFIRMATION MODAL OVERLAY */}
      <AnimatePresence>
        {confirmationCode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-near-black border border-bronze/40 p-8 md:p-10 max-w-lg w-full text-center relative shadow-2xl"
            >
              
              <button 
                onClick={handleCloseConfirmation}
                className="absolute top-4 right-4 text-light-beige hover:text-bronze p-2"
                aria-label="Close confirmation"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex flex-col items-center space-y-6">
                
                {/* Success Checkmark Circle */}
                <div className="h-16 w-16 rounded-full bg-bronze/10 border-2 border-bronze flex items-center justify-center text-bronze animate-pulse">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-sans text-bronze uppercase tracking-[0.2em] font-semibold">
                    Booking Request Sent
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-light-beige">
                    Smile Request Logged
                  </h2>
                </div>

                {/* Unique Confirmation Code Block */}
                <div className="bg-charcoal border border-dark-gray/30 px-6 py-3 rounded-md w-full">
                  <span className="font-sans text-[10px] text-light-beige/40 block uppercase tracking-widest">
                    Secure Confirmation Code
                  </span>
                  <span className="font-serif text-lg md:text-xl text-bronze tracking-wider block mt-1 font-semibold">
                    {confirmationCode}
                  </span>
                </div>

                <p className="font-sans text-xs md:text-sm text-[#DAD5D3]/75 leading-relaxed max-w-sm">
                  Our Patient Experience Director will call you at <strong className="text-light-beige">{form.phone}</strong> within 2 business hours to verify your details, cross-reference insurance details, and finalize your chair time.
                </p>

                {/* PDF forms link shortcut */}
                <div className="border-t border-dark-gray/25 pt-6 w-full flex items-center justify-center gap-2">
                  <FileText className="h-4 w-4 text-bronze" />
                  <Link 
                    to="/resources" 
                    onClick={handleCloseConfirmation}
                    className="font-serif text-sm text-bronze hover:text-light-beige transition-colors flex items-center gap-1.5"
                  >
                    Download New Patient Forms <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="pt-4 w-full">
                  <Button onClick={handleCloseConfirmation} className="w-full justify-center">
                    Close & Return
                  </Button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
