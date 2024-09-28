import React from 'react';
import useGetSellers from '@/app/hooks/useGetSellers';

const TotalSellers = () => {
  const { sellers, loading, error } = useGetSellers();

  if (loading) return <div>Loading total sellers...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="card shadow-lg  items-right  w-64 h-40 mt-10">
      <h1 className="text-lg font-bold text-center text-forestgreen">Total Sellers</h1>
      <p className="text-center text-4xl mt-19">{sellers.length}</p>
    </div>
  );
};

export default TotalSellers;
