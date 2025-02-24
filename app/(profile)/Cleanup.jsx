"use client"

import { useEffect } from "react"
import { useMessage } from "../hooks/useMessage"

// server actions
import { deleteCanAccessProfileOtpPageCookie } from "./profile/actions"


const Cleanup = () => {
    const { changeMessage } = useMessage();


    // if user leaves page using address bar or reloads page
    useEffect(() => {
        const isReloading = sessionStorage.getItem('isReloading');
        const hasShownMessage = localStorage.getItem('hasShownAbortMessage');

        if (isReloading && hasShownMessage !== 'true') {
            setTimeout(() => {
                sessionStorage.removeItem('isReloading')
                changeMessage('error', 'We could not update your information because verification was interrupted');
                localStorage.setItem('hasShownAbortMessage', 'true');
            }, 100);
        }
    }, [])



    // if user navigates back from profile otp forms using browser back button or right-click back in menu 
    useEffect(() => {
        const handlePopState = () => {
            const hasVisitiedProfileOtpPage = localStorage.getItem('hasVisitedProfileOtpPage') === 'true';

            if (hasVisitiedProfileOtpPage) {
                const deleteProfileCookie = async () => {
                    await deleteCanAccessProfileOtpPageCookie();
                    localStorage.removeItem('hasVisitedProfileOtpPage');

                    const hasShownMessage = localStorage.getItem('hasShownAbortMessage');
                    if (hasShownMessage !== 'true') {
                        changeMessage('error', 'Your OTP verification was aborted. Please signup to receive a new security code.');
                        localStorage.setItem('hasShownAbortMessage', 'true');
                    }
                };
                deleteProfileCookie();
            }
        }
        window.addEventListener('popstate', handlePopState)

        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [])

    return null
}

export default Cleanup
