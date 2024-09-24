import { useState, useEffect } from "react";
import { assignBaleToAgent } from "../utils/assignBaleToAgent";  
import { AssignmentData} from "../utils/types";  

// Define the custom hook
const useAssignAgent = (agentId: string, assignmentData: any) => {
  const [assignedAgent, setAssignedAgent] = useState<AssignmentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const assignAgentToTask = async () => {
      try {
        const data = await assignBaleToAgent(agentId, assignmentData);  
        setAssignedAgent(data);
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
    assignAgentToTask();
  }, [agentId, assignmentData]);  

  return { assignedAgent, loading, error };
};

export default useAssignAgent;
