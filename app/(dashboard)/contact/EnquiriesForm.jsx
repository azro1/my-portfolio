"use client"

import { useState, useEffect } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { v4 as uuidv4 } from "uuid"


// custom hooks
import { useFetchProfile } from '@/app/hooks/useFetchProfile';


const EnquiriesForm = ({ user }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [formError, setFormError] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    // custom hook to fetch a users profile
    const { error, profile, fetchProfile } = useFetchProfile()

    const supabase = createClientComponentClient()

  
  
     // watch user prop value to get users profile
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


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (profile) {

            if (!name) {
                setFormError('Please provide a name')
                setTimeout(() => setFormError(null), 2000)
                return

            } else if (!email) {
                setFormError('Please provide your email')
                setTimeout(() => setFormError(null), 2000)
                return

            } else if (!isValidEmail(email)) {
                setFormError('Unable to validate email address: invalid format')
                setTimeout(() => setFormError(null), 2000)
                return

            } else if (!subject) {
                setFormError('Please provide a subject')
                setTimeout(() => setFormError(null), 2000)
                return

            } else if (!message) {
                setFormError('Please enter your message')
                setTimeout(() => setFormError(null), 2000)
                return
            }
            
            setIsLoading(true)

            const { data: enquiries, error: enquiriesError } = await supabase
                .from('profiles')
                .select('*, enquiries(*)')
                .eq('id', user.id)

            if (enquiriesError) {
                setIsLoading(false)
                console.log('enquiriesError:', enquiriesError)
                setFormError('Something went wrong. Please try again later')
                setTimeout(() => setFormError(null), 2000)
                return;
            } else {
                const userEnquiries = enquiries[0].enquiries;

                if (userEnquiries.length >= 2) {
                    setIsLoading(false)
                    setFormError('You have reached the maximum number of enquiries')
                    setTimeout(() => setFormError(null), 2000)
                    return;
                }

                const { data, error } = await supabase.from('enquiries')
                    .insert({
                        id: uuidv4(),
                        created_at: new Date().toISOString(),
                        name,
                        email,
                        subject,
                        message,
                        enquiry_id: profile.id
                    })
                    .select()
                    .single()

                if (error) {
                    setIsLoading(false)
                    setFormError('Something went wrong. Please try again later');
                    setTimeout(() => setFormError(null), 2000)
                }

                if (data) {
                    setIsLoading(false);
                    setSuccessMsg('Message Sent!')
                    setTimeout(() => setSuccessMsg(null), 2000)

                    setName('')
                    setEmail('')
                    setSubject('')
                    setMessage('')
                }
            }

        } else {
            setIsLoading(false)
            setFormError('Please sign up to make an enquiry')
            setTimeout(() => setFormError(null), 2000)
        }
    };


    return (
        <form onSubmit={handleSubmit}
            className='w-full row-start-2 col-start-1 col-span-2 sm:max-w-xs  md:col-span-1 md:row-start-2 md:col-start-2 md:justify-self-end'
        >
            <h3 className='mb-4 text-2xl font-b text-accentRed'>
                Enquiries
            </h3>
            <label>
                {error && <p className='error'>{error}</p>}
                <span className="className='max-w-min mb-2 text-base text-secondary block">
                    Name
                </span>
                <input
                    className='w-full p-2.5 rounded-md'
                    type='text'
                    spellCheck='false'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                <span className="className='max-w-min mt-4 mb-2 text-base text-secondary block">
                    Email
                </span>
                <input
                    className='w-full p-2.5 rounded-md'
                    type='text'
                    spellCheck='false'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                <span className="className='max-w-min mt-4 mb-2 text-base text-secondary block">
                    Subject
                </span>
                <input
                    className='w-full p-2.5 rounded-md'
                    type='text'
                    spellCheck='false'
                    placeholder='Subject'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
            </label>
            <label>
                <span className="className='max-w-min mt-4 mb-2 text-base text-secondary block">
                    Your Message
                </span>
                <textarea
                    className='p-2 outline-none text-base w-4/5'
                    placeholder='Enter you message here...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    cols='30'
                    rows='4'
                ></textarea>
            </label>

        
    
            <button className='btn block mt-2 bg-accentRed'>{isLoading ? 'Sending...' : 'Send'}</button>
            <div className="mt-5 h-5 text-center">
                {formError && <p className='error'>{formError}</p>}
                {successMsg && <p className='success'>{successMsg}</p>}
            </div>
        </form>
    )
}

export default EnquiriesForm
