"use client"

import { useState, useEffect } from "react"
import { useMessage } from "../hooks/useMessage"
import { deleteCanAccessProfileOtpPageCookie } from "./profile/actions"


const Cleanup = () => {
    const [hasReturned, setHasReturned] = useState(false)
    const { changeMessage } = useMessage();
    
    // If user reloads clear hasVisitedProfileOtpPage flag
    useEffect(() => {
        const hasVisitedProfileOtpPage = localStorage.getItem('hasVisitedProfileOtpPage');

        if (hasVisitedProfileOtpPage === 'true') {
            setHasReturned(true);
        }
    }, [])

    // If user reloads clear hasVisitedProfileOtpPage flag
    useEffect(() => {
        if (hasReturned) {
            localStorage.removeItem('hasVisitedProfileOtpPage');
        }
    }, [hasReturned])

    // If user reloads an otp verification page on the first render of this component the isReloading value will be still accessible display message if isReloading
    useEffect(() => {
        const isReloading = sessionStorage.getItem('isReloading');
        const hasShownMessage = localStorage.getItem('hasShownAbortMessage');

        if (isReloading && hasShownMessage !== 'true') {
            changeMessage('error', "Your OTP verification was aborted");
            localStorage.setItem('hasShownAbortMessage', 'true');
        }
    }, [])

    // If user navigates backwards via browser back buton or right-click menu delete canAccessOtpPage cookie and display message 
    useEffect(() => {
        const handlePopState = async () => {
        const hasShownMessage = localStorage.getItem('hasShownAbortMessage');
 
            await deleteCanAccessProfileOtpPageCookie();

            if (hasShownMessage !== 'true') {
                changeMessage('error', "Your OTP verification was aborted");
                localStorage.setItem('hasShownAbortMessage', 'true');
            }
        }
        // Listen for back navigation
        window.addEventListener('popstate', handlePopState)

        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [])

    return null
}

export default Cleanup
