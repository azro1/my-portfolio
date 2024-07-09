
// components
import UpdateProfile from './UpdateProfile';




const PersonalInfo = () => {






  return (
    <div className='flex-1 overflow-y-scroll hide-scrollbar max-h-custom-lg'>

      <div className='text-center'>
        <h2 className='text-center profile-subheading text-hint mb-5'>Personal Information</h2>
        <p className='text-base'>This is your personal information section. Here, you can easily edit and update your profile information.</p>
      </div>

      <div className='mt-20'>


          <UpdateProfile />



      </div>
    </div>
  )
}

export default PersonalInfo;
