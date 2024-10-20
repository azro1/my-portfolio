import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
 
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })
  
  // Refresh session if expired - required for Server Components
  const { data: { user} } = await supabase.auth.getUser()
  

  const otpRoutes = [
    '/verify-signup-otp',
    '/verify-login-otp',
    '/verify-forgot-email-otp'
  ];

  const profileOtpRoutes = [
    '/verify-email-otp',
    '/verify-phone-otp'
  ];

  const isOtpRoute = otpRoutes.some(route => req.url.includes(route));
  const isProfileOtpRoute = profileOtpRoutes.some(route => req.url.includes(route));
  
  const canAccessOtpPage = req.cookies.get("canAccessOtpPage");
  const canAccessOtpPageValue = canAccessOtpPage ? canAccessOtpPage.value === 'true' : false;
  console.log('server middleware:', canAccessOtpPageValue)
  
     // for unauthenticated users who access any otp route that do not have permission
     if (!user && (isOtpRoute && !canAccessOtpPageValue)) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/login';
      return NextResponse.redirect(redirectUrl);
    }
     // for authenticated users who access any otp route that do not have permission
     if (user && (isOtpRoute && !canAccessOtpPageValue)) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = '/';
        return NextResponse.redirect(redirectUrl);
     } 
     // for authenticated users who access any profile otp route that do not have permission
      if (user && (isProfileOtpRoute && !canAccessOtpPageValue)) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = '/profile/edit-profile'; 
        return NextResponse.redirect(redirectUrl);
     }

  return res
}