"use client"
import Link from 'next/link';

export default function ChooseRole() {
    return (
        <div className='p-[10%] text-white flex flex-col gap-10 justify-center lg:flex-row items-center'>
            {/* ECO-SHOPPER */}
        <div className='bg-forestgreen p-8 inline-block text-center w-[300px] rounded-[10px] h-[400px] '>
            <div className="ECOSHOPPER">
                <h1 className='text-[40px] pb-3'>Eco-Shopper</h1>
                <h2 className='text-[20px] mb-5'>Shop Sustainably</h2>
                <p className='mb-7 text-[16px]'> Find eco-friendly products that reduce your impact on the planet. Every purchase supports greener choices and sustainable businesses</p>
                <Link
                    href="/auth/signUp?role=public"
                    className="border-2 border-white py-2  px-4 text-[20px] rounded-[10px]"
                >
                    Start Shopping
                </Link>
            </div>
        </div>
        {/* PUBLIC USER */}
        <div className='bg-forestgreen p-8 inline-block text-center w-[300px] rounded-[10px]  h-[400px]  '>
            <div className="ECOSHOPPER">
                <h1 className='text-[40px] pb-3'>Eco-Seller</h1>
                <h2 className='text-[20px] mb-5'>Turn Your Idle Stock into Profit</h2>
                <p className='mb-7 text-[16px]'>  Sell your unused mitumba clothes to eco-conscious buyers. Clear your stock, reduce waste, and earn while contributing to a sustainable future.</p>
                <Link
                    href="/auth/signUp?role=seller"
                    className="border-2 border-white py-2 px-4 text-[20px] rounded-[10px]"
                >
                    Start Selling Now
                </Link>
            </div>
        </div>
        {/* RECYCLER */}
        <div className='bg-forestgreen p-8 inline-block text-center w-[300px] rounded-[10px]  h-[400px]  '>
            <div className="ECOSHOPPER">
                <h1 className='text-[40px] pb-3'>Eco-Recycler</h1>
                <h2 className='text-[20px] mb-5'>Recycle for a Greener Future</h2>
                <p className='mb-7 text-[16px]'>  Transform textile waste into valuable resources. Be part of the solution by reducing waste and supporting a circular economy.</p>
                <Link
                    href="/auth/signUp?role=recycler"
                    className="border-2 border-white py-2 px-4 text-[20px] rounded-[10px]"
                >
                    Start Recycling
                </Link>
            </div>
        </div>

        </div>
    );
}
    {/* <h1 className="text-3xl font-bold mb-4">Choose Your Role</h1>

            <div className="space-y-4">
                <Link
                    href="/auth/signUp?role=seller"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Sign Up as Seller
                </Link>

                <Link
                    href="/auth/signUp?role=recycler"
                    className="bg-green-500 text-white py-2 px-4 rounded"
                >
                    Sign Up as Recycler
                </Link>

                <Link
                    href="/auth/signUp?role=public"
                    className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                    Sign Up as Public User
                </Link>
            </div> */}