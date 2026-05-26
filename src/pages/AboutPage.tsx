import { Eye, Heart, Target, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const values: ValueItem[] = [
  {
    icon: Heart,
    title: 'مهمتنا',
    description: 'تمكين المهنيين والحرفيين السوريين من خلال منصة رقمية تجمعهم بفرص العمل والعملاء وتمنح مهاراتهم حضوراً يليق بها.',
  },
  {
    icon: Target,
    title: 'رؤيتنا',
    description: 'أن نكون المنصة الرائدة في سوريا لربط المهنيين بالفرص، والبوابة الأولى لكل من يبحث عن كفاءات سورية موثوقة.',
  },
  {
    icon: Eye,
    title: 'قيمنا',
    description: 'النزاهة، الجودة، والشفافية هي أساس عملنا. نؤمن بقوة المجتمع وبناء الثقة بين أصحاب المهارات والعملاء.',
  },
  {
    icon: Users,
    title: 'مجتمعنا',
    description: 'مجتمع حرفي هو قلب المنصة: شبكة من المحترفين الموثوقين الذين يدعمون بعضهم بعضاً وينمون معاً.',
  },
];

export function AboutPage() {
  return (
    <main className="min-h-screen bg-parchment px-4 pb-20 pt-32">
      <div className="mx-auto max-w-6xl">
        <section className="grid overflow-hidden rounded-xl border border-border bg-white shadow-card md:grid-cols-[0.95fr_1.05fr]">
          <div className="min-h-[300px] md:min-h-[420px]">
            <img src="/images/about-hero.jpg" alt="ورشة حرفية سورية" className="h-full w-full object-cover" />
          </div>
          <div className="p-6 md:p-10">
            <div className="font-cairo text-sm font-bold text-amber">عن حرفي</div>
            <h1 className="mt-3 font-cairo text-4xl font-black leading-tight text-navy md:text-5xl">منصة للمهارة والثقة</h1>
            <p className="mt-5 font-noto text-base leading-8 text-muted-foreground">
              منصة سورية تؤمن بأن المهارة تستحق أن تُرى، وأن الثقة تبدأ من تجربة واضحة ومحترمة.
            </p>
          </div>
        </section>

        <section className="mt-12 grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5 font-noto text-base leading-9 text-navy/80">
            <p>
              حرفي هي المنصة الرقمية السورية المخصصة للمهنيين والحرفيين. تهدف المنصة إلى ربط الكفاءات السورية بفرص العمل والمشاريع، وتوفير مساحة آمنة وموثوقة لعرض المهارات والخبرات.
            </p>
            <p>
              نؤمن بأن سوريا تزخر بالمواهب في مختلف المجالات، ونحن هنا لنساعد هذه المواهب على الوصول إلى الفرص التي تستحقها. سواء كنت حرفياً تقليدياً أو محترفاً في مجال تقني، فحرفي هي مكانك.
            </p>
            <p>
              من خلال منصتنا، يمكن للمهنيين إنشاء ملفات شخصية احترافية، عرض أعمالهم السابقة، والتواصل مباشرة مع العملاء المحتملين. نحن نبني مستقبلاً يعتمد على الكفاءة والثقة.
            </p>
          </div>

          <aside className="rounded-xl border border-border bg-white p-6 shadow-card">
            <h2 className="font-cairo text-2xl font-black text-navy">ما الذي نبنيه؟</h2>
            <p className="mt-4 font-noto text-base leading-8 text-muted-foreground">
              تجربة تسجيل واضحة، مجتمع مهني موثوق، ونظام يساعد العملاء على اكتشاف أصحاب المهارات المناسبة بدون تعقيد.
            </p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-sand-light">
              <div className="h-full w-2/3 rounded-full bg-amber" />
            </div>
          </aside>
        </section>

        <section className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {values.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-xl border border-border bg-white p-6 shadow-card">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-sand-light text-amber">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-3 font-cairo text-xl font-bold text-navy">{title}</h3>
              <p className="font-noto text-[15px] leading-8 text-muted-foreground">{description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
