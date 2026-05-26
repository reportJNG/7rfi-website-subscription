import { useEffect, useRef, useState } from 'react';

export function useCountAnimation(target: number, duration: number = 2000) {
  const [count, setCount] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? target : 0;
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const targetRef = useRef(target);

  useEffect(() => {
    targetRef.current = target;
  }, [target]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const node = ref.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) return;

        setHasAnimated(true);

        if (prefersReducedMotion) {
          setCount(targetRef.current);
          observer.disconnect();
          return;
        }

        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * targetRef.current));
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [duration, hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    const frame = requestAnimationFrame(() => setCount(target));
    return () => cancelAnimationFrame(frame);
  }, [target, hasAnimated]);

  return { count, ref };
}
