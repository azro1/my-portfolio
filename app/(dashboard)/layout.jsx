import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// components
import Navbar from "../components/navbar/Navbar"

export default async function DashboardLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  
  return (
    <>
      <Navbar user={user} />
      <main className="mt-20 mb-4.5 md:mb-10.25 ">
        {children}
      </main>
    </>
  )
}
