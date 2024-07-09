
// components
import UpdateProfile from './UpdateProfile';




const PersonalInfo = () => {






  return (
    <div className='sm:flex-1'>

      <div className='text-center px-3'>
        <h2 className='text-center profile-subheading text-hint mb-5'>Personal Information</h2>
        <p className='text-base'>This is your personal information section. Here, you can easily edit and update your profile information.</p>
      </div>

      <div className='mt-20 px-3'>


          <UpdateProfile />



      </div>
    </div>
  )
}

export default PersonalInfo;
