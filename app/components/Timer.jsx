"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState, memo } from "react";
import Countdown from "react-countdown";
import { useMessage } from "../hooks/useMessage";


// Memoize the Timer component to prevent unnecessary re-renders
const Timer = memo(({ authGroupEmailRef, profileEmailRef, profilePhoneRef, isButtonDisabled, isVerified }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { changeMessage } = useMessage();
  const [otpTime, setOtpTime] = useState(null); // Track the OTP email request time
  const [phoneOtpTime, setPhoneOtpTime] = useState(null) // Track the OTP phone request time

  const [isEmailRefsSet, setIsEmailRefsSet] = useState(false); // Track when email refs are set
  const [isPhoneRefsSet, setIsPhoneRefsSet] = useState(false); // Track when phone ref is set






  // Set OTP time for auth emails and profile email update immediately after the component loads
  useEffect(() => {
    if (!otpTime && isEmailRefsSet) {
      setOtpTime(Date.now() + 120 * 1000); // Set OTP time to 2 minutes from now
    }
  }, [otpTime, isEmailRefsSet]);


  // Set OTP time profile phone update immediately after the component loads
  useEffect(() => {
    if (!phoneOtpTime && isPhoneRefsSet) {
      setPhoneOtpTime(Date.now() + 10 * 60 * 1000); // Set OTP time to 10 minutes from now
      // console.log('Phone OTP time set:', Date.now() + 10 * 60 * 1000);  // Log to verify
    }
  }, [phoneOtpTime, isPhoneRefsSet]);








  // Set isEmailRefsSet to true once the refs are passed in for email refs, which will trigger the useEffects
  useEffect(() => {
    if (authGroupEmailRef?.current || profileEmailRef?.current) {
      setIsEmailRefsSet(true);
    }
  }, [authGroupEmailRef, profileEmailRef]);


  // Set iisPhoneRefsSet to true once the ref is passed in, which will trigger the useEffects
  useEffect(() => {
    if (profilePhoneRef?.current) {
      setIsPhoneRefsSet(true);
    }
  }, [profilePhoneRef]);










  // Prevent re-renders unless the props actually change
  useEffect(() => {
    if (otpTime || phoneOtpTime) {
      setIsDisabled(true); // Disable the resend button if OTP time is set
    }
  }, [otpTime, phoneOtpTime]);









  const handleOtpRequest = async (otpType, payload) => {

    // make request to cooldown endpoint before allowing user to request a new otp
    try {
      const res = await fetch("/api/auth/enforce-otp-limit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: payload.email
        }),
      });
       
      const serverRes = await res.json();

      if (res.status === 401 || res.status === 500) {
        changeMessage('error', serverRes.message);
        return;
      } 

    } catch (error) {
        console.error(error.message);
    }


    const supabase = createClientComponentClient();
    let data, error;

    if (otpType === "auth") {
      // Auth email OTP
      ({ data, error } = await supabase.auth.signInWithOtp({ 
        email: payload.email 
      }));

    } else if (otpType === "profile" && payload.email) {
      // Profile email update OTP
      ({ data, error } = await supabase.auth.updateUser({ 
        email: payload.email, 
        updated_at: payload.updated_at 
      }));

    } else if (otpType === "profile" && payload.phone) {
      // Profile phone update OTP
      ({ data, error } = await supabase.auth.updateUser({ 
        phone: payload.phone, 
        updated_at: payload.updated_at 
      }));
    }


    if (error) {
      changeMessage("error", "An unexpected error occurred. Please try again later.");
    } else {
      changeMessage("success", "A verification code has been sent to your email address");
    }

    setIsDisabled(true); // Disable the resend button while waiting for the timer

    // Set OTP time to null if successfull
    setOtpTime(null);
    setPhoneOtpTime(null);
  };








  const handleResendOtp = async () => {
    if (isDisabled) return;

    setIsDisabled(true); // Disable the resend button while waiting for the timer

    if (authGroupEmailRef?.current) {
      handleOtpRequest("auth", { email: authGroupEmailRef?.current });
    } else if (profileEmailRef?.current) {
      handleOtpRequest("profile", { email: profileEmailRef?.current, updated_at: new Date().toISOString() });
    } else if (profilePhoneRef?.current) {
      handleOtpRequest("profile", { phone: profilePhoneRef?.current, updated_at: new Date().toISOString() });
    }
  };






  // pass isDisabled in as an argument
  useEffect(() => {
    isButtonDisabled(isDisabled);
  }, [isButtonDisabled, isDisabled]);



  


  return (
    <div className="min-h-[24px]">
      {!isVerified && (
        <div className="flex gap-2 justify-center text-nightSky">
          <button
            className={`text-nightSky cursor-pointer ${isDisabled ? 'text-opacity-50' : 'text-opacity-100'}`}
            onClick={handleResendOtp}
            disabled={isDisabled}
          >
            Resend code
          </button>

          {isDisabled && otpTime && (
            <Countdown
              date={otpTime}
              onComplete={() => setIsDisabled(false)}
              renderer={({ minutes, seconds }) => (
                <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
              )}
            />
          )}

          {isDisabled && phoneOtpTime && (
            <Countdown
              date={phoneOtpTime}
              onComplete={() => setIsDisabled(false)}
              renderer={({ minutes, seconds }) => (
                <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
              )}
            />
          )}
        </div>
      )}
    </div>
  );
});

Timer.displayName = "Timer";
export default Timer;
