import OtpForm from "../OtpForm";

const VerifyEmailOtp = () => {
    return (
        <OtpForm
            subHeading='Enter the verification code sent to your email to recover your account.'
            successMessage='OTP verified. Welcome back! You are now logged in.'
            redirectUrl='/'
        />
    )
}

export default VerifyEmailOtp