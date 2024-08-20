// components
import OtpForm from "../OtpForm";

const SignupOtp = () => {

    // url to redirect user to after otp verification is successful
    const redirectUrl = '/complete-registration';

    return (
       <OtpForm
           redirectUrl={redirectUrl}
       />
    )
}

export default SignupOtp
