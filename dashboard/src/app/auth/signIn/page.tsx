"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import { userLogin } from '../../utils/auth'; 
import { setCookie, getCookie } from 'cookies-next';

// Define the Sign in component
export default function SignIn() {
    // Initialize state variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle login form submission
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Call the userLogin utility function with the username and password
            const data = await userLogin({ username, password });
            
            if (data.error) {
                setError(data.error);
                setMessage('');
            } else {
                setMessage(data.message || 'Login successful');
                setError('');

                // Set the user data cookie
                const role = getCookie('role');
                console.log({role});

                // Redirect based on user role
                if (role === 'seller') {
                    window.location.href = '/seller';
                } else if (role === 'recycler') {
                    window.location.href = '/recycler';
                } else {
                    window.location.href = '/public';
                }
            }
        } catch (error) {
            setError('An error occurred during login');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    // Render the Sign in form
    return (
        <div className="border-2 border-artisticblue my-20 md:mx-[30%] mx-[5%] px-10 py-6 rounded-[10px]">
            <h1 className="lg:text-[40px] md:text-[30px] sm:text-[20px] text-center pb-5 text-artisticblue">Sign in to Eco-Threads Hub</h1>
            <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6 pb-5">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-coldsteel py-3 px-2 rounded-[10px] focus:outline-none focus:border-2"
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-coldsteel rounded-[10px] px-3 py-5 w-full focus:outline-none focus:border-2"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 cursor-pointer transform -translate-y-1/2"
                        >
                            <div className="text-artisticblue">{showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}</div>
                        </span>
                    </div>
                </div>
                <button type="submit" disabled={loading} className="bg-forestgreen text-white px-5 text-[24px] mb-3 w-full py-2 rounded-[10px]">
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {message && <p className="text-green-500 text-center">{message}</p>}
            </form>
            <Link href="/auth/google">
                <div className="flex justify-center items-center text-[16px] text-center gap-2">
                    <FcGoogle /> Login with Google
                </div>
            </Link>
            <div className="text-center mt-5 text-[16px]">
                Don't have an account? <br />
                <Link href="/auth/signUp"><span className="text-artisticblue underline">Sign Up</span></Link>
            </div>
        </div>
    );
}
