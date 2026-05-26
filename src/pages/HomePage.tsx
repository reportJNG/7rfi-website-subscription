import { HeroSection } from '@/components/home/HeroSection';
import { CounterSection } from '@/components/home/CounterSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <CounterSection />
      <FeaturesSection />
    </main>
  );
}
