"use client"

import { useState, useEffect } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { v4 as uuidv4 } from "uuid"
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

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
    const [toggleCaret, setToggleCaret] = useState(false)

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

    // validation function returns regex to strip out harmful chars
    const containsInvalidChars = (value) => /[<>\/\\`"'&]/.test(value);


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (profile) {

            if (!name) {
                setFormError('First name is required.')
                setTimeout(() => setFormError(null), 2000)
                return

            } else if (containsInvalidChars(name)) {
                setFormError('Invalid characters detected.')
                setTimeout(() => setFormError(null), 2000)
                return

            } else if (!email) {
                setFormError('Email is required.')
                setTimeout(() => setFormError(null), 2000)
                return

            } else if (!isValidEmail(email)) {
                setFormError('Invalid email format.')
                setTimeout(() => setFormError(null), 2000)
                return

            } else if (!message) {
                setFormError('Message is required.')
                setTimeout(() => setFormError(null), 2000)
                return

            }  else if (containsInvalidChars(message)) {
                setFormError('Invalid characters detected.')
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
                setFormError('Something went wrong. Please try again later.')
                setTimeout(() => setFormError(null), 2000)
                return;
            } else {
                const userEnquiries = enquiries[0].enquiries;

                if (userEnquiries.length >= 2) {
                    setIsLoading(false)
                    setFormError('Enquiry limit reached.')
                    setTimeout(() => setFormError(null), 2000)
                    return;
                }



                 // here i log the value
                 console.log(subject)


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
            setFormError('Please sign up.')
            setTimeout(() => setFormError(null), 2000)
        }
    };


    // prevent enter submission and only specified keys
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault()
        
        if (!/^[A-Za-z]$/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
            e.preventDefault()
        }
    }

    // toggle caret icon for select
    const handleToggleCaret = () => {
        setToggleCaret(prev => !prev);
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3 className='mb-4 text-2xl font-b text-saddleBrown'>
                    Enquiries
                </h3>
                <label>
                    {error && <p className='error'>{error}</p>}
                    <span className="className='max-w-min mb-2 text-base text-stoneGray block">
                        First name
                    </span>
                    <input
                        className='w-full p-2.5 rounded-md text-black'
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
                    <span className="className='max-w-min mt-4 mb-2 text-base text-stoneGray block">
                        Email
                    </span>
                    <input
                        className='w-full p-2.5 rounded-md text-black border-2'
                        type='text'
                        spellCheck='false'
                        placeholder='Email'
                        maxLength={50}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span className="className='max-w-min mt-4 mb-2 text-base text-stoneGray block">
                        Subject
                    </span>
                    <div className='custom-select relative'>
                        <select 
                            className='w-full py-2.5 px-1.5 rounded-md outline-none text-black border-2 cursor-pointer' 
                            onClick={handleToggleCaret} 
                            onChange={(e) => setSubject(e.target.value)}
                        >
                            <option>General Inquiry</option>
                            <option>Collaboration Opportunity</option>
                            <option>Portfolio Feedback</option>
                            <option>Project Proposal</option>
                            <option>Job Opportunity</option>
                            <option>Request for Services</option>
                            <option>Website Issue or Bug</option>
                        </select>
                        <span className='absolute top-0 right-0 w-10 bg-white border-t-2 border-r-2 border-b-2 rounded-tr-md rounded-br-md h-full pointer-events-none flex items-center justify-center'>
                            {!toggleCaret ? (
                                <FaCaretUp className='text-nightSky' size={18} />
                            ) : (
                                <FaCaretDown className='text-nightSky' size={18} />
                            )}
                        </span>
                    </div>


                
                </label>
                <label>
                    <span className="className='max-w-min mt-4 mb-2 text-base text-stoneGray block">
                        Your Message
                    </span>
                    <textarea
                        className='py-2 px-2.5 outline-none rounded-md w-4/5 text-black'
                        placeholder='Enter your message here...'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        cols='30'
                        rows='4'
                    ></textarea>
                </label>

                <button className='btn block mt-2 bg-saddleBrown'>
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
            <div className="absolute -bottom-14 text-center w-full">
                {formError && <p className='error'>{formError}</p>}
                {successMsg && <p className='success'>{successMsg}</p>}
            </div>
        </>

    )
}

export default EnquiriesForm
