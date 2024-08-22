// components
import OtpForm from "../OtpForm";

const SignupOtp = () => {
    return (
       <OtpForm
           successMessage='OTP verification passed. Creating your account...'
           redirectUrl='/complete-registration'
       />
    )
}

export default SignupOtp
