// src/hooks/useCheckPaymentStatus.ts
import { useState } from 'react';
import { PaymentStatus, CheckPaymentStatusRequest } from '../utils/paymentstatus'; // Adjust the import path as needed

const useCheckPaymentStatus = () => {
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const checkPaymentStatus = async (requestData: CheckPaymentStatusRequest) => {
        setLoading(true);
        setError(null); // Reset error state

        try {
            const response = await fetch(`/check_payment_status/?checkout_request_id=${requestData.checkout_request_id}`, {
                method: 'GET', // or 'POST' if needed
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const text = await response.text();
                console.error("Error response from server:", text);

                if (response.status >= 500) {
                    throw new Error("Server error. Please try again later.");
                } else if (response.status === 400) {
                    throw new Error("Invalid request. Please check the Checkout Request ID.");
                } else {
                    throw new Error("Something went wrong. Please try again.");
                }
            }

            const data: PaymentStatus = await response.json();
            setPaymentStatus(data);
        } catch (err) {
            console.error("Error checking payment status:", err);
            setError((err as Error).message); // Set error message
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return { paymentStatus, loading, error, checkPaymentStatus };
};

export default useCheckPaymentStatus;
