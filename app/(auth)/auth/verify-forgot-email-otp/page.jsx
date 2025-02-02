"use client"

import { useEffect, useRef } from "react";

// components
import AuthOtpForm from "../../AuthOtpForm";



const VerifyForgotEmailOtp = () => {

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
                redirectUrl='/'
                title='Login'
                subHeading='Enter the code sent to your email to log back into to your account'
                successMessage='Welcome back! Your security code has been verified and you are now logged in.'
                authGroupEmailRef={authGroupEmailRef}
            />
        </div>
    )
}

export default VerifyForgotEmailOtp