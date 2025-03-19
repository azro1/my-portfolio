import { NextResponse } from 'next/server'

export async function VerificationGuard(user, request) {

    const otpRoutes = [
      '/verify-signup-otp',
      '/verify-login-otp',
      '/verify-forgot-email-otp'
    ];
    

    
    // const isOtpRoute = otpRoutes.some(route => request.url.includes(route));



    // const authOtpCookie = await request.cookies.get('_otp_tkn');

    // if (authOtpCookie) {
    //     let authOtpCookieValue;
    //     //  console.log(authOtpCookie)
   
    //     try {
    //        authOtpCookieValue = typeof authOtpCookie.value === 'string' ? JSON.parse(authOtpCookie.value) : authOtpCookie.value;
    //     } catch (error) {
    //        console.error('Error parsing cookie:', error);
    //        return;
    //     }
    
    //     // console.log(authOtpCookieValue)
    //     if (!user && (isOtpRoute && authOtpCookieValue.hasExpired === true)) {
    //       const redirectUrl = request.nextUrl.clone();
    //       redirectUrl.pathname = '/login';
    //       return NextResponse.redirect(redirectUrl);
    //     }
    // }



    return NextResponse.next();








    // const profileOtpRoutes = [
    //   '/verify-email-otp',
    //   '/verify-phone-otp'
    // ];

    // const isProfileOtpRoute = profileOtpRoutes.some(route => request.url.includes(route));

    // let canAccessAuthOtpPageValue = false;

    // if (canAccessAuthOtpPage) {
    //   // Remove extra quotes if the value is wrapped in them
    //   const value = canAccessAuthOtpPage.value;
    //   canAccessAuthOtpPageValue = value ? JSON.parse(value) : false;
    // }

    // // for unauthenticated users who access any otp route that do not have permission
    // if (!user && (isOtpRoute && !canAccessAuthOtpPageValue)) {
    //   const redirectUrl = request.nextUrl.clone();
    //   redirectUrl.pathname = '/login';
    //   return NextResponse.redirect(redirectUrl);
    // }
    // // for authenticated users who access any otp route that do not have permission
    // if (user && (isOtpRoute && !canAccessAuthOtpPageValue)) {
    //   const redirectUrl = request.nextUrl.clone();
    //   redirectUrl.pathname = '/';
    //   return NextResponse.redirect(redirectUrl);
    // } 
    // // for authenticated users who access any profile otp route that do not have permission
    // if (user && (isProfileOtpRoute && !canAccessAuthOtpPageValue)) {
    //   const redirectUrl = request.nextUrl.clone();
    //   redirectUrl.pathname = '/profile/edit-profile'; 
    //   return NextResponse.redirect(redirectUrl);
    // }

}