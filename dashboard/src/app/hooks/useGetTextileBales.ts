import { useState, useEffect } from "react";
import { getBales } from "../utils/getBales";
import { TextileBaleData } from "../utils/types";

// Define the custom hook
const useGetBales = () => {
  const [bales, setBales] = useState<TextileBaleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
const [refetchToggle, setRefetchToggle] = useState(false)

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
  }, [refetchToggle]);

  return { bales, loading, error , refetch: () => setRefetchToggle(!refetchToggle)};
};

export default useGetBales;
