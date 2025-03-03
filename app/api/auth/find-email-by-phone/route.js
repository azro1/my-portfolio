import { createClient } from '@supabase/supabase-js';
import { NextResponse } from "next/server"
import { cookies } from 'next/headers';

export async function POST(request) {
    const { phone } = await request.json()

    // Initialize Supabase client with Service Role Key
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);



    // returns an array of objects, each object containing only the email field for rows that match the specified email
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



    // before allowing access to otp page make endpoint request to /enforce-otp-limit which tracks otp_attempts and enforces a cooldown if attempts are maxed out
    const baseUrl = request.nextUrl.origin;
    const email = emailArr[0].email;

    try {
        const res = await fetch(`${baseUrl}/api/auth/enforce-otp-limit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email
            }),
        });

        const cooldownResponse = await res.json();

        if (res.status === 401) {
            return NextResponse.json({
                message: cooldownResponse.message,
                minutesLeft: cooldownResponse.minutesLeft,
                secondsLeft: cooldownResponse.secondsLeft
            }, {
                status: 401
            })
        }

    } catch (error) {
        console.error(error.message);
        return NextResponse.json({ message: "fetch failed" }, { status: 500 });
    }






    // Check if data array has any rows
    const exists = emailArr.length > 0;

    if (exists) {
        const [emailObj] = emailArr;
        const email = emailObj.email;

        const { error: otpError } = await supabase.auth.signInWithOtp({
            email
        })

        if (otpError) {
            console.log('otp error:', otpError)
            return NextResponse.json({ error: otpError.message }, {
                status: 500
            })
        }

        if (!otpError) {
            cookies().set('canAccessAuthOtpPage', 'true', { path: '/' }); // Set cookie for OTP access
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