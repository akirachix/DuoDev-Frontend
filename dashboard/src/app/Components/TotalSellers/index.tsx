import React from 'react';
import useGetSellers from '@/app/hooks/useGetSellers';

const TotalSellers = () => {
  const { sellers, loading, error } = useGetSellers();

  if (loading) return <div>Loading total sellers...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="card shadow-md ml-[17%] w-[65%] h-40 mt-7 p-5 ">
      <h1 className="text-lg font-bold text-center text-forestgreen">Total Active Sellers</h1>
      <p className="text-center text-4xl mt-25">{sellers.length}</p>
    </div>
  );
};

export default TotalSellers;
