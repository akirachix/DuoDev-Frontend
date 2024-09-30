import { useState, useEffect } from "react";
import { getSales } from "../utils/getSales";
import { SalesData } from "../utils/types";

const useSales = () => {
    const [sales, setSales] = useState<SalesData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const data = await getSales(); // Call to get the data from API
                setSales(data?.monthly_sales); // Assuming the fetched data structure
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

        fetchSales();
    }, []);

    return { sales, loading, error };
};

export default useSales;
