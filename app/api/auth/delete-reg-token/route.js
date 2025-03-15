import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { client } from "@/app/lib/db";


export async function POST(request) {
    const { isRegComplete } = await request.json();
   
    if (isRegComplete) {
        // check for redis reg access token and delete it
        const encryptedId = cookies().get('_reg_tkn')?.value;
        const regAccessToken = await client.get(`token-${encryptedId}`);

        if (regAccessToken) {
            await client.del(`token-${encryptedId}`);
        }
    }

    return NextResponse.json({ message: 'success' }, {
        status: 200
    });
}