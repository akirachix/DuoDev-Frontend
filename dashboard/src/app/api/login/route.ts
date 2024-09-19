import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles login requests from the frontend.
 * 1. Validates that the BASE_URL environment variable is set.
 * 2. Parses the JSON request body and validates that it contains the required
 *    fields: username and password.
 * 3. Makes a POST request to the backend API with the username and password.
 * 4. Logs the full response from the backend API for debugging.
 * 5. Handles errors from the backend API.
 * 6. Parses the response from the backend API and sends it back to the client.
 */
export async function POST(request: NextRequest) {
    const baseUrl = process.env.BASE_URL; 
    console.log('BASE_URL:', baseUrl);

    // Validate environment variable
    if (!baseUrl) {
        console.error('BASE_URL environment variable is not set.');
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again later.' },
            { status: 500 }
        );
    }

    try {
        // Parse JSON request body
        const { username, password } = await request.json();

        // Validate required fields
        if (!username || !password) {
            console.error('Validation failed: Missing fields');
            return NextResponse.json(
                { error: 'All fields are required.' },
                { status: 400 }
            );
        }

        // Prepare request to the backend API
        const response = await fetch(`${baseUrl}/api/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        // Log the full response for debugging
        const textResponse = await response.text();
        console.log('Backend response:', textResponse, 'Status:', response.status);

        // Handle errors from the backend API
        if (!response.ok) {
            try {
                const errorData = JSON.parse(textResponse);
                return NextResponse.json(
                    { error: errorData.error || 'Failed to authenticate user' },
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
        console.log('Login successful:', result);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json(
            { error: 'Error during login' },
            { status: 500 }
        );
    }
}

