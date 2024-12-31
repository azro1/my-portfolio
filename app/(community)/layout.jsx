import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import Link from "next/link"
import Sidebar from "../components/Sidebar"

export default async function CommunityLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className='flex flex-col'>
      <Sidebar />
      <div className='min-h-screen'>
        <div className="flex">

          <div className='bg-midnightSlate w-[236px]'>
            <div className='pl-[60px] pt-[45px] flex justify-center h-full bg-blue-900'>
              <nav>
                <ul>
                  <li>

                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="flex-grow">
            {children}
          </div>

        </div>
      </div>
    </div>

  )
}