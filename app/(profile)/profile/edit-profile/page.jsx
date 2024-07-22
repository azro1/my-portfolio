
// components
import UpdateProfile from './UpdateProfile';
import ProfileHeader from '../ProfileHeader';


const EditProfile = () => {

  return (
    <div className='flex-1 overflow-y-scroll hide-scrollbar h-profile-page-height'>

      <div>
         <ProfileHeader title={'Edit Profile'} subheading={'Edit your account details, including bio, avatar and email address and phone number.'} showAvatar={false} />
      </div>

      <div className='mt-20'>
          <UpdateProfile />
      </div>
    </div>
  )
}

export default EditProfile;
