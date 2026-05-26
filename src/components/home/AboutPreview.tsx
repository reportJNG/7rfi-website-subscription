import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function AboutPreview() {
  return (
    <section className="bg-parchment py-20 md:py-24">
      <div className="section-shell grid items-center gap-10 md:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="font-cairo text-sm font-bold text-amber">عن حرفي</div>
          <h2 className="mt-3 font-cairo text-3xl font-black leading-tight text-navy md:text-4xl">
            حضور مهني أوضح للحرفيين السوريين
          </h2>
          <div className="mt-5 space-y-4 font-noto text-base leading-8 text-muted-foreground">
            <p>
              حرفي منصة سورية تؤمن بأن الحرفي والمهني الماهر يستحق أن يكون مرئياً، وأن تُقدَّم خدماته بالمستوى الذي يليق بخبرته.
            </p>
            <p>
              نبني مساحة رقمية موثوقة تساعد أصحاب المهارات على الوصول إلى فرص أفضل، وتساعد العملاء على العثور على كفاءات سورية حقيقية.
            </p>
          </div>
          <Link to="/about" className="harafi-btn-secondary mt-7 h-12 gap-2 px-6">
            اعرف أكثر
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-white p-3 shadow-card">
          <img src="/images/feature-community.jpg" alt="مجتمع حرفيين" className="aspect-[4/3] w-full rounded-lg object-cover" />
        </div>
      </div>
    </section>
  );
}
