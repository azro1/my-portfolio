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
    <div className='min-h-screen '>
          <div className='h-screen flex flex-col items-center'>
            <div className="w-full flex-grow flex sm:justify-center">
              <div className="w-full h-full flex flex-col  bg-white sm:bg-softGray min-h-[840px] sm:min-h-[1024px] md:min-h-0">
                <nav className='bg-nightSky w-full min-h-[90px] flex items-center z-40'>
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
                <div className='flex-grow flex items-center justify-center h-full'>
                  {children}
                </div>
              </div>
            </div>
          </div>
      <Cleanup />
    </div>
  )
}
