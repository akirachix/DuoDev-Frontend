"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Material {
    type: string;
    price: string; // Changed to a single price value
    description: string;
    minPrice: number;
    maxPrice: number;
    image: string;
}

// Calculate average price from min and max price
const calculateAveragePrice = (minPrice: number, maxPrice: number) => {
    return ((minPrice + maxPrice) / 2).toFixed(2); // Keeping two decimal places
}

const sellerMaterials: Material[] = [
    { type: 'Denim', price: `KSh ${calculateAveragePrice(405, 675)}`, description: 'Durable and high demand', minPrice: 405, maxPrice: 675, image: '/images/denim.jpg' },
    { type: 'Cotton', price: `KSh ${calculateAveragePrice(337, 540)}`, description: 'Common textile with moderate pricing', minPrice: 337, maxPrice: 540, image: '/images/cotton.jpg' },
    { type: 'Polyester', price: `KSh ${calculateAveragePrice(203, 405)}`, description: 'Low demand and cheaper to recycle', minPrice: 203, maxPrice: 405, image: '/images/polyester.jpg' },
    { type: 'Wool', price: `KSh ${calculateAveragePrice(540, 810)}`, description: 'High quality, commands premium pricing', minPrice: 540, maxPrice: 810, image: '/images/wool.jpg' },
    { type: 'Mixed Fibers', price: `KSh ${calculateAveragePrice(270, 472)}`, description: 'Challenging to process, lower value', minPrice: 270, maxPrice: 472, image: '/images/mixed.jpg' },
    { type: 'Leather', price: `KSh ${calculateAveragePrice(675, 1080)}`, description: 'Valuable, durable, premium pricing', minPrice: 675, maxPrice: 1080, image: '/images/leather.jpg' },
    { type: 'Silk', price: `KSh ${calculateAveragePrice(810, 1080)}`, description: 'Luxury material, commands high prices', minPrice: 810, maxPrice: 1080, image: '/images/silk.jpg' },
];

export default function SellerHomePage() {
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
    const [weight, setWeight] = useState<number | ''>(''); // Change initial state to empty string
    const [estimatedPrice, setEstimatedPrice] = useState<number>(0);

    const calculatePrice = (weight: number) => {
        if (selectedMaterial && typeof weight === 'number' && weight > 0) {
            // Calculate the average price per kg
            const averagePricePerKg = (selectedMaterial.minPrice + selectedMaterial.maxPrice) / 2;
            const totalPrice = weight * averagePricePerKg;
            setEstimatedPrice(totalPrice);
        } else {
            setEstimatedPrice(0); // Reset if weight is invalid
        }
    };

    return (
        <div className="container mx-auto ">
            {/* Hero Section */}
            <section className="hero bg-cover bg-center h-[60vh] p-12 text-white" style={{ backgroundImage: `url('/shopclothing.jpg')` }}>
                <h1 className="lg:text-6xl text-4xl font-bold mb-4 mt-[5%] lg:mt-[10%]">Welcome to Eco-Threads Hub</h1>
                <p className="text-lg">Discover competitive pricing for recycled textile materials. Browse through our price sheet and select your materials below.</p>
                <Link href={'/seller/posts'}>
                    <button className="mt-6 bg-forestgreen text-white py-2 px-12 rounded-lg hover:bg-green-600 transition">Start Selling</button>
                </Link>
            </section>

            {/* Selected Material Details and Price Calculator */}
            {selectedMaterial && (
                <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
                    <h3 className="text-3xl font-bold text-gray-800">{selectedMaterial.type} Details</h3>
                    <p className="mt-4 text-lg text-gray-600">{selectedMaterial.description}</p>
                    <Image
                        src={selectedMaterial.image}
                        alt={selectedMaterial.type}
                        width={500}
                        height={500}
                        className="w-full h-60 object-cover rounded-lg mt-4" />

                    {/* Price Calculator */}
                    <div className="mt-6">
                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            Enter Weight (in kg):
                        </label>
                        <input
                            type="number"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            value={weight}
                            min="0.01" // Prevent entering zero
                            step="0.01" // Allow decimal input
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value !== '') {
                                    const numValue = Number(value);
                                    setWeight(numValue); // Update weight
                                    if (numValue > 0) {
                                        calculatePrice(numValue); // Calculate price if weight is valid
                                    } else {
                                        setEstimatedPrice(0); // Reset if weight is 0 or negative
                                    }
                                } else {
                                    setWeight(''); // Reset weight state if input is empty
                                    setEstimatedPrice(0); // Reset price if input is empty
                                }
                            }}
                            placeholder="Enter weight in kilograms"
                        />
                        {typeof weight === 'number' && weight > 0 && (
                            <div className="mt-4">
                                <p className="text-lg text-gray-800">Estimated Price:</p>
                                <p className="text-xl font-bold text-gray-900">
                                    KSh {estimatedPrice.toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>

                    <button className="mt-6 bg-forestgreen text-white py-2 px-6 rounded-lg hover:bg-green-600 transition" onClick={() => setSelectedMaterial(null)}>
                        Close
                    </button>
                </div>
            )}

            {/* Material Cards */}
            <div className="flex flex-wrap justify-center mt-8">
                {sellerMaterials.map((material, index) => (
                    <div key={index} className="bg-white max-w-xs m-4 p-6 rounded-lg shadow-lg hover:bg-gray-100 transition cursor-pointer" onClick={() => setSelectedMaterial(material)}>
                        <Image src={material.image}
                            alt={material.type}
                            width={500}
                            height={500}
                            className="w-full h-40 object-cover rounded-t-lg" />
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold text-gray-800">{material.type} (1kg)</h2>
                            <p className="text-lg text-gray-600">Average Price: {material.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="mt-12 p-6 bg-forestgreen text-white text-center">
                <p>&copy; 2024 Eco-Threads Hub. All Rights Reserved.</p>
                <div className="mt-2">
                    <a href="#" className="hover:underline">Contact Us</a>
                    <a href="#" className="hover:underline ml-4">Terms & Conditions</a>
                </div>
            </footer>
        </div>
    );
}
