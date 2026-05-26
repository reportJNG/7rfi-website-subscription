import { Heart, Target, Eye, Users } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'مهمتنا',
    description: 'تمكين المهنيين والحرفيين السوريين من خلال منصة رقمية تجمعهم بفرص العمل والعملاء، ونساهم في بناء اقتصاد رقمي قوي يعكس مهارات شعبنا.',
  },
  {
    icon: Target,
    title: 'رؤيتنا',
    description: 'أن نكون المنصة الرائدة في سوريا لربط المهنيين بالفرص، وأن نكون البوابة الأولى لكل من يبحث عن كفاءات سورية موثوقة.',
  },
  {
    icon: Eye,
    title: 'قيمنا',
    description: 'النزاهة، الجودة، والشفافية هي أساس عملنا. نؤمن بقوة المجتمع ونفخر بأننا نبني جسوراً بين المواهب والفرص.',
  },
  {
    icon: Users,
    title: 'مجتمعنا',
    description: 'مجتمعنا هو قلب منصة حرفي. نحن نسعى لبناء شبكة من المحترفين الموثوقين الذين يدعمون بعضهم البعض وينمون معاً.',
  },
];

export function AboutPage() {
  return (
    <main className="min-h-screen bg-parchment pt-[120px] pb-20 px-4">
      <div className="max-w-[800px] mx-auto">
        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden mb-12 shadow-card">
          <img
            src="/images/about-hero.jpg"
            alt="ورشة حرفي سوري"
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="font-cairo font-bold text-4xl md:text-[40px] text-navy text-center mb-8">
          عن حرفي
        </h1>

        {/* Description */}
        <div className="space-y-6 mb-16">
          <p className="font-noto text-[17px] text-[#1A1A1A] leading-[1.9] text-justify">
            حرفي هي المنصة الرقمية السورية الأولى المخصصة للمهنيين والحرفيين. تهدف المنصة إلى ربط الكفاءات السورية بفرص العمل والمشاريع، وتوفير مساحة آمنة وموثوقة لعرض المهارات والخبرات.
          </p>
          <p className="font-noto text-[17px] text-[#1A1A1A] leading-[1.9] text-justify">
            نؤمن بأن سوريا تزخر بالمواهب والكفاءات في مختلف المجالات، ونحن هنا لنساعد هذه المواهب على الوصول إلى الفرص التي تستحقها. سواء كنت حرفي تقليدي أو محترف في مجال تقني، فمنصة حرفي هي مكانك.
          </p>
          <p className="font-noto text-[17px] text-[#1A1A1A] leading-[1.9] text-justify">
            من خلال منصتنا، يمكن للمهنيين إنشاء ملفات شخصية احترافية، عرض أعمالهم السابقة، والتواصل مباشرة مع العملاء المحتملين. نحن نبني مستقبلاً يعتمد على الكفاءة والثقة.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-card"
            >
              <div className="w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center mb-5">
                <item.icon className="w-6 h-6 text-amber" />
              </div>
              <h3 className="font-cairo font-semibold text-xl text-navy mb-3">
                {item.title}
              </h3>
              <p className="font-noto text-[15px] text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
