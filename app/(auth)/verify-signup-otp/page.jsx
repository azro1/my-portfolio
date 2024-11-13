// components
import OtpForm from "../OtpForm";

const VerifySignupOtp = () => {
    return (
        <div className='flex items-center justify-center h-[70vh]'>
            <OtpForm
                subHeading='A verification code has been sent to your email. Enter the code below to verify your email address and activate your account.'
                successMessage="Success! Your code has been verified and we're creating your account."
                redirectUrl='/complete-registration'
            />
        </div>
    )
}

export default VerifySignupOtp
