import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"



export default async function RegisterLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }
  
  // profile completion check to prevent users from returning to complete-registration route if they have updated their profile data
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', user.id)
    .single()

    if (error) {
      console.log(error)
    } else {
        if (data.first_name && data.last_name && data.dob && data.phone) {
          redirect('/')
        }
    }

  return (
    <main>
      <div className="flex flex-col gap-20">

        <nav className='flex items-center h-9.5 relative'>
            <div className='shadow-3xl pt-1.5 px-4 pb-0.5 rounded-xl bg-deepCharcoal'>
              <h2 className='mainheading font-eb text-saddleBrown'>
                Port<span className="text-stoneGray">folio</span>
              </h2>
            </div>
        </nav>

        <div className='mb-40'>
          {children}
        </div>

      </div>
    </main>
  )
}
