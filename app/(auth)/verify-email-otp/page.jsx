import OtpForm from "../OtpForm";

const VerifyEmailOtp = () => {
    return (
        <OtpForm
            subHeading='Enter the verification code sent to your email to recover your account.'
            successMessage='Great! Your OTP verification passed. Logging in...'
            redirectUrl='/'
        />
    )
}

export default VerifyEmailOtp