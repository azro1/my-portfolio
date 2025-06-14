import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// metadata
export const metadata = {
  title: 'My Portfolio | Contact Me',
  description: 'Get in touch with with me.',
};

// components
import ContactHeader from './ContactHeader';
import EnquiriesForm from './EnquiriesForm';

const Contact = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex-1 main-container flex flex-col">
      <main className="flex-grow flex flex-col">
        <div className='flex-grow flex flex-col items-center pt-36 pb-20 md:h-screen md:p-0 md:min-h-[900px]'>
          <div className='w-full flex-grow flex items-center justify-center'>
            <div className='flex flex-col w-full md:max-w-2xl'>
              <ContactHeader />
              <div className='w-full md:max-w-md mt-6 md:mt-8'>
                <EnquiriesForm user={user} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
