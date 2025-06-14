
// components
import EditProfileForms from './EditProfileForms';
import Heading from '@/app/components/Heading';

const EditProfile = () => {

  return (
    <div className='flex-1 overflow-y-scroll hide-scrollbar px-[x-pad] relative pb-24 pt-36  xl:pt-36 xl:pb-28'>

      <div>
          <Heading className='font-medium text-cloudGray text-lg md:text-xl'>
            Profile Picture
          </Heading>
          <p className='leading-normal text-charcoalGrayLight mt-3'>Upload or change your profile avatar</p>

          <EditProfileForms />
      </div>
    </div>
  )
}

export default EditProfile;
