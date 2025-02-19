import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// components
import AuthOtpForm from "../../AuthOtpForm";

const VerifySignupOtp = () => {
    const otpAccessBlocked = cookies().get('otpAccessBlocked')?.value === 'true';

    // redirect if otpAcessBlocked middleware cookie is present
    if (otpAccessBlocked) {
      redirect('/auth/login');
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
