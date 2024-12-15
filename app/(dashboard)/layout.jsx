import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// components
import Navbar from "../components/navbar/Navbar"
import Footer from "../components/Footer"


export default async function DashboardLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  
  return (
    <>
      <div className="main-container">
        <main>
          <Navbar user={user} />
        </main>
        <main className="pt-20 pb-10.25">
          <div className="relative w-full flex items-center justify-center">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
