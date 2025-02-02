"use client"

import { useEffect, useRef } from "react";

// components
import AuthOtpForm from "../../AuthOtpForm";

const VerifySignupOtp = () => {

    const authGroupEmailRef = useRef(null);

    useEffect(() => {
        const userEmail = localStorage.getItem('email');
        if (userEmail) {
            authGroupEmailRef.current = userEmail;            
            localStorage.removeItem('email');
        } 
    }, []);

    return (
        <div className='flex items-center justify-center'>
            <AuthOtpForm
                redirectUrl='/upload-avatar'
                title='Sign up'
                subHeading='Enter the verification code sent to your email to activate your account'
                successMessage="Success! Your code has been verified and we're creating your account."
                authGroupEmailRef={authGroupEmailRef}
            />
        </div>
    )
}

export default VerifySignupOtp
