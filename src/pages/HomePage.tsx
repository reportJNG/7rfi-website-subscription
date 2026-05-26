import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { AboutPreview } from '@/components/home/AboutPreview';

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <AboutPreview />
    </main>
  );
}
