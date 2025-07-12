import { client } from '@/app/lib/db';

// components
import ProfileEmailOtpForm from "./ProfileEmailOtpForm";

const VerifyEmailOtp = async() => {
  const email = await client.get('email');
  await client.del('email');

  return (
    <div className='h-screen flex-1 flex items-center justify-center w-full'>
      <ProfileEmailOtpForm
        email={email}
        contact='email address'
        verificationType='email_change'
        title='Update Email'
        successMessage='OTP verifcation was successful. Your email address has been updated.'
      />
    </div>
  )
}

export default VerifyEmailOtp

