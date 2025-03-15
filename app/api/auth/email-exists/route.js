import { createClient } from '@supabase/supabase-js';
import { NextResponse } from "next/server"
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from "uuid";
import { client } from '@/app/lib/db';
import crypto from 'crypto';  

const encryptionKey = process.env.ENCRYPTION_KEY;



export async function POST(request) {
  const { email, type } = await request.json()

  // initialize Supabase client with Service Role Key
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);





  // before a user is granted access to otp page make endpoint request to /enforce-otp-limit which tracks and increments otp_attempts and enforces a cooldown if attempts are maxed out
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

  
  
  
  
  
  // returns an array of objects, each object containing only the email field for rows that match the specified email
  const { data: emailArr, error } = await supabase
    .from('profiles')
    .select('email, is_verified, is_reg_complete')
    .eq('email', email)
    

  if (error) {
    console.log('sb server error:', error)
    return NextResponse.json({ error: 'Unable to process request. Please try again later. If the issue persist, contact support.' }, {
      status: 500
    })
  }
  
  // check if data array has any rows
  const exists = emailArr.length > 0;

  // check data array is not empty and then store its object
  const accountStatus = exists ? emailArr[0] : null;






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






  switch(type) {
    case 'login':
      if (exists && accountStatus.is_verified) {
        const cooldownResponse = await checkOtpAttempts();

          if (cooldownResponse.status === 401) {
            return NextResponse.json({ 
              message: cooldownResponse.message,
              minutesLeft: cooldownResponse.minutesLeft,
              secondsLeft: cooldownResponse.secondsLeft }, {
              status: 401
          })
        }
        // set encrypted email in cookie so that we can access it to get key from redis in verify-signup-otp
        await cookies().set('_otp_tkn', `${encryptedEmail}`, { path: '/', httpOnly: true, sameSite: 'Strict' });
        const accessToken = uuidv4();
        await client.set(`token-${encryptedEmail}`, accessToken, { EX: 5 });
        return NextResponse.json({ exists, accountStatus }, {
          status: 200
        })
      } else if (exists && !accountStatus.is_verified) {
        return NextResponse.json({ exists, accountStatus }, { // do not check otp attempts, set token in redis or set any cookie because a verified account does not exist
          status: 404
        })
      } else if (!exists) {
        return NextResponse.json({ exists }, {  // do not check otp attempts, set token in redis or set any cookie because a verified account does not exist
          status: 404
        })
      }
      break;
    case 'signup':
      if (!exists) {
        const cooldownResponse = await checkOtpAttempts();

        if (cooldownResponse.status === 401) {
          return NextResponse.json({ 
            message: cooldownResponse.message,
            minutesLeft: cooldownResponse.minutesLeft,
            secondsLeft: cooldownResponse.secondsLeft }, {
            status: 401
          })
        }
        // set encrypted email in cookie so that we can access it to get key from redis in verify-signup-otp
        await cookies().set('_otp_tkn', `${encryptedEmail}`, { path: '/', httpOnly: true, sameSite: 'Strict' });
        const accessToken = uuidv4();
        await client.set(`token-${encryptedEmail}`, accessToken, { EX: 5 });
        return NextResponse.json({ exists }, {
          status: 200
        })
      } else if (exists && !accountStatus.is_verified) {
        const cooldownResponse = await checkOtpAttempts();

          if (cooldownResponse.status === 401) {
            return NextResponse.json({ 
              message: cooldownResponse.message,
              minutesLeft: cooldownResponse.minutesLeft,
              secondsLeft: cooldownResponse.secondsLeft }, {
              status: 401
          })
        }
        // set encrypted email in cookie so that we can access it to get key from redis in verify-signup-otp
        await cookies().set('_otp_tkn', `${encryptedEmail}`, { path: '/', httpOnly: true, sameSite: 'Strict' });
        const accessToken = uuidv4();
        await client.set(`token-${encryptedEmail}`, accessToken, { EX: 5 });
        return NextResponse.json({ exists, accountStatus }, {
          status: 200
        })
      } else if (exists && accountStatus.is_verified || exists && !accountStatus.is_reg_complete) {
        return NextResponse.json({ exists, accountStatus }, {  // do not check otp attempts, set token in redis or set any cookie because a verified account already exists or its not the first time a user has tried to register
          status: 409
        })
      } 
      break;
    default:
      return NextResponse.json({ error: 'Invalid request type.' }, {
        status: 400
      });      
  }
}