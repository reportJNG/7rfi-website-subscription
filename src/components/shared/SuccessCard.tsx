import { Link } from 'react-router';
import { ArrowLeft, CheckCircle, Home } from 'lucide-react';

export function SuccessCard() {
  return (
    <div className="text-center">
      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-success/10 text-success">
        <CheckCircle className="h-10 w-10" />
      </div>

      <h2 className="mt-6 font-cairo text-[28px] font-black text-navy">تم التسجيل بنجاح!</h2>
      <p className="mx-auto mt-3 max-w-md font-noto text-base leading-8 text-muted-foreground">
        شكراً لانضمامك إلى حرفي. سنتواصل معك قريباً عند إطلاق المنصة.
      </p>

      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to="/"
          className="harafi-btn-secondary gap-2"
        >
          <Home className="h-4 w-4" />
          العودة للرئيسية
        </Link>
        <Link
          to="/about"
          className="harafi-btn-primary gap-2"
        >
          عن حرفي
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
