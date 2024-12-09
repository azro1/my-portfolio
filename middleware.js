import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { VerificationGuard } from './app/utils/verificationGuard'

export async function middleware(req) {
  const res = NextResponse.next()
 
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })
  
  // Refresh session if expired - required for Server Components
  const { data: { user }} = await supabase.auth.getUser()
  
  const verificationResponse = await VerificationGuard(user, req);
  
  if (verificationResponse) {
    return verificationResponse
  }

  return res
}