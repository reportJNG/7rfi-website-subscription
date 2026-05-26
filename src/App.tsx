import { Routes, Route } from 'react-router';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/HomePage';
import { SubmitPage } from '@/pages/SubmitPage';
import { AboutPage } from '@/pages/AboutPage';

function App() {
  return (
    <div className="min-h-screen bg-parchment" dir="rtl" lang="ar">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
