import { cookies } from "next/headers";
import { client } from "@/app/lib/db";

export async function POST(request) {
    const { isRegistered } = await request.json();

    if (isRegistered) {
        // set cookie to indicate user has completed registration, delete avatar upload cookie and token
        await cookies().set('_is_registered', 'true', { path: '/', httpOnly: true, sameSite: 'Strict' });
        const auf = await cookies().get('_au_flg')?.value;
        await client.del(`auf-${auf}`);
        await cookies().delete('_au_flg');
    }

    if (!isRegistered) {
        // delete cookie affter checking registration status
        await cookies().delete('_is_registered');
    }
    
    return new Response(null, { status: 200 });
}
