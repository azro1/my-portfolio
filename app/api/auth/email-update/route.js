import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import crypto from 'crypto';
import { client } from "@/app/lib/db";





export async function POST(request) {
  const { email } = await request.json();

  const supabase = createRouteHandlerClient({ cookies })







    // before updating users email and granting access to otp page make endpoint request to /enforce-otp-limit which tracks otp_attempts and enforces a cooldown if attempts are maxed out but because the email we recieve for the update is the new email (the email that the user wants to change to) we need to do an extra step to get the existing users email from profiles table first
    const { data: { user } } = await supabase.auth.getUser()
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', user?.id)
      .single()

    if (profileError) {
      console.log(profileError)
    }

    if (!profileError) {
      const baseUrl = request.nextUrl.origin; 
      
      try {
        const res = await fetch(`${baseUrl}/api/auth/enforce-otp-limit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: profile.email
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
  







  // run update for new email and set access cookie
  const { data, error } = await supabase.auth.updateUser({
    email,
    updated_at: new Date().toISOString()
  })

  if (error) {
    console.log('server email update error:', error.message)
    return NextResponse.json({ error: error.message }, { 
        status: 409 
    })
  }

  if (data) {
    // set encrypted email in cookie so that we can access it to get key from redis in verify-signup-otp
    await cookies().set('_otp_tkn', `${encryptedEmail}`, { path: '/', httpOnly: true, sameSite: 'Strict' });
    const accessToken = uuidv4();
    await client.set(`token-${encryptedEmail}`, accessToken, { EX: 120 });
    return NextResponse.json({ data }, { 
        status: 200 
    })
  }

}