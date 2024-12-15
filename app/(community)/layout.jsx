import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import Link from "next/link"

export default async function CommunityLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className='min-h-screen'>
        <div className="flex">

          <div className='bg-midnightSlate w-[236px]'>
            <div className='pl-[60px] pt-[45px] flex justify-center h-full'>
              <nav>
                <ul>
                  <li>
                    <Link href={'/'}>
                      <span className="text-base font-medium text-stoneGray hover:text-cloudGray transition-text duration-300">Home</span>
                    </Link> 
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
  )
}