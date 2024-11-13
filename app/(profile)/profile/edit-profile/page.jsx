
// components
import EditProfileForms from './EditProfileForms';
import ProfileHeader from '../ProfileHeader';


const EditProfile = () => {

  return (
    <div className='flex-1 flex flex-col overflow-y-scroll hide-scrollbar h-[90vh] relative'>

      <div>
         <ProfileHeader title={'Edit Profile'} subheading={'Edit your account details, including bio, avatar and email address and phone number.'} showAvatar={false} />
      </div>

      <div className="bg-nightSky pt-10">
      <h2 className='text-2xl text-stoneGray font-b'>Basic Information</h2>

          <EditProfileForms />
      </div>
    </div>
  )
}

export default EditProfile;
