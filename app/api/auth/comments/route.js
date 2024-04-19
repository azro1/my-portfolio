import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function POST(request) {
  const { profile, comment } = await request.json()
  
    // get supabase instance
    const supabase = createRouteHandlerClient({ cookies })

    // insert comment
    const { data, error } = await supabase.from('comments')
      .insert({
        comment: comment,
        avatar_url: profile.avatar_url,
        email: profile.email,
        first_name: profile.first_name,
        full_name: profile.full_name,
      })
      .select()
      .single()

      if (error) {
          console.log(error)
      } 

      if (data) {
          return NextResponse.json({ data, error })
      }

}