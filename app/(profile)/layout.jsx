import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { FaUserCircle } from "react-icons/fa";
import { HiMiniIdentification } from "react-icons/hi2";



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
          <div className='sidebar mb-12 md:mb-0 md:h-auto md:p-1 md:bg-shade sm:w-60'>
            <div className='flex flex-col'>
              <Link href={'/profile'}>
                <div className='flex items-center p-3.5 mb-1 bg-primary group hover:bg-white'>
                  <FaUserCircle size={18} color="#6B8E23" />
                  <span className='text-secondary group-hover:text-primary text-sm font-b ml-3.5'>
                    Home
                  </span>
                </div>
              </Link>
              <Link href={'/info'}>
                <div className='flex items-center p-3.5 mb-1 bg-primary group hover:bg-white'>
                  <HiMiniIdentification size={20} color="#6B8E23" />
                  <span className='text-secondary group-hover:text-primary text-sm font-b ml-3.5'>
                    Personal Info
                  </span>
                </div>
              </Link>
              <Link href={'/privacy'}>
                <div className='flex items-center p-3.5 mb-1 bg-primary group hover:bg-white'>
                  <span className='text-secondary group-hover:text-primary text-sm font-b ml-3.5'>
                    Data & Privacy
                  </span>
                </div>
              </Link>
              <Link href={'/security'}>
                <div className='flex items-center p-3.5 bg-primary group hover:bg-white'>
                  <span className='text-secondary group-hover:text-primary text-sm font-b ml-3.5'>
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
