import { Link } from 'react-router';
import { ArrowLeft, ShieldCheck, UserPlus, Users } from 'lucide-react';
import { useSubscriberCount } from '@/hooks/useSubscriberCount';
import { useCountAnimation } from '@/hooks/useCountAnimation';
import { Skeleton } from '@/components/shared/Skeleton';

export function HeroSection() {
  const { count: subscriberCount, loading: countLoading } = useSubscriberCount();
  const { count: animatedCount, ref: counterRef } = useCountAnimation(subscriberCount, 1200);
  const formattedCount = animatedCount.toLocaleString('ar-SY');

  return (
    <section className="bg-parchment pt-28 md:pt-32">
      <div className="section-shell grid min-h-[calc(100svh-80px)] items-center gap-12 pb-16 md:grid-cols-[1.05fr_0.95fr] md:pb-20">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-amber-light bg-white px-4 py-2 font-cairo text-sm font-bold text-amber">
            التسجيل المبكر مفتوح الآن
          </span>

          <h1 className="mt-6 text-balance font-cairo text-4xl font-black leading-[1.18] text-navy md:text-6xl">
            سجّل في حرفي قبل انتهاء العرض المجاني
          </h1>

          <p className="mt-5 max-w-xl font-noto text-base leading-8 text-muted-foreground md:text-lg md:leading-9">
            المنصة السورية للحرفيين والمهنيين. سجّل بياناتك الآن وكن من أوائل المستفيدين من الاشتراك المجاني عند الإطلاق.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/submit" className="harafi-btn-primary h-12 gap-2 px-7">
              <UserPlus className="h-4 w-4" />
              سجّل مجاناً الآن
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link to="/about" className="harafi-btn-secondary h-12 px-7">
              اعرف أكثر عن حرفي
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap gap-3 font-noto text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-amber" />
              لا حاجة لبطاقة ائتمان
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-amber" />
              بياناتك محفوظة باحترام
            </span>
          </div>
        </div>

        <div className="harafi-card p-5 md:p-6">
          <div className="overflow-hidden rounded-lg">
            <img src="/images/about-hero.jpg" alt="حرفي يعمل في ورشة" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div
            ref={counterRef}
            className="mt-5 flex min-h-[58px] items-center gap-3 rounded-lg border border-border bg-sand-light px-4 py-3"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-amber">
              <Users className="h-5 w-5" />
            </span>
            {countLoading ? (
              <Skeleton className="h-5 w-40 bg-white" />
            ) : (
              <span className="font-cairo text-base font-bold text-navy">+{formattedCount} شخص سجّل حتى الآن</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
