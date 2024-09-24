import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const baseUrl = process.env.BASE_URL ; 
    console.log('BASE_URL:', process.env.BASE_URL);


    // Validate environment variable
    if (!baseUrl) {
        console.error('BASE_URL environment variable is not set.');
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again later rote.ts.' },
            { status: 500 }
        );
    }

    try {
        // Parse JSON request body
        const { phone_number, amount } = await request.json();

        // Validate required fields
        if (!amount || !phone_number) {
            console.error('Validation failed: Missing fields');
            return NextResponse.json(
                { error: 'All fields are required .' },
                { status: 400 }
            );
        }

        // Prepare request to the backend API
        const response = await fetch(`${baseUrl}/process_payment/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone_number, amount }),
        });
   
        
     

        // Handle errors from the backend API
        if (!response.ok) {
            const textResponse = await response.text();
            return NextResponse.json(
                { error: textResponse || 'Failed complete purchase' },
                { status: response.status }
            );
       
        }
console.log('are we here');

        // Parse the response and send it back to the client
        const result = JSON.stringify(await response.json());
 
        
        console.log('payment successfully:', result);
        return new Response(result, { status: 201 });
    } catch (error) {
        console.error('Error during payment route.ts:', (error as Error).message );
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
