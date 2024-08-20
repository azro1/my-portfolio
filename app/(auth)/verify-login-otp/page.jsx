// components
import OtpForm from "../OtpForm";

const LoginOtp = () => {

    // url to redirect user to after otp verification is successful
    const redirectUrl = '/';

    return (
        <OtpForm
            redirectUrl={redirectUrl}
        />
    )
}

export default LoginOtp
