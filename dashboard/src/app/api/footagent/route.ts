export async function GET() {
    const baseUrl = process.env.BASE_URL;

    if (!baseUrl) {
        return new Response('Base URL is not configured', { status: 500 });
    }

    try {
        const response = await fetch(`${baseUrl}/api/footagents/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return new Response('Failed to fetch Agents', { status: response.status });
        }

        const agents = await response.json();
        console.log({ all: agents });
        
        return new Response(JSON.stringify(agents), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response('Server error', { status: 500 });
    }
}
