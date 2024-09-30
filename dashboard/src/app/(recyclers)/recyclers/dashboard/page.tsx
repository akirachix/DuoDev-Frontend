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
        <h1 id='recyclers/dashboard' className='text-2xl font-bold text-center text-forestgreen mt-2 '>Dashboard</h1>
        <div className='grid-cols-2  lg:ml-20 md:ml-10'>
          <div  className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2   text-lg'>
            <Monthly_Sales />
            <TotalSellers/>
          </div>
          <div>
            <Interacted_Traders />
          </div>
        </div>
      </div>
      
    </Layout>
  );
}

export default Dashboard;
