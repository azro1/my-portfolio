"use client";

import { useEffect } from "react";
import { useMessage } from "../hooks/useMessage";

// server actions
import { deleteCanAccessAuthOtpPageCookie } from "./auth/actions";


const Cleanup = () => {
    const { changeMessage } = useMessage();


    // for auth section when user leaves page using address bar or reloads page
    useEffect(() => {
        const isReloading = sessionStorage.getItem('isReloading');
        const hasShownMessage = localStorage.getItem('hasShownAbortMessage');

        if (isReloading && hasShownMessage !== 'true') {
            setTimeout(() => {
                sessionStorage.removeItem('isReloading');
                changeMessage('error', 'Verification was interrupted. Please login or sign up to receive a new security code.');
                localStorage.setItem('hasShownAbortMessage', 'true');
            }, 100);
        }
    }, [])


    // for auth section if user navigates back from otp forms using browser back button or right-click back in menu 
    useEffect(() => {
        const handlePopState = () => {
            const hasVisitedAuthOtpPage = localStorage.getItem("hasVisitedAuthOtpPage") === "true";
            const hasShownMessage = localStorage.getItem('hasShownAbortMessage');

            if (hasVisitedAuthOtpPage) {
                const deleteAuthCookie = async () => {
                    await deleteCanAccessAuthOtpPageCookie();
                    localStorage.removeItem("hasVisitedAuthOtpPage");

                    if (hasShownMessage !== 'true') {
                        changeMessage('error', 'Verification was aborted. Please login or signup to receive a new security code.');
                        localStorage.setItem('hasShownAbortMessage', 'true');
                    }
                };
                deleteAuthCookie();
            }

      };
      window.addEventListener('popstate', handlePopState);

      return () => {
          window.removeEventListener('popstate', handlePopState);
      };
    }, []);






    // for reg section if user leaves page using address bar
    useEffect(() => {
        const regIsReloading = localStorage.getItem('regIsReloading');
        const hasShownMessage = localStorage.getItem('hasShownAbortMessage');

        if (regIsReloading && hasShownMessage !== 'true') {
            localStorage.removeItem('regIsReloading');
            localStorage.setItem('hasShownAbortMessage', 'true');
            changeMessage('error', 'Your session has ended. Please sign in again to complete your account creating your profile.');
        }
    }, [])



    // for reg section if user navigates back from otp forms using browser back button or right-click back in menu 
    useEffect(() => {
        const hasVisitedRegPage = localStorage.getItem("hasVisitedRegPage") === "true";
        const hasShownMessage = localStorage.getItem('hasShownAbortMessage');

        if (hasVisitedRegPage && hasShownMessage !== 'true') {
            localStorage.removeItem("hasVisitedRegPage");
            changeMessage('error', 'You have been logged out. Please log back in to finish setting up your account.');
            localStorage.setItem('hasShownAbortMessage', 'true');     
        }
    }, []);
  };

export default Cleanup;
