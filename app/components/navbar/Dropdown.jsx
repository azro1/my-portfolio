"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

// components
import LoggedInMenu from "./LoggedInMenu";
import LoggedOutMenu from "./LoggedOutMenu";


const Dropdown = ({ user, handleCloseMenu }) => {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClientComponentClient()
    const {error} = await supabase.auth.signOut()

    if (!error) {
      router.push('/login')
      router.refresh()
    }

    if (error) {
      console.log(error)
    }
  }

  return (
    <div className='menu-links flex flex-col absolute w-60 right-0 top-28 mt-4 p-3 bg-primary z-50 border-2 border-white bg-shade'>
      {user && (
        <LoggedInMenu 
          handleLogout={handleLogout}
          handleCloseMenu={handleCloseMenu}  
        />
      )}

      {!user && (
        <LoggedOutMenu
          handleCloseMenu={handleCloseMenu}  
        />
      )}
    </div>
  )
}

export default Dropdown
