import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';

const navLinks = [
  { label: 'الرئيسية', path: '/' },
  { label: 'سجّل الآن', path: '/submit' },
  { label: 'عن حرفي', path: '/about' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 h-[72px] backdrop-blur-xl bg-white/85 border-b border-navy/[0.08]">
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-6">
        {/* Logo - on the right in RTL */}
        <Logo />

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-noto font-medium text-[15px] text-navy relative pb-1 transition-colors duration-200
                ${isActive(link.path) ? 'text-amber' : 'hover:text-amber'}`}
            >
              {link.label}
              {isActive(link.path) && (
                <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-amber rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            to="/submit"
            className="harafi-btn-primary text-[15px] px-6 py-2.5"
          >
            سجّل مجاناً
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-navy hover:text-amber transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-navy/40 md:hidden z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 w-[280px] h-full bg-white shadow-xl md:hidden z-50 animate-fade-in-up">
            <div className="flex flex-col p-6 h-full">
              <div className="flex items-center justify-between mb-8">
                <Logo />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-navy hover:text-amber transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-4 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-noto font-medium text-base py-3 px-4 rounded-xl transition-colors
                      ${isActive(link.path)
                        ? 'bg-amber/10 text-amber'
                        : 'text-navy hover:bg-navy/5'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <Link
                to="/submit"
                onClick={() => setIsOpen(false)}
                className="harafi-btn-primary text-center text-base py-3 mt-4"
              >
                سجّل مجاناً
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
