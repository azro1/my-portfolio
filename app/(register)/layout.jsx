import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// components
import Footer from "../components/Footer"


export default async function RegisterLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  
  if (user) {
    const { data, error } = await supabase
      .from('profiles')
      .select('is_reg_complete')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error(error);
    }

    if (data?.is_reg_complete) {
      redirect('/');
    }
  }
  
  return (
    <>
      <div className='main-container '>
        <main>
          <div className='flex flex-col items-center justify-center min-h-[1360px] sm:min-h-[1240px] md:min-h-[900px]'>
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
