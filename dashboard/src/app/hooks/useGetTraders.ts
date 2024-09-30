// hooks/useGetTraders.ts
import { useState, useEffect } from "react";
import { TradersInteractedData } from "../utils/types";
import { getTraders } from "../utils/getTraders";

const useGetTraders = () => {
  const [traders, setTraders] = useState<TradersInteractedData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTraders = async () => {
      try {
        const data = await getTraders();
        setTraders(data); 
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

    fetchTraders();
  }, []);

  return { traders, loading, error };
};

export default useGetTraders;
