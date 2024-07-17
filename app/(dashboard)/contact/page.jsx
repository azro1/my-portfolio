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
    <main className='my-4.5 lg:mb-28'>
      <div className='grid grid-flow-col auto-cols-fr gap-y-20 md:grid-col-2 md:gap-x-6'>
        <div className='row-start-1 col-start-1 col-span-2'>
          <ContactHeader />
        </div>
        <div className='row-start-3 col-start-1 col-span-2 md:row-start-2 md:col-start-1 md:col-span-1 flex flex-col gap-6'>
          <ContactInfo user={user}/>
          <Comments user={user} />
        </div>
        {!user && (
          <AvailabilityInfo />
        )}
        <EnquiriesForm user={user} />
      </div>
    </main>
  );
};

export default Contact;
