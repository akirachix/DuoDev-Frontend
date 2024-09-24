// In your route.ts
import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';

export async function POST(request: Request) {
    const orderData = await request.json();

    try {
        const orderResult = await createOrder(orderData);
        return NextResponse.json({ order: orderResult }, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
