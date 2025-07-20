
// components
import ProfileHeader from '../../ProfileHeader';
import EditProfileForms from './EditProfileForms';

const EditProfile = () => {

  return (
    <div className='flex-1 overflow-y-scroll hide-scrollbar px-[x-pad] relative pb-24 pt-36 xl:pb-28'>

      <div>
          <ProfileHeader title={'Edit Profile'} subheading={'This is the Edit page. Here you can update your personal information'} showAvatar={false} />
          <EditProfileForms />
      </div>
    </div>
  )
}

export default EditProfile;
