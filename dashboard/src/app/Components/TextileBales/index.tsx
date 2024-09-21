"use client";

import React, { useState } from 'react';
import { TextileBaleData } from '../../utils/types';
import Image from 'next/image';

function TextileBaleComponent({ textileBales }: { textileBales: TextileBaleData[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const totalPages = Math.ceil(textileBales.length / itemsPerPage);


  const currentBales = textileBales.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div id='recyclers' className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 p-2 max-h-lvh text-xl">
        {currentBales.map((bale) => (
          <div key={bale.id} id='recyclers' className="flex border-2 border-black-300 shadow-lg p-4 bg-white rounded-lg justify-around">
            <div className="mb-4">
              <Image
                src={bale.image as string}
                alt="bale"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
            <div className="grid gap-2 text-artisticblue text-xl">
              <p>Trader:   {bale.id}</p>
              <p>Type: {bale.waste_type}</p>
              <p>Contacts: {bale.phone_number ? bale.phone_number : 'N/A'}</p>
              <p>Location: {bale.location}</p>
              <p>Price: Ksh {bale.price}</p>
              <button className="bg-green-600 text-white text-lg px-2 py-1 rounded-xl font-semibold hover:bg-green-700 transition duration-300 w-30 justify-around">
                Assign Agent
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-2 py-2 rounded-lg font-semibold ${
            currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-forestgreen text-white w-20'
          }`}
        >
          Previous
        </button>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg font-semibold ${
            currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'px-5 py-2  text-white bg-forestgreen rounded-md disabled:opacity-50 w-20'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TextileBaleComponent;

