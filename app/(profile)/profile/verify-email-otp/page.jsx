import OtpForm from "../OtpForm"


const VerifyEmailOtp = () => {

    return (
        <div className='flex items-center justify-center h-[90vh]'>
            <OtpForm 
                contact='email address'
                storageStr='email'
                verificationType='email_change'
                title='Verify Your Email'
                subHeading='A verification code has been sent to your inbox. Please enter the code below to complete your email update.'
                successMessage='OTP verifcation was successful. Your email address has been updated.'
            />
        </div>
    )
}

export default VerifyEmailOtp

