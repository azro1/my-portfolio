import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function POST(request) {
  const comment = await request.json()
  console.log(comment)
  
  // get supabase instance
  const supabase = createRouteHandlerClient({ cookies })

  // get current user session
  const { data: { user } } = await supabase.auth.getUser()

  // insert the data
  const {data, error} = await supabase.from('comments')
   .insert({
     ...comment,
     user_email: user.email
   })
   .select()
   .single()

//    console.log(data, error)

  return NextResponse.json({ data, error })
}