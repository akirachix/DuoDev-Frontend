import { NextResponse } from 'next/server';

const mockDatabase = new Set(['existinguser']); // Mocked database for demonstration

export async function GET(request: Request) {
const { searchParams } = new URL(request.url);
const username = searchParams.get('username');

if (!username) {
    return NextResponse.json({ available: false, error: 'Username is required' }, { status: 400 });
}

  // Check against your actual database or service
const isAvailable = !mockDatabase.has(username);

return NextResponse.json({ available: isAvailable });
}