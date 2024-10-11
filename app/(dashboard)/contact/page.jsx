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
import Comments from './Comments';
import EnquiriesForm from './EnquiriesForm';
import AvailabilityInfo from './AvailabilityInfo';


const Contact = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className='grid grid-flow-col auto-cols-fr gap-y-20 md:grid-cols-2 md:gap-x-6'>
        <div className='row-start-1 col-start-1 col-span-2'>
            <ContactHeader />
        </div>

        <div className='row-start-3 col-start-1 col-span-2 md:row-start-2 md:col-start-1 md:col-span-1'>
          <div className='flex flex-col gap-20'>
              <ContactInfo user={user}/>
              <Comments user={user} />
              {!user && (
                 <AvailabilityInfo />
              )}
          </div>
        </div>
        
        <div className='row-start-2 col-start-1 col-span-2 md:col-start-2 md:col-span-1 md:justify-self-end w-full sm:max-w-xs relative h-fit'>
            <EnquiriesForm user={user} />
        </div>
    </div>
  );
};

export default Contact;
