import Link from "next/link"
import Image from "next/image"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// components
import Cleanup from "./Cleanup"

export default async function AuthLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    redirect('/')
  }
  
  return (
    <div className='bg-white sm:bg-softGray relative'>
      <nav className='bg-nightSky fixed top-0 left-0 w-full min-h-[90px] flex items-center z-40'>
        <div className='max-w-screen-xl w-full px-6 mx-auto'>
          <main>
            <Link href='/'>
              <Image
                className='cursor-pointer'
                src={'/images/my_logo.svg'}
                alt="Navigate to home page"
                width={50}
                height={50}
                priority
                quality={100}
              />
            </Link>
          </main>
        </div>
      </nav>

      <div className='main-container'>
        <main className='min-h-screen'>
          <div className='h-screen flex flex-col items-center min-h-[960px] sm:min-h-[1070px] md:min-h-[768px]'>

            <div className="relative w-full flex-grow flex items-center sm:justify-center">
              {children}
            </div>
          </div>
        </main>
      </div>
      <Cleanup />
    </div>
  )
}
