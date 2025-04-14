import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// components
import AuthRegHeader from "../components/AuthRegHeader"
import Cleanup from "./Cleanup"

export default async function AuthLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()


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
      console.log('there is a user')
      redirect('/')
    }
  }
  
  
  return (
    <div className='min-h-[100dvh] flex flex-col'>
      <AuthRegHeader />
      <div className='flex-grow flex items-center justify-center bg-white sm:bg-softGray pt-36 auth-layout-wrapper md:pt-0'>
        {children}
        <Cleanup />
      </div>
    </div>
  )
}  