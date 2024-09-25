"use client";
import { getCookie } from 'cookies-next';  // Import getCookie function
import { useRouter } from 'next/navigation';  // For client-side navigation
import React, { useState, useEffect } from 'react';
import useGetProducts from '@/app/hooks/useGetProducts';
import Image from 'next/image';
import { LuSearch } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";
import { ScaleLoader } from 'react-spinners';
import { useCart } from '@/app/Context/CartContext';
import { MdAdd } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";


export default function Products() {
    const { Products, loading, error } = useGetProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [pageLoading, setPageLoading] = useState(true);
    const [cartVisible, setCartVisible] = useState(false);
    const router = useRouter();  // Use router for navigation
    const imageurl = process.env.NEXT_PUBLIC_IMAGE_URL;


    // Use the context functions
    const { cart, addToCart, increaseQuantity, decreaseQuantity, totalPrice } = useCart();

    // Check if the user is logged in by checking for userData in cookies
    const handleCheckout = () => {
        const userData = getCookie('userData');  // Retrieve user data from cookies
        if (!userData) {
            router.push('/auth/signIn');
        } else {
            // Store total price securely in session storage
            sessionStorage.setItem('totalPrice', JSON.stringify(totalPrice));
            router.push('/checkout');
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setPageLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const filteredProducts = Array.isArray(Products)
        ? Products.filter((product) =>
            product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.price?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    if (pageLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ScaleLoader color="#002A3D" height={100} width={20} />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center relative">
            {/* Search bar and cart button */}
            <div className="search-bar relative flex justify-between items-center w-[90%] lg:w-[70%] mb-4 mt-5">
                <input
                    type="text"
                    placeholder="Search .... "
                    className="lg:w-[60%] w-[80%] bg-coldsteel py-3 px-5 rounded-[10px] focus:outline-none focus:border-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="text-2xl text-gray-300 lg:ml-[55%] ml-[70%] absolute">
                    <LuSearch />
                </div>
                {/* Cart toggle button */}
                <div
                    className="text-artisticblue opacity-80 text-2xl cursor-pointer lg:ml-[65%] ml-[85%] absolute"
                    onClick={() => setCartVisible(!cartVisible)} // Toggle cart visibility
                >
                    <FaShoppingCart />
                    {cart.length > 0 && (
                        <span className="absolute -top-1 -right-2 bg-forestgreen text-white rounded-full text-xs px-1">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
                    )}
                </div>
            </div>

            <div className="pl-3 ">
                {/* Product List Section */}
                <div className={`transition-all duration-300 pr-5 ${cartVisible ? 'w-3/4' : 'w-full'} `}>
                    {loading ? (
                        <div className="flex justify-center items-center min-h-screen">
                            <ScaleLoader color="#002A3D" height={100} width={20} />
                        </div>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.product_id}
                                    className="border p-3 rounded shadow text-artisticblue flex flex-col justify-between"
                                >
                                    <div className="mb-4 flex justify-center">
                                        <Image
                                            src={`${imageurl}${product.image}`}
                                            width={200}
                                            height={200}
                                            className='w-full h-full object-contain'
                                            alt={product.product_name}
                                        />
                                    </div>
                                    <div className="">
                                        <h2 className="text-[16px] font-semi-bold">{product.product_name}</h2>
                                        <p className="font-semi-bold ">Price: Ksh{product.price}</p>
                                        <p className="font-semi-bold ">Material: {product.material}</p>
                                        <p className="font-semi-bold mb-3">Description: {product.description}</p>
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            type="button"
                                            className="bg-forestgreen text-white py-2 px-8 hover:bg-opacity-85 rounded-[10px]"
                                            onClick={() => addToCart({
                                                productId: product.product_id,
                                                productName: product.product_name,
                                                price: product.price,
                                                image: product.image,
                                                quantity: 1
                                            })}
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-artisticblue text-5xl text-center">No products found</p>
                    )}
                </div>

                {/* Cart Section */}
                {cartVisible && (
                    <div className="lg:w-1/4 bg-artisticblue p-4 border-l-2 shadow-lg transition-all duration-300 absolute right-0 top-0">
                        <div className='flex '>
                            <div
                                className="text-white opacity-80 text-2xl cursor-pointer lg:hidden ml-[75%] absolute"
                                onClick={() => setCartVisible(!cartVisible)} // Toggle cart visibility
                            >
                                <FaShoppingCart />
                                {cart.length > 0 && (
                                    <span className="absolute -top-1 -right-2 bg-forestgreen text-white rounded-full text-xs px-1">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-white text-center mb-1">Cart</h2>
                        </div>
                        <div className='flex justify-between items-center mb-3'>
                            <div>
                                <p className='text-white'>Total Price<br />
                                    <span className='border-2 p-1 mt-1 block'>Ksh{totalPrice}</span>
                                </p>
                            </div>

                            {/* Updated Checkout Button */}
                            <button
                                className={`bg-forestgreen text-white rounded py-2 px-4 ${cart.length === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                                onClick={handleCheckout}  // Handle checkout logic
                            >
                                Checkout
                            </button>
                        </div>

                        {cart.length === 0 ? (
                            <div>
                                <p className="text-gray-500 text-xl text-center">Your cart is empty</p>
                                <p className="text-gray-500 text-center">Try adding items to your cart</p>
                            </div>
                        ) : (
                            <div className='text-white overflow-y-scroll max-h-screen'>
                                {cart.map((item) => (
                                    <div key={item.productId} className="mb-4 text-sm border-2 border-gray-500 p-3 rounded-[10px] ">
                                        <div className='border-2 rounded-[10px] border-gray-500 pt-3 overflow-hidden max-h-[200px]'>
                                            <Image
                                                src={`${imageurl}${item.image}`}
                                                width={150}
                                                height={150}
                                                className='object-cover w-full h-auto'
                                                alt={item.productName}
                                            />
                                        </div>
                                        <h3 className="text-sm font-bold">{item.productName}</h3>
                                        <div className="flex items-center text-sm"> Quantity:
                                            <p className="flex pl-3 justify-center text-sm gap-2 items-center">
                                                <span
                                                    className='cursor-pointer'
                                                    onClick={() => increaseQuantity(item.productId)}>
                                                    <MdAdd />
                                                </span>
                                                <span>{item.quantity}</span>
                                                <span
                                                    className='cursor-pointer'
                                                    onClick={() => decreaseQuantity(item.productId)}>
                                                    <FaMinus />
                                                </span>
                                            </p>
                                        </div>
                                        <p className="text-sm">Price: Ksh{item.price}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
