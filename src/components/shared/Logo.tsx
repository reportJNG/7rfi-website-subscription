import { Link } from 'react-router';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center gap-3 ${className}`}>
      <div className="w-10 h-10 rounded-full border-2 border-amber flex items-center justify-center bg-amber/10">
        <span className="font-cairo font-bold text-lg text-amber leading-none">ح</span>
      </div>
      <span className="font-cairo font-bold text-xl text-navy">حرفي</span>
    </Link>
  );
}
