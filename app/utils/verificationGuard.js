import { NextResponse } from 'next/server'

export async function VerificationGuard(user, request) {

    const otpRoutes = [
      '/auth/verify-signup-otp',
      '/auth/verify-login-otp',
      '/auth/verify-forgot-email-otp'
    ];
    
    const profileOtpRoutes = [
      '/verify-email-otp',
      '/verify-phone-otp'
    ];
    
    const isOtpRoute = otpRoutes.some(route => request.url.includes(route));
    const isProfileOtpRoute = profileOtpRoutes.some(route => request.url.includes(route));
    
    const canAccessOtpPage = request.cookies.get("canAccessOtpPage");
    const canAccessOtpPageValue = canAccessOtpPage ? canAccessOtpPage.value === 'true' : false;
    
    // for unauthenticated users who access any otp route that do not have permission
    if (!user && (isOtpRoute && !canAccessOtpPageValue)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/auth/login';
      return NextResponse.redirect(redirectUrl);
    }
    // for authenticated users who access any otp route that do not have permission
    if (user && (isOtpRoute && !canAccessOtpPageValue)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/';
      return NextResponse.redirect(redirectUrl);
    } 
    // for authenticated users who access any profile otp route that do not have permission
    if (user && (isProfileOtpRoute && !canAccessOtpPageValue)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/profile/edit-profile'; 
      return NextResponse.redirect(redirectUrl);
    }

    return null;
}