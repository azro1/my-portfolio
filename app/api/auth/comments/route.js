import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function POST(request) {
  const comment = await request.json()
  
  // get supabase instance
  const supabase = createRouteHandlerClient({ cookies })

  // get current user session
  const { data: { user } } = await supabase.auth.getUser()
  // console.log(user)

  // insert the data
  const { data, error } = await supabase.from('comments')
   .insert({
     ...comment,
     full_name: user.user_metadata.full_name,
     avatar_url: user.user_metadata.avatar_url,
   })
   .select()
   .single()

  // console.log(data, error)

  return NextResponse.json({ data, error })
}