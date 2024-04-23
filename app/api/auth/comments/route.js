import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"


export async function POST(request) {
  const { profile, comment } = await request.json()
  
    // get supabase instance
    const supabase = createRouteHandlerClient({ cookies })

    // insert comment
    const { data, error } = await supabase.from('comments')
      .insert({
        id: uuidv4(),
        comment: comment,
        first_name: profile.first_name,
        full_name: profile.full_name,
        avatar_url: profile.avatar_url,
        comment_id: profile.id,
        created_at: new Date().toISOString()
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