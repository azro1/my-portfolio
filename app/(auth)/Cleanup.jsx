"use client";

import { useEffect } from "react";
import { useMessage } from "../hooks/useMessage";

// server action
import { deleteCanAccessAuthOtpPageCookie } from "./auth/actions";



const Cleanup = () => {
  const { changeMessage } = useMessage();


  // if user reloads an otp verification page on the first render of this component the isReloading value will be still accessible so i use it to display a message to user
  useEffect(() => {
    const isReloading = sessionStorage.getItem("isReloading");
    if (isReloading) {
      changeMessage('error', "Your OTP verification was aborted. Please signup to receive a new security code.")
    }
  }, []);




  // function to delete server cookie and local storage flag if user navigates back from otp forms
  useEffect(() => {
    const handlePopState = () => {
      const hasVisitedAuthOtpPage = localStorage.getItem("hasVisitedAuthOtpPage") === "true";

      if (hasVisitedAuthOtpPage) {
        // Call function to delete the cookie
        const deleteCookie = async () => {
          await deleteCanAccessAuthOtpPageCookie();
          localStorage.removeItem("hasVisitedAuthOtpPage");
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
