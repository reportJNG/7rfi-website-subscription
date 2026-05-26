import { useState, useEffect } from 'react';
import { getSubscriberCount } from '@/lib/supabase/api';

export function useSubscriberCount() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCount() {
      try {
        setLoading(true);
        const total = await getSubscriberCount();
        setCount(total);
      } catch (err) {
        console.warn('Failed to fetch subscriber count:', err);
        setCount(0);
      } finally {
        setLoading(false);
      }
    }

    fetchCount();

    // Refresh every 30 seconds
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  return { count, loading };
}
