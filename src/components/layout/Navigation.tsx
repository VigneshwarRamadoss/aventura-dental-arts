import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import Button from '../ui/Button';
import newLogo from './new-logo.svg';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const links = [
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'Patient Resources', href: '/resources' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
        isScrolled ? 'bg-charcoal/90 backdrop-blur-lg h-[80px] border-b border-white/5 shadow-sm' : 'bg-transparent h-[100px]'
      )}
    >
      <div className="mx-auto flex h-full max-w-site items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <Link to="/" className="text-light-beige font-serif text-2xl tracking-wide flex items-center group">
          <img src={newLogo} alt="Aventura Dental Arts Logo" className="h-10 w-10 mr-3 object-contain transition-transform duration-[800ms] ease-out group-hover:rotate-[360deg]" />
          AVENTURA <span className="font-sans text-[10px] ml-2 tracking-[0.3em] uppercase mt-1.5 opacity-70">Dental Arts</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-lg font-serif text-light-beige hover:text-white font-medium relative group transition-colors"
            >
              {link.name}
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-bronze transition-all group-hover:w-full" />
            </Link>
          ))}
          <Button as={Link} to="/contact" variant="primary" className="text-base md:text-lg font-serif px-8 py-3.5 tracking-wide">
            Book Appointment
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-light-beige p-2"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[60] bg-charcoal flex flex-col px-6 py-8 h-[100svh] overflow-y-auto"
          >
            <div className="flex justify-end mb-12">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-light-beige p-2"
              >
                <X className="h-8 w-8" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-center">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-serif text-3xl text-light-beige"
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8">
                <Button as={Link} to="/contact" className="w-full justify-center">
                  Book Appointment
                </Button>
              </div>
              
              <div className="mt-auto pt-12 flex flex-col gap-2 font-sans text-light-beige/70 text-sm">
                <p>Call Us: (305) 555-0128</p>
                <div className="flex items-center justify-center text-bronze">
                   <span className="mr-2">★★★★★</span> 4.9 Average Rating
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
