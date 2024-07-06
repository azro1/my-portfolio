
// components
import UpdateProfile from './UpdateProfile';




const PersonalInfo = () => {


  // // update userData
  // const updateUserData = async (username) => {
  //   try {
  //     const { data, error } = await supabase.auth.updateUser({ 
  //       data: {
  //         name: username,
  //       },
  //     })

  //     if (error) {
  //       throw new Error(error.message)
  //     }

  //     if (data) {
  //       console.log(data)
  //     }
  //   } catch (error) {
  //       console.log(error.message)
  //   }
  // }



  return (
    <div className='sm:flex-1'>

      <div className='text-center px-3'>
        <h2 className='text-center profile-subheading text-hint mb-5'>Personal Information</h2>
        <p className='text-base'>This is your personal information section. Here, you can easily edit and update your profile information.</p>
      </div>

      <div className='mt-8 bg-red-900'>


          <UpdateProfile />



      </div>
    </div>
  )
}

export default PersonalInfo;
