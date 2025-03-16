"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";


// components
import OtpForm from "../components/OtpForm";
import Loading from "../components/Loading";

// custom hooks
import { useUpdateTable } from "../hooks/useUpdateTable";
import { useMessage } from "../hooks/useMessage";


// server actions
import { getUploadAvatarToken } from "../actions";




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










const AuthOtpForm = ({ redirectUrl, title, subHeading, successMessage }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [buttonIsDisabled, setButtonIsDisabled] = useState(null)
    const [isActive, setIsActive] = useState(null)
    const [hasVisitedRegPage, setHasVisitedRegPage] = useState(false);
    const [user, setUser] = useState(null);
    const [isFlagChecked, setIsFlagChecked] = useState(false);

    const supabase = createClientComponentClient()
    const router = useRouter()

    // destructure custom hooks
    const { updateTable } = useUpdateTable()
    const { changeMessage } = useMessage()








    const emailRef = useRef(null);

    useEffect(() => {
        const userEmail = localStorage.getItem('email');
        if (userEmail) {
            emailRef.current = userEmail;            
            localStorage.removeItem('email');
        } 
    }, []);











    // if they navigate back store user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();
                if (error) {
                    setUser(null);
                    return;
                }
                setUser(data?.user || null);
            } catch (error) {
                console.error("Unexpected error fetching user:", error);
                setUser(null);
            }
        };
        fetchUser();
    }, [supabase]);

    









    // if they navigate back check flag in db that we set in registration and refresh so that server detects missing otp token
    useEffect(() => {
        if (user && !isFlagChecked) {
            // console.log(user)
            const checkRegistrationFlag = async () => {
                try {
                    setHasVisitedRegPage(true)
                    const { data, error } = await supabase
                    .from('profiles')
                    .select('has_visited_reg')
                    .eq('id', user.id)
                    .single();

                    if (error) {
                        setHasVisitedRegPage(false);
                        console.error(error);
                        return;
                    } 
                    
                    if (data?.has_visited_reg) {
                        // reset flag in the table
                        await updateTable(user, 'profiles', { has_visited_reg: false }, 'id');
                        await supabase.auth.signOut()
                        router.refresh();
                        changeMessage('error', "You're registration was interrupted. Please try again later.");
                    } 

                } catch (error) {
                    console.log('profiles error:', error.message)
                    // reset flag in the table
                    const flagResult = await updateTable(user, 'profiles', { has_visited_reg: false }, 'id');
                    console.log('flag reset:', flagResult)
                    setIsFlagChecked(false);
                    setHasVisitedRegPage(false);
                } finally {
                    setIsFlagChecked(true);
                    setHasVisitedRegPage(false);
                }
            }
            checkRegistrationFlag();
        }
    }, [user, isFlagChecked, supabase, router]);










    
  









    // isButtonDisabled function passed down to timer that fires everytime button is disabled which then allows me to show distinct errors on form submission
    const isButtonDisabled = (bool) => {
        setButtonIsDisabled(bool)
     }

  

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
            } else if (session) {
               // after otp verification is successful it's at this point we have access to user object
                setIsLoading(false);


                // query db table for verification and registration flags
                const { data, error } = await supabase
                .from('profiles')
                .select('is_verified, is_reg_complete')
                .eq('id', session.user.id)
                .limit(1)
                .single()
                    
                if (error) {
                    console.log(error)
                }

                // when they have previously passed verification but left without completing registration
                if (data?.is_verified && !data?.is_reg_complete) {
                    // make request to endpoint to set reg token in redis
                    try {
                        const res = await fetch(`${location.origin}/api/auth/set-reg-token`, {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ 
                                user: session.user 
                            })
                        })
    
                        if (!res.ok) {
                           throw new Error(res.statusText)
                        }
                        const registrationResponse = await res.json();

                        if (res.status === 200 && registrationResponse.token) {
                            const avtrUplFlg = await getUploadAvatarToken();

                            if (avtrUplFlg) {
                                router.push('/register-form')
                            } else {
                                router.push('/upload-avatar');
                            }

                            localStorage.removeItem('hasVisitedOtpPage');
                            changeMessage('success', `Welcome back, please finish creating your profile`);                        
                        }

                    } catch (error) {
                        console.log(error.message)
                    }

                // when they are loggin back in
                } else if (data?.is_verified && data?.is_reg_complete) {
                    localStorage.removeItem("hasVisitedOtpPage");
                    setIsVerified(true)
                    reset({ codes: fields.map(() => ({ code: '' })) });
                    changeMessage('success', successMessage);
                    setRedirect(true);

                } else {
                    // when they are first time users 
                    const is_verifiedResult = await updateTable(session.user, 'profiles', { is_verified: true }, 'id');
                    if (!is_verifiedResult.success) {
                        console.log('auth otp page: could not update otp verification status');
                    }
                    
                    setIsVerified(true)
                    reset({ codes: fields.map(() => ({ code: '' })) });
                    changeMessage('success', successMessage);


                    // make request to endpoint to set reg token in redis
                    try {
                        const res = await fetch(`${location.origin}/api/auth/set-reg-token`, {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ 
                                user: session.user 
                            })
                        })
    
                        if (!res.ok) {
                           throw new Error(res.statusText)
                        }
                        const registrationResponse = await res.json();

                        if (res.status === 200 && registrationResponse.token) {
                            localStorage.removeItem('hasVisitedOtpPage');
                            setRedirect(true);
                        }

                    } catch (error) {
                        console.log(error.message)
                    }
                }
            }

        } catch (error) {
            setIsLoading(false);
            localStorage.setItem('hasVisitedOtpPage', 'true');
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
            router.push(redirectUrl);
        }
    }, [redirect, redirectUrl, router]);





    return (
        <>
            {hasVisitedRegPage ? (
                <Loading />
            ) : (
                <OtpForm
                    containerStyles={'sm:shadow-outer sm:p-10 sm:rounded-xl bg-white'}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    title={title}
                    subHeading={subHeading}
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
        </>

    )
}

export default AuthOtpForm

