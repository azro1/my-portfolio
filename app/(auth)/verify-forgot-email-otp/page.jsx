import OtpForm from "../OtpForm";

const VerifyForgotEmailOtp = () => {
    return (
        <OtpForm
            subHeading='Enter the verification code sent to your email to recover your account.'
            successMessage='Welcome back! Your security code has been verified and you are now logged in.'
            redirectUrl='/'
        />
    )
}

export default VerifyForgotEmailOtp