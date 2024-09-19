import { useState, useEffect } from 'react';
import { getOrders } from '../utils/getOrders'; 
import { OrderData } from '../Components/types';

// Define the custom hook
const useGetOrders = () => {
  const [orders, setOrders] = useState<OrderData[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string>(''); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders(); 
        setOrders(data?.data); 
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

    fetchOrders();
  }, []); 

  return { orders, loading, error }; 
};

export default useGetOrders;
