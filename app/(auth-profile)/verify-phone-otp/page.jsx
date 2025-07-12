import { client } from '@/app/lib/db';

// components
import ProfilePhoneOtpForm from "./ProfilePhoneOtpForm"

const VerifyPhoneOtp = async() => {

  const phone = await client.get('phone');
  await client.del('phone');
  
  return (
    <div className='h-screen flex-1 flex items-center justify-center w-full'>
      <ProfilePhoneOtpForm
        phone={phone}
        contact='phone number'
        verificationType='phone_change'
        title='Update Phone'
        successMessage='OTP verifcation was successful. Your phone number has been updated.'
      />
    </div>
  )
}

export default VerifyPhoneOtp
