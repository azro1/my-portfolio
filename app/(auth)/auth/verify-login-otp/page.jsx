import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// components
import AuthOtpForm from "../../AuthOtpForm";

const VerifyLoginOtp = () => {
    const otpAccessBlocked = cookies().get('otpAccessBlocked')?.value === 'true';

    // redirect if otpAcessBlocked middleware cookie is present
    if (otpAccessBlocked) {
      redirect('/auth/login');
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
