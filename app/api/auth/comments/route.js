import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function POST(request) {
  const comment = await request.json()
  
  // get supabase instance
  const supabase = createRouteHandlerClient({ cookies })

  // get current user session
  const { data: { user } } = await supabase.auth.getUser()

  // insert the data
  const { data, error } = await supabase.from('comments')
   .insert({
     ...comment,
     user_name: user.user_metadata.first_name,
     user_email: user.email
   })
   .select()
   .single()

  // console.log(data, error)

  return NextResponse.json({ data, error })
}