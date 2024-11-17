"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

// custom hook to display global messages
import { useMessage } from "@/app/hooks/useMessage";


const ForgotEmail = () => {
    const [phone, setPhone] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const router = useRouter()

    // global messages function
    const { changeMessage } = useMessage()

    useEffect(() => {
        router.refresh();
        // clear cookie from server if user navigates back to this page so they have to enter phone again to get new otp
        document.cookie = "canAccessOtpPage=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }, [router]);

    // function to convert uk mobile numbers into E.164 format
    const convertToInternationalFormat = (phoneNumber) => {
        // replace local prefix '0' with international code '+44' if it exists
        if (phoneNumber.startsWith('0')) return phoneNumber.replace('0', '+44');
    
        // return as is if already in international format
        return phoneNumber.startsWith('+') ? phoneNumber : phoneNumber;
    };



    // Phone number validation function
    const isValidPhoneNumber = (phoneNumber) => /^(0\d{10}|\+\d{1,3}\d{1,14})$/.test(phoneNumber);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!phone) {
          changeMessage('error', 'Please enter your phone number to continue.');
          return
        } else if (phone.length < 10) {
          changeMessage('error', 'The phone number you entered seems invalid. It should be between 10 and 15 digits. Please check and try again.')
          return
        } else if (!isValidPhoneNumber(phone)) {
          changeMessage('error', 'Please enter a valid mobile number starting with 0 or an international code (e.g., +44, +1).');
          return
        }
        
        setIsLoading(true)
        const convertedPhoneNumber = convertToInternationalFormat(phone);

        try {
            // create api route to check db for phone number and get assocated email
            const res = await fetch(`${location.origin}/api/auth/find-email-by-phone`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: convertedPhoneNumber
                })
            })

            // await json response from server and store in const email
            const serverEmail = await res.json()

            if (res.status === 404) {
                throw new Error("We couldn't find an account associated with that phone number. Please check the number or try a different one.")
            } else if (serverEmail.error) {
                console.log('forgot email error:', serverEmail.error)
                throw new Error("We're having trouble processing your request. Please try again later. If the issue persists, contact support.")
            } else if (serverEmail.exists && res.status === 200) {
                setIsLoading(false)
                changeMessage('success', "Success! We've located your account. A verification code has been sent to your email.")

                // store email temporarily in local storage
                localStorage.setItem('email', serverEmail.email)
                setRedirect(true)
            }

        } catch (error) {
            setIsLoading(false);
            // clear cookie if there's an error
            document.cookie = "canAccessOtpPage=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            changeMessage('error', error.message);
        }

      }




      // once email associated with phone number is found send otp from server to recovered email and redirect them to verify-login-otp page
      useEffect(() => {
         if (redirect) {
            router.push('/verify-forgot-email-otp')
         }
      }, [router, redirect])





    // prevent enter submission
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault();
        if (!/[0-9+]/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key)) {
            e.preventDefault();
        }
    }



    
    return (
        <div>
            <div className='flex items-center justify-center sm:shadow-outer sm:p-10 sm:rounded-xl'>

                <form onSubmit={handleSubmit}>
                    <div className='max-w-[330px]'>
                        <h2 className='text-3xl mb-5 font-eb text-saddleBrown'>Recover Your Account</h2>
                        <p className='mb-5 '>Please enter the phone number you used during signup to help us recover your account.</p>

                        <label>
                            <span className='max-w-min mb-2 text-base text-ashGray block'>Phone</span>
                            <input
                                className='w-full max-w-xs py-2.5 px-3 rounded-md text-black'
                                type='tel'
                                value={phone}
                                spellCheck={false}
                                maxLength={15}
                                placeholder="Enter your phone number"
                                onChange={(e) => setPhone(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                        <button className='btn block mt-4 bg-saddleBrown' disabled={isLoading}>
                            {isLoading ? (
                                <div className='flex items-center gap-2'>
                                    <img className="w-5 h-5 opacity-50" src="images/loading/spinner.svg" alt="Loading indicator" />
                                    <span>Submit</span>
                                </div>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ForgotEmail
