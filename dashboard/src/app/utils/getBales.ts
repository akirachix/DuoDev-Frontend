export const getBales = async() => {
    try {
        const response = await fetch('/api/textile-bales/',{
          cache:'no-cache'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch textilebales');
        }

        const data = await response.json();
        console.log({mydata:data});
        
        

    return data
      } catch (error) {
      throw new Error((error as Error).message);
      } 
  };
  