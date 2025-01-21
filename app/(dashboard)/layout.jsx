import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


// components
import Footer from "../components/Footer"
import Sidebar from "../components/Sidebar"

export default async function DashboardLayout({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  
  if (user) {
    const { data, error } = await supabase
      .from('profiles')
      .select('is_reg_complete')
      .eq('id', user.id)
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
    <div className="flex bg-nightSky">
      <Sidebar />
      <div className="flex-1">
          <div className=''>
            {children}
          </div>
        <Footer />
      </div>
    </div>

  )
}
