'use client';

import React, { useState } from 'react';
import useOrders from '../../../hooks/useOrders';
import Layout from '@/app/Components/Layout';
import OrderTable from '@/app/Components/OrderTable';

function Orders() {
  const { orders, loading, error } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = Array.isArray(orders) ? orders.filter((order) =>
    order.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <Layout >
      <h1 className="text-3xl font-bold text-center text-forestgreen">Orders</h1>

      <div id="recyclers/orders" className="container mx-auto p-4 bg-white">
        <div className="search-bar flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-[40%] px-4 py-3 border-2 border-black-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forestgreen transition duration-300 ease-in-out"
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
