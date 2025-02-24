import { cookies } from "next/headers";

export async function POST(request) {
    const { isOnRegistrationPage, hasLeftAuthVerification, hasLeftProfileOtpVerification } = await request.json();

    if (isOnRegistrationPage || hasLeftAuthVerification) {
       await cookies().delete('canAccessAuthOtpPage');
    }
    
    if (hasLeftProfileOtpVerification) {
       await cookies().delete('canAccessProfileOtpPage');
    }

    return new Response(null, { status: 200 });
}
