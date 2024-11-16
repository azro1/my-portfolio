// components
import OtpForm from "../OtpForm";

const VerifyLoginOtp = () => {

    return (
        <div className='flex items-center justify-center h-100vh min-h-[820px] md:min-h-0 md:h-[70vh]'>
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
