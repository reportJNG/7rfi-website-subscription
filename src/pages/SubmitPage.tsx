import { AlertCircle, RefreshCcw } from 'lucide-react';
import { SubscribeForm } from '@/components/submit/SubscribeForm';
import { PageSkeleton } from '@/components/shared/PageSkeleton';
import { useCities } from '@/hooks/useCities';

export function SubmitPage() {
  const { cities, loading, error } = useCities();

  if (loading) {
    return <PageSkeleton />;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-parchment px-4 pb-20 pt-32">
        <div className="mx-auto max-w-[640px]">
          <div className="harafi-card p-8 text-center md:p-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-danger/10">
              <AlertCircle className="h-7 w-7 text-danger" />
            </div>
            <h1 className="mb-2 font-cairo text-2xl font-bold text-navy">عذراً، حدث خطأ</h1>
            <p className="font-noto text-base text-muted-foreground">{error}</p>
            <button onClick={() => window.location.reload()} className="harafi-btn-primary mt-7 gap-2 px-7">
              <RefreshCcw className="h-4 w-4" />
              إعادة المحاولة
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-parchment px-4 pb-20 pt-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <div className="font-cairo text-sm font-bold text-amber">التسجيل المبكر</div>
          <h1 className="mt-2 font-cairo text-3xl font-black leading-tight text-navy md:text-4xl">سجّل بياناتك</h1>
          <p className="mt-3 font-noto text-base leading-8 text-muted-foreground">
            أدخل معلوماتك الصحيحة للحصول على اشتراكك المجاني عند إطلاق المنصة.
          </p>
        </div>

        <div className="harafi-card p-5 md:p-8">
          <SubscribeForm cities={cities} />
        </div>
      </div>
    </main>
  );
}
