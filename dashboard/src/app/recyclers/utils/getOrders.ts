export const getOrders = async() => {
    try {
        const response = await fetch('/api/orders/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        

     return data
      } catch (error) {
      throw new Error((error as Error).message);
      } 
  };
  