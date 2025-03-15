import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { client } from "@/app/lib/db";

// components
import AuthOtpForm from "../../AuthOtpForm";

const VerifyLoginOtp = async () => {
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
                subHeading='To login, enter the code we sent to your email address'
                successMessage='OTP verification successful. You are now Logged in.'
            />
        </div>
    )
}

export default VerifyLoginOtp
