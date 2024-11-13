import OtpForm from "../OtpForm";

const VerifyForgotEmailOtp = () => {
    return (
        <div className='flex items-center justify-center h-[70vh]'>
            <OtpForm
                subHeading='Enter the verification code sent to your email to recover your account.'
                successMessage='Welcome back! Your security code has been verified and you are now logged in.'
                redirectUrl='/'
            />
        </div>
    )
}

export default VerifyForgotEmailOtp