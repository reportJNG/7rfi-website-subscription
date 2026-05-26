import { useSubscriberCount } from '@/hooks/useSubscriberCount';
import { useCountAnimation } from '@/hooks/useCountAnimation';
import { Skeleton } from '@/components/ui/skeleton';

export function CounterSection() {
  const { count, loading } = useSubscriberCount();
  const { count: animatedCount, ref } = useCountAnimation(count, 2000);

  const formatNumber = (num: number) => num.toLocaleString('ar-SA');

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div
          ref={ref}
          className="bg-parchment rounded-3xl p-10 md:p-16 text-center border border-amber/10"
        >
          <p className="font-noto text-muted-foreground text-base mb-4">
            عدد المسجّلين حتى الآن
          </p>

          {loading ? (
            <div className="flex justify-center">
              <Skeleton className="h-20 w-64" />
            </div>
          ) : (
            <div className="font-cairo font-black text-amber" style={{ fontSize: 'clamp(48px, 8vw, 80px)' }}>
              {formatNumber(animatedCount)}
            </div>
          )}

          <p className="font-noto text-navy text-lg mt-4">
            شخص سجّل للحصول على اشتراك مجاني
          </p>
        </div>
      </div>
    </section>
  );
}
