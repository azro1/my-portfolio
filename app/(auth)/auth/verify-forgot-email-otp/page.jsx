import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// components
import AuthOtpForm from "../../AuthOtpForm";


const VerifyForgotEmailOtp = () => {
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
                subHeading='Enter the code sent to your email to log back into to your account'
                successMessage='Welcome back! Your security code has been verified and you are now logged in.'
            />
        </div>
    )
}

export default VerifyForgotEmailOtp