"use client"

import { useEffect } from "react"
import { useMessage } from "../hooks/useMessage"
import { deleteHasVisitedOtpPageCookie } from "./profile/actions"
import { deleteCanAccessOtpPageCookie } from "../(auth)/auth/login/actions"


const Cleanup = () => {
    const { changeMessage } = useMessage();

    console.log('cleanup mounted')
    useEffect(() => {
        // on the first render of this component the isReloading value from ProfileEmailOtpForm is still available
        const isReloading = sessionStorage.getItem('isReloading');
        const hasShownMessage = localStorage.getItem('hasShownAbortMessage');

        if (isReloading && hasShownMessage !== 'true') {
            changeMessage('error', "Your OTP verification was aborted");
            localStorage.setItem('hasShownAbortMessage', 'true');
        }
    }, [])



    // function to delete both cookies if user navigates back
    useEffect(() => {
        const handlePopState = async () => {
        const hasVisitedProfileOtpPage = localStorage.getItem('hasVisitedProfileOtpPage');
        const hasShownMessage = localStorage.getItem('hasShownAbortMessage');

            await deleteCanAccessOtpPageCookie();
            await deleteHasVisitedOtpPageCookie();

            if (hasVisitedProfileOtpPage && hasShownMessage !== 'true') {
                changeMessage('error', "Your OTP verification was aborted");
                localStorage.removeItem('hasVisitedProfileOtpPage');
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
