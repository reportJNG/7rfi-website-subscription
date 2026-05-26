import { Gift, ShieldCheck, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCard {
  Icon: LucideIcon;
  title: string;
  body: string;
}

const cards: FeatureCard[] = [
  {
    Icon: ShieldCheck,
    title: 'تسجيل آمن وموثوق',
    body: 'بياناتك محمية ولن تُشارك مع أي طرف خارجي. نحافظ على خصوصيتك من أول خطوة.',
  },
  {
    Icon: Gift,
    title: 'اشتراك مجاني بالكامل',
    body: 'المسجلون الأوائل يحصلون على اشتراك مجاني كامل عند الإطلاق الرسمي للمنصة.',
  },
  {
    Icon: Users,
    title: 'شبكة حرفيي سوريا',
    body: 'انضم إلى مجتمع من أمهر المهنيين والحرفيين السوريين وابنِ حضورك المهني بثقة.',
  },
];

export function FeaturesSection() {
  return (
    <section id="why" className="bg-white py-20 md:py-24">
      <div className="section-shell">
        <div className="max-w-2xl">
          <div className="font-cairo text-sm font-bold text-amber">لماذا حرفي؟</div>
          <h2 className="mt-3 font-cairo text-3xl font-black leading-tight text-navy md:text-4xl">
            منصة صُنعت بعناية لأهل الحرفة
          </h2>
          <p className="mt-4 font-noto text-base leading-8 text-muted-foreground">
            تجربة واضحة تساعد الحرفيين على التسجيل بثقة، وتفتح الباب لمجتمع مهني أكثر تنظيماً.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cards.map(({ Icon, title, body }) => (
            <article key={title} className="rounded-xl border border-border bg-parchment/70 p-6">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-white text-amber shadow-xs">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-cairo text-xl font-bold text-navy">{title}</h3>
              <p className="mt-3 font-noto text-[15px] leading-8 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
