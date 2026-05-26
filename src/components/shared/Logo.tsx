import { Link } from 'react-router';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'inverted';
  showWordmark?: boolean;
}

export function LogoMark({
  size = 42,
  variant = 'default',
  className = '',
}: {
  size?: number;
  variant?: 'default' | 'inverted';
  className?: string;
}) {
  const amber = variant === 'inverted' ? '#E8B872' : '#C8893A';
  const amberDark = variant === 'inverted' ? '#C8893A' : '#A36C25';
  const ink = variant === 'inverted' ? '#FAF7F2' : '#1E3A5F';
  const fill = variant === 'inverted' ? 'rgba(232,184,114,0.12)' : 'rgba(200,137,58,0.10)';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <polygon points="29,8 71,8 92,29 92,71 71,92 29,92 8,71 8,29" fill={fill} stroke={amber} strokeWidth="1.2" />
      <g transform="translate(50 50)">
        <path d="M -22 -4 Q -18 14 0 18 Q 20 18 24 -2 Q 24 -10 18 -10 L -10 -10" stroke={amber} strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <path d="M -19 -4 Q -15 11 0 14 Q 17 14 21 -2" stroke={amberDark} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.75" />
        <path d="M 6 18 L 12 28 L 4 26 Z" fill={ink} />
        <circle cx="4" cy="26" r="1.4" fill={amber} />
        <circle cx="-22" cy="-12" r="1.6" fill={amberDark} />
      </g>
    </svg>
  );
}

export function LogoWordmark({
  height = 28,
  variant = 'default',
  className = '',
}: {
  height?: number;
  variant?: 'default' | 'inverted';
  className?: string;
}) {
  return (
    <span
      className={`font-cairo font-black leading-none ${variant === 'inverted' ? 'text-parchment' : 'text-navy'} ${className}`}
      style={{ fontSize: `${height}px` }}
    >
      حرفي
    </span>
  );
}

export function Logo({ className = '', variant = 'default', showWordmark = true }: LogoProps) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="حرفي">
      <span className="inline-flex">
        <LogoMark size={42} variant={variant} />
      </span>
      {showWordmark && <LogoWordmark height={27} variant={variant} />}
    </Link>
  );
}
