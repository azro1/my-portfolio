import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { client } from '@/app/lib/db';

// components
import ProfileEmailOtpForm from "./ProfileEmailOtpForm";

const VerifyEmailOtp = async() => {
  const encryptedEmail = cookies().get('_otp_tkn')?.value;
  const otpAccessToken = await client.get(`token-${encryptedEmail}`);

  const email = await client.get('email');
  await client.del('email');

  if (!otpAccessToken) {
      redirect('/profile/edit-profile')
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <ProfileEmailOtpForm
        email={email}
        contact='email address'
        verificationType='email_change'
        title='Update Email'
        subHeading='Enter the code we sent to your new email address to complete the update'
        successMessage='OTP verifcation was successful. Your email address has been updated.'
      />
    </div>
  )
}

export default VerifyEmailOtp

