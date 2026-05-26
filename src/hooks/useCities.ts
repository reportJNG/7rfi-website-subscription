import { useState, useEffect } from 'react';
import { getCities } from '@/lib/supabase/api';
import type { City } from '@/types';

export function useCities() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        setLoading(true);
        const data = await getCities();
        setCities(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch cities:', err);
        setError('تعذر تحميل قائمة المحافظات');
      } finally {
        setLoading(false);
      }
    }

    fetchCities();
  }, []);

  return { cities, loading, error };
}
