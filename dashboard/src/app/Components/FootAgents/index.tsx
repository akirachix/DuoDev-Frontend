"use client";

import React, { useState } from 'react';
import { AgentsData } from '../../utils/types';
import { assignBaleToAgent } from '@/app/utils/assignBaleToAgent';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function FootAgentComponent({ footAgent, bale_id }: { footAgent: AgentsData[], bale_id: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(false); 

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

  const handleAssign = async (agentId: string) => {
    setLoading(true);
    try {
      const response = await assignBaleToAgent(bale_id, agentId);
      if (response && response.assignment_id) {
        toast.success(`Bale ${bale_id} has been successfully assigned to agent ${agentId}.`);
      }
    } catch (error) {
      toast.error("Bale has already been assigned.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4" id='/recyclers/footagent'>
      <ToastContainer />

      <div className="bg-white shadow-lg rounded-lg p-6">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left font-semibold text-lg">Agent Name</th>
              <th className="px-4 py-2 border-b text-left font-semibold">Location</th>
              <th className="px-4 py-2 border-b text-center font-semibold">Assign</th>
            </tr>
          </thead>
          <tbody>
            {currentAgents.map((agent) => (
              <tr key={agent.agent_id} className="hover:bg-gray-200 transition duration-200 text-md">
                <td className="px-4 py-2 border-b">{agent.agent_name}</td>
                <td className="px-4 py-2 border-b">{agent.location}</td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    onClick={() => handleAssign(agent.agent_id)}
                    className={`bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition duration-300 items-left ${loading && 'opacity-50'}`}
                    disabled={loading}
                  >
                    {loading ? 'Assigning...' : 'Assign'}
                  </button>
                </td>
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

export default FootAgentComponent;
