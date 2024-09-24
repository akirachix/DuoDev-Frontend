import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const baseUrl = process.env.BASE_URL;
    

    try {
        const { searchParams } = new URL(request.url);
        const checkout_request_id = searchParams.get('checkout_request_id');

        if (!checkout_request_id || typeof checkout_request_id !== 'string') {
            return NextResponse.json({ error: 'Invalid checkout_request_id' }, { status: 400 });
        }
        console.log('checkout_request_id:', checkout_request_id);

        const response = await fetch(`${baseUrl}/check_payment_status/?checkout_request_id=${checkout_request_id}`, {
            method: 'GET', // Ensure the correct HTTP method
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const textResponse = await response.text();
        console.log('Backend response:', textResponse, 'Status:', response.status);

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to validate payment. Backend Error' },
                { status: response.status }
            );
        }

        const result = JSON.parse(textResponse);
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error('Error during validation:', error);
        return NextResponse.json({ error: 'Error during validation' }, { status: 500 });
    }
}
