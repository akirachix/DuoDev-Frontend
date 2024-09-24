import React from 'react';
import SellersNavigationBar from '@/app/Components/SellersNavigationBar';
import { CartProvider } from '@/app/Context/CartContext';

function PublicUsersView({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <SellersNavigationBar/>
            <main>
                <CartProvider>
                    {children}
                </CartProvider>
            </main>
        </div>
    );
}
export default PublicUsersView