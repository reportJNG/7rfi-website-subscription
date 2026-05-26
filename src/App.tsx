import { Routes, Route } from 'react-router';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/HomePage';
import { SubmitPage } from '@/pages/SubmitPage';
import { AboutPage } from '@/pages/AboutPage';
import { ScrollProgress } from '@/components/shared/ScrollProgress';

function App() {
  return (
    <div className="min-h-screen bg-parchment text-navy" dir="rtl" lang="ar">
      <ScrollProgress />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
      <Toaster
        position="top-center"
        dir="rtl"
        toastOptions={{
          style: {
            fontFamily: 'Cairo, system-ui, sans-serif',
            borderRadius: '16px',
          },
        }}
      />
    </div>
  );
}

export default App;
