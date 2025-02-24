import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  const { phone } = await request.json();
  
  const supabase = createRouteHandlerClient({ cookies })

  const { data, error } = await supabase.auth.updateUser({
    phone,
    updated_at: new Date().toISOString()
  })

  if (error) {
    console.log('server phone update error:', error.message)
    return NextResponse.json({ error: error.message}, { 
        status: 500 
    })
  }

  if (data) {
    // Set cookie for OTP page access
    cookies().set('canAccessProfileOtpPage', 'true', { 
      path: '/', 
      httpOnly: true, 
      sameSite: 'Strict'  
    }); 
    return NextResponse.json({ data }, { 
        status: 200 
    })
  }

}