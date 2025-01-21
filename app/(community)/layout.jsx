import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import Sidebar from "../components/Sidebar"

export default async function CommunityLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className='flex bg-nightSky'>
      <Sidebar />
      <div className='flex-1 min-h-screen'>
        <div className="flex">

          <div className="flex-grow">
            {children}
          </div>

        </div>
      </div>
    </div>

  )
}