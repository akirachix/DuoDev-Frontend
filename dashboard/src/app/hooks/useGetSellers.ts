import { useState, useEffect } from 'react';
import { getSellers } from '../utils/getSellers';

const useGetSellers = () => {
  const [sellers, setSellers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const data = await getSellers();
        setSellers(data.sellers);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  return { sellers, loading, error };
};

export default useGetSellers;
