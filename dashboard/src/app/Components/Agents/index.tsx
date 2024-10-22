"use client";

import React, { useState } from 'react';
import { AgentsData } from '../../utils/types';
import {  ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function AgentsComponent({ footAgent }: { footAgent: AgentsData[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(footAgent.length / itemsPerPage);

  const currentAgents = footAgent.slice(
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
    <div className="container mx-auto p-4" id='/recyclers/agents'>
      <ToastContainer />

      <div className="bg-white shadow-lg rounded-lg p-10">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left font-semibold text-lg">Agent Name</th>
              <th className="px-4 py-2 border-b text-left font-semibold">Location</th>
            </tr>
          </thead>
          <tbody>
            {currentAgents.map((agent) => (
              <tr key={agent.agent_id} className="hover:bg-gray-200 transition duration-200 text-md">
                <td className="px-4 py-2 border-b">{agent.agent_name}</td>
                <td className="px-4 py-2 border-b">{agent.location}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <button
            className={`px-3 py-2 text-white bg-forestgreen rounded-md ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg">Page {currentPage} of {totalPages}</span>
          <button
            className={`px-3 py-2 text-white bg-forestgreen rounded-md ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgentsComponent;
