"use client"

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Link from "next/link";


// components
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";

// custom hook to display global messages
import { useMessage } from "@/app/hooks/useMessage";

// server actions
import { setEmail } from "@/app/actions";





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



    // refresh is user navigates back from otp form 
    useEffect(() => {
        router.refresh();
    }, [router])

    


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

            // await json response from server and store in const emailResponse
            const emailResponse = await res.json()

            if (res.status === 404) {
                throw new Error("We couldn't find an account associated with that phone number. Please check the number or try a different one.")

            } else if (emailResponse.error) {
                console.log('forgot email error:', emailResponse.error)
                throw new Error("We're having trouble processing your request. Please try again later. If the issue persists, contact support.")

            }  else if (res.status === 401) {
                setIsLoading(false);
                throw new Error(`To prevent spam and abusive behavior cooldown is active. You must wait ${emailResponse.minutesLeft}m ${emailResponse.secondsLeft}s before you can request a new verification code.`)
            
            } else if (emailResponse.exists && res.status === 200) {
                setIsLoading(false)
                changeMessage('success', "Good news! We've located your account. A verification code has been sent to your email.")

                // store email in redis
                await setEmail(emailResponse.email);
                setRedirect(true);    
            }

        } catch (error) {
            setIsLoading(false);
            changeMessage('error', error.message);
        }

      }




      // once email associated with phone number is found send otp from server to recovered email and redirect them to verify-login-otp page
      useEffect(() => {
         if (redirect) {
            router.push('/verify-login-otp')
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
        <div className='main-container flex flex-col items-center justify-center gap-4 w-full md:static md:bg-white md:max-w-sm md:shadow-outer md:p-10 md:pb-6 md:rounded-xl'>

            <div className='flex-1 w-full max-w-xs'>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div>
                        <Heading className='text-[26px] text-center mb-3 font-b text-nightSky md:text-[28px]'>
                            Recover Email
                        </Heading>

                        <label className='max-w-min mb-2 text-base font-light text-ashGray block' htmlFor='phone'>Phone</label>
                        <input
                            className={`w-full sm:max-w-xs py-2.5 px-4 rounded-md text-nightSky border-[1px] ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                            id='phone'
                            name='phone'
                            type='tel'
                            placeholder="e.g., 01234 or +44 1234"
                            {...register('phone')}
                            onKeyDown={handleKeyDown}
                        />

                        {errors.phone && (
                            <p className="form-error mt-1">{errors.phone.message}</p>
                        )}

                        <div className='mt-4'>
                            <Button
                                isLoading={isLoading}
                                padding='p-3'
                                width='w-full'
                                backgroundColor='bg-nightSky'
                                text='Submit'
                            />
                        </div>

                    </div>
                </form>
            </div>

            <div>
                <Link href='/login'>
                    <span className='font-r text-nightSky'>Login</span> 
                </Link>
            </div>

        </div>
    )
}

export default ForgotEmail
