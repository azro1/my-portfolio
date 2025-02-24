import { NextResponse } from 'next/server'

export async function VerificationGuard(user, request) {

    const authOtpRoutes = [
      '/auth/verify-signup-otp',
      '/auth/verify-login-otp',
      '/auth/verify-forgot-email-otp'
    ];

    const profileOtpRoutes = [
      '/profile/verify-email-otp',
      '/profile/verify-phone-otp'
    ];
    
    const isAuthOtpRoute = authOtpRoutes.some(route => request.url.includes(route));
    const isProfileOtpRoute = profileOtpRoutes.some(route => request.url.includes(route));
    

    // auth otp routes
    const canAccessAuthOtpPage = await request.cookies.get("canAccessAuthOtpPage");
    let canAccessAuthOtpPageValue = false;

    if (canAccessAuthOtpPage) {
      // Remove extra quotes if the value is wrapped in them
      const value = canAccessAuthOtpPage.value;
      canAccessAuthOtpPageValue = value ? JSON.parse(value) : false;
    }

    // for unauthenticated users who access any otp route that do not have permission
    if (!user && (isAuthOtpRoute && !canAccessAuthOtpPageValue)) {
      const response = NextResponse.next();
      response.cookies.set('otpAccessBlocked', 'true', { path: '/', httpOnly: true, sameSite: 'Strict' });
      return response;
    }


    // for authenticated users who access any otp route that do not have permission
    if (user && (isAuthOtpRoute && !canAccessAuthOtpPageValue)) {
      const response = NextResponse.next();
      response.cookies.set('otpAccessBlocked', 'true', { path: '/', httpOnly: true, sameSite: 'Strict' });
      return response;
    } 



    // profile otp routes
    const canAccessProfileOtpPage = await request.cookies.get("canAccessProfileOtpPage");
    let canAccessProfileOtpPageValue = false;

    if (canAccessProfileOtpPage) {
      // Remove extra quotes if the value is wrapped in them
      const value = canAccessProfileOtpPage.value;
      canAccessProfileOtpPageValue = value ? JSON.parse(value) : false;
    }

    // for authenticated users who access any profile otp route that do not have permission
    if (user && (isProfileOtpRoute && !canAccessProfileOtpPageValue)) {
      const response = NextResponse.next();
      response.cookies.set('otpAccessBlocked', 'true', { path: '/', httpOnly: true, sameSite: 'Strict' });
      return response;
    }

    
    return null;
}