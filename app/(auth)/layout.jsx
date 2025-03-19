import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { client } from "@/app/lib/db"

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
    <div className='min-h-screen '>
      <div className='h-screen flex flex-col items-center'>
        <div className="w-full flex-grow flex sm:justify-center">
          <div className="w-full h-full flex flex-col  bg-white sm:bg-softGray min-h-[840px] sm:min-h-[1024px] md:min-h-0">
            <AuthRegHeader
              storageKey={'hasVisitedAuthOtpPage'}
              message={'Please complete verification before you leave'}
            />
            <div className='flex-grow flex items-center justify-center h-full'>
              {children}
              <Cleanup />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
