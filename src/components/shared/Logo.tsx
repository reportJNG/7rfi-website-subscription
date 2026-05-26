import { Link } from 'react-router';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'inverted';
  showWordmark?: boolean;
}

export function Logo({ className = '', variant = 'default', showWordmark = true }: LogoProps) {
  return (
    <Link to="/" className={`inline-flex items-center ${className}`} aria-label="حرفي">
      <span className={`inline-flex overflow-hidden rounded-lg ${variant === 'inverted' ? 'bg-white' : 'bg-transparent'}`}>
        <img
          src="/images/logo.png"
          alt={showWordmark ? 'حرفي' : ''}
          className="h-12 w-32 object-cover object-center md:h-14 md:w-36"
          loading="eager"
          decoding="async"
        />
      </span>
    </Link>
  );
}
