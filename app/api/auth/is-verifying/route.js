import { cookies } from "next/headers";
import { client } from "@/app/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
    const { isVerifying } = await request.json();

    if (isVerifying) {
        const id = uuidv4();
        await cookies().set('_pro_flg', id, { path: '/', httpOnly: true, sameSite: 'Strict' });
        client.set(`pro-${id}`, 'true');
    }
    
    return new Response(null, { status: 200 });
}
