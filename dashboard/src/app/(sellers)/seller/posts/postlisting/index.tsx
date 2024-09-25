'use client';
import React from 'react';
import TextileBaleSeller from '../textilebales';
import useGetBales from '@/app/hooks/useGetTextileBales';
import { PuffLoader } from 'react-spinners';

export default function PostListing() {
  const { bales, loading, error, refetch } = useGetBales();

  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <PuffLoader color="#002A3D" loading={true} size={150} />
          <p className="mt-4 text-4xl text-gray-700">Loading textile bales...</p>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        
        <TextileBaleSeller textileBales={bales} refetch={refetch}/>
      )}
    </div>
  );
}
