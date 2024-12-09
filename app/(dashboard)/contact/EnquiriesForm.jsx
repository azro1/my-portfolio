"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import disposableDomains from 'disposable-email-domains';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid"

// components
import CustomSelectDropdown from "./CustomSelectDropdown";

// hooks
import { useFetchProfile } from '@/app/hooks/useFetchProfile';
import { useMessage } from '@/app/hooks/useMessage';









// yup validation schema
const schema = yup.object({
    firstname: yup
    .string()
    .required('Firstname is required')
    .transform(value => value.trim())
    .matches(/^[A-Z][a-z]*$/, "Your first name must start with an uppercase letter, with no digits or spaces."),

    email: yup
      .string()
      .required('Email is required')
      .transform(value => value.trim().toLowerCase())
      .test('has-at-symbol', "Please include an '@' symbol.", value => {
        return value ? value.includes('@') : true;
      })
      .email("Please use a valid domain, e.g., gmail.com")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid domain, e.g., gmail.com")
      .test('is-not-disposable', 'Disposable email addresses are not allowed.', value => {
        if (value) {
          const domain = value.split('@')[1];  // Extract domain from email
          return !disposableDomains.includes(domain);  // Check if domain is in disposable list
        }
        return true;  // If no value, pass validation
      }),

    subject: yup
      .string()
      .required('Subject is required'),

    message: yup
      .string()
      .required('Message is required')
      .transform(value => value.trim())
  });








const EnquiriesForm = ({ user }) => {
    // const [subject, setSubject] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // custom hook to fetch a users profile
    const { profile, fetchProfile } = useFetchProfile()
    // global messages function
    const { changeMessage } = useMessage()

    const supabase = createClientComponentClient()

    const options = [
        "General Inquiry",
        "Collaboration Opportunity",
        "Portfolio Feedback",
        "Project Proposal",
        "Job Opportunity",
        "Request for Services",
        "Website Issue or Bug",
    ];


    // watch user prop value to get users profile and show profile error if there is one
    useEffect(() => {
      if (user) {
        fetchProfile(user)
      }
    }, [user])







    // react-hook-form
    const form = useForm({
        resolver: yupResolver(schema),
        mode: 'onSubmit',
        defaultValues: {
            subject: ''
        }
    })

    // allows us to register a form control
    const { register, handleSubmit, formState, control, reset } = form;
    const { errors } = formState;









    const onSubmit = async (data) => {
            if (user) {
                console.log('Submitted!')


                const sanitizeInput = (input) => {
                    return input.replace(/[&<>]/g, (char) => {
                        const entityMap = {
                            '&': '&amp;',
                            '<': '&lt;',
                            '>': '&gt;',
                        };
                        return entityMap[char] || char;
                    });
                };


                const sanitizedData = {
                    firstname: sanitizeInput(data.firstname),
                    message: sanitizeInput(data.message),
                }

                const first_name = sanitizedData.firstname;
                const email = data.email;
                const subject = data.subject;
                const message = sanitizedData.message;

                
                setIsLoading(true)

                const { data: enquiries, error: enquiriesError } = await supabase
                    .from('profiles')
                    .select('*, enquiries(*)')
                    .eq('id', user.id)

                if (enquiriesError) {
                    setIsLoading(false)
                    changeMessage('error', 'Your enquiry could not be sent at this time due to an unexpected error. Please try again later. If the issue persists, contact support.')
                    console.log('enquiriesError:', enquiriesError)
                    return;
                } else {
                    const userEnquiries = enquiries[0].enquiries;

                    if (userEnquiries.length >= 2) {
                        setIsLoading(false)
                        changeMessage('error', "You've reached the maximum limit for enquiries. Please try again later.")
                        reset();
                        return;
                    }

                    if (!profile) {
                        setIsLoading(false)
                        changeMessage('error', "An error occured at our end and we're fixing it. Please try again later. If the issue persists, contact support.");
                        return
                    }

                    const { data, error } = await supabase.from('enquiries')
                        .insert({
                            id: uuidv4(),
                            created_at: new Date().toISOString(),
                            first_name,
                            email,
                            subject,
                            message,
                            enquiry_id: profile.id
                        })
                        .select()
                        .single()

                    if (error) {
                        setIsLoading(false)
                        changeMessage('error', 'Oops! We encountered an issue while submitting your enquiry. Please try again in a moment.');
                    }

                    if (data) {
                        setIsLoading(false);
                        changeMessage('success', "Your message has been sent. We'll get back to you soon.")
                        reset();
                    }
                }

            } else {
                setIsLoading(false)
                changeMessage('error', "It seems you don't have an account yet. Please sign up to make an enquiry.")
            }
    };




    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <h3 className='mb-4 text-2xl font-b text-saddleBrown'>
                    Enquiries
                </h3>
                <div className='flex flex-col gap-2'>
                    <label className='max-w-max text-base text-ashGray block' htmlFor='firstname'>First name</label>
                    <input
                        id='firstname'
                        type='text'
                        {...register('firstname')}
                        spellCheck='false'
                        placeholder='First name'
                        maxLength={30}
                        className='w-full p-2.5 rounded-md text-stoneGray bg-softCharcoal border-[1px] border-ashGray'
                    /> 
                    <p className='text-red-600 text-sm'>{errors.firstname?.message}</p>       
                </div>

                <div className='flex flex-col gap-2 mt-2'>
                    <label className='max-w-min text-base text-ashGray block' htmlFor='email'>Email</label>
                    <input
                        id='email'
                        type='text'
                        {...register('email')}
                        spellCheck='false'
                        placeholder='Email'
                        autoComplete="email"
                        maxLength={50}
                        className='w-full p-2.5 rounded-md text-stoneGray bg-softCharcoal border-[1px] border-ashGray'
                    />
                    <p className='text-red-600 text-sm'>{errors.email?.message}</p>       
                </div>

                <div>
                    <Controller 
                        name='subject'
                        control={control}
                        render={({ field }) => (
                            <CustomSelectDropdown
                                label="Subject"
                                options={options}
                                setSubject={field.onChange}
                                subject={field.value}
                            />
                        )}
                    />
                    <p className='text-red-600 text-sm mt-2'>{errors.subject?.message}</p>       
                </div>

                <div className='flex flex-col gap-2 mt-4'>
                    <label className="className='max-w-min text-base text-ashGray block" htmlFor='message'>Your Message</label>
                    <textarea
                        id='message'
                        cols='30'
                        rows='4'
                        {...register('message')}
                        placeholder='Enter your message here...'
                        className='py-2 px-2.5 outline-none rounded-md w-4/5 text-stoneGray bg-softCharcoal border-[1px] border-ashGray'
                    ></textarea>
                    <p className='text-red-600 text-sm'>{errors.message?.message}</p>       
                </div>

                <button className='btn block mt-2 bg-saddleBrown' disabled={isLoading}>
                    {isLoading ? (
                        <div className='flex items-center gap-2'>
                            <img className="w-5 h-5 opacity-50" src="../images/loading/spinner.svg" alt="Loading indicator" />
                            <span>Sending</span>
                        </div>
                    ) : (
                        'Send'
                    )}
                </button>
            </form>
        </>

    )
}

export default EnquiriesForm
