
// components
import EditProfilePage from './EditProfilePage';
import ProfileHeader from '../ProfileHeader';


const EditProfile = () => {

  return (
    <div className='flex-1 flex flex-col gap-6 overflow-y-scroll hide-scrollbar h-profile-page-height relative'>

      <div>
         <ProfileHeader title={'Edit Profile'} subheading={'Edit your account details, including bio, avatar and email address and phone number.'} showAvatar={false} />
      </div>

      <div className="bg-cloudGray p-4 pt-10">
      <h2 className='text-xl text-nightSky font-b'>Basic Information</h2>

          <EditProfilePage />
      </div>
    </div>
  )
}

export default EditProfile;
