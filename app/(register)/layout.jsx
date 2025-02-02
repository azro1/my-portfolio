import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Image from "next/image"


export default async function RegisterLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  if (user) {
    const registrationCookie = cookies().get('isRegComplete')
    const { data, error } = await supabase
      .from('profiles')
      .select('is_reg_complete')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error(error);
    }

    if (data?.is_reg_complete || registrationCookie?.value === 'true') {
      redirect('/');
    }
  }
  
  return (
    <div className='min-h-screen flex flex-col items-center'>

        <div className="w-full flex-grow flex flex-col bg-white sm:bg-softGray">
          <nav className='bg-nightSky w-full min-h-[90px] flex items-center z-40'>
            <div className='max-w-screen-xl w-full px-6 mx-auto'>
              <main>
                <Image
                  className='cursor-pointer'
                  src={'/images/my_logo.svg'}
                  alt="Navigate to home page"
                  width={50}
                  height={50}
                  priority
                  quality={100}
                />
              </main>
            </div>
          </nav>
          <div className='main-container flex-grow flex items-center justify-center h-full'>
            {children}
          </div>
        </div>

    </div>
  )
}
