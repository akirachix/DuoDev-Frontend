// pages/Dashboard.tsx
'use client';

import Layout from '@/app/Components/Layout';
import TotalSellers from '@/app/Components/TotalSellers';
import Monthly_Sales from '@/app/Components/Total_Sales';
import Interacted_Traders from '@/app/Components/Traders_Interacted';

function Dashboard() {

  return (
    <Layout>
      <h1 id='recyclers/dashboard' className='text-3xl font-bold text-center text-forestgreen mb-3'>Dashboard</h1>

      <div className='grid-cols-2'>
        <div  className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2   text-lg'>
          <Monthly_Sales />
          <TotalSellers/>
        </div>
        <div>
          <Interacted_Traders />
        </div>
      </div>
      
    </Layout>
  );
}

export default Dashboard;
