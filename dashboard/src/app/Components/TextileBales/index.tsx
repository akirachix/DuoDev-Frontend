"use client";

import React, { useState } from 'react';
import { TextileBaleData } from '../../utils/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';  


function TextileBaleComponent({ textileBales }: { textileBales: TextileBaleData[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const router = useRouter(); 
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

  const handleAssignAgent = (bale_id: number) => {
    router.push(`/recyclers/footagent`);
  };
  
  return (
    <div>
      <div id='recyclers' className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 p-2  text-lg">
        {currentBales.map((bale) => (
          <div key={bale.id} id='recyclers' className="flex border-2 border-black-300 shadow-lg p-4 bg-white rounded-lg justify-around">
            <div >
              <Image
                src="/pillow-eco.webp"
                alt="bale"
                width={150}
                height={150}
                className="rounded-lg"
              />
            </div>
            <div className=" gap-2 text-artisticblue text-md">
              <p>Trader:   {bale.id}</p>
              <p>Type: {bale.waste_type}</p>
              <p>Contacts: {bale.phone_number ? bale.phone_number : 'N/A'}</p>
              <p>Location: {bale.location}</p>
              <p>Price: Ksh {bale.price}</p>
              <button 
              onClick={() => handleAssignAgent(bale.bale_id)}
              className="bg-green-600 text-white text-md px-2 py-1 rounded font-semibold hover:bg-green-700 transition duration-300 w-30 justify-around">
                Assign Agent
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-3 space-x-4">
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

