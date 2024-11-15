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
        const { username, first_name, last_name, password, role, phone_number } = await request.json();

        // Validate required fields
        if (!username || !first_name || !last_name || !password || !role || !phone_number) {
            console.error('Validation failed: Missing fields');
            return NextResponse.json(
                { error: 'All fields are required .' },
                { status: 400 }
            );
        }

        // Prepare request to the backend API
        const response = await fetch(`${baseUrl}/api/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, first_name, last_name, phone_number, password, role }),
        });

        // Log the full response for debugging
        const textResponse = await response.text();
        console.log('Backend response:', textResponse, 'Status:', response.status);

        // Handle errors from the backend API
        if (!response.ok) {
            try {
                const errorData = JSON.parse(textResponse);
                return NextResponse.json(
                    { error: errorData.errors || 'Failed to create user' },
                    { status: response.status }
                );
            } catch (e) {
                // If response is not valid JSON
                return NextResponse.json(
                    { error: 'Unexpected response format from backend' },
                    { status: response.status }
                );
            }
        }

        // Parse the response and send it back to the client
        const result = JSON.parse(textResponse);
        console.log('User created successfully:', result);
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Error during signup route.ts:', error);
        return NextResponse.json(
            { error: 'Error during SignUp route.ts' },
            { status: 500 }
        );
    }
}
