import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { client } from "@/app/lib/db";

// components
import AuthOtpForm from "../../AuthOtpForm";


const VerifyForgotEmailOtp = async () => {
    const encryptedEmail = cookies().get('_otp_tkn')?.value;
    const accessToken = await client.get(`token-${encryptedEmail}`);

    if (!encryptedEmail) {
        return redirect('/auth/login');
    }

    if (!accessToken) {
        return redirect('/auth/login');
    }

    return (
        <div className='flex items-center justify-center'>
            <AuthOtpForm
                redirectUrl='/'
                title='Login'
                subHeading='Enter the code sent to your email to log back into to your account'
                successMessage='Welcome back! Your security code has been verified and you are now logged in.'
            />
        </div>
    )
}

export default VerifyForgotEmailOtp