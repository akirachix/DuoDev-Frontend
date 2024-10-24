// pages/Dashboard.tsx
'use client';

import Layout from '@/app/Components/Layout';
import TotalSellers from '@/app/Components/TotalSellers';
import Monthly_Sales from '@/app/Components/Total_Sales';
import Interacted_Traders from '@/app/Components/Traders_Interacted';

function Dashboard() {

  return (
    <Layout >
      <div className=" overflow-x-hidden">
        <h1 id='recyclers/dashboard' className='text-3xl font-bold text-center text-forestgreen mt-2 '>Dashboard</h1>
        <div className='justify-around p-5'>
          <div  className='justify-center mb-4'>
            <TotalSellers/>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 mt-10  text-lg'> 
          <Monthly_Sales />
          <Interacted_Traders />
          </div>
        </div>
      </div>
      
    </Layout>
  );
}

export default Dashboard;
