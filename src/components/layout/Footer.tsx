import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-off-white text-charcoal pt-[72px] pb-6 px-6 lg:px-12 border-t border-bronze">
      <div className="max-w-site mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Col 1 */}
        <div className="flex flex-col items-start">
          <Link to="/" className="font-serif text-2xl tracking-wide flex items-center mb-4">
             <svg className="h-6 w-6 mr-2 text-bronze" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
               <path d="M12 8v4"/>
               <path d="M12 16h.01"/>
            </svg>
            AVENTURA
          </Link>
          <p className="font-sans text-sm text-dark-gray max-w-xs mb-6">
            Restrained luxury in advanced dental care. Creating perfect smiles in a serene, premium environment.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-dark-gray hover:text-bronze transition-colors">IG</a>
            <a href="#" className="text-dark-gray hover:text-bronze transition-colors">FB</a>
            <a href="#" className="text-dark-gray hover:text-bronze transition-colors">G</a>
          </div>
        </div>

        {/* Col 2 - Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-sans font-bold text-sm uppercase tracking-wide text-dark-gray mb-2">Services</h4>
          <Link to="/services/cosmetic" className="font-serif text-base hover:text-dark-gray">Cosmetic Dentistry</Link>
          <Link to="/services/general" className="font-serif text-base hover:text-dark-gray">General Dentistry</Link>
          <Link to="/services/restorative" className="font-serif text-base hover:text-dark-gray">Restorative Care</Link>
          <Link to="/services/emergency" className="font-serif text-base hover:text-dark-gray">Emergency Services</Link>
        </div>

        {/* Col 3 - Resources */}
        <div className="flex flex-col gap-4">
          <h4 className="font-sans font-bold text-sm uppercase tracking-wide text-dark-gray mb-2">Patient Resources</h4>
          <Link to="/resources#forms" className="font-serif text-base hover:text-dark-gray">New Patient Forms</Link>
          <Link to="/resources#insurance" className="font-serif text-base hover:text-dark-gray">Insurance Info</Link>
          <Link to="/resources#faq" className="font-serif text-base hover:text-dark-gray">FAQ</Link>
          <Link to="/contact" className="font-serif text-base hover:text-dark-gray">Contact Us</Link>
        </div>

        {/* Col 4 - Contact */}
        <div className="flex flex-col gap-4 text-dark-gray text-sm">
          <h4 className="font-sans font-bold text-sm uppercase tracking-wide mb-2 text-charcoal">Aventura Dental Arts</h4>
          <p className="mb-2">
            1234 Premium Way, Suite 100<br/>
            Aventura, FL 33180
          </p>
          <p>Phone: (305) 555-0128</p>
          <p className="mb-4">Email: hello@aventuradentalarts.com</p>
          <div>
            <p className="font-bold">Mon - Thu</p>
            <p>8:00 AM - 5:00 PM</p>
          </div>
          <div>
            <p className="font-bold">Friday</p>
            <p>8:00 AM - 2:00 PM</p>
          </div>
        </div>

      </div>

      <div className="max-w-site mx-auto pt-6 border-t border-dark-gray/20 flex flex-col md:flex-row justify-between items-center text-xs text-dark-gray font-sans gap-4">
        <p>&copy; {new Date().getFullYear()} Aventura Dental Arts. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-charcoal">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-charcoal">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
