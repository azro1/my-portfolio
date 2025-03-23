import { cookies } from "next/headers";
import { client } from "@/app/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
    const { isRegistered } = await request.json();

    if (isRegistered) {
        const id = uuidv4();
        await cookies().set('_reg_flg', id, { path: '/', httpOnly: true, sameSite: 'Strict' });
        client.set(`reg-${id}`, 'true');
    }
    
    return new Response(null, { status: 200 });
}
