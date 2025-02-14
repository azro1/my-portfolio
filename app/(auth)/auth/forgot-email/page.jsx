"use client"

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";

// custom hook to display global messages
import { useMessage } from "@/app/hooks/useMessage";

// server action
import { deleteCanAccessOtpPageCookie } from "../login/actions";



// yup validation schema
const schema = yup.object({
    phone: yup
    .string()
    .required('Phone is required')
    .transform(value => value.replace(/\s+/g, "")) // Remove spaces for length check
    .test('has-valid-prefix', "Phone must start with 0 or a country code (e.g., +44 +1)", value => {
        return value ? value.startsWith('0') || value.startsWith('+') : false;
    })
    .matches(/^(0\d{9,14}|\+\d{1,3}\d{8,12})$/, 'Phone should be between 10 and 15 digits') // Format with 10-15 digits
    .test('valid-length', 'Phone should be between 10 and 15 digits', value => {
        const digits = value.replace(/\D/g, ''); // Remove non-digit characters
        return digits.length >= 10 && digits.length <= 15; // Ensure total digit count is at least 10
    })
});








const ForgotEmail = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const router = useRouter()

    // global messages function
    const { changeMessage } = useMessage()





    // function to convert uk mobile numbers into E.164 format
    const convertToInternationalFormat = (phoneNumber) => {
        // replace local prefix '0' with international code '+44' if it exists
        if (phoneNumber.startsWith('0')) return phoneNumber.replace('0', '+44');
    
        // return as is if already in international format
        return phoneNumber.startsWith('+') ? phoneNumber : phoneNumber;
    };





    // react-hook-form
    const form = useForm({
        resolver: yupResolver(schema),
        mode: 'onSubmit'
    })

    // allows us to register a form control
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
 





    const onSubmit = async (data) => {
        
        setIsLoading(true)
        const phone = data.phone;
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
                changeMessage('success', "We've located your account. A verification code has been sent to your email.")

                // store email temporarily in local storage
                localStorage.setItem('email', serverEmail.email)
                setRedirect(true)
            }

        } catch (error) {
            setIsLoading(false);
            // delete cookie
            await deleteCanAccessOtpPageCookie();
            localStorage.removeItem('email');
            changeMessage('error', error.message);
        }

      }




      // once email associated with phone number is found send otp from server to recovered email and redirect them to verify-login-otp page
      useEffect(() => {
         if (redirect) {
            router.push('/auth/verify-forgot-email-otp')
         }
      }, [router, redirect])



    // prevent enter submission
    const handleKeyDown = (e) => {
        const regex = /^[0-9]$/;
        if (!regex.test(e.key) && e.key !== '+' && e.key !== ' ' && e.key !== 'Backspace' && e.key !== 'Delete') {
            e.preventDefault();
        }
    }



    
    return (
        <div className='main-container relative'>

            <Link className='absolute left-6 -top-10 sm:-top-12' href='/auth/login'>
                <button className='text-nightSky sm:p-1 rounded-md hover:bg-cloudGray transtion-bg duration-300 '>
                    <IoMdArrowBack size={24} />
                </button>
            </Link>

            <div className='w-full flex items-center justify-center bg-white sm:shadow-outer sm:p-12 sm:pt-10 sm:rounded-xl sm:max-w-[420px]'>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div>
                        <h2 className='text-3xl mb-4 font-b text-nightSky'>Forgot Email?</h2>
                        <p className='mb-4 sm:max-w-xs'>Please provide the phone number you used when you signed up</p>

                        <label className='max-w-min mb-2 text-base text-ashGray block' htmlFor='phone'>Phone</label>
                        <input
                            className={`w-full sm:max-w-xs py-2 px-4 rounded-md text-nightSky border-[1px] ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                            id='phone'
                            name='phone'
                            type='tel'
                            placeholder="e.g., 01234 or +44 1234"
                            {...register('phone')}
                            onKeyDown={handleKeyDown}
                        />

                        {errors.phone && (
                            <p className="text-red-500 mt-1 text-sm">{errors.phone.message}</p>
                        )}
                        
                        <button className={`btn block mt-4 ${isLoading ? 'opacity-65' : 'opacity-100'} w-full`} disabled={isLoading}>
                            {isLoading ? (
                                <div className='flex items-center justify-center gap-2'>
                                    <img className="w-6 h-6 opacity-65" src="images/loading/reload.svg" alt="Loading indicator" />
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
