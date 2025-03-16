import { createClient } from '@supabase/supabase-js';
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { client } from "@/app/lib/db";
import crypto from 'crypto';




const encryptionKey = process.env.ENCRYPTION_KEY;




export async function POST(request) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { user } = await request.json();


    if (!user || !user.id) {
        return NextResponse.json({ message: 'User not found or invalid ID' }, { status: 400 });
    }



    // encrypt user id to create a unique redis token key
    const encryptId = (id, encryptionKey) => {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'base64'), iv);
        let encrypted = cipher.update(id.toString(), 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${iv.toString('hex')}:${encrypted}`;
    };

    // encrypt the id
    const encryptedId = encryptId(user?.id, encryptionKey);






    // check for redis otp access token and delete it
    const encryptedEmail = cookies().get('_otp_tkn')?.value;
    const otpAccessToken = await client.get(`token-${encryptedEmail}`);

    if (otpAccessToken) {
        await client.del(`token-${encryptedEmail}`);
    }




    const { data, error } = await supabase
        .from('profiles')
        .select('is_verified')
        .eq('id', user?.id)
        .single()

    if (error) {
        console.error(error);
    }

    //   console.log('data',data)


    // check if user is verified
    if (data?.is_verified) {
        const accessToken = uuidv4();
        await client.set(`token-${encryptedId}`, accessToken, { EX: 120 });
    }



    const registrationToken = await client.get(`token-${encryptedId}`);
    // console.log('Newly set registration token:', registrationToken);


    // set reg cookie
    cookies().set('_reg_tkn', encryptedId, { path: '/', httpOnly: true, sameSite: 'Strict' });

    return NextResponse.json({ message: 'success', token: registrationToken }, {
        status: 200
    });
}