import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';


// components
import Heading from '@/app/components/Heading';
import Button from '@/app/components/Button';

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
  // console.log(user)

  return (
    <div className='flex-1 overflow-y-scroll hide-scrollbar px-[x-pad] relative pb-24 pt-36 xl:pb-28'>

      <div>
        <Heading className='font-medium text-cloudGray text-lg md:text-xl'>
          My Account
        </Heading>
        <p className='leading-normal text-charcoalGrayLight mt-3'>This is the account page. Here you can manage your account information.</p>
      </div>

      <div className='min-h-[480px] flex flex-col gap-1 mt-6 p-4 bg-nightSky'>
        <div className='flex gap-2'>
          <p>Account Created On:</p>
          <p className='text-charcoalGrayLight'>
            {new Date(user.created_at).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>
        <div className='flex gap-2'>
          <p>Last Signed In:</p>
          <p className='text-charcoalGrayLight'>
            {new Date(user.last_sign_in_at).toLocaleString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        <div className='mt-4 flex flex-col gap-1 bg-nightSky'>
          <p>
            Associated accounts:
          </p>
          <div className='flex gap-2'>
            {user.app_metadata.providers
              .filter(provider => provider !== 'phone')
              .map((providerName, index) => {

                // find matching provider icon object
                const matchedProvider = providers.find(
                  (p) => p.name.toLowerCase() === providerName.toLowerCase()
                );

                return (
                  <div key={index} className="flex items-center gap-2">
                    <p className='text-charcoalGrayLight'>{matchedProvider?.name || providerName}</p>
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
      </div>



      <div className='mt-6 p-6 bg-nightSky'>
        <Heading className='font-medium text-cloudGray text-lg md:text-xl'>
          Danger Zone
        </Heading>
        <p className='text-charcoalGrayLight mt-2 mb-4'>
          Permanently delete your account and all associated data.
        </p>
        <Button variant='destructive'
          text='Delete My Account'
          className='p-2.5 px-3 bg-red-700'
        />
      </div>

    </div>
  )
}

export default MyAccount;