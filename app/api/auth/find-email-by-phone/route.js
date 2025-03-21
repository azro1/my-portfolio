import { createClient } from '@supabase/supabase-js';
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid";
import { cookies } from 'next/headers';
import { client } from '@/app/lib/db';
import crypto from 'crypto'; 


const encryptionKey = process.env.ENCRYPTION_KEY;



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
    } else if (!emailArr || emailArr.length === 0) {
        return NextResponse.json({ error: 'Unable to process request.' }, {
            status: 404
        })   
    } 

    const email = emailArr[0].email;







    // before allowing access to otp page make endpoint request to /enforce-otp-limit which tracks otp_attempts and enforces a cooldown if attempts are maxed out
    const checkOtpAttempts = async () => {
        const baseUrl = request.nextUrl.origin;

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
            const { message, minutesLeft, secondsLeft } = cooldownResponse;
      
            return {
              status: res.status,
              message,
              minutesLeft,
              secondsLeft
            }
      
        } catch (error) {
            console.error(error.message);
            return NextResponse.json({ message: "fetch failed" }, { status: 500 });
        }
    }






    // encrypt user email to store in a cookie
    const encryptEmail = (email, encryptionKey) => {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'base64'), iv);
        let encrypted = cipher.update(email, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${iv.toString('hex')}:${encrypted}`;
    };

    // Encrypt the email
    const encryptedEmail = encryptEmail(email, encryptionKey);








    // Check if data array has any rows
    const exists = emailArr.length > 0;

    if (exists) {
        // check otp attempts to enforce cooldown if attempts are maxed
        const cooldownResponse = await checkOtpAttempts();

        if (cooldownResponse.status === 401) {
          return NextResponse.json({ 
            message: cooldownResponse.message,
            minutesLeft: cooldownResponse.minutesLeft,
            secondsLeft: cooldownResponse.secondsLeft }, {
            status: 401
          })
        }

        const [emailObj] = emailArr;
        const email = emailObj.email;

        const { error: emailError } = await supabase.auth.signInWithOtp({
            email
        })

        if (emailError) {
            console.log('otp error:', emailError)
            return NextResponse.json({ error: emailError.message }, {
                status: 500
            })
        }

        if (!emailError) {
            // set encrypted email in cookie so that we can access it to get key from redis in verify-signup-otp
            await cookies().set('_otp_tkn', `${encryptedEmail}`, { path: '/', httpOnly: true, sameSite: 'Strict' });
            const accessToken = uuidv4();
            await client.set(`token-${encryptedEmail}`, accessToken, { EX: 5 });
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