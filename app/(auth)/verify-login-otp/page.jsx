// components
import OtpForm from "../OtpForm";

const VerifyLoginOtp = () => {

    return (
        <OtpForm
            subHeading='To complete the login process, enter the verification code we sent to your email address.'
            successMessage='OTP verification successful. You are now Logged in.'
            redirectUrl='/'
        />
    )
}

export default VerifyLoginOtp
