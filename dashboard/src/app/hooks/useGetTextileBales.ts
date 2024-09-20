import { useState, useEffect } from "react";
import { getBales } from "../utils/getBales";
import { TextileBaleData } from "../utils/types";

// Define the custom hook
const useGetBales = () => {
  const [bales, setBales] = useState<TextileBaleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getBales();
        setBales(data?.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { bales, loading, error };
};

export default useGetBales;
