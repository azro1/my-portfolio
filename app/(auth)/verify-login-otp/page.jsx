"use client"

import { useEffect, useRef } from "react";

// components
import AuthOtpForm from "../AuthOtpForm";



const VerifyLoginOtp = () => {

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
                subHeading='To login, enter the code we sent to your email address'
                successMessage='OTP verification successful. You are now Logged in.'
                authGroupEmailRef={authGroupEmailRef}
            />
        </div>
    )
}

export default VerifyLoginOtp
