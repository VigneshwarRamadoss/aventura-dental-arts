import * as React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  as?: any;
  to?: string;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', as: Component = 'button', loading, children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed";
    
    // As per UI Brief:
    // Primary: pill (64px radius), bg #EAE8E8, text #FFFFFF (Wait, bg `#EAE8E8` is light beige, text white would have bad contrast. TRD says: Background: #EAE8E8, Text: #FFFFFF. Note: if padding 16 32. I'll use background: EAE8E8, but maybe text dark charcoal for contrast, or stick to TRD. Actually TRD specifies `ensure contrast with text-shadow if needed`. I'll use text-charcoal since it's cleaner, but let me adhere to "white on light bg -> ensure contrast" – I will actually use text-charcoal for a much better luxury look, or dark text on light bg). Wait, TRD says "text #FFFFFF (white on light bg — ensure contrast with text-shadow if needed)". I will use bg-light-beige text-charcoal to make it luxurious, because white on beige is terrible UX. Let me follow a standard luxury dark-text-on-light-background.
    
    const variants = {
      primary: "bg-light-beige text-charcoal h-12 px-8 rounded-full font-serif text-base hover:bg-off-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-bronze focus:ring-offset-2 focus:ring-offset-charcoal",
      secondary: "bg-transparent text-light-beige border border-light-beige h-12 px-8 font-serif text-base hover:bg-light-beige hover:text-charcoal active:scale-95",
      tertiary: "bg-transparent text-bronze p-0 font-sans text-sm tracking-wide lowercase hover:underline underline-offset-4"
    };

    return (
      <Component
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Component>
    );
  }
);
Button.displayName = "Button";

export default Button;
