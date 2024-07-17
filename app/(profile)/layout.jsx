import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// icons
import { FaUserCircle } from "react-icons/fa";
import { HiMiniIdentification } from "react-icons/hi2";

// components
import Navbar from '../components/navbar/Navbar';

export default async function ProfileLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login')
  }

  return (
    <>
      <Navbar user={user && user} />
      <main className='my-4.5 lg:mb-28'>
        <div className='flex flex-col gap-20 md:gap-x-6 md:flex-row'>
          <div className='sidebar bg-shade shadow-outer mb-12 md:mb-0 md:h-fit md:p-1 max-w-60 md:min-w-60'>
            <div className='flex flex-col'>
              <Link href={'/profile'}>
                <div className='flex items-center p-3.5 mb-1 bg-primary group hover:bg-white'>
                  <FaUserCircle className='text-hint group-hover:text-primary transition duration-300' size={18} />
                  <span className='text-secondary group-hover:text-primary text-base ml-3.5'>
                    Dashboard
                  </span>
                </div>
              </Link>
              <Link href={'/profile/personal-info'}>
                <div className='flex items-center p-3.5 mb-1 bg-primary group hover:bg-white'>
                  <HiMiniIdentification className='text-hint group-hover:text-primary transition duration-300' size={20} />
                  <span className='text-secondary group-hover:text-primary text-base ml-3.5'>
                    Personal Info
                  </span>
                </div>
              </Link>
              <Link href={'/profile/data-privacy'}>
                <div className='flex items-center p-3.5 mb-1 bg-primary group hover:bg-white'>
                  <span className='text-secondary group-hover:text-primary text-base ml-3.5'>
                    Data & Privacy
                  </span>
                </div>
              </Link>
              <Link href={'/profile/security'}>
                <div className='flex items-center p-3.5 bg-primary group hover:bg-white'>
                  <span className='text-secondary group-hover:text-primary text-base ml-3.5'>
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
