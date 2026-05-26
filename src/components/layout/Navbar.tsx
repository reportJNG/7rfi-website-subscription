import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, UserPlus, X } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';

const navLinks = [
  { label: 'الرئيسية', path: '/' },
  { label: 'سجّل الآن', path: '/submit' },
  { label: 'عن حرفي', path: '/about' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white/92 backdrop-blur transition-shadow duration-200 ${
        scrolled ? 'border-border shadow-xs' : 'border-transparent'
      }`}
    >
      <div className="section-shell flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="التنقل الرئيسي">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-lg px-4 py-2 font-cairo text-sm font-semibold transition-colors ${
                isActive(link.path) ? 'bg-sand-light text-amber' : 'text-navy/75 hover:bg-sand-light hover:text-navy'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link to="/submit" className="harafi-btn-primary hidden h-11 gap-2 px-5 text-sm md:inline-flex">
          <UserPlus className="h-4 w-4" />
          سجّل مجاناً
        </Link>

        <button
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-white text-navy transition-colors hover:border-amber hover:text-amber md:hidden"
          aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-border bg-white md:hidden">
          <nav className="section-shell flex flex-col gap-2 py-4" aria-label="التنقل عبر الجوال">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`rounded-lg px-4 py-3 font-cairo text-sm font-semibold transition-colors ${
                  isActive(link.path) ? 'bg-sand-light text-amber' : 'text-navy/75 hover:bg-sand-light hover:text-navy'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/submit" onClick={() => setIsOpen(false)} className="harafi-btn-primary mt-2 h-11 gap-2 text-sm">
              <UserPlus className="h-4 w-4" />
              سجّل مجاناً الآن
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
