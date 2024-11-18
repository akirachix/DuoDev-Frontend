// app/market/page.tsx

'use client';

import React from 'react';
import Layout from '@/app/Components/Layout';
import ProductComponent from '@/app/Components/market';

export default function MarketPage() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <ProductComponent />
      </div>
    </Layout>
  );
}

