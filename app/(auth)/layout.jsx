import Link from "next/link"
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// components
import Chevron from "../components/Chevron"

export default async function AuthLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    redirect('/')
  }

  return (
    <main>
      <div className='flex flex-col gap-20'>
        <nav className='flex items-center h-9.5 relative'>
          <Link href='/' className='mr-auto shadow-3xl pt-1.5 px-4 pb-0.5 rounded-xl bg-deepCharcoal'>
            <h2 className='mainheading font-eb text-saddleBrown'>
              Port<span className="text-stoneGray">folio</span>
            </h2>
          </Link>

          <div className="lg:hidden">
            <Chevron />
          </div>

          <div className='hidden lg:flex items-center gap-12'>
            <Link href='/signup'>
              <div className="tooltip group">
                <FaSignInAlt className="text-ashGray group-hover:text-saddleBrown transition duration-300 cursor-pointer" size={31} />
                <span className="tooltiptext -left-2.5">Sign up</span>
              </div>
            </Link>
            <Link href='/login'>
              <div className="tooltip group">
                <FaUserPlus className="text-ashGray group-hover:text-saddleBrown transition duration-300 cursor-pointer" size={33} />
                <span className="tooltiptext -left-2.5">Login</span>
              </div>
            </Link>
          </div>

        </nav>
        <div className='mb-40'>
          {children}
        </div>
      </div>
    </main>
  )
}
