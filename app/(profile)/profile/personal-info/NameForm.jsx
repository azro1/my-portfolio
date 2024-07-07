import { useState, useEffect } from 'react'

const NameForm = ({ user, profile, profileError, updateProfile, updateError, updateSuccess, updating }) => {
  const [first_name, setFirstName] = useState(null)
  const [last_name, setLastName] = useState(null)



  // populate form fields from profiles table
  useEffect(() => {
    if (user && profile) {
        setFirstName(profile.first_name || user.user_metadata.full_name)
    }
  }, [user, profile])
  


  const handleNameUpdate = (e) => {
    e.preventDefault()
    updateProfile({ first_name, last_name })
  }


  return (
    <form>
        <label>
            <span className='mt-4 mb-2 text-sm font-os text-secondary block'>
                First Name
            </span>
            <input
                className='w-full p-2.5 rounded-md'
                type='text'
                value={first_name || ''}
                placeholder='First Name'
                spellCheck='false'
                onChange={(e) => setFirstName(e.target.value)}
            />
        </label>
        <label>
            <span className='mt-4 mb-2 text-sm font-os text-secondary block'>
                Last Name
            </span>
            <input
                className='w-full p-2.5 rounded-md'
                type='text'
                value={last_name || ''}
                placeholder='Last Name'
                spellCheck='false'
                onChange={(e) => setLastName(e.target.value)}
            />
        </label>
        {profileError && <div className='error mt-2'>* {profileError}</div>}
        {updateError && <div className='error mt-2'>* {updateError}</div>}
        {updateSuccess && <div className='success mt-2'>* {updateSuccess}</div>}
        <button className={`btn block bg-hint ${updateError || updateSuccess ? 'mt-2' : 'mt-3'}`} onClick={handleNameUpdate} >
            {updating ? 'Updating...' : 'Update Name'}
        </button>
    </form>
  )
}

export default NameForm
