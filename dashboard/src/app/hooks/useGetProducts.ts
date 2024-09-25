import { useState, useEffect } from "react";
import { getProductList } from "../utils/getProductList";
import { ProductData } from "../utils/types";

// Define the custom hook
const useGetProducts = () => {
const [Products, setProducts] = useState<ProductData[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string>("");

useEffect(() => {
    const fetchProducts = async () => {
    try {
        const data = await getProductList();
        setProducts(data?.data);
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

    fetchProducts();
}, []);

return { Products, loading, error };
};

export default useGetProducts;
