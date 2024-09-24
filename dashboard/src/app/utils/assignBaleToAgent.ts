export const assignBaleToAgent = async (bale_id: string, agent_id: string) => {
    
  const response = await fetch('/api/assign-bale/', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bale_id, agent_id }),
  });

  if (!response.ok) {
    throw new Error('Failed to assign bale');
  }
  return response.json();
};