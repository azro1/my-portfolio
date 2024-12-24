import { createClient } from '@supabase/supabase-js';
import { NextResponse } from "next/server"
import { cookies } from 'next/headers';

export async function POST(request) {
  const { email, type } = await request.json()

  // initialize Supabase client with Service Role Key
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);


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

  
  switch(type) {
    case 'login':
      if (exists && accountStatus.is_verified) {
        cookies().set('canAccessOtpPage', 'true', { path: '/' }); // set cookie to grant OTP access for users with verified accounts
        return NextResponse.json({ exists, accountStatus }, {
          status: 200
        })
      } else if (exists && !accountStatus.is_verified) {
        return NextResponse.json({ exists, accountStatus }, { // do not set any cookie because a verified account does not exist
          status: 401
        })
      } else if (!exists) {
        return NextResponse.json({ exists }, {  // do not set any cookie because a verified account does not exist
          status: 404
        })
      }
      break;
    case 'signup':
      if (!exists) {
        cookies().set('canAccessOtpPage', 'true', { path: '/' }); // set cookie to grant OTP access for new users
        return NextResponse.json({ exists }, {
          status: 200
        })
      } else if (exists && !accountStatus.is_verified) {
        cookies().set('canAccessOtpPage', 'true', { path: '/' }); // set cookie to grant OTP access if they haven't completed the verification process
        return NextResponse.json({ exists, accountStatus }, {
          status: 200
        })
      } else if (exists && accountStatus.is_verified || exists && !accountStatus.is_reg_complete) {
        return NextResponse.json({ exists, accountStatus }, {  // do not set any cookie because a verified account already exists or its not the first time a user has tried to register
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