export const getTraders = async () => {

    try {
      const response = await fetch("/api/traders-interracted", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch textile Traders interacted with");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      // More robust error handling
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred while fetching Traders interacted with");
      }
    }
  };
  