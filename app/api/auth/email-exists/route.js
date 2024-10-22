import { createClient } from '@supabase/supabase-js';
import { NextResponse } from "next/server"
import { cookies } from 'next/headers';

export async function POST(request) {
  const { email, type } = await request.json()

  // Initialize Supabase client with Service Role Key
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);


  // returns an array of objects, each object containing only the email field for rows that match the specified email
  const { data: emailArr, error } = await supabase
    .from('profiles')
    .select('email')
    .eq('email', email)
    

  if (error) {
    console.log('sb server error:', error)
    return NextResponse.json({ error: 'Unable to process request.' }, {
      status: 500
    })
  }


  // Check if data array has any rows
  const exists = emailArr.length > 0;

  if (exists && type === 'login') {
    cookies().set('canAccessOtpPage', 'true', { path: '/' }); // Set cookie for OTP access
    return NextResponse.json({ exists }, {
      status: 200
    })
  } else if (!exists && type === 'login') {
      return NextResponse.json({ exists }, {
        status: 404
      })
  } else if (!exists && type === 'signup') {
      cookies().set('canAccessOtpPage', 'true', { path: '/' }); // Set cookie for OTP access
      return NextResponse.json({ exists }, {
        status: 200
      })
  } else {
      return NextResponse.json({ exists }, {
        status: 409
      })
  }
}