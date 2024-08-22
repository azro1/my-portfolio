// components
import OtpForm from "../OtpForm";

const LoginOtp = () => {

    return (
        <OtpForm
            successMessage='OTP verification passed. Loggin in...'
            redirectUrl='/'
        />
    )
}

export default LoginOtp
