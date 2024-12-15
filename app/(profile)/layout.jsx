import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// components
import Navbar from '../components/navbar/Navbar';
import ProfileNav from './profile/ProfileNav';
import Footer from '../components/Footer';

export default async function ProfileLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login')
  }

  return (
    <>
      <div className='main-container'>
        <main>
          <Navbar user={user && user} />
        </main>
        <main className='mt-6 md:mt-20 mb-4.5 md:mb-0'>
          <ProfileNav />
          <div className='bg-ashGray h-px'></div>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
