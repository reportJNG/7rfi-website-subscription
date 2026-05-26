# حرفي

واجهة تسجيل مبكر لمنصة حرفي، مبنية باستخدام Vite وReact وTypeScript وTailwindCSS.

## المتطلبات

- Node.js 20 أو أحدث
- إعداد متغيرات Supabase في ملف `.env`

## الإعداد

```bash
npm install
```

انسخ `.env.example` إلى `.env` وأضف قيم Supabase المطلوبة.

## الأوامر

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## البنية

- `src/components`: مكونات الواجهة
- `src/pages`: صفحات التطبيق
- `src/hooks`: Hooks الخاصة بالبيانات والواجهة
- `src/lib`: تكامل Supabase والتحقق من البيانات
- `src/types`: أنواع TypeScript المشتركة
