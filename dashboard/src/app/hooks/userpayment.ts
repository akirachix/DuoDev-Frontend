export interface PaymentData {
    phone_number: number;
    amount: number;
    location: string;
}

const url = "/api/payment";



export const userPayment = async (paymentData: PaymentData) => {
    console.log(paymentData);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData), // Send the PaymentData object
        });

        if (!response.ok) {
            const text = await response.text();
            console.error("Full response from server:", text);

            // Handle different status codes
            if (response.status >= 500) {
                throw new Error("We are experiencing technical difficulties. Please try again later.");
            } else if (response.status === 400) {
                throw new Error('Invalid credentials. Please try again.');
            } else {
                throw new Error("Something went wrong. Please try again.");
            }
        }

        // Parse and return the JSON response
        return await response.json();
    } catch (error) {
        console.error("Error during payment:", error);
        throw new Error((error as Error).message);
    }
};
