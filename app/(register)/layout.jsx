import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"



export default async function RegisterLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }
  
  return (
    <main>
      <div className="min-h-custom-lg flex flex-col gap-20">

        <nav className='flex items-center h-9.5 relative'>
            <Link href='/' className='shadow-3xl pt-1.5 px-4 pb-0.5 rounded-xl bg-deepCharcoal'>
              <h2 className='mainheading font-eb text-deepOlive'>
                Port<span className="text-stoneGray">folio</span>
              </h2>
            </Link>
        </nav>

        {children}

      </div>
    </main>
  )
}
