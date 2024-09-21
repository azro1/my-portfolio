import OtpForm from "../OtpForm"


const VerifyEmailOtp = () => {

    return (
        <OtpForm 
            storageStr='email'
            verificationType='email_change'
            redirectUrl='/profile/edit-profile'
            subHeading='A verification code was sent to your email. Please enter the code below to complete your email update.'
            successMessage='OTP verifcation was successful. Your email address has been updated.'
        />
    )
}

export default VerifyEmailOtp

