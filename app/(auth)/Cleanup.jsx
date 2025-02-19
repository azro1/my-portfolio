"use client";

import { useState, useEffect } from "react";
import { useMessage } from "../hooks/useMessage";

// server actions
import { deleteCanAccessAuthOtpPageCookie } from "./auth/actions";



const Cleanup = () => {
  const [hasReturned, setHasReturned] = useState(false)
  const { changeMessage } = useMessage();




  // If user reloads clear hasVisitedAuthOtpPage flag
  useEffect(() => {
    const hasVisitedAuthOtpPage = localStorage.getItem('hasVisitedAuthOtpPage');

    if (hasVisitedAuthOtpPage === 'true') {
      setHasReturned(true);
    }
  }, [])

  // If user reloads clear hasVisitedAuthOtpPage flag
  useEffect(() => {
    if (hasReturned) {
      localStorage.removeItem('hasVisitedAuthOtpPage');
    }
  }, [hasReturned])










  // If user reloads an otp verification page on the first render of this component the isReloading value will be still accessible display message if isReloading
  useEffect(() => {
    const isReloading = sessionStorage.getItem('isReloading');
    const hasShownMessage = localStorage.getItem('hasShownAbortMessage');

    if (isReloading && hasShownMessage !== 'true') {
      changeMessage('error', "Your OTP verification was aborted. Please signup to receive a new security code.");
      localStorage.setItem('hasShownAbortMessage', 'true');
    }
  }, [])









  // function to delete server cookie and local storage flag if user navigates back from otp forms
  useEffect(() => {
    const handlePopState = () => {
      const hasVisitedAuthOtpPage = localStorage.getItem("hasVisitedAuthOtpPage") === "true";

      if (hasVisitedAuthOtpPage) {

        const deleteCookie = async () => {
          await deleteCanAccessAuthOtpPageCookie();
          localStorage.removeItem("hasVisitedAuthOtpPage");
          localStorage.setItem('hasShownAbortMessage', 'true');
          changeMessage('error', 'Your OTP verification was aborted. Please signup to receive a new security code.');
        };
        deleteCookie();

      }

    };
    // Listen for back navigation
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);










  // function to clean up registration local storage flags and display message
  useEffect(() => {
    const forceLogout = localStorage.getItem("forceLogout") === "true";
    const hasVisitedRegPage = localStorage.getItem("hasVisitedRegPage") === "true";

    if (forceLogout) {
      localStorage.removeItem("forceLogout");
      changeMessage('error', 'You have been logged out. Please log back in to finish setting up your account.');
    } else if (hasVisitedRegPage) {
      localStorage.removeItem("hasVisitedRegPage");
      changeMessage('error', 'You have been logged out. Please log back in to finish setting up your account.');
    }
  }, []);


};

export default Cleanup;
