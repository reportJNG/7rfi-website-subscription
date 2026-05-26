import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { Mail, Phone } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';

function SocialIcon({ type }: { type: string }) {
  const icons: Record<string, ReactNode> = {
    instagram: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><path d="M16.5 7.5h.01"/>
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
    whatsapp: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/><path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/><path d="M9.5 15.5a5 5 0 0 0 5 0"/>
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    x: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
      </svg>
    ),
  };

  return icons[type] || null;
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 - About */}
          <div className="text-center md:text-right">
            <Logo />
            <p className="font-noto text-sm text-white/60 mt-4 leading-relaxed">
              منصة المهنيين السوريين — نربط الحرفيين بالفرص ونبني مجتمعاً مهنياً قوياً
            </p>
          </div>

          {/* Column 2 - Links */}
          <div className="text-center">
            <h3 className="font-cairo font-semibold text-base mb-4">روابط</h3>
            <div className="flex flex-col gap-3">
              <Link to="/" className="font-noto text-sm text-white/70 hover:text-white transition-colors">
                الرئيسية
              </Link>
              <Link to="/submit" className="font-noto text-sm text-white/70 hover:text-white transition-colors">
                سجّل الآن
              </Link>
              <Link to="/about" className="font-noto text-sm text-white/70 hover:text-white transition-colors">
                عن حرفي
              </Link>
            </div>
          </div>

          {/* Column 3 - Contact */}
          <div className="text-center md:text-left">
            <h3 className="font-cairo font-semibold text-base mb-4">تواصل معنا</h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@harafi.com"
                className="flex items-center justify-center md:justify-start gap-2 font-noto text-sm text-white/70 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@harafi.com
              </a>
              <a
                href="tel:+963000000000"
                className="flex items-center justify-center md:justify-start gap-2 font-noto text-sm text-white/70 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                +963 000 000 000
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
              {['instagram', 'facebook', 'whatsapp', 'linkedin', 'x'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label={social}
                >
                  <SocialIcon type={social} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-6">
          <p className="font-noto text-[13px] text-white/50 text-center">
            © {currentYear} حرفي — جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}
