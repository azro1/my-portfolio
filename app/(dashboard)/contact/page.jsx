'use client';

import { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Icons from '@/app/components/Icons';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// metadata
export const metadata = {
  title: 'My Portfolio | Contact Me',
  description: 'Get in touch with with me.',
};

const Contact = () => {
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState('')
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [msgError, setMsgError] = useState('')
  const [isMsgLoading, setIsMsgLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');


  const supabase = createClientComponentClient();




  // get currently logged in user
  useEffect(() => {
    setError('');
    async function getUser() {
      try {
        const {data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        if (session) {
          const user = session.user;
          setUser({ ...user });
        }
      } catch (err) {
        setError(err.message);
      } 
    }
    getUser();
  }, []);
  




  // main form (right)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsMsgLoading(true)

    setName('')
    setEmail('')
    setSubject('')
    setMessage('')
    setMsgError('')

    const {data, error} = await supabase.from('enquiries')
      .insert({
        name,
        email,
        subject,
        message
      })
      .select()
      .single()
      
      if (error) {
        setMsgError(error.message)
        setIsMsgLoading(false)
      }

      if (data) {
        setSuccessMsg('Message Sent!')
        setIsMsgLoading(false)

        function clearSuccessMsg() {
          setSuccessMsg('')
        }
        setTimeout(clearSuccessMsg, 2000)
      }
  };

  



  //  comment
  const handleComment = async (e) => {
    e.preventDefault();
    setIsCommentLoading(true)
    setCommentError('')
    setComment('')
  
    const res = await fetch(`${location.origin}/api/auth/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment
      })
    })  

    const json = await res.json()

    if (json.error) {
      setIsCommentLoading(false)
      setCommentError(error.message)
      console.log(error.message)
    }

    if (json.data) {
      setIsCommentLoading(false)
      // console.log(json.data)
      //  subscribe to realtime data
    }
    
  };



  return (
    <main className='my-4.5 md:mt-6.25'>
      <div className='grid grid-col-1 gap-y-20 md:grid-col-2 md:gap-x-6'>
        <div className='md:col-span-2'>
          <h2 className='mb-6 text-1.75xl font-rubik font-eb text-hint'>
            Get In Touch
          </h2>
          <p className='leading-6 pb-4'>
            Have a question, project inquiry, or just want to say hello? I'd
            love to hear from you! Use the form below or connect through any of
            the provided contact methods.
          </p>
          <p>I'm here to help and eager to connect!</p>
        </div>

        <div className='row-start-3 md:row-start-2 md:col-start-1'>
          <ul className='mb-2'>
            <li className='flex gap-3 pb-3'>
              <FaPhone size={20} className='text-hint' />
              <p>+447455 132 994</p>
            </li>
            <li className='flex gap-3 pb-3'>
              <FaEnvelope size={20} className='text-hint' />
              <p>azro1.development@gmail.com</p>
            </li>
            <li className='flex gap-3 pb-3'>
              <FaMapMarkerAlt size={20} className='text-hint' />
              <p>Sienna Court, New Southgate, London N11 2RG</p>
            </li>
          </ul>

          <div className='p-16 bg-white w-full sm:max-w-sm'>
            {/* google maps */}
          </div>
          


          {/* handle comment form */}
          {user && (
            <div className='mt-8'>
            <h3 className='mb-2 text-xl font-eb font-rubik text-hint'>
              Leave a Comment
            </h3>
            <form onSubmit={handleComment}>
              <textarea
                className='p-2'
                cols='40'
                rows='4'
                spellCheck='false'
                placeholder="Tell us what's on your mind..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              {commentError && <p className='error'>{commentError}</p>}
              <div>
                {isCommentLoading && (
                  <button className='btn mt-3.5 bg-hint'>Processing...</button>
                )}
                {!isCommentLoading && (
                  <button className='btn mt-3.5 bg-hint'>Add Comment</button>
                )}
              </div>
            </form>
          </div>
          )}

          {!user && (
            <div className='mt-8'>
               <p>Please sign in to leave a comment.</p>
            </div>
          )}
        </div>




        {/* main form */}
        <form
          onSubmit={handleSubmit}
          className='w-full row-start-2 sm:max-w-xs md:row-start-2 md:col-start-2 md:place-self-center'
        >
          <label>
            {error && <p className='error'>{error}</p>}
            <span className="className='max-w-min mb-2 text-sm font-os text-secondary block">
              Name
            </span>
            <input
              className='w-full p-2.5 rounded-md'
              type='text'
              spellCheck='false'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            <span className="className='max-w-min mt-4 mb-2 text-sm font-os text-secondary block">
              Email
            </span>
            <input
              className='w-full p-2.5 rounded-md'
              type='text'
              spellCheck='false'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <span className="className='max-w-min mt-4 mb-2 text-sm font-os text-secondary block">
              Subject
            </span>
            <input
              className='w-full p-2.5 rounded-md'
              type='text'
              spellCheck='false'
              placeholder='Subject'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </label>
          <label>
            <span className="className='max-w-min mt-4 mb-2 text-sm font-os text-secondary block">
              Your Message
            </span>
            <textarea
              className='p-2'
              placeholder='Enter you message here...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              cols='30'
              rows='4'
            ></textarea>
          </label>
          {msgError && <p className='error'>{msgError}</p>}
          {successMsg && <p className='success'>{successMsg}</p>}
          <div>
            {isMsgLoading && (
              <button className='btn mt-3.5 bg-hint'>Processing...</button>
            )}
            {!isMsgLoading && (
              <button className='btn mt-3.5 bg-hint'>Submit</button>
            )}
          </div>
        </form>
        <Icons values={"flex gap-x-5 md:col-start-2 md:row-start-3 md:place-self-end"} color={"#F6F9FF"} />
      </div>
    </main>
  );
};

export default Contact;
