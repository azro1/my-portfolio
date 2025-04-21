import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const supabase = createRouteHandlerClient({ cookies })
  
  try {
    if (code) {
      await supabase.auth.exchangeCodeForSession(code)
    }
  
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      // Call rpc function to update the avatar URL for profiles table
      const { error: profileAvatarError } = await supabase.rpc('update_profile_avatar', {
        user_id: user.id
      });

      if (profileAvatarError) {
        console.error('Error updating profile avatar:', profileAvatarError.message);
        throw new Error('Profile avatar update failed');
      }

      // Call rpc function to update the avatar URL for messages table
      const { error: messageAvatarError } = await supabase.rpc('update_message_avatars', {
        user_id: user.id
      });

      if (messageAvatarError) {
        console.error('Error updating message avatars:', messageAvatarError.message);
        throw new Error('Message avatar update failed');
      }

      // update profile flags
      const { error } = await supabase
        .from('profiles')
        .update({
          is_verified: true,
          is_reg_complete: true
        })
        .eq('id', user?.id)
  
        if (error) {
          console.log('discord:', error.message);
          throw new Error('Error updating profile flags')
        }
    }

  } catch (error) {
    console.log('error:', error.message)
    return NextResponse.json({ message: "error creating supabase client" }, { status: 500 });
  }

  return NextResponse.redirect(url.origin)
}