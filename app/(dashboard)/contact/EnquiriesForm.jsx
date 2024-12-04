"use client"

import { useState, useEffect } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { v4 as uuidv4 } from "uuid"

// components
import CustomSelectDropdown from "./CustomSelectDropdown";

// custom hooks
import { useFetchProfile } from '@/app/hooks/useFetchProfile';
// custom hook to display global messages
import { useMessage } from '@/app/hooks/useMessage';

const EnquiriesForm = ({ user }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // custom hook to fetch a users profile
    const { profile, fetchProfile } = useFetchProfile()
    // global messages function
    const { changeMessage } = useMessage()

    const options = [
        "General Inquiry",
        "Collaboration Opportunity",
        "Portfolio Feedback",
        "Project Proposal",
        "Job Opportunity",
        "Request for Services",
        "Website Issue or Bug",
    ];

    const supabase = createClientComponentClient()

     // watch user prop value to get users profile and show profile error if there is one
    useEffect(() => {
      if (user) {
        fetchProfile(user)
      }
    }, [user])


    // check if a given string is a valid email address
    const isValidEmail = (value) => {
        const emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', 'u')
        return emailRegex.test(value)
    };

    // validation function returns regex to strip out harmful chars
    const containsInvalidChars = (value) => /[<>\/\\`"'&]/.test(value);


    const handleSubmit = async (e) => {
        e.preventDefault()

            if (user) {
                if (!name) {
                    changeMessage('error', 'Please enter your first name to proceed.')
                    return

                } else if (containsInvalidChars(name)) {
                    changeMessage('error', 'Your name contains invalid characters. Please use letters only.')
                    return

                } else if (!email) {
                    changeMessage('error', 'We need your email address to respond to your enquiry.')
                    return

                } else if (!isValidEmail(email)) {
                    changeMessage('error', "That doesn't seem like a valid email address. Please check and try again.")
                    return

                } else if (!message) {
                    changeMessage('error', 'Please include a message so we can assist you better.')
                    return

                }  else if (containsInvalidChars(message)) {
                    changeMessage('error', 'Your message contains characters that are not allowed. Please remove them and try again.')
                    return
                }

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
                            first_name: name,
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

                        setName('')
                        setEmail('')
                        setSubject('')
                        setMessage('')
                    }
                }

            } else {
                setIsLoading(false)
                changeMessage('error', "It seems you don't have an account yet. Please sign up to make an enquiry.")
            }
    };


    // prevent enter submission and only specified keys
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault()
        
        if (!/^[A-Za-z]$/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
            e.preventDefault()
        }
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3 className='mb-4 text-2xl font-b text-saddleBrown'>
                    Enquiries
                </h3>
                <label>
                    <span className="className='max-w-min mb-2 text-base text-ashGray block">
                        First name
                    </span>
                    <input
                        className='w-full p-2.5 rounded-md text-stoneGray bg-softCharcoal border-2 border-ashGray border-opacity-55'
                        type='text'
                        spellCheck='false'
                        placeholder='Name'
                        maxLength={30}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </label>
                <label>
                    <span className="className='max-w-min mt-4 mb-2 text-base text-ashGray block">
                        Email
                    </span>
                    <input
                        className='w-full p-2.5 rounded-md text-stoneGray bg-softCharcoal border-2 border-ashGray border-opacity-55'
                        type='text'
                        spellCheck='false'
                        placeholder='Email'
                        maxLength={50}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
  
                <CustomSelectDropdown 
                    label='Subject'
                    options={options}
                    setSubject={setSubject}
                    subject={subject}
                />

                <label>
                    <span className="className='max-w-min mt-4 mb-2 text-base text-ashGray block">
                        Your Message
                    </span>
                    <textarea
                        className='py-2 px-2.5 outline-none rounded-md w-4/5 text-stoneGray bg-softCharcoal border-2 border-ashGray border-opacity-55'
                        placeholder='Enter your message here...'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        cols='30'
                        rows='4'
                    ></textarea>
                </label>

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
