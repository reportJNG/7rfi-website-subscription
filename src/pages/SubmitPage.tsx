import { SubscribeForm } from '@/components/submit/SubscribeForm';
import { PageSkeleton } from '@/components/shared/PageSkeleton';
import { useCities } from '@/hooks/useCities';
import { AlertCircle } from 'lucide-react';

export function SubmitPage() {
  const { cities, loading, error } = useCities();

  if (loading) {
    return <PageSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-parchment pt-[120px] pb-20 px-4">
        <div className="max-w-[640px] mx-auto">
          <div className="bg-white rounded-[20px] p-12 shadow-form text-center">
            <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-danger" />
            </div>
            <h2 className="font-cairo font-bold text-xl text-navy mb-2">
              عذراً، حدث خطأ
            </h2>
            <p className="font-noto text-muted-foreground text-base">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="harafi-btn-primary mt-6 px-8 py-3"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-parchment pt-[120px] pb-20 px-4">
      <div className="max-w-[640px] mx-auto">
        {/* Form Card */}
        <div className="bg-white rounded-[20px] p-8 md:p-12 shadow-form">
          {/* Form Header */}
          <div className="text-center mb-10">
            <h1 className="font-cairo font-bold text-[32px] text-navy mb-2">
              سجّل مجاناً
            </h1>
            <p className="font-noto text-muted-foreground text-[15px]">
              املأ البيانات التالية واحجز مكانك الآن
            </p>
          </div>

          {/* Form */}
          <SubscribeForm cities={cities} />
        </div>
      </div>
    </main>
  );
}
