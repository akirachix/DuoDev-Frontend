"use client";

import React, { useState } from 'react';
import { OrderData } from '../../utils/types';

function OrderTable({ data }: { data: OrderData[] }) {
  const [currentPage, setCurrentPage] = useState(1); 
  const ordersPerPage = 5; 

  // Dummy phone numbers
  const dummyPhoneNumbers = [
    '254712345678', '254723456789', '254734567890', '254745678901', '254756789012', '254767890123'
  ];

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / ordersPerPage);

  // Get the orders for the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = data.slice(indexOfFirstOrder, indexOfLastOrder);

  // Handlers for page navigation
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div id='recyclers/orders'>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-2 py-2 text-left">ORDER</th>
            <th className="px-2 py-2 text-left">PRODUCT</th>
            <th className="px-2 py-2 text-left">LOCATION</th>
            <th className="px-2 py-2 text-left">PRICE</th>
            <th className="px-2 py-2 text-left">PHONE NO.</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order: OrderData, index: number) => (
            <tr key={order.id} className="border-b border-black-400 mb-5 bg-#F8F7F4">
              <td className="px-4 py-2 text-left bg-[F8F8F8]">{order.order_number}</td>
              <td className="px-4 py-2 text-left">{order.product}</td>
              <td className="px-4 py-2 text-left">{order.location}</td>
              <td className="px-4 py-2 text-left">{order.total_price}</td>
              <td className="px-4 py-2 text-left">{dummyPhoneNumbers[index % dummyPhoneNumbers.length]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-3 py-2 text-white bg-forestgreen rounded-md disabled:opacity-50"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="px-5 py-2 text-white bg-forestgreen rounded-md disabled:opacity-50 w-20"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default OrderTable;
