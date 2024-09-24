"use client";
import { useState } from 'react';
import Link from 'next/link';

interface Material {
    type: string;
    priceRange: string;
    description: string;
    minPrice: number;
    maxPrice: number;
    image: string;
}

const sellerMaterials: Material[] = [
    { type: 'Denim', priceRange: 'KSh 405 - KSh 675', description: 'Durable and high demand', minPrice: 405, maxPrice: 675, image: '/images/denim.jpg' },
    { type: 'Cotton', priceRange: 'KSh 337 - KSh 540', description: 'Common textile with moderate pricing', minPrice: 337, maxPrice: 540, image: '/images/cotton.jpg' },
    { type: 'Polyester', priceRange: 'KSh 203 - KSh 405', description: 'Low demand and cheaper to recycle', minPrice: 203, maxPrice: 405, image: '/images/polyester.jpg' },
    { type: 'Wool', priceRange: 'KSh 540 - KSh 810', description: 'High quality, commands premium pricing', minPrice: 540, maxPrice: 810, image: '/images/wool.jpg' },
    { type: 'Mixed Fibers', priceRange: 'KSh 270 - KSh 472', description: 'Challenging to process, lower value', minPrice: 270, maxPrice: 472, image: '/images/mixed.jpg' },
    { type: 'Leather', priceRange: 'KSh 675 - KSh 1080', description: 'Valuable, durable, premium pricing', minPrice: 675, maxPrice: 1080, image: '/images/leather.jpg' },
    { type: 'Silk', priceRange: 'KSh 810 - KSh 1080', description: 'Luxury material, commands high prices', minPrice: 810, maxPrice: 1080, image: '/images/silk.jpg' },
];

export default function SellerHomePage() {
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
    const [weight, setWeight] = useState<number>(0);
    const [estimatedPrice, setEstimatedPrice] = useState<{ min: number; max: number }>({ min: 0, max: 0 });

    const calculatePrice = (weight: number) => {
        if (selectedMaterial && weight > 0) {
            const minPrice = weight * selectedMaterial.minPrice;
            const maxPrice = weight * selectedMaterial.maxPrice;
            setEstimatedPrice({ min: minPrice, max: maxPrice });
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
                    <img src={selectedMaterial.image} alt={selectedMaterial.type} className="w-full h-60 object-cover rounded-lg mt-4" />

                    {/* Price Calculator */}
                    <div className="mt-6">
                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            Enter Weight (in kg):
                        </label>
                        <input
                            type="number"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            value={weight}
                            onChange={(e) => {
                                setWeight(Number(e.target.value));
                                calculatePrice(Number(e.target.value));
                            }}
                            placeholder="Enter weight in kilograms"
                        />
                        {weight > 0 && (
                            <div className="mt-4">
                                <p className="text-lg text-gray-800">Estimated Price:</p>
                                <p className="text-xl font-bold text-gray-900">
                                    Min: KSh {estimatedPrice.min.toLocaleString()} - Max: KSh {estimatedPrice.max.toLocaleString()}
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
                        <img src={material.image} alt={material.type} className="w-full h-40 object-cover rounded-t-lg" />
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold text-gray-800">{material.type} (1kg)</h2>
                            <p className="text-lg text-gray-600">Price: {material.priceRange}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="mt-12 p-6  bg-forestgreen text-white text-center">
                <p>&copy; 2024 Eco-Threads Hub. All Rights Reserved.</p>
                <div className="mt-2">
                    <a href="#" className="hover:underline">Contact Us</a>
                    <a href="#" className="hover:underline ml-4">Terms & Conditions</a>
                </div>
            </footer>
        </div>
    );
}
