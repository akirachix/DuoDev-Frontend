"use client";

import React from 'react';
import { TextileBaleData} from '../../utils/types';
import Image from 'next/image';



function TextileBaleComponent({textileBales}:{textileBales:TextileBaleData[]}) {
  
  return (
    <div className='flex'>
      
          {textileBales.map((bale) => (

         <>
          <div>
              <Image             
              src={bale.image as string}
              alt='bale'
              width={200}
              height={200}/>
          </div>
            
          <div className='grid'>
                <p>Trader: {bale.id}</p>
                <p>Type: {bale.waste_type}</p>
                <p>Contacts: {bale.phone_number}</p>
                <p>Location: {bale.location}</p>
                <p>Price: Ksh {bale.total_price}</p>
                <button className='bg-green-600 text-white px-3 py-3 mb-4 rounded-lg font-semibold hover:bg-green-700 transition duration-300'>Assign</button>

          </div>

              </>

 ))} 
    </div>
  );
}

export default TextileBaleComponent;
