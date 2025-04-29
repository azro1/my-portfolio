import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"


export async function POST(request) {
  // Extract roomId along with profile and message
  const { profile, message, roomId, filePath } = await request.json() 

  // get supabase instance
  const supabase = createRouteHandlerClient({ cookies })

  // insert message
  const { data, error } = await supabase.from('messages')
    .insert({
      id: uuidv4(),
      text: message,
      first_name: profile.first_name || profile.full_name,
      avatar_url: profile.avatar_url,
      message_id: profile.id, // This is the user's ID
      chatroom_id: roomId, // Add the chatroom_id here
      file_path: filePath,
      created_at: new Date().toISOString()
    })
    .select()
    .single()

    if (error) {
        console.log('messages error:', error.message)
        return NextResponse.json({ error: error.message }, { 
          status: 500 
        })
    } 

    if (data) {
        return NextResponse.json({ data }, { 
          status: 201 
        })
    }
}
