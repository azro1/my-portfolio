import OtpForm from "../OtpForm";

const VerifyEmailOtp = () => {
    return (
        <OtpForm
            subHeading='Enter the verification code sent to your email to recover your account.'
            successMessage='OTP verification passed. Loggin you in...'
            redirectUrl='/'
        />
    )
}

export default VerifyEmailOtp