"use client"

import { useState, useEffect } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { v4 as uuidv4 } from "uuid"


// hooks
import { useFetchProfile } from '@/app/hooks/useFetchProfile';


const EnquiriesForm = ({ user }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [formError, setFormError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    // custom hook
    const { error, profile, fetchProfile } = useFetchProfile()
  
  
     // watch user prop value to get users profile
    useEffect(() => {
      if (user) {
        fetchProfile(user)
      }
    }, [user])


    // clear messages
    const clearFormMessages = () => {
        setTimeout(() => {
            setFormError('')
            setSuccessMsg('')
        }, 2000)
    }

    // check if a given string is a valid email address
    const isValidEmail = (value) => {
        const emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', 'u')
        return emailRegex.test(value)
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (profile) {

            if (!name) {
                setFormError('Please provide a name.')
                setIsLoading(false)
                clearFormMessages()
                return

            } else if (!email) {
                setFormError('Please provide your email.')
                setIsLoading(false)
                clearFormMessages()
                return

            } else if (!isValidEmail(email)) {
                setFormError('Unable to validate email address: invalid format.')
                setIsLoading(false)
                clearFormMessages()
                return

            } else if (!subject) {
                setFormError('Please provide a subject.')
                setIsLoading(false)
                clearFormMessages()
                return

            } else if (!message) {
                setFormError('Please enter your message.')
                setIsLoading(false)
                clearFormMessages()
                return
            }

            const supabase = createClientComponentClient()

            const { data: enquiries, error: enquiriesError } = await supabase
                .from('profiles')
                .select('*, enquiries(*)')
                .eq('id', user.id)

            if (enquiriesError) {
                console.log('enquiriesError:', enquiriesError)
                setFormError('Something went wrong. Please try again later.')
            } else {
                const userEnquiries = enquiries[0].enquiries;

                if (userEnquiries.length >= 2) {
                    setIsLoading(false)
                    setFormError('You have reached the maximum number of enquiries.')
                    return
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
                    setFormError('Something went wrong. Please try again later.');
                }

                if (data) {
                    setSuccessMsg('Message Sent!')
                    setIsLoading(false);
                    clearFormMessages()

                    setName('')
                    setEmail('')
                    setSubject('')
                    setMessage('')
                }
            }

        } else {
            setIsLoading(false)
            setFormError('Please sign up to make an enquiry.')
            clearFormMessages()
        }
    };


    return (
        <form onSubmit={handleSubmit}
            className='w-full row-start-2 col-start-1 col-span-2 sm:max-w-xs  md:col-span-1 md:row-start-2 md:col-start-2 md:justify-self-end'
        >
            <h3 className='mb-4 text-2xl font-b font-rubik text-hint'>
                Enquiries
            </h3>
            <label>
                {error && <p className='error'>{error}</p>}
                <span className="className='max-w-min mb-2 text-sm font-os text-secondary block">
                    Name
                </span>
                <input
                    className='w-full p-2.5 rounded-md text-sm'
                    type='text'
                    spellCheck='false'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                <span className="className='max-w-min mt-4 mb-2 text-sm font-os text-secondary block">
                    Email
                </span>
                <input
                    className='w-full p-2.5 rounded-md text-sm'
                    type='text'
                    spellCheck='false'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                <span className="className='max-w-min mt-4 mb-2 text-sm font-os text-secondary block">
                    Subject
                </span>
                <input
                    className='w-full p-2.5 rounded-md text-sm'
                    type='text'
                    spellCheck='false'
                    placeholder='Subject'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
            </label>
            <label>
                <span className="className='max-w-min mt-4 mb-2 text-sm font-os text-secondary block">
                    Your Message
                </span>
                <textarea
                    className='p-2 outline-none text-sm'
                    placeholder='Enter you message here...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    cols='30'
                    rows='4'
                ></textarea>
            </label>
            {formError && <p className='error'>{formError}</p>}
            {successMsg && <p className='success'>{successMsg}</p>}
            <div>
                {isLoading && (
                    <button className='btn mt-2 bg-hint'>Processing...</button>
                )}
                {!isLoading && (
                    <button className='btn mt-2 bg-hint'>Submit</button>
                )}
            </div>
        </form>
    )
}

export default EnquiriesForm
