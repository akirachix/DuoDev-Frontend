'use client';

import React, { useState } from 'react';
import useGetTextileBales from '../../hooks/useGetTextileBales';
import Layout from '@/app/Components/Layout';
import TextileBaleComponent from '@/app/Components/TextileBales';


function TextileBales() {
  const { bales, loading, error } = useGetTextileBales();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredtextilesbales = Array.isArray(bales) ? bales.filter((textileBales) =>
    textileBales.waste_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    textileBales.location?.toLowerCase().includes(searchTerm.toLowerCase())

  ) : [];

  return (
    <Layout>
      <h1 id='recyclers' className='text-3xl font-bold text-center text-forestgreen'>Home</h1>

      <div className="container mx-auto p-4 bg-white" id="recyclers">
        <div className="search-bar flex justify-center mb-2">
          <input
            type="text"
            placeholder="Search .... "
            className="w-[40%] px-4 py-3 border-2 border-black-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-forestgreen transition duration-300 ease-in-out"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

    

        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredtextilesbales.length > 0 ? (          
  
          <TextileBaleComponent textileBales={filteredtextilesbales} />
        ) : (
          <p>No Bales found</p>
        )}
      </div>
    </Layout>
  );
}

export default  TextileBales;
