import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// components
import Navbar from '../components/navbar/Navbar';

export default async function ProfileLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      <Navbar user={user && user} />
      <main className='my-4.5 lg:mb-28'>
        <div className='flex flex-col md:flex-row '>
          <div className='sidebar mb-12 md:mb-0 md:h-auto md:p-1 md:bg-white sm:w-60'>
            <div className='flex flex-col'>
              <Link href={'/profile'}>
                <div className='bg-primary p-3.5 group mb-1'>
                  <span className='text-secondary group-hover:text-white'>
                    Home
                  </span>
                </div>
              </Link>
              <Link href={'/info'}>
                <div className='bg-primary p-3.5 group mb-1'>
                  <span className='text-secondary group-hover:text-white'>
                    Personal Info
                  </span>
                </div>
              </Link>
              <Link href={'/privacy'}>
                <div className='bg-primary p-3.5 group mb-1'>
                  <span className='text-secondary group-hover:text-white'>
                    Data & Privacy
                  </span>
                </div>
              </Link>
              <Link href={'/security'}>
                <div className='bg-primary p-3.5 group mb-1'>
                  <span className='text-secondary group-hover:text-white'>
                    Security
                  </span>
                </div>
              </Link>
            </div>
          </div>
          {children}
        </div>
      </main>
    </>
  );
}
