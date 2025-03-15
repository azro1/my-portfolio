import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { client } from "../lib/db"

// components
import AuthRegHeader from "../components/AuthRegHeader"

export default async function RegisterLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()


  const encryptedId = cookies().get('_reg_tkn')?.value;
  const accessToken = await client.get(`token-${encryptedId}`);

  if (!user || !accessToken) {
    redirect('/auth/login')
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
