export const getProductList = async() => {
    try {
        const response = await fetch('/api/products/');
        
        if (!response.ok) {
        throw new Error('Failed to fetch ProductList');
        }

        const data = await response.json();
        

    return data
    } catch (error) {
    throw new Error((error as Error).message);
    } 
};