import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server"
import { cookies } from 'next/headers';

export async function POST(request) {
  const { user } = await request.json()

  if (user) {
    // check flag isFirstReg
    const supabase = createRouteHandlerClient({ cookies })
    const { data, error } = await supabase
    .from('profiles')
    .select('isFirstReg')
    .eq('id', user.id)
    .limit(1)
    .single()

    if (error) {
      console.log(error)
    } 

    if (data.isFirstReg === true) {
      cookies().set('canAccessRegPage', 'true', { path: '/' })
    }
  }
  
  return NextResponse.json({ success: true })
}

