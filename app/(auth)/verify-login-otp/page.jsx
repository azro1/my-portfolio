// components
import OtpForm from "../OtpForm";

const VerifyLoginOtp = () => {

    return (
        <div className='flex items-center justify-center h-[70vh]'>
            <OtpForm
                subHeading='To complete the login process, enter the verification code we sent to your email address.'
                successMessage='OTP verification successful. You are now Logged in.'
                redirectUrl='/'
            />
        </div>
    )
}

export default VerifyLoginOtp
