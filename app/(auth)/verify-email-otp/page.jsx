import OtpForm from "../OtpForm";

const VerifyEmailOtp = () => {
    return (
        <OtpForm
            subHeading='Enter the verification code sent to your email to recover your account.'
            successMessage='Awesome! Your OTP is verified. Welcome back, logging you in...'
            redirectUrl='/'
        />
    )
}

export default VerifyEmailOtp