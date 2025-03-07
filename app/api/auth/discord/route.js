import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function GET(request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const supabase = createRouteHandlerClient({ cookies })

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  const { data: { user } } = await supabase.auth.getUser()
  // when a user logs in via discord set is_verifed flag to true now that an account has been created so users cannot sign up again
  const { error } = await supabase
    .from('profiles')
    .update({ 
      is_verified: true,
      is_reg_complete: true
    })
    .eq('id', user.id)

  if (error) {
    console.log('discord:', error.message)
  }

  return NextResponse.redirect(url.origin)
}