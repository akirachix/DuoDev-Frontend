'use client';

import React, { useState } from 'react';
import useGetAgents from '../../../hooks/useGetAgents';
import Layout from '@/app/Components/Layout';
import AgentsComponent from '@/app/Components/Agents';


function FootAgent() {
  
  const { agent, loading, error } = useGetAgents();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredagents = Array.isArray(agent) ? agent.filter((footagents) =>
    footagents.location?.toLowerCase().includes(searchTerm.toLowerCase())

  ) : [];

  return (
    <Layout>
      <h1 className='text-3xl font-bold text-center text-forestgreen'>Agents</h1>

      <div className="container mx-auto p-4 bg-white" id="/recyclers/footagent">
        <div className="search-bar flex justify-center mb-2">
          <input
            type="text"
            placeholder="Search Agent.... "
            className="w-[40%] px-4 py-3 border-2 border-black-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-forestgreen transition duration-300 ease-in-out"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading footagents...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredagents.length > 0 ? (                    
  
          <AgentsComponent footAgent={filteredagents} />
        ) : (
          <p>No Agents Registered</p>
        )}
      </div>
    </Layout>
  );
}

export default  FootAgent;
