import { NextRequest, NextResponse } from 'next/server';

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
        // Parse FormData for multipart requests
        const body = await request.formData();

        // Extract fields from FormData
        const waste_type = body.get('waste_type') as string;
        const weight = body.get('weight') as string;
        const location = body.get('location') as string;
        const phone_number = body.get('phone_number') as string;
        const price = body.get('price') as string;
        const image = body.get('image') as File | null;

        // Validate required fields
        if (!waste_type || !weight || !location || !phone_number || !price || !image) {
            console.error('Validation failed: Missing fields');
            return NextResponse.json(
                { error: 'All fields are required.' },
                { status: 400 }
            );
        }

        // Convert weight and price to numbers
        const numericWeight = parseFloat(weight);
        const numericPrice = parseFloat(price);

        // Prepare FormData to send to the backend API
        const formData = new FormData();
        formData.append('waste_type', waste_type);
        formData.append('weight', numericWeight.toString());
        formData.append('location', location);
        formData.append('phone_number', phone_number);
        formData.append('price', numericPrice.toString());
        formData.append('image', image); // Append the image file directly

        // Prepare request to the backend API to save the bale
        const response = await fetch(`${baseUrl}/api/textilebales/`, {
            method: 'POST',
            body: formData,
            // Do not set Content-Type; let the browser set it automatically for multipart/form-data
        });

        // Log the full response for debugging
        const textResponse = await response.text();
        console.log('Backend response:', textResponse, 'Status:', response.status);

        // Handle errors from the backend API
        if (!response.ok) {
            try {
                const errorData = JSON.parse(textResponse);
                return NextResponse.json(
                    { error: errorData.errors || 'Failed to post textile bale' },
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
        console.log('Textile bale posted successfully:', result);
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Error during POST /api/textile-bales:', error);
        return NextResponse.json(
            { error: 'Error during posting textile bale' },
            { status: 500 }
        );
    }
}

export async function GET() {
    const baseUrl = process.env.BASE_URL;

    if (!baseUrl) {
        return new Response('Base URL is not configured', { status: 500 });
    }

    try {
        const response = await fetch(`${baseUrl}/api/textilebales/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        });        

        if (!response.ok) {
            return new Response('Failed to fetch textilebales', { status: response.status });
        }

        const bale = await response.json();
        console.log({ all: bale });
        
        return new Response(JSON.stringify(bale), {
            status: 200
        });
    } catch (error) {
        return new Response('Server error', { status: 500 });
    }
}
