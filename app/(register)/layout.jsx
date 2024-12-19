import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// components
import Footer from "../components/Footer"


export default async function RegisterLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  const cookie = cookies().get('canAccessRegPage');

  if (!user) {
    redirect('/login')
  } else {
      const { data, error } = await supabase
      .from('profiles')
      .select('is_first_reg')
      .eq('id', user?.id)
      .limit(1)
      .single()

    if (error) {
      console.log(error)
    }

    if (!data?.is_first_reg && cookie?.value !== 'true') {
      await supabase.auth.signOut();
      redirect('/login');
    }
  }
  
  return (
    <>
      <div className='main-container'>
        <main className='min-h-screen'>
          <div className='flex flex-col items-center gap-20 min-h-[1360px] sm:min-h-[1240px] md:min-h-[900px]'>
            <nav className='flex items-center h-9.5 w-full relative'>
                  <div className='shadow-3xl pt-1.5 px-4 pb-0.5 rounded-xl bg-deepCharcoal'>
                    <h2 className='mainheading font-eb text-saddleBrown'>
                      Port<span className="text-ashGray">folio</span>
                    </h2>
                  </div>
              </nav>
              {children}
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
