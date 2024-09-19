import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-white">
      <section className="relative bg-green-100 min-h-screen flex flex-col justify-center items-center text-center">
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src="/shopclothing.jpg" // Replace with your image
            alt="Hero Background"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl lg:text-6xl font-bold  text-artisticblue">
            Join the Sustainable Revolution
          </h1>
          <p className="mt-4 text-xl text-artisticblue">
            EcoThreads Hub connects traders, recyclers, and conscious consumers for a greener tomorrow.
          </p>
          <div className="mt-8 flex   space-x-4">
            <Link href="/publicUser/marketplace" passHref>
              <button className="bg-green-600 text-white px-6 py-3 mb-4 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
                Explore Products
              </button>
            </Link>
            <Link href="/auth/role" passHref>
              <button className="bg-white text-green-600 px-6 py-3 border border-green-600 rounded-lg font-semibold hover:bg-green-100 transition duration-300">
                Join the Marketplace
              </button>
            </Link>
          </div>
        </div>
        {/* navigation bar */}
        <header className='absolute top-0 left-0 w-full' >
                
                <nav className="bg-artisticblue py-3 text-white flex justify-between w-full ">
                    <section className="lg:pl-3  ">
                        <Image
                            src={"/logo.png"}
                            alt="Eco-Threads logo"
                            width={200}
                            height={100}
                            />
                    </section>
                    <div>
    
                    </div>
                </nav>
                </header>
      </section>


    </div>
  );
}
