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





import Button from '@/app/components/Button';



// yup validation schema
const schema = yup.object({
    firstname: yup
      .string()
      .required('Firstname is required')
      .transform(value => {
        if (value) {
          // Transform to lowercase but keep the first letter uppercase
          return value.trim().charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }
        return value; // Return the value if empty
      })
      .matches(/^[A-Z][a-z]*$/, "Firstname should not contain any digits or spaces")
      .min(3, 'Firstname must be at least 3 characters long'),

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
    const [isLoading, setIsLoading] = useState(false)

    const { profile, fetchProfile } = useFetchProfile()
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
    }, [user, fetchProfile])







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
        <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* <h3 className='mb-4 font-b text-nightSky text-1.375 md:text-2xl'>
                    Enquiries
                </h3> */}
                <div className='flex flex-col'>
                    <label className='max-w-max text-base font-light text-ashGray block mb-2' htmlFor='firstname'>First name</label>
                    <input
                        id='firstname'
                        type='text'
                        {...register('firstname')}
                        spellCheck='false'
                        maxLength={30}
                        className={`w-full py-2.5 px-4 rounded-md border-[1px] ${errors.firstname ? 'border-red-600' : 'border-cloudGray'}`}
                    /> 
                    {errors.firstname && <p className='form-error mt-1'>{errors.firstname?.message}</p>}       
                </div>

                <div className='flex flex-col mt-2'>
                    <label className='max-w-min text-base font-light text-ashGray block mb-2' htmlFor='email'>Email</label>
                    <input
                        id='email'
                        type='text'
                        {...register('email')}
                        spellCheck='false'
                        autoComplete="email"
                        maxLength={50}
                        className={`w-full py-2.5 px-4 rounded-md border-[1px] ${errors.email ? 'border-red-600' : 'border-cloudGray'}`}
                    />
                    {errors.email && <p className='form-error mt-1'>{errors.email?.message}</p>}       
                </div>

                <div className='mt-2'>
                    <Controller 
                        name='subject'
                        control={control}
                        render={({ field }) => (
                            <CustomSelectDropdown
                                label="Subject"
                                options={options}
                                setSubject={field.onChange}
                                subject={field.value}
                                errors={errors}
                            />
                        )}
                    />
                    {errors.subject && <p className='form-error mt-1'>{errors.subject?.message}</p>}       
                </div>

                <div className='flex flex-col mt-2'>
                    <label className="className='max-w-min text-base font-light text-ashGray block mb-2" htmlFor='message'>Your Message</label>
                    <textarea
                        id='message'
                        cols='30'
                        rows='4'
                        {...register('message')}
                        className={`py-2.5 px-4 outline-none rounded-md w-4/5 border-[1px] ${errors.message ? 'border-red-600' : 'border-cloudGray'} resize-none`}
                    ></textarea>
                    {errors.message && <p className='form-error mt-1'>{errors.message?.message}</p>}       
                </div>

                <div className="flex flex-col mt-3">
                    <Button
                        isLoading={isLoading}
                        padding='py-2 px-3.5'
                        width='w-max'
                        backgroundColor='bg-nightSky'
                        text='Send'
                    />
                </div>

            </form>
        </div>

    )
}

export default EnquiriesForm
