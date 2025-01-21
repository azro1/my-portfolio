import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// components
import Navbar from '../components/navbar/Navbar';
import ProfileNav from './profile/ProfileNav';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

export default async function ProfileLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login')
  } else {
    const { data, error } = await supabase
    .from('profiles')
    .select('is_reg_complete')
    .eq('id', user?.id)
    .single();

    if (error) {
      console.error(error);
    }

    if (!data?.is_reg_complete) {
      await supabase.auth.signOut();
      redirect('/login');
    }
  }

  return (
    <div className='flex bg-nightSky'>
      <Sidebar />
      <div className='flex-1'>
        <div className='main-container'>
          <main>
            <Navbar user={user && user} />
          </main>
          <main className='mb-4.5 md:mb-0'>
            <ProfileNav />
            <div className='bg-ashGray h-px'></div>
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}
