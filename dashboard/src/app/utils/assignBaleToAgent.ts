export const assignBaleToAgent = async (bale_id: string, agent_name: string): Promise<any> => {
  
  const response = await fetch('/api/agent-assignments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bale_id, agent_name }),
  });

  if (!response.ok) {
    throw new Error('Failed to assign bale');
  }
  return response.json();
};