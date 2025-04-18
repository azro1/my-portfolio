import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { RealtimeProvider } from "../context/RealtimeContext"

import Sidebar from "../components/Sidebar"

export default async function CommunityLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className='xl:flex bg-deepCharcoal'>
      <RealtimeProvider>
        <Sidebar />
        <div className='flex-1 min-h-screen'>
          <div className="flex">

            <div className="flex-grow">
              {children}
            </div>

          </div>
        </div>
      </RealtimeProvider>
    </div>
  )
}