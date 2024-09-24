
export const getBales = async() => {
    try {
        const response = await fetch('/api/textilebale/');              
        
        if (!response.ok) {
          throw new Error('Failed to fetch textilebales');
        }

        const data = await response.json();
        

    return data
      } catch (error) {
      throw new Error((error as Error).message);
      } 
  };
  