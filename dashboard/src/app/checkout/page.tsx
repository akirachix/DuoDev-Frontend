"use client"; // This should be at the very top

import { BsFillCartCheckFill } from "react-icons/bs";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { setCookie } from 'cookies-next';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { userPayment } from '../hooks/userpayment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'; // Use next/navigation for app directory
import { log } from "console";

const validationSchema = z.object({
    phone_number: z.string()
        .length(12, { message: "Phone number must be exactly 12 digits, starting with 254" })
        .regex(/^254[0-9]{9}$/, { message: "Phone number must start with 254 followed by 9 digits" }),
    location: z.string().min(1, { message: "Location is required" }),
    amount: z.number().min(1, { message: "Amount is required" }),
});

export default function CheckoutPage() {
    const router = useRouter(); // This should work correctly now
    const [totalPrice, setTotalPrice] = useState(0);

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<z.infer<typeof validationSchema>>({
        resolver: zodResolver(validationSchema),
        mode: "onChange",
    });

    useEffect(() => {
        const storedPrice = sessionStorage.getItem('totalPrice');
        if (storedPrice) {
            setTotalPrice(JSON.parse(storedPrice));
            setValue('amount', JSON.parse(storedPrice));
        }
    }, [setValue]);

    const onSubmit = async (data: z.infer<typeof validationSchema>) => {
        const { phone_number, location } = data;
        const formattedPhoneNumber = Number(phone_number);
        const formattedAmount = totalPrice;
    
        // Set cookies before making the payment request
        setCookie('phoneNumber', formattedPhoneNumber);
        setCookie('totalPrice', formattedAmount);
        setCookie('location', location);
        setCookie('userId', 1); // Replace with the actual user ID you have
        setCookie('productId', 1); // Replace with the actual product ID you have
    
        try {
            const response = await userPayment({ phone_number: formattedPhoneNumber, amount: formattedAmount, location });
            console.log(response);
            if (!response) {
                toast.error('Payment response is not valid.');
                return;
            }
    
            if (response.ResponseCode !== "0") {
                toast.error('Payment failed: ' + response.data.ResponseDescription);
                return;
            }
            const CheckoutRequestID = response.CheckoutRequestID;
            console.log(CheckoutRequestID);
            
            toast.success(`Payment processed successfully! A payment request has been sent to ${phone_number}. Please complete it on your phone.`);
    
            // Redirect to payment status page
            router.push(`/checkpaymentstatus?checkout_request_id=${CheckoutRequestID}`);
        } catch (error: unknown) {
            toast.error('We have encountered an issue processing your payment.');
        }
    };

    return (
        <div className="py-16 px-10">
            <ToastContainer />
            <div className='lg:grid grid-cols-2 gap-3 px-9'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex-col flex gap-5 mt-[10%]'>
                    <h1 className="text-4xl flex font-bold gap-5 text-artisticblue text-center">Checkout ..... <BsFillCartCheckFill /></h1>
                    <div>
                        <input
                            type="text"
                            placeholder="254 ........"
                            {...register('phone_number')}
                            className={`bg-coldsteel py-5 px-2 w-full rounded-[10px] focus:outline-none focus:border-2 ${errors.phone_number ? 'border-red-500' : ''}`}
                        />
                        {errors.phone_number && <p className="text-red-500">{errors.phone_number.message}</p>}
                    </div>

                    <input
                        type="text"
                        placeholder="Total price"
                        readOnly
                        className="bg-coldsteel py-5 px-2 rounded-[10px] text-gray-400 focus:outline-none focus:border-2"
                        value={`Ksh ${totalPrice}`}
                    />
                    <input
                        type="text"
                        placeholder="Location to be Delivered..."
                        {...register('location')}
                        className={`bg-coldsteel py-5 px-2 rounded-[10px] focus:outline-none focus:border-2 ${errors.location ? 'border-red-500' : ''}`}
                    />
                    {errors.location && <p className="text-red-500">{errors.location.message}</p>}

                    <button
                        type="submit"
                        className='bg-forestgreen text-white py-3 px-2 rounded-[10px]'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Processing...' : 'Complete Purchase'}
                    </button>
                </form>

                <div className="mt-5">
                    <Image
                        src="/picture2.jpeg"
                        alt="Checkout image"
                        width={600}
                        height={300}
                        className="rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
}
