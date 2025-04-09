import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// components
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
    <div className="flex flex-col min-h-screen bg-charcoalGray">
      <div className="flex flex-grow min-h-screen">

        <div className="flex z-10">
          <Sidebar isProfilePage={true} />
        </div>

        <div className="flex-grow min-h-screen flex flex-col  mx-auto max-w-screen-lg uw:max-w-screen-xl">
          <main className="flex-grow min-h-screen flex flex-col">
            {children}
          </main>
        </div>

      </div>

      <div className=" w-full z-20">
        <Footer />
      </div>
    </div>
  )
}
