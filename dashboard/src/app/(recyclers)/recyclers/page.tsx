'use client';

import React, { useState } from 'react';
import useGetTextileBales from '../../hooks/useGetTextileBales';
import Layout from '@/app/Components/Layout';
import TextileBaleComponent from '@/app/Components/TextileBales';




// const bales = [
//     {
//       image: 'https://i.pinimg.com/736x/c8/19/98/c819986d2fa237082367bb9647a77616.jpg',
//       id: 1,
//       location: 'Karen',
//       waste_type: 'textile',
//       phone_number: '+254111111552',
//       product: 101,
//       total_price: '5000'
//     },
//     {
//       image: 'https://example.com/cotton.jpg',
//       id: 2,
//       location: 'Gikomba',
//       waste_type: 'textile',
//       phone_number: '+254111111552',
//       product: 102,
//       total_price: '3000'
//     },
//     {
//       image: 'https://example.com/jeans.jpg',
//       id: 3,
//       location: 'Kileleshwa',
//       waste_type: 'textile',
//       phone_number: '+254111111552',
//       product: 103,
//       total_price: '4000'
//     },
//     {
//       image: 'https://i.pinimg.com/736x/c8/19/98/c819986d2fa237082367bb9647a77616.jpg',
//       id: 4,
//       location: 'Utawala',
//       waste_type: 'textile',
//       phone_number: '+254111111552',
//       product: 104,
//       total_price: '7000'
//     },
//     {
//       image: 'https://i.pinimg.com/736x/c8/19/98/c819986d2fa237082367bb9647a77616.jpg',
//       id: 5,
//       location: 'Kimbo',
//       waste_type: 'textile',
//       phone_number: '+254111111552',
//       product: 105,
//       total_price: '6000'
//     },
//     {
//       image: 'https://i.pinimg.com/736x/c8/19/98/c819986d2fa237082367bb9647a77616.jpg',
//       id: 6,
//       location: 'Githurai',
//       waste_type: 'textile',
//       phone_number: '+254111111552',
//       product: 102,
//       total_price: '3000'
//     },
//     {
//       image: 'https://i.pinimg.com/736x/c8/19/98/c819986d2fa237082367bb9647a77616.jpg',
//       id: 7,
//       location: 'Kimbo',
//       waste_type: 'textile',
//       phone_number: '+254111111552',
//       product: 105,
//       total_price: '6000'
//     }
//   ];
  

function TextileBales() {
  const { bales, loading, error } = useGetTextileBales();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredtextilesbales = Array.isArray(bales) ? bales.filter((textileBales) =>
    textileBales.waste_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    textileBales.location?.toLowerCase().includes(searchTerm.toLowerCase())

  ) : [];

  return (
    <Layout>
      <h1 className='text-3xl font-bold text-center text-forestgreen'>Textile Bales</h1>

      <div className="container mx-auto p-4 bg-white" id="recyclers/orders">
        <div className="search-bar flex justify-center mb-4">
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
