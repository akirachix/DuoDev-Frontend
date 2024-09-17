import React from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
export default function SignUp() {
    return(
        <div className="border-2 border-artisticblue my-10 md:mx-[20%] mx-[5%] px-10 py-6 rounded-[10px]">
            <h1 className="lg:text-[40px] md:text-[30px] sm:text-[20px] text-center pb-5 text-artisticblue">Sign  in  to  Eco-Threads Hub</h1>
            <form action="">
                <div className=" flex flex-col gap-6 pb-5">
                    <input type="text" placeholder="Email" className=" bg-coldsteel py-3 px-2 rounded-[10px]" />
                    <input type="text" placeholder="Password" className=" bg-coldsteel py-3 px-2 rounded-[10px]" />
                </div>
                <button className="bg-forestgreen text-white px-5 text-[24px] mb-3  w-full py-2 rounded-[10px]">Sign In</button>
            </form>
            <Link href={"/auth/google"}><div className="flex justify-center items-center text-[16px]  text-center gap-2"><FcGoogle /> Login with Google</div></Link>
            <div className="text-center mt-5 text-[16px]">Don't have an account  <br /> <Link href={"/Auth/SignUp"}><span className="text-artisticblue underline">Sign Up</span></Link></div>
        </div>
    )
}