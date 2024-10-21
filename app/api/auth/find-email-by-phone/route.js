import { createClient } from '@supabase/supabase-js';
import { NextResponse } from "next/server"
import { cookies } from 'next/headers'; 

export async function POST(request) {
    const { phone } = await request.json()

    // Initialize Supabase client with Service Role Key
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

    const { data: emailArr, error } = await supabase
        .from('profiles')
        .select('email')
        .eq('phone', phone)

    if (error) {
        console.log('sb server error:', error)
        return NextResponse.json({ error: 'Unable to process request.' }, {
            status: 500
        })
    }

    // // Check if data array has any rows
    const exists = emailArr.length > 0;

    if (exists) {
        const [emailObj] = emailArr;
        const email = emailObj.email;

        const { error: otpError } = await supabase.auth.signInWithOtp({
            email
        })

        if (otpError) {
            return NextResponse.json({ error: otpError.message }, {
                status: 500
            })
        } 
        
        if (!otpError) {
            cookies().set('canAccessOtpPage', 'true', { path: '/' }); // Set cookie for OTP access
            return NextResponse.json({ exists, email }, {
                status: 200
            });
        }
    } else {
        return NextResponse.json({ exists }, { 
            status: 404
        })
    }


}