// components
import OtpForm from "../OtpForm";

const VerifySignupOtp = () => {
    return (
       <OtpForm
           subHeading='A verification code has been sent to your email. Enter the code below to verify your email address and activate your account.'
           successMessage="Success! Your OTP has been verified. Creating your account..."
           redirectUrl='/complete-registration'
       />
    )
}

export default VerifySignupOtp
