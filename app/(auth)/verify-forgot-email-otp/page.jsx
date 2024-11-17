import OtpForm from "../OtpForm";

const VerifyForgotEmailOtp = () => {
    return (
        <div className='flex items-center justify-center'>
            <OtpForm
                redirectUrl='/'
                method='recover your account'
                subHeading='Enter the verification code sent to your email to recover your account.'
                successMessage='Welcome back! Your security code has been verified and you are now logged in.'
            />
        </div>
    )
}

export default VerifyForgotEmailOtp