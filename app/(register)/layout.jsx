import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// components
import AuthRegHeader from "../components/AuthRegHeader"

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
    .single()
        
    if (error) {
        console.log(error)
    } 

    if (data?.is_reg_complete) {
      redirect('/')
    }
  }
  
  return (
    <div className='min-h-screen flex flex-col items-center'>

        <div className="w-full flex-grow flex flex-col bg-white sm:bg-softGray">
          <AuthRegHeader 
             storageKey={'hasVisitedRegPage'}
             message={'Please complete registration before you leave'}
          />
          <div className='main-container flex-grow flex items-center justify-center h-full'>
            {children}
          </div>
        </div>

    </div>
  )
}
