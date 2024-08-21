import { createClient } from '@supabase/supabase-js';
import { NextResponse } from "next/server"


export async function POST(request) {
  const { email } = await request.json()

  // Initialize Supabase client with Service Role Key
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);


  // returns an array of objects, each object containing only the email field for rows that match the specified email
  const { data: emailArr, error } = await supabase
    .from('profiles')
    .select('email')
    .eq('email', email)
    

  if (error) {
    console.log('sb server error:', error)
    return NextResponse.json({
      status: 500
    })
  }


  // Check if data array has any rows
  const exists = emailArr.length > 0;


  return NextResponse.json({
    status: exists ? 409 : 201
  });
  
}