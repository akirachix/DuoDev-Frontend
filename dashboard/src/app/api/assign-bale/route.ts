import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const baseUrl = process.env.BASE_URL;

    if (!baseUrl) {
        console.error('BASE_URL is not configured.');
        return NextResponse.json(
            { error: 'Server configuration error. Please contact support.' },
            { status: 500 }
        );
    }

    try {
        const { agent_name, bale_id } = await request.json();

        
        if (!agent_name || !bale_id) {
            console.error('Missing agentName or bale_id in request.');
            return NextResponse.json(
                { error: 'Both agentName and bale_id are required.' },
                { status: 400 }
            );
        }

        const response = await fetch(`${baseUrl}/api/agent-assignments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ agent_name, bale_id }),
        });
        

        
        const backendResponseText = await response.text();
        console.log('Backend response:', backendResponseText, 'Status:', response.status);


        if (!response.ok) {
            try {
                const backendError = JSON.parse(backendResponseText);
                return NextResponse.json(
                    { error: backendError.error || 'Failed to assign bale to agent.' },
                    { status: response.status }
                );
            } catch (parseError) {
                return NextResponse.json(
                    { error: 'Unexpected response format from backend.' },
                    { status: response.status }
                );
            }
        }

        const parsedResult = JSON.parse(backendResponseText);
        console.log('Bale assigned successfully:', parsedResult);
        return NextResponse.json(parsedResult, { status: 200 });

    } catch (error) {
        console.error('Error during agent assignment:', error);
        return NextResponse.json(
            { error: 'Internal server error during agent assignment.' },
            { status: 500 }
        );
    }
}
