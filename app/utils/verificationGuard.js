import { NextResponse } from 'next/server'

export async function VerificationGuard(user, request) {

    const otpRoutes = [
      '/auth/verify-signup-otp',
      '/auth/verify-login-otp',
      '/auth/verify-forgot-email-otp'
    ];
    
    const profileOtpRoutes = [
      '/profile/verify-email-otp',
      '/profile/verify-phone-otp'
    ];
    
    const isOtpRoute = otpRoutes.some(route => request.url.includes(route));
    const isProfileOtpRoute = profileOtpRoutes.some(route => request.url.includes(route));
    
    const canAccessOtpPage = await request.cookies.get("canAccessOtpPage");
    let canAccessOtpPageValue = false;

    if (canAccessOtpPage) {
      // Remove extra quotes if the value is wrapped in them
      const value = canAccessOtpPage.value;
      canAccessOtpPageValue = value ? JSON.parse(value) : false;
    }
  
    
    // for unauthenticated users who access any otp route that do not have permission
    if (!user && (isOtpRoute && !canAccessOtpPageValue)) {
      const response = NextResponse.next();
      response.cookies.set('otpAccessBlocked', 'true', { path: '/', httpOnly: true, sameSite: 'Strict' });
      return response;
    }


    // for authenticated users who access any otp route that do not have permission
    if (user && (isOtpRoute && !canAccessOtpPageValue)) {
      const response = NextResponse.next();
      response.cookies.set('otpAccessBlocked', 'true', { path: '/', httpOnly: true, sameSite: 'Strict' });
      return response;
    } 


    // for authenticated users who access any profile otp route that do not have permission
    if (user && isProfileOtpRoute && !canAccessOtpPageValue) {
      const response = NextResponse.next();
      response.cookies.set('otpAccessBlocked', 'true', { path: '/', httpOnly: true, sameSite: 'Strict' });
      return response;
    }
    
    return null;
}