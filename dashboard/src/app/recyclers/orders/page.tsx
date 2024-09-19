'use client';

import React, { useState, useEffect } from 'react';
import OrderTable from '../Components/OrderTable';
import useGetOrders from '../hooks/useGetOrders';
import Layout from '@/app/Components/Layout';

function Orders() {
  const { orders, loading, error } = useGetOrders(); 
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = Array.isArray(orders) ? orders.filter((order) =>
    order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.location?.toLowerCase().includes(searchTerm.toLowerCase()) 
   
  ) : [];

  return (
   <Layout>
    <h1 className='text-3xl font-bold text-center text-forestgreen'>Orders</h1>

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
      ) : filteredOrders.length > 0 ? (
        <OrderTable data={filteredOrders} />
      ) : (
        <p>No orders found</p>
      )}
    </div>
   </Layout>
  );
}

export default Orders;
