import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// components
import Footer from "../components/Footer"
import Cleanup from "./Cleanup"

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
              <Link href='/' className='absolute top-16 mr-auto shadow-3xl pt-1.5 px-4 pb-0.5 rounded-xl bg-softCharcoal'>
                <h2 className='mainheading font-eb text-saddleBrown'>
                  Port<span className="text-stoneGray">folio</span>
                </h2>
              </Link>

            </nav>
            <div className="relative w-full flex-grow flex items-center justify-center">
              {children}
            </div>
          </div>
        </main>
      </div>
    <Footer />
    <Cleanup />
    </>
  )
}
