
// components
import EditProfileForms from './EditProfileForms';
import ProfileHeader from '../../ProfileHeader';


const EditProfile = () => {

  return (
    <div className='flex-1 flex flex-col overflow-y-scroll hide-scrollbar h-[90vh] relative pb-24 pt-48 xl:pb-0 xl:pt-36'>

      <div>
         <ProfileHeader title={'Edit Profile'} subheading={'Update your profile details, including your bio, avatar, email address, and phone number'} showAvatar={false} />
      </div>

      <div className="pt-16">
          <h2 className='text-cloudGray font-medium text-1.375 md:text-2xl'>Profile Picture</h2>
          <p className='mt-3 leading-normal text-charcoalGrayLight md:text-lg'>Upload or change your profile avatar</p>

          <EditProfileForms />
      </div>
    </div>
  )
}

export default EditProfile;
