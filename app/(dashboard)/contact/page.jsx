'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// metadata
export const metadata = {
  title: 'My Portfolio | Contact Me',
  description: 'Get in touch with with me.',
};

// components
import ContactHeader from './ContactHeader';
import ContactInfo from './ContactInfo';
import Comments from './Comments';
import EnquiriesForm from './EnquiriesForm';
import AvailabilityInfo from './AvailabilityInfo';

const Contact = () => {
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null);

  // as soon as component loads check if user is logged in to allow comment to be added
  useEffect(() => {
    setError('');
    async function getUser() {
      try {
        const supabase = createClientComponentClient();
        const {data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        if (session) {
          const { data: { user }, error } = await supabase.auth.getUser()
          setUser(user);
        }
      } catch (err) {
        setError(err.message);
      } 
    }
    getUser();
  }, []);

  // fetch profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const supabase = createClientComponentClient();
        const { data, error } = await supabase
          .from('profiles')
          .select()
          .eq('id', user.id)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        if (data) {
          setProfile(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (user && user.id) {
      fetchProfiles();
    }
  }, [user && user.id]);

  return (
    <main className='my-4.5 lg:mb-28'>
      <div className='grid grid-flow-col auto-cols-fr gap-y-20 md:grid-col-2 md:gap-x-6'>
        <div className='row-start-1 col-start-1 col-span-2'>
          <ContactHeader />
        </div>
        <div className='row-start-3 col-start-1 col-span-2 md:row-start-2 md:col-start-1 md:col-span-1 flex flex-col gap-6'>
          <ContactInfo />
          {!user && (
            <div className='md:mb-56'>
              <p>Please sign in to leave a comment.</p>
            </div>
          )}
          <Comments profile={profile} user={user} />
        </div>
        {!user && (
           <AvailabilityInfo />
         )}
        <EnquiriesForm profile={profile} user={user} error={error} />
      </div>
    </main>
  );
};

export default Contact;
