"use client"
import Link from 'next/link';

export default function ChooseRole() {
    return (
        <div>    
            <h1 className='text-[40px] mt-5 text-artisticblue text-center'>Sign Up  in  Eco-Threads Hub  as . . .</h1>
        <div className='px-[10%] mt-16 text-white flex flex-col gap-10 justify-center lg:flex-row items-center'>
            {/* ECO-SHOPPER */}
        <div className='bg-forestgreen p-8 inline-block text-center lg:w-[450px] rounded-[10px]  '>
            <div className="ECOSHOPPER">
                <h1 className='text-[40px] pb-3'>Eco-Shopper</h1>
                <h2 className='text-[20px] mb-5'>Shop Sustainably</h2>
                <p className='mb-7 text-[16px]'> Find eco-friendly products that reduce your impact on the planet. Every purchase supports greener choices and sustainable businesses</p>
                <Link
                    href="/auth/signUp?role=public"
                    className="border-2 border-white py-2  px-4 text-[20px] rounded-[10px] hover:border-artisticblue"
                >
                    Start Shopping
                </Link>
            </div>
        </div>
        {/* PUBLIC USER */}
        <div className='bg-forestgreen p-8 inline-block text-center lg:w-[450px] rounded-[10px]    '>
            <div className="ECOSHOPPER">
                <h1 className='text-[40px] pb-3'>Eco-Seller</h1>
                <h2 className='text-[20px] mb-5'>Turn Your Idle Stock into Profit</h2>
                <p className='mb-7 text-[16px]'>  Sell your unused mitumba clothes to eco-conscious buyers. Clear your stock, reduce waste, and earn while contributing to a sustainable future.</p>
                <Link
                    href="/auth/signUp?role=seller"
                    className="border-2 border-white py-2 px-4 text-[20px] rounded-[10px] hover:border-artisticblue"
                >
                    Start Selling
                </Link>
            </div>
        </div>
        {/* RECYCLER */}
        <div className='bg-forestgreen p-8 inline-block text-center lg:w-[450px] rounded-[10px]    '>
            <div className="ECOSHOPPER">
                <h1 className='text-[40px] pb-3'>Eco-Recycler</h1>
                <h2 className='text-[20px] mb-5'>Recycle for a Greener Future</h2>
                <p className='mb-7 text-[16px]'>  Transform textile waste into valuable resources. Be part of the solution by reducing waste and supporting a circular economy.</p>
                <Link
                    href="/auth/signUp?role=recycler"
                    className="border-2 border-white py-2 px-4 text-[20px] rounded-[10px] hover:border-artisticblue"
                >
                    Start Recycling
                </Link>
            </div>
        </div>

        </div>
        </div>
    );
}

