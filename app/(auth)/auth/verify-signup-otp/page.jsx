import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { client } from "@/app/lib/db";

// components
import AuthOtpForm from "../../AuthOtpForm";

const VerifySignupOtp = async () => {
    const encryptedEmail = cookies().get('_otp_tkn')?.value;
    const otpAccessToken = await client.get(`token-${encryptedEmail}`);

    if (!encryptedEmail) {
        return redirect('/auth/login');
    }

    if (!otpAccessToken) {
        return redirect('/auth/login');
    }

    return (
        <div className='flex items-center justify-center'>
            <AuthOtpForm
                redirectUrl='/upload-avatar'
                title='Sign up'
                subHeading='Enter the verification code sent to your email to activate your account'
                successMessage="Success! Your code has been verified and we're creating your account."
            />
        </div>
    )
}

export default VerifySignupOtp
