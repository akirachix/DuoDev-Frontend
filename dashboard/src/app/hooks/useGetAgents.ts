import { useState, useEffect } from "react";
import { getAgentsRegistered } from "../utils/getAgentsRegistered";
import { AgentsData } from "../utils/types";

// Define the custom hook
const useGetAgents = () => {
  const [agent, setAgents] = useState<AgentsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await getAgentsRegistered();        
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

export default useGetAgents;
