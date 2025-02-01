
// components
import EditProfileForms from './EditProfileForms';
import ProfileHeader from '../ProfileHeader';


const EditProfile = () => {

  return (
    <div className='flex-1 flex flex-col overflow-y-scroll hide-scrollbar h-[90vh] relative'>

      <div>
         <ProfileHeader title={'Edit Profile'} subheading={'Update your profile details, including your bio, avatar, email address, and phone number.'} showAvatar={false} />
      </div>

      <div className="pt-14">
      <h2 className='text-2xl text-cloudGray font-b'>Basic Information</h2>

          <EditProfileForms />
      </div>
    </div>
  )
}

export default EditProfile;
