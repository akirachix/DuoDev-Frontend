export interface PaymentStatus {
    status: string;
    message: string;
    data: {
        ResponseCode: string;
        ResponseDescription: string;
        MerchantRequestID: string;
        CheckoutRequestID: string;
        ResultCode: string;
        ResultDesc: string;
    };
}

export interface CheckPaymentStatusRequest {
    checkout_request_id: string;
}

/**
 * Function to check payment status.
 * @param request - The request object containing checkout_request_id.
 * @returns A promise that resolves to the PaymentStatus object.
 */
export const checkPaymentStatus = async (request: CheckPaymentStatusRequest): Promise<PaymentStatus> => {
    const response = await fetch(`/api/paymentstatus?checkout_request_id=${request.checkout_request_id}`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data: PaymentStatus = await response.json();
    return data;
};
