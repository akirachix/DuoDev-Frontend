// utils/getSales.ts
export const getSales = async () => {
    try {
      const response = await fetch('/api/total-sales/');
      
      if (!response.ok) {
        throw new Error('Failed to fetch sales');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
  