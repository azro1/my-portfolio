"use client";

import { useState, useEffect } from "react";
import { useMessage } from "../hooks/useMessage";

// server action
import { deleteCookie } from "./auth/login/actions";



const Cleanup = () => {
    const [isUserBack, setIsUserBack] = useState(false)
    const { changeMessage } = useMessage();


  // set state to track when user is redirected back to login after reloading page in AuthOtpForm with flag in local storage
  useEffect(() => {
    const visited = localStorage.getItem("hasVisitedOtpPage");
    if (visited === "true") {
      setIsUserBack(true);
    }
  }, []);


  // function to delete server cookie and local storage flag
  useEffect(() => {
    if (isUserBack) {
      const handleReload = async () => {
        await deleteCookie();
        localStorage.removeItem("hasVisitedOtpPage")
        changeMessage('error', "You have aborted the process. Please signup to receive a new security code.")
      };
      handleReload();
    }
  }, [isUserBack]);





 
    // function to delete server cookie and local storage flag if user navigates back from otp form
    useEffect(() => {
        const handlePopState = () => {
          const hasVisitedOtpPage = localStorage.getItem("hasVisitedOtpPage") === "true";
    
          if (hasVisitedOtpPage) {
            // Call function to delete the cookie
            const deleteOtpCookie = async () => {
              await deleteCookie();
              localStorage.removeItem("hasVisitedOtpPage");
              changeMessage('error', 'You have aborted the process. Please signup to receive a new security code.');
            };
            deleteOtpCookie();
          }
        };
    
        // Listen for back navigation
        window.addEventListener('popstate', handlePopState);
    
        return () => {
          window.removeEventListener('popstate', handlePopState);
        };
      }, []);



       

    // function to delete otp server cookie and ss flag if the user reloads the page
    useEffect(() => {
        const isReloading = sessionStorage.getItem("isReloading");

        const deleteOtpCookie = async () => {
            await deleteCookie()
            sessionStorage.removeItem("isReloading");
            changeMessage('error', 'You have aborted the process. Please signup to recieve a new security code.');
        }

        if (isReloading) {
            deleteOtpCookie()
        }
    }, [])





    // function to clean up registration ls flags 
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
