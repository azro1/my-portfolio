import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// metadata
export const metadata = {
  title: 'My Portfolio | Contact Me',
  description: 'Get in touch with with me.',
};

// components
import ContactHeader from './ContactHeader';
import ContactInfo from './ContactInfo';
import EnquiriesForm from './EnquiriesForm';
import AvailabilityInfo from './AvailabilityInfo';

const Contact = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col">
        <div className='main-container'>
          <main>
            <div className='h-screen flex flex-col items-center min-h-[1474px] md:min-h-[900px] '>
              <div className='w-full flex-grow flex items-center justify-center'>
                <div className='grid grid-flow-col auto-cols-fr gap-y-10 md:gap-y-16 md:gap-x-16 md:h-full md:grid-cols-2 md:grid-rows-[minmax(_auto,_auto)_minmax(500px,_auto)]'>
                  <div className='row-start-1 col-start-1 col-span-2 self-end'>
                    <ContactHeader />
                  </div>

                  <div className='row-start-3 col-start-1 col-span-2 md:row-start-2 md:col-start-1 md:col-span-1'>
                    <div className='flex flex-col gap-10 md:gap-y-16 h-full justify-start'>
                      <ContactInfo />
                      <AvailabilityInfo />
                    </div>
                  </div>

                  <div className='w-full h-fit row-start-2 col-start-1 col-span-2 justify-self-start relative sm:max-w-sm md:col-start-2 md:col-span-1 md:max-w-xs lg:max-w-sm'>
                    <EnquiriesForm user={user} />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
    </div>

  );
};

export default Contact;
