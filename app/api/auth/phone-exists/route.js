import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function POST(request) {
  const { phone } = await request.json()

  // get supabase instance
  const supabase = createRouteHandlerClient({ cookies }) 
  const { data: phoneArr, error } = await supabase
    .from('profiles')
    .select('phone')
    .eq('phone', phone)
    
    if (error) {
      return NextResponse.json({ error: error.message }, { 
        status: 500
      })
    }

    // Check if data array has any rows
    const exists = phoneArr.length > 0;

    if (exists) {
      return NextResponse.json({ exists }, { 
        status: 409 
      })
    } else {
      return NextResponse.json({ exists }, {
        status: 200
      })
    }
}