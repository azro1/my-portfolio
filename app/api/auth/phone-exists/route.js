import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  
  const supabase = createRouteHandlerClient({ cookies }) 
  const { data: phoneArr, error } = await supabase
    .from('profiles')
    .select('phone')
    
    if (error) {
      return NextResponse.json({ error: error.message }, { 
        status: 500
      })
    }

    const phoneNumbers = phoneArr.filter((phone) => phone.phone !== null);

    return NextResponse.json({ phoneNumbers }, {
      status: 200
    })

}