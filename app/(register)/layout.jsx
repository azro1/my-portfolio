import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// components
import AuthRegHeader from "../components/AuthRegHeader"
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
    .single()
        
    if (error) {
        console.log(error)
    } 

    if (data?.is_reg_complete) {
      redirect('/')
    }
  }
  
  return (
    <div className='min-h-[100dvh] flex flex-col items-center md:h-screen md:min-h-[760px]'>

        <div className="w-full flex-grow flex flex-col bg-softGray">
          <AuthRegHeader />
          <div className='main-container flex-grow flex items-center justify-center'>
            {children}
          </div>
        </div>
        <Footer 
          showAuthFooter={true}
        />
    </div>
  )
}
