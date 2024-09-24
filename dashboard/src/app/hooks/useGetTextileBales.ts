import { useState, useEffect } from "react";
import { getBales } from "../utils/getBales";
import { TextileBaleData } from "../utils/types";

// Define the custom hook
const useGetBales = () => {
  const [bales, setBales] = useState<TextileBaleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const fetchBales = async () => {
      try {
        const data = await getBales();
        setBales(data?.data);

        console.log({ all: data?.data });
        


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

    fetchBales();
  }, [refetch]);

  return { bales, loading, error, refetch: () => setRefetch(!refetch) };
};

export default useGetBales