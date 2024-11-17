// components
import OtpForm from "../OtpForm";

const VerifySignupOtp = () => {
    return (
        <div className='flex items-center justify-center'>
            <OtpForm
                redirectUrl='/complete-registration'
                method='signup'
                subHeading='A verification code has been sent to your email. Enter the code below to activate your account.'
                successMessage="Success! Your code has been verified and we're creating your account."
            />
        </div>
    )
}

export default VerifySignupOtp
