import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router';

export function SuccessCard() {
  return (
    <div className="bg-white rounded-[20px] p-12 shadow-form text-center animate-fade-in-up">
      <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-success" />
      </div>

      <h2 className="font-cairo font-bold text-2xl text-navy mb-3">
        تم التسجيل بنجاح!
      </h2>

      <p className="font-noto text-base text-muted-foreground mb-8">
        سنتواصل معك قريباً عند إطلاق المنصة
      </p>

      <Link
        to="/"
        className="inline-flex items-center justify-center harafi-btn-primary text-base px-8 py-4"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
