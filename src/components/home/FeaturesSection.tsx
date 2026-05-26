import { Users, Briefcase, Shield, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
}

const features: Feature[] = [
  {
    icon: Users,
    title: 'مجتمع مهني سوري',
    description: 'تواصل مع آلاف المهنيين والحرفيين من جميع المحافظات السورية',
    image: '/images/feature-community.jpg',
  },
  {
    icon: Briefcase,
    title: 'فرص عمل حقيقية',
    description: 'احصل على فرص عمل وعروض مشاريع تناسب مهاراتك وخبراتك',
    image: '/images/feature-jobs.jpg',
  },
  {
    icon: Shield,
    title: 'ثقة وأمان',
    description: 'منصة آمنة موثوقة، بياناتك محمية وخصوصيتك أولويتنا',
    image: '/images/feature-trust.jpg',
  },
  {
    icon: Zap,
    title: 'مجاني بالكامل',
    description: 'سجّل الآن واحصل على اشتراك مجاني مدى الحياة كأحد أوائل المستخدمين',
    image: '/images/feature-free.jpg',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-parchment">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-cairo font-bold text-4xl text-navy">
            لماذا حرفي؟
          </h2>
          <p className="font-noto text-muted-foreground text-base mt-3">
            منصتك المهنية الجديدة تبدأ من هنا
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="harafi-card overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 pt-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-amber" />
                </div>

                <h3 className="font-cairo font-semibold text-xl text-navy mb-3">
                  {feature.title}
                </h3>

                <p className="font-noto text-[15px] text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
