import Link from "next/link"
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// components
import Chevron from "../components/Chevron"
import Footer from "../components/Footer"

export default async function AuthLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    redirect('/')
  }
  
  return (
    <>
      <div className='main-container'>
        <main className='min-h-screen'>
          <div className='flex flex-col items-center min-h-[960px] sm:min-h-[1070px] md:min-h-[726px]'>
            <nav className='flex items-center h-9.5 w-full relative'>
              <Link href='/' className='mr-auto shadow-3xl pt-1.5 px-4 pb-0.5 rounded-xl bg-softCharcoal'>
                <h2 className='mainheading font-eb text-saddleBrown'>
                  Port<span className="text-stoneGray">folio</span>
                </h2>
              </Link>

              <div className="lg:hidden ml-auto">
                <Chevron />
              </div>

              <div className='hidden lg:flex items-center gap-12 ml-auto'>
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
            <div className="relative w-full flex-grow flex items-center justify-center">
              {children}
            </div>
          </div>
        </main>
      </div>
    <Footer />
    </>
  )
}
