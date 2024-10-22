export const getAgentsRegistered = async() => {
    try {
        const response = await fetch('/api/footagent/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch footagents');
        }

        const data = await response.json();
        

    return data
      } catch (error) {
      throw new Error((error as Error).message);
      } 
  };
  