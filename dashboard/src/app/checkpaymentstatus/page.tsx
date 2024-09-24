"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PaymentStatus, checkPaymentStatus } from '../utils/paymentstatus';
import { ToastContainer, toast } from 'react-toastify';
import { PuffLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from 'cookies-next';

export default function CheckPaymentStatusPage() {
    const router = useRouter();
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [checkoutRequestID, setCheckoutRequestID] = useState<string | null>(null);
    const [waiting, setWaiting] = useState<boolean>(true);

    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const id = searchParams.get('checkout_request_id');
        console.log(id);

        if (id) {
            setCheckoutRequestID(id);
            const timer = setTimeout(() => {
                setWaiting(false);
                startCheckingPaymentStatus(id);
            }, 30000);
            // Cleanup function to clear timer
            return () => clearTimeout(timer);
        } else {
            toast.error('No checkout request ID provided.');
            setLoading(false);
        }
    }, []);

    const startCheckingPaymentStatus = async (id: string) => {
        try {
            const status = await checkPaymentStatus({ checkout_request_id: id });
            console.log('Payment status response:', status);
            setPaymentStatus(status);
        } catch (error) {
            console.error('Error checking payment status:', error);
            toast.error('Error checking payment status.');
            setError('Error checking payment status.');
        } finally {
            setLoading(false);
        }
    };

    const backToShop = () => {
        const role = getCookie('role');
        if (role === 'seller') {
            router.push('/seller/marketplace');
        } else if (role === 'recycler') {
            router.push('/recycler');
        } else {
            router.push('/publicUser/marketplace');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <ToastContainer />
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
                A prompt has been sent to your phone. Please enter your PIN.
            </h1>

            {waiting ? (
                <div className="flex flex-col items-center">
                    <PuffLoader color="#002A3D" loading={true} size={60} />
                    <p className="mt-4 text-lg text-gray-700">
                        We are processing your payment. Please enter the PIN sent to your phone.
                    </p>
                </div>
            ) : loading ? (
                <div className="flex flex-col items-center">
                    <PuffLoader color="#002A3D" loading={true} size={60} />
                    <p className="mt-4 text-lg text-gray-700">Loading payment status...</p>
                </div>
            ) : error ? (
                <p className="text-red-500 text-lg">{error}</p>
            ) : paymentStatus ? (
                <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                    <p className="text-lg text-gray-600">
                        Payment Status: {paymentStatus.data.ResultDesc}
                    </p>
                    
                    <button
                        className="mt-6 bg-forestgreen hover:bg-darkgreen text-white font-bold py-3 px-10 rounded transition-all duration-300"
                        onClick={backToShop}
                    >
                        Back to Shopping
                    </button>
                </div>
            ) : (
                <p>No payment status available.</p>
            )}
        </div>
    );
}
