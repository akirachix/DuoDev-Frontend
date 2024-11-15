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
            cache:'no-cache'
        });      

        if (!response.ok) {
            return new Response('Failed to fetch textilebales', { status: response.status });
        }

        const bale = await response.json();        
        return new Response(JSON.stringify(bale), {
            status: 200
        });
    } catch (error) {
        return new Response('Server error', { status: 500 });
    }
}
