// components
import OtpForm from "../OtpForm";

const VerifyLoginOtp = () => {

    return (
        <div className='flex items-center justify-center'>
            <OtpForm
                redirectUrl='/'
                method='login'
                subHeading='To complete the login process, enter the verification code we sent to your email address.'
                successMessage='OTP verification successful. You are now Logged in.'
            />
        </div>
    )
}

export default VerifyLoginOtp
