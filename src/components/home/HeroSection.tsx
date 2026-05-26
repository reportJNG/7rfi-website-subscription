import { Link } from 'react-router';
import { GeometricRosette } from '@/components/shared/GeometricRosette';
import { useSubscriberCount } from '@/hooks/useSubscriberCount';
import { useCountAnimation } from '@/hooks/useCountAnimation';
import { Skeleton } from '@/components/ui/skeleton';

export function HeroSection() {
  const { count: subscriberCount, loading: countLoading } = useSubscriberCount();
  const { count: animatedCount, ref: counterRef } = useCountAnimation(subscriberCount, 2000);

  const formatNumber = (num: number) => {
    return num.toLocaleString('ar-SA');
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden grain-overlay bg-parchment">
      {/* Decorative rosettes */}
      <div className="geometric-rosette top-right">
        <GeometricRosette />
      </div>
      <div className="geometric-rosette bottom-left">
        <GeometricRosette />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-[720px] mx-auto animate-fade-in-up">
        {/* Pretitle */}
        <p className="font-noto font-medium text-base text-amber tracking-wider mb-4">
          المنصة السورية للمهنيين
        </p>

        {/* Headline */}
        <h1 className="font-cairo font-black text-navy leading-tight" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>
          سجّل قبل انتهاء العرض المجاني
        </h1>

        {/* Subtitle */}
        <p className="font-noto text-lg text-muted-foreground leading-relaxed max-w-[560px] mx-auto mt-4">
          انضم إلى آلاف المهنيين السوريين وسجّل حسابك المجاني قبل إطلاق المنصة رسمياً
        </p>

        {/* CTA Button */}
        <div className="mt-10">
          <Link
            to="/submit"
            className="inline-flex items-center justify-center harafi-btn-primary text-lg px-10 py-4"
          >
            احجز اشتراكك المجاني
          </Link>
        </div>

        {/* Counter Badge */}
        <div
          ref={counterRef}
          className="inline-flex items-center gap-3 bg-white border border-amber/20 rounded-full px-7 py-3 mt-6 shadow-sm"
        >
          {countLoading ? (
            <Skeleton className="h-6 w-32" />
          ) : (
            <>
              <span className="font-cairo font-bold text-2xl text-amber">
                +{formatNumber(animatedCount)}
              </span>
              <span className="font-noto text-sm text-muted-foreground">
                شخص سجّل حتى الآن
              </span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
