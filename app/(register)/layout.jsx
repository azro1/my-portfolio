import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Image from "next/image"


export default async function RegisterLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
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
    <div className='bg-softGray relative'>
      <nav className='bg-nightSky absolute w-full py-2 px-6'>
        <main>
          <Image
            src={'../images/my_logo1.svg'}
            alt="The website logo"
            width={60}
            height={60}
            priority
            quality={100}
          />
        </main>
      </nav>

      <div className='main-container'>
        <main className='min-h-screen'>
          <div className='h-screen flex flex-col items-center justify-center min-h-[960px]'>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
