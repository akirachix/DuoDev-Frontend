import React from 'react';
import PublicUsersNavigation from '../Components/PublicUsers-Navigation';
import { CartProvider } from '../Context/CartContext';

function PublicUsersView({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <PublicUsersNavigation />
            <main>
                <CartProvider>
                    {children}
                </CartProvider>
            </main>
        </div>
    );
}
export default PublicUsersView