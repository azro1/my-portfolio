import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// components
import Navbar from "../components/navbar/Navbar"

export default async function PagesLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()
  const user = data.session?.user;

  // if (!data.session) {
  //   redirect('/login')
  // }
  
  return (
    <>
      <Navbar user={user} /> 
      {children}
    </>
  )
}
