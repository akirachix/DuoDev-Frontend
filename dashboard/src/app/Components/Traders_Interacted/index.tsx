import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import useGetTraders from '@/app/hooks/useGetTraders';

const Traders_Interacted = () => {
  const { traders, loading, error } = useGetTraders();

  const formattedData = traders?.map(trader => ({
    name: trader.agent_name,
    interactions: trader.interaction_count,
  })) || [];

  if (loading) {
    return <div>Loading traders interaction data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex flex-col items-center '>
      <h1 className="text-md font-bold text-center text-forestgreen mb-2">Interaction With Traders</h1>
      <ResponsiveContainer width='100%' height={220}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="interactions" fill="forestgreen" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Traders_Interacted;
