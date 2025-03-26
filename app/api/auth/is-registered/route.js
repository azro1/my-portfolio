import { cookies } from "next/headers";

export async function POST(request) {
    const { isRegistered } = await request.json();

    if (isRegistered) {
        // set cookie to indicate user has completed registration
        await cookies().set('_is_registered', 'true', { path: '/', httpOnly: true, sameSite: 'Strict' });
    }

    if (!isRegistered) {
        // delete cookie affter checking registration status
        await cookies().delete('_is_registered');
    }
    
    return new Response(null, { status: 200 });
}
