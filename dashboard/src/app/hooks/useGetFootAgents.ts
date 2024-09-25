import { useState, useEffect } from "react";
import { getAgents } from "../utils/getAgents";
import { AgentsData } from "../utils/types";

// Define the custom hook
const useGetFootAgents = () => {
  const [agent, setAgents] = useState<AgentsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await getAgents();        
        setAgents(data);
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

    fetchAgents();
  }, []);

  return { agent, loading, error };
};

export default useGetFootAgents;
