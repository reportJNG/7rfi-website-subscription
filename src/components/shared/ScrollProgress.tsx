import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      const total = root.scrollHeight - root.clientHeight;
      setProgress(total > 0 ? (root.scrollTop / total) * 100 : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[9999] h-0.5 bg-transparent">
      <div
        className="h-full bg-amber transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
