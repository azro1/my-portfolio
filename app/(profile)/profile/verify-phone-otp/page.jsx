import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { client } from '@/app/lib/db';

// components
import ProfilePhoneOtpForm from "./ProfilePhoneOtpForm"

const VerifyPhoneOtp = async() => {
  const encryptedEmail = cookies().get('_otp_tkn')?.value;
  const otpAccessToken = await client.get(`token-${encryptedEmail}`);

  const phone = await client.get('phone');
  await client.del('phone');

  if (!otpAccessToken) {
      redirect('/profile/edit-profile')
  }
  
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <ProfilePhoneOtpForm
        phone={phone}
        contact='phone number'
        verificationType='phone_change'
        title='Update Phone'
        subHeading="For security enter the code we've sent to your new phone number"
        successMessage='OTP verifcation was successful. Your phone number has been updated.'
      />
    </div>
  )
}

export default VerifyPhoneOtp
