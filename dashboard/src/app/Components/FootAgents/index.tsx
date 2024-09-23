"use client";

import React, { useState } from 'react';
import { AgentsData } from '../../utils/types';

function FootAgentComponent({ footAgent }: { footAgent: AgentsData[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(footAgent.length / itemsPerPage);


  const currentagents = footAgent.slice(
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
      <div id='recyclers/footagent' className="sm:grid-cols-2 md:grid-cols-2 gap-2 p-2  text-lg">
        {currentagents.map((agent) => (
          
            <div className="flex justify-around  border-2 border-black-300 shadow-lg p-2 bg-white rounded-lg gap-3 text-artisticblue text-xl">
              <div >
                <p>Agent:   {agent.agent_name}</p>
                <p>Location: {agent.location}</p>
              </div>
              <div>
                {/* <p>Trader: {agent.user}</p> */}
                <button 
                
                className="mt-7 bg-green-600 text-white text-sm px-2 py-1 rounded font-semibold hover:bg-green-700 transition duration-300 w-30 justify-around">
                  Assign
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

export default FootAgentComponent;

