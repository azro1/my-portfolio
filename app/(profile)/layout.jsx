import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// components
import Navbar from '../components/navbar/Navbar';
import LayoutNav from './profile/LayoutNav';


export default async function ProfileLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login')
  }

  return (
    <>
      <Navbar user={user && user} />
      <main className='mt-20 mb-4.5 md:mb-28'>
        
         <LayoutNav />

        <div className='mt-20 bg-frostWhite p-3'>
          {children}
        </div>
        
      </main>
    </>
  );
}
