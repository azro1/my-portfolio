import { cookies } from "next/headers";
import { client } from "@/app/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
    const { email, phone, isVerifying } = await request.json();

    if (email) {
        await client.set('email', email);
    }

    if (phone) {
        await client.set('phone', phone);
    }

    if (isVerifying) {
        const id = uuidv4();
        await cookies().set('_pro_flg', id, { path: '/', httpOnly: true, sameSite: 'Strict' });
        client.set(`pro-${id}`, 'true');
    }

    return new Response(null, { status: 200 });
}
