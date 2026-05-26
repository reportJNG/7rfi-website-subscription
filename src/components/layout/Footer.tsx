import { Link } from "react-router";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";

const quickLinks = [
  { label: "الرئيسية", path: "/" },
  { label: "سجّل الآن", path: "/submit" },
  { label: "عن حرفي", path: "/about" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white">
      <div className="section-shell py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm font-noto text-sm leading-8 text-muted-foreground">
              منصة الحرفيين والمهنيين السوريين. نفتح مساحة موثوقة للمهارة،
              العمل، وبناء العلاقات المهنية.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                {
                  Icon: Instagram,
                  label: "Instagram",
                  link: "https://www.instagram.com/re_hamza_0/",
                },
                { Icon: Facebook, label: "Facebook", link: "" },
                { Icon: MessageCircle, label: "Messages", link: "" },
                {
                  Icon: Linkedin,
                  label: "LinkedIn",
                  link: "https://www.linkedin.com/in/hamza-remali-6b3782375/",
                },
              ].map(({ Icon, label, link }) => (
                <a
                  key={label}
                  href={link}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-muted-foreground transition-colors hover:border-amber hover:text-amber"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-cairo text-sm font-bold text-navy">
              روابط سريعة
            </h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="inline-block py-1 font-noto text-sm text-muted-foreground transition-colors hover:text-amber"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-cairo text-sm font-bold text-navy">
              تواصل معنا
            </h3>
            <ul className="mt-4 space-y-3 font-noto text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber" />
                hamzaremali10@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber" />
                +963 000 000 000
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber" />
                سوريا
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center font-noto text-[13px] text-muted-foreground">
          © {currentYear} حرفي - جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}
