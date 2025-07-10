"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";

// components
import OtpForm from "@/app/components/OtpForm";

// hooks
import { useUpdateTable } from "@/app/hooks/useUpdateTable";
import { useUpdateMetadata } from "@/app/hooks/useUpdateMetadata";
import { useMessage } from "@/app/hooks/useMessage";






// yup validation schema
const schema = yup.object({
    codes: yup
        .array()
        .of(
            yup.object({
                code: yup
                    .string()
                    .required('This field is required')  // Ensures each field is filled
                    .matches(/^\d$/, 'The code must consist of only digits')  // Only digits
                    .length(1, 'Each field must be a single digit')  // Ensures exactly one digit per field
            })
        )
        .min(6, 'The code cannot be less than 6 digits')  // Ensures the array has at least 6 digits
        .test('has-enough-digits', 'The code cannot be less than 6 digits', (values) => {
            // Ensures that there are exactly 6 non-empty values
            return values && values.filter((item) => item.code.trim() !== '').length === 6;
        })
});













const ProfileEmailOtpForm = ({ email, contact, verificationType, title, subHeading, successMessage }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [buttonIsDisabled, setButtonIsDisabled] = useState(null)
    const [isActive, setIsActive] = useState(null)
    const [redirect, setRedirect] = useState(false)


    // custom hooks
    const { updateTable } = useUpdateTable()
    const { updateMetadata } = useUpdateMetadata()
    const { changeMessage } = useMessage()


    const router = useRouter()






    // store email in a ref 
    const emailRef = useRef(email);





     
  
     // isButtonDisabled function passed down to timer that fires everytime button is disabled which then allows me to show distinct errors on form submission
     const isButtonDisabled = useCallback((bool) => {
        setButtonIsDisabled(bool)
     }, []);

     useEffect(() => {
        if (buttonIsDisabled && buttonIsDisabled !== null) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
     }, [buttonIsDisabled])









    // react-hook-form
    const form = useForm({
        resolver: yupResolver(schema),
        mode: 'onSubmit',
        defaultValues: {
            codes: [{ code: '' }, { code: '' }, { code: '' }, { code: '' }, { code: '' }, { code: '' }]
        }
    })
    
    // allows us to register a form control
    const { register, handleSubmit, formState, control, setFocus, trigger, reset } = form;
    const { errors } = formState;

    const { fields } = useFieldArray({
        name: 'codes',
        control
    })



    





    // Move focus and validate simultaneously
    const handleInputChange = (e, index) => {
        const value = e.target.value;

        // Update the value for the current input field
        form.setValue(`codes[${index}].code`, value);

        // If a value is entered and we're not at the last field, move focus forward
        if (value && index < fields.length - 1) {
            setFocus(`codes[${index + 1}].code`);
        }
    };

    // Handle the behavior when user presses Backspace or Delete
    const handleKeyDown = (e, index) => {
        const regex = /^[0-9]$/;
        if (!regex.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
            e.preventDefault(); // Prevent non-digit characters
        }
        
        const value = e.target.value;
        if (e.key === 'Backspace' || e.key === 'Delete') {
            // If the field is empty, move focus back to the previous field
            if (!value && index > 0) {
                setFocus(`codes[${index - 1}].code`);
            }
        }
    };










    // verify otp
    const onSubmit = async (data) => {
        // map through codes array, extract input values and then join them into a string 
        const inputValues = data.codes.map(object => object.code)
        const otp = inputValues.join('');

        setIsLoading(true)

        const handleError = (errorMessage) => {
            setIsLoading(false);
            changeMessage('error', errorMessage);
        }


        // Create Supabase client and verify OTP
        const supabase = createClientComponentClient();
        const { data: { session }, error } = await supabase.auth.verifyOtp({
            email: emailRef?.current,
            token: otp,
            type: verificationType
        });


        if (error) {
            setIsLoading(false)            
            console.log(error.message)
            
            if (isActive) {
                handleError('Incorrect. Please double-check the code and try again.')
            } else {
                reset({ codes: fields.map(() => ({ code: '' })) });
                handleError('The code has expired. Please click "Resend Code" to request a new one.')
            }
    
            return

        } else if (session) {

            try {
                
                // check for successful metadata update if not log out error
                const updateMetadataResult = await updateMetadata({ email: emailRef?.current })
                if (!updateMetadataResult.success) {
                    console.log('metadata update error:', updateMetadataResult.error)
                }

                // check for successful profiles update if not throw new error
                const updateTableResult = await updateTable(session.user, 'profiles', { email: emailRef?.current }, 'id')
                if (!updateTableResult.success) {
                    throw new Error(`An unexpected error occurred and we couldn't update your ${contact}. Please try again later. If the issue persists, contact support.`)
                }

                setIsLoading(false)
                setIsVerified(true)
                setRedirect(true)
                changeMessage('success', successMessage)


            } catch (error) {              
                changeMessage('error', error.message)
            }
        }
    }






    useEffect(() => {
       if (redirect) {
          router.push('/profile/edit-profile')
       }
    }, [redirect, router])







    return (
        <div className='main-container flex-1 flex flex-col items-center justify-center w-full max-w-xs md:p-10 md:max-w-md md:rounded-xl md:bg-white md:shadow-outer'> 
            <OtpForm
                containerStyles={'flex flex-col w-full max-w-sm'}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                title={title}
                fields={fields}
                email={emailRef.current}
                register={register}
                handleInputChange={handleInputChange}
                handleKeyDown={handleKeyDown}
                errors={errors}
                isLoading={isLoading}
                formState={formState}
                trigger={trigger}
                profileEmailRef={emailRef}
                isButtonDisabled={isButtonDisabled}
                isVerified={isVerified}
            />
        </div>
    )
}

export default ProfileEmailOtpForm











