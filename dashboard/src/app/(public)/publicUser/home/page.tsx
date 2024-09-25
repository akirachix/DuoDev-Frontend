"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="bg-artisticblue">
            <section className="relative bg-black-100 min-h-screen flex flex-col justify-center items-center text-center">
                <div className="absolute top-0 left-0 w-full h-full">
                    <Image
                        src="/shopclothing.jpg"
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-50"
                    />
                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl lg:text-6xl font-bold  text-white">
                        Join the Sustainable Revolution
                    </h1>
                    <p className="mt-4 text-xl text-white">
                        EcoThreads Hub connects traders, recyclers, and conscious consumers for a greener tomorrow.
                    </p>
                    <div className="mt-8 flex   space-x-4">
                        <Link href="/publicUser/marketplace" passHref>
                            <button className="bg-green-600 text-white px-6 py-3 mb-4 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
                                Explore Products
                            </button>
                        </Link>
                        <Link href="/auth/signIn" passHref>
                            <button className="bg-white text-green-600 px-6 py-3 border border-green-600 rounded-lg font-semibold hover:bg-green-100 transition duration-300">
                                Join the Ecothreads
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="bg-white py-20 text-center">
                <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
                <p className="max-w-3xl mx-auto text-gray-700 text-lg">
                    At EcoThreads, we believe in the power of sustainable fashion. Every
                    product you purchase contributes to a cleaner planet by promoting the
                    use of recycled materials and reducing textile waste.
                </p>
            </section>

            {/* Environmental Impact Section */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10">
                        Our Environmental Impact
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="p-8 bg-white shadow-md rounded-lg">
                            <h3 className="text-2xl font-bold text-green-600">10,000+</h3>
                            <p className="mt-2 text-gray-700">Products recycled</p>
                        </div>
                        <div className="p-8 bg-white shadow-md rounded-lg">
                            <h3 className="text-2xl font-bold text-green-600">50+</h3>
                            <p className="mt-2 text-gray-700">Local communities supported</p>
                        </div>
                        <div className="p-8 bg-white shadow-md rounded-lg">
                            <h3 className="text-2xl font-bold text-green-600">200+</h3>
                            <p className="mt-2 text-gray-700">Tons of textile waste reduced</p>
                        </div>
                        <div className="p-8 bg-white shadow-md rounded-lg">
                            <h3 className="text-2xl font-bold text-green-600">100%</h3>
                            <p className="mt-2 text-gray-700">Eco-friendly products</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customer Stories Section */}
            <section className="bg-green-100 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <p className="text-lg text-gray-700 italic">
                                &quot;EcoThreads has changed the way I think about fashion. I love
                                knowing that every item I buy is making a positive impact on the
                                planet.&quot;
                            </p>
                            <p className="text-lg text-gray-700 italic">
                                &quot;Sustainable fashion that doesn’t sacrifice style. I’m proud to
                                support local communities while looking good!&quot;
                            </p>
                            <p className="text-lg text-gray-700 italic">
                                &quot;It feels amazing to wear clothes that I know help reduce waste.
                                EcoThreads is my go-to for eco-friendly fashion.&quot;
                            </p>
                            <h4 className="mt-4 text-xl font-semibold">- Emily R.</h4>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-forestgreen py-16 text-white text-center">
                <h2 className="text-3xl font-bold mb-6">
                    Ready to Make a Difference?
                </h2>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                    Join EcoThreads and start making sustainable choices today. Every
                    product you purchase helps build a greener tomorrow.
                </p>
                <a
                    href="/publicUser/marketplace"
                    className="bg-white text-green-600 font-semibold py-3 px-6 rounded-full hover:bg-green-100"
                >
                    Shop Now
                </a>
            </section>

            {/* Footer Section */}
            <footer className="bg-gray-800 text-white py-6 text-center">
                <p>EcoThreads © 2024 - Together, we create a sustainable future</p>
            </footer>
        </div>
    );
};
