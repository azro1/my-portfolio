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
    <div className="flex flex-col min-h-screen bg-[#33353a]">
      <div className="flex flex-1">

        <div className="flex z-40">
          <Sidebar isProfilePage={true} />
        </div>

        <div className="flex-1 flex flex-col z-30 max-w-screen-xl mx-auto px-[x-pad] uw:px-0">
          <main>
            {children}
          </main>
        </div>

      </div>

      <div className=" w-full z-50">
        <Footer />
      </div>
    </div>
  )
}
