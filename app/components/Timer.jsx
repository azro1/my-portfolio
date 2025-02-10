"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState, memo } from "react";
import Countdown from "react-countdown";
import { useMessage } from "../hooks/useMessage";


// Memoize the Timer component to prevent unnecessary re-renders
const Timer = memo(({ authGroupEmailRef, profileEmailRef, profilePhoneRef, isButtonDisabled, isVerified }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const { changeMessage } = useMessage();
  const [otpTime, setOtpTime] = useState(null); // Track the OTP email request time
  const [phoneOtpTime, setPhoneOtpTime] = useState(null) // Track the OTP phone request time







  // Set OTP time for auth emails and profile email update immediately after the component loads
  useEffect(() => {
    if (!otpTime && (authGroupEmailRef?.current || profileEmailRef?.current)) {
      setOtpTime(Date.now() + 120 * 1000); // Set OTP time to 2 minutes from now
    }
  }, [otpTime, authGroupEmailRef?.current, profileEmailRef?.current]);


  // Set OTP time profile phone update immediately after the component loads
  useEffect(() => {
    if (!phoneOtpTime && profilePhoneRef?.current) {
      setPhoneOtpTime(Date.now() + 10 * 60 * 1000); // Set OTP time to 10 minutes from now
      // console.log('Phone OTP time set:', Date.now() + 10 * 60 * 1000);  // Log to verify
    }
  }, [phoneOtpTime, profilePhoneRef?.current]);









  // Prevent re-renders unless the props actually change
  useEffect(() => {
    if (otpTime || phoneOtpTime) {
      setIsDisabled(true); // Disable the resend button if OTP time is set
    }
  }, [otpTime, phoneOtpTime]);









  const handleOtpRequest = async (otpType, payload) => {
    if (attempts >= 3) {
      changeMessage("error", "Too many attempts. Please try again later.");
      return;
    }

    setAttempts((prev) => prev + 1);

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
      changeMessage("success", "Otp successfully sent!");
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
  }, [isDisabled]);



  


  return (
    <div className="min-h-[24px]">
      {!isVerified && (
        <div className="flex gap-2 justify-center text-nightSky">
          <button
            className={`underline text-nightSky cursor-pointer ${isDisabled ? 'text-opacity-50' : 'text-opacity-100'}`}
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

export default Timer;
