import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { FaGithub, FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';


// components
import Heading from '@/app/components/Heading';
import DeleteAccountButton from './DeleteAccountButton';
import ProfileHeader from '../../ProfileHeader';

const providers = [
  {
    name: 'Google',
    src: "../images/auth/google.svg",
    alt: "a google icon",
    id: 1
  },
  {
    name: 'Discord',
    src: "../images/auth/discord.svg",
    alt: "a discord icon",
    id: 2
  },
  {
    name: 'GitHub',
    icon: <FaGithub color="#fff" size={24} />,
    id: 3
  }
]

const MyAccount = async () => {

  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser()


  return (
    <div className='flex-1 overflow-y-scroll hide-scrollbar px-[x-pad] relative pb-24 pt-36 xl:pb-28'>

      <ProfileHeader title={'My Account'} subheading={'This is the account page. Here you can view and manage your account information'} showAvatar={false} />

      <div className='min-h-[480px] flex flex-col gap-8 mt-6 p-4 bg-nightSky'>

        <div className='flex flex-col gap-1'>
          <div className='flex gap-2'>
            <p>Account Created On:</p>
            <p className='text-cloudGray'>
              {new Date(user?.created_at).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>

          <div className='flex gap-2'>
            <p>Last Signed In:</p>
            <p  className='text-cloudGray'>
              {new Date(user?.last_sign_in_at).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Europe/London'
              })}
            </p>
          </div>
        </div>


        <div className='flex flex-col gap-1'>
          <p>Connected accounts:</p>
          <div className='flex gap-2'>
            {user?.app_metadata.providers
              .filter(provider => provider !== 'phone' && provider !== 'email')
              .map((providerName, index) => {

                // find matching provider icon object
                const matchedProvider = providers.find(
                  (p) => p.name.toLowerCase() === providerName.toLowerCase()
                );

                return (
                  <div key={index} className="flex items-center gap-2">
                    <p  className='text-cloudGray'>{matchedProvider?.name || providerName}</p>
                    {matchedProvider?.icon ? (
                      matchedProvider.icon
                    ) : (
                      <Image
                        src={matchedProvider?.src}
                        alt={matchedProvider?.alt}
                        width={24}
                        height={24}
                        priority
                        quality={100}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        
        <div className='flex flex-col gap-1'>
          {user?.email && (
            <div className='flex flex-wrap items-center gap-2'>
              <p>Email:</p>
              <p className='text-cloudGray'>{user.email}</p>
              {user.user_metadata.email_verified && (
                <span className='bg-green-300 font-inter text-black px-1 text-xs tracking-wide'>
                  Verified
                </span>
              )}
          </div>)}
          {user?.phone && (
            <div className='flex flex-wrap items-center gap-2'>
              <p>Phone:</p>
              <p  className='text-cloudGray'>{user.phone.replace('44', '0')}</p>
              {user.phone_confirmed_at && (
                <span className='bg-green-300 font-inter text-black px-1 text-xs tracking-wide'>
                  Verified
                </span>
              )}
          </div>)}
        </div>

      </div>



      <div className='mt-6 p-6 bg-nightSky'>
        <Heading className='font-medium text-cloudGray text-lg md:text-xl'>
          Danger Zone
        </Heading>
        <p className='mt-2 mb-4'>
          Permanently delete your account and all associated data.
        </p>
     
        <DeleteAccountButton
          id={user?.id}
        />

      </div>

    </div>
  )
}

export default MyAccount;