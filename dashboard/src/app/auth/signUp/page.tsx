"use client"

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import Link from 'next/link';
import { userSignup } from '@/app/utils/usersignup';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCookie } from 'cookies-next';


const validationSchema = z.object({
first_name: z.string().min(1, { message: "First name is required" }).max(50),
last_name: z.string().min(1, { message: "Last name is required" }).max(50),
username: z.string().min(1, { message: "Username is required" }).max(30).regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
phone_number: z.string().length(12, { message: "Phone number must be exactly 12 digits, starting with 254" }).regex(/^254[0-9]{9}$/, { message: "Phone number must start with 254 followed by 9 digits" }),
set_password: z.string().min(8, { message: "Password must be at least 8 characters long" }).regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }).regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }).regex(/[0-9]/, { message: "Password must contain at least one number" }),
password: z.string(),
}).refine(data => data.set_password === data.password, {
message: "Passwords must match",
path: ["password"],
});

async function checkUsernameAvailability(username: string) {
try {
    const response = await fetch(`/api/check-username?username=${username}`);
    const data = await response.json();
    return data.available;
} catch (error) {
    console.error('Error checking username availability:', error);
    return false;
}
}

export default function SignUp() {
const router = useRouter();
const searchParams = useSearchParams();
const role = searchParams.get('role');

const [showPassword, setShowPassword] = useState(false);
const [username, setUsername] = useState('');
const [usernameAvailable, setUsernameAvailable] = useState(true);

useEffect(() => {
    if (username) {
    const checkAvailability = async () => {
        const available = await checkUsernameAvailability(username);
        if (!available) {
        toast.error('Username is already taken');
        }
        setUsernameAvailable(available);
    };
    checkAvailability();
    }
}, [username]);

const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
});

const onSubmit = async (data: z.infer<typeof validationSchema>) => {
    if (role && usernameAvailable) {
        const userData = { ...data, role };
        try {
            const response = await userSignup(userData);

            if (response.data?.username) {
                // Set the user data cookie
                setCookie('role', role);

                router.push('/auth/signIn');
            } else {
                toast.error('Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            toast.error((error as Error).message);
        }
    }
    else{
        alert("You have no Choosen role ");
    }
};
return (
    <div className="lg:grid grid-cols-2 gap-3 px-5">
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className="lg:px-[5%] md:px-[10%] px-2 ">
        <h1 className="lg:text-[40px] text-[24px] text-center mb-2 text-artisticblue">Sign Up to Eco-Threads Hub</h1>
        <div className="md:grid grid-cols-2 gap-2 mb-5">
            <div className='md:mb-0 mb-7'>
            <input
                type="text"
                {...register("first_name")}
                placeholder="First Name"
                className="bg-coldsteel rounded-[10px] px-3 py-3 w-full focus:outline-none focus:border-2"
            />
            {errors?.first_name?.message && <p className="text-red-500 ml-2 text-sm">{errors?.first_name?.message}</p>}
            </div>
            <div>
            <input
                type="text"
                {...register("last_name")}
                placeholder="Last Name"
                className="bg-coldsteel rounded-[10px] px-3 py-3 w-full focus:outline-none focus:border-2"
            />
            {errors?.last_name?.message && <p className="text-red-500 ml-2 text-sm">{errors?.last_name?.message}</p>}
            </div>
        </div>
        <div className="flex flex-col gap-7">
            <div>
            <input
                type="text"
                {...register("username")}
                placeholder="Username"
                className="bg-coldsteel rounded-[10px] px-3 py-3 w-full focus:outline-none focus:border-2"
                onChange={(e) => setUsername(e.target.value)}
            />
            {errors?.username?.message && <p className="text-red-500 ml-2 text-sm">{errors?.username?.message}</p>}
            </div>
            <div>
            <input
                type="text"
                {...register("phone_number")}
                placeholder="Phone Number 254 .."
                className="bg-coldsteel rounded-[10px] px-3 py-3 w-full focus:outline-none focus:border-2"
            />
            {errors?.phone_number?.message && <p className="text-red-500 ml-2 text-sm">{errors?.phone_number?.message}</p>}
            </div>
            <div className="relative">
            <input
                type={showPassword ? "text" : "password"} // Toggle type
                {...register("set_password")}
                placeholder="Set Password"
                className="bg-coldsteel rounded-[10px] px-3 py-3 w-full focus:outline-none focus:border-2"
            />
            <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 cursor-pointer transform -translate-y-1/2"
            >
                <div className="text-artisticblue">{showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}</div>
            </span>
            {errors?.set_password?.message && <p className="text-red-500 ml-2 text-sm">{errors?.set_password?.message}</p>}
            </div>
            <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Confirm Password"
                className="bg-coldsteel rounded-[10px] px-3 py-3 w-full focus:outline-none focus:border-2"
            />
            {errors?.password?.message && <p className="text-red-500 ml-2 text-sm">{errors?.password?.message}</p>}
            <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 cursor-pointer transform -translate-y-1/2"
            >
                <div className="text-artisticblue">{showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}</div>
            </span>
            </div>
        </div>
        <button
            type="submit"
            className="bg-forestgreen text-white rounded-[10px] px-3 mt-4 py-3 w-full ${isSubmitting ? 'opacity-50' : ''}"
        >
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
        </button>
        <h1 className="text-center text-[16px] mt-4">
            Already Have an Account<br />
            <Link href={"/auth/signIn"}>
            <span className="text-artisticblue underline">Sign In</span>
            </Link>
        </h1>
        </form>
    </div>
    <div>
        <div className="mt-5">
        <Image
            src="/picture2.jpeg"
            alt="signup image"
            width={600}
            height={600}
        />
        </div>
    </div>
    <ToastContainer />
    </div>
);
}