import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { client } from '@/app/lib/db';


// components
import AuthRegHeader from "../components/AuthRegHeader"
import Footer from "../components/Footer";

export default async function AuthProfileLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  const encryptedEmail = cookies().get('_otp_tkn')?.value;
  const otpAccessToken = await client.get(`token-${encryptedEmail}`);
  await client.del(`token-${encryptedEmail}`);

  if (!user) {
    redirect('/login')
  } else {
    const { data, error } = await supabase
    .from('profiles')
    .select('is_reg_complete')
    .eq('id', user?.id)
    .single();
  
    if (error) {
      console.error(error);
    }
  
    if (!data?.is_reg_complete) {
      await supabase.auth.signOut();
      redirect('/login');
    }

    if (!otpAccessToken) {
      redirect('/profile/edit-profile')
    }
  }

  return (
    <div className='min-h-[100dvh] flex flex-col md:h-screen md:min-h-[665px]'>
      <AuthRegHeader />
      <div className='flex-grow flex flex-col items-center justify-center bg-softGray'>
        {children}
      </div>
      <Footer
        showAuthFooter={true}
      />
    </div>
  )
} 