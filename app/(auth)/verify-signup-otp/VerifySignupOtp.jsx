"use client"



import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import Image from "next/image";

// components
import OtpForm from "@/app/components/OtpForm";

// custom hooks
import { useUpdateTable } from "@/app/hooks/useUpdateTable";
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
















const VerifySignupOtp = ({ email }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [buttonIsDisabled, setButtonIsDisabled] = useState(null)
    const [isActive, setIsActive] = useState(null)
    const [hasVisitedRegPage, setHasVisitedRegPage] = useState(false);


    const supabase = createClientComponentClient()
    const router = useRouter()

    // destructure custom hooks
    const { updateTable } = useUpdateTable()
    const { changeMessage } = useMessage()








    // store email in a ref 
    const emailRef = useRef(email);







    useEffect(() => {
        setHasVisitedRegPage(localStorage.getItem('hasVisitedRegPage') === 'true');
    }, []);



          
    
  


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
        mode: 'onSubmt',
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
        
   
        try {
            setIsLoading(true)

            const { data: { session }, error } = await supabase.auth.verifyOtp({
                email: emailRef.current,
                token: otp,
                type: 'email'
            })

            if (error) {
                throw new Error(error.message);
            } 

            if (!session) {
                throw new Error("OTP verification failed. Please try again.");
            }
            
            
            // after otp verification is successful it's at this point we have access to user object
            setIsLoading(false);

            
            // when they are first time users 
            const is_verifiedResult = await updateTable(session.user, 'profiles', { is_verified: true }, 'id');
            if (!is_verifiedResult.success) {
                console.log('auth otp page: could not update otp verification status');
            }
            
            setIsVerified(true)
            reset({ codes: fields.map(() => ({ code: '' })) });
            changeMessage('success', "Success! Your code has been verified and we're creating your account.");
            setRedirect(true);
            

        } catch (error) {
            setIsLoading(false);
            console.log('auth otp error:', error.message);
            
            if (isActive) {
               changeMessage('error', 'Incorrect. Please double-check the code and try again.')
            } else {
                reset({ codes: fields.map(() => ({ code: '' })) });
                changeMessage('error', 'The code has expired. Please click "Resend Code" to request a new one.')
            }
        }
    }



    // redirect if otp verification is successful
    useEffect(() => {
        if (redirect) {
            router.push('/upload-avatar');
        }
    }, [redirect, router]);





    return (
        <div className='flex items-center justify-center'>
            {hasVisitedRegPage === null ? null : hasVisitedRegPage ? (
                <Image
                    width={64}
                    height={64}
                    src="/images/loading/pulse_lightbg.svg"  
                    alt="A pulsating loading animation on a light background" 
                />
            ) : (
                <OtpForm
                    containerStyles={'sm:shadow-outer sm:p-10 sm:rounded-xl bg-white'}
                    handleSubmit={form.handleSubmit}
                    onSubmit={onSubmit}
                    title={'Sign up'}
                    subHeading={'Enter the verification code sent to your email to activate your account'}
                    fields={fields}
                    register={register}
                    handleInputChange={handleInputChange}
                    handleKeyDown={handleKeyDown}
                    errors={errors}
                    isLoading={isLoading}
                    formState={formState}
                    trigger={trigger}
                    authGroupEmailRef={emailRef}
                    isButtonDisabled={isButtonDisabled}
                    isVerified={isVerified}
            /> 
           )}
        </div>
    )
}




export default VerifySignupOtp
