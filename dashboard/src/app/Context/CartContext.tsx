"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

// CartItem type
type CartItem = {
    productId: number;
    productName: string;
    price: string;
    quantity: number;
    image: string | null;
};

// Context type
type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
    handleCheckout: () => void;
    totalPrice: number;
};

// Create a context with an empty default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component to wrap around your app
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]); // Initialize with an empty array
    const router = useRouter();

    // Load cart from localStorage in useEffect
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: CartItem) => {
        const existingItem = cart.find((item) => item.productId === product.productId);
        if (existingItem) {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.productId === product.productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
        }
    };

    const increaseQuantity = (productId: number) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (productId: number) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
            return updatedCart.filter(item => item.quantity > 0);
        });
    };

    const totalPrice = Math.round(cart.reduce((total, item) => {
        const itemPrice = parseFloat(item.price);
        if (isNaN(itemPrice)) {
            console.error(`Invalid price for ${item.productName}: ${item.price}`);
            return total; // Skip this item if price is invalid
        }
        return total + itemPrice * item.quantity;
    }, 0));

    const handleCheckout = () => {
        const isLoggedIn = getCookie('userData');
        if (!isLoggedIn) {
            alert('Please log in to proceed to checkout.');
        } else {
            router.push(`/publicUser/checkout?totalPrice=${totalPrice}`);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, handleCheckout, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the CartContext
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
