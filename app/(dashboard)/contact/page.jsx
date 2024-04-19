'use client';

import { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ProfileAvatar from '@/app/(profile)/profile/ProfileAvatar';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import Image from 'next/image';

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
  const [comments, setComments] = useState([])
  const [profile, setProfile] = useState(null);
  const [source, setSource] = useState('')

  // as soon as component loads check if user is logged in to allow comment to be added
  useEffect(() => {
    setError('');
    async function getUser() {
      try {
        const supabase = createClientComponentClient();
        const {data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }
        if (user) {
          const authUser = user;
          setUser({ ...authUser });
        }

      } catch (err) {
        setError(err.message);
      } 
    }
    getUser();
  }, []);
  
  // update comments after new comment is added
  const updateComments = (newComment) => {
    setComments(prevComments => [...prevComments, newComment]);
  }

  // as soon as component mounts fetch all comments to be displayed on page
  const fetchComments = async () => {
    try {
      const supabase = createClientComponentClient();
      const { data, error } = await supabase
      .from('comments')
      .select()
      .order('created_at', {
        ascending: false
      })

      if (error) {
        setComments([])
        console.log(error.message)
      }
      
      if (data) {
        setComments(data)
      }
    } catch (error) {
        setError(error.message);
    }
  }

  useEffect(() => {
    fetchComments();
  }, []);

  // fetch profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const supabase = createClientComponentClient();
        const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq("id", user.id)
        .single()
         
        if (error) {
          throw new Error(error.message)
        }
        
        if (data) {
          setProfile(data)
        }
      } catch (error) {
          console.log(error.message);
      }
    }
    if (user && user.id) {
      fetchProfiles()
    }
  }, [user && user.id])

  // handlecomment (comment form)
  const handleComment = async (e) => {
    e.preventDefault();
    setIsCommentLoading(true)
    setCommentError('')
    setComment('')
  
    try {
      const res = await fetch(`${location.origin}/api/auth/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          profile,
          comment,
          source
        })
      })  
  
      if (!res.ok) {
        setIsCommentLoading(false)
        throw new Error(res.statusText)
      }

      // handle response
      const json = await res.json()

      if (json.error) {
        console.log(error.message)
      }

      if (json.data) {
        // console.log(json.data)
        setIsCommentLoading(false)
        updateComments(json.data);
        fetchComments();
      }
  
    } catch (error) {

      if (error) {
        setIsCommentLoading(false)
        setCommentError(error.message)
      }
    }
  };

  // handlesubmit (enquiries contact form)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsMsgLoading(true)

    setName('')
    setEmail('')
    setSubject('')
    setMessage('')
    setMsgError('')

    const supabase = createClientComponentClient();
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
  
  return (
    <main className='mt-4.5 lg:mb-28'>
      <div className='grid grid-col-1 gap-y-20 md:grid-col-2 md:gap-x-6'>
        <div className='md:col-span-2'>
          <h2 className='text-1.75xl font-rubik font-b mb-4 text-hint'>
            Get In Touch
          </h2>
          <p className='leading-6 pb-4'>
            Have a question, project inquiry, or just want to say hello? I'd
            love to hear from you! Use the form below or connect through any of
            the provided contact methods.
          </p>
          <p>I'm here to help and eager to connect!</p>
        </div>

        <div className='row-start-3 md:row-start-2 md:row-start-2 md:col-start-1'>
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
          
          {/* Google maps */}
          <div className='relative h-44 w-full sm:w-4/5 md:w-full lg:w-4/5'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2477.512962604341!2d-0.13284128788590113!3d51.61381197172027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTHCsDM2JzQ5LjciTiAwwrAwNyc0OC45Ilc!5e0!3m2!1sen!2suk!4v1712056886513!5m2!1sen!2suk" style={{ width: "100%", height: "100%", border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>

          {!user && (
            <div className='mt-4 md:mb-64'>
                <p>Please sign in to leave a comment.</p>
            </div>
          )}
        </div>

        {!user && 
          <div className='md:row-start-2 col-start-1 md:place-self-end md:justify-self-start'>
            <h3 className='text-xl font-b font-rubik text-hint mb-5'>
              When You Can Reach Me
            </h3>
            <div className='flex flex-col gap-3 max-w-xs'>
              <p>I'm available:</p>
              <ul className='text-secondary'>
                <li>Monday to Friday:</li>
                <li>9:00 AM - 5:00 PM (local time)</li>
              </ul>
              <p className="text-secondary leading-6">Feel free to drop me a line, and I'll get back to you as soon as possible!</p>
            </div>
          </div>}

          {/* comment form */}
          {user && (
            <div className='md:row-start-2 col-start-1 md:place-self-end md:justify-self-start'>
              <h3 className='mb-2 text-xl font-b font-rubik text-hint'>
                Leave a Comment
              </h3>
              <form onSubmit={handleComment}>
                <textarea
                  className='p-2 outline-none'
                  cols='40'
                  rows='4'
                  spellCheck='false'
                  placeholder="Tell us what's on your mind..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
                {commentError && <p className='error'>{commentError}</p>}
                <div>
                  {isCommentLoading && (
                    <button className='btn mt-2 bg-hint'>Processing...</button>
                  )}
                  {!isCommentLoading && (
                    <button className='btn mt-2 bg-hint'>Add Comment</button>
                  )}
                </div>
                </form>
            </div>
          )}

          {user && comments !== null && comments.length === 0 && (
            <div className='md:row-start-3 col-start-1'>
                <p>No comments.</p>
            </div>
          )}

          {comments !== null && comments.length > 0 && (
            <div>
              <h3 className='text-xl font-b font-rubik text-hint mb-8'>
                Comments
              </h3>
              <div className='w-full sm:max-w-lg'>
                {comments.map(comment => (
                  <div className='mb-8' key={comment.id}>
                    {user &&  
                      <>
                        <div className="flex items-start gap-3">
                          {user && comment.avatar_url?.includes('https') ? ( 
                              <div className="overflow-hidden rounded-full min-w-max h-12">
                                  <img className="inline-block w-full h-full object-cover" src={comment.avatar_url} alt="a user avatar" />
                              </div>
                          ) : (
                              <ProfileAvatar
                                url={comment.avatar_url}
                                onUpload={(url) => {
                                    setAvatarUrl(url);
                                }}
                                size={'h-12 w-12'}
                                phSize={50}
                              />
                          )} 
                          <div>
                            <div className='flex gap-2 items-center font-os mb-2'>
                              <h6 className='text-sm text-hint font-b'>{comment.first_name ? comment.first_name : comment.full_name}</h6>
                              <span className='text-xs text-secondary'>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                            </div>
                            <p>{comment.comment}</p> 
                          </div>
                        </div>
                      </>
                    }
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* enquiries form */}
        <form
          onSubmit={handleSubmit}
          className='w-full row-start-2 sm:max-w-xs md:row-start-2 md:col-start-2 md:place-self-start md:mx-auto'
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
              className='p-2 outline-none'
              placeholder='Enter you message here...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              cols='30'
              rows='4'
              required
            ></textarea>
          </label>
          {msgError && <p className='error'>{msgError}</p>}
          {successMsg && <p className='success'>{successMsg}</p>}
          <div>
            {isMsgLoading && (
              <button className='btn mt-2 bg-hint'>Processing...</button>
            )}
            {!isMsgLoading && (
              <button className='btn mt-2 bg-hint'>Submit</button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default Contact;
