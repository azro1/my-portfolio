
// components
import EditProfileForms from './EditProfileForms';
import Heading from '@/app/components/Heading';

const EditProfile = () => {

  return (
    <div className='flex-1 overflow-y-scroll hide-scrollbar px-[x-pad] relative pb-24 pt-40  xl:pt-36 xl:pb-28'>

      <div>
          <Heading className='text-cloudGray font-semibold text-1.375 md:text-2xl'>
            Profile Picture
          </Heading>
          <p className='mt-3 leading-normal text-charcoalGrayLight'>Upload or change your profile avatar</p>

          <EditProfileForms />
      </div>
    </div>
  )
}

export default EditProfile;
