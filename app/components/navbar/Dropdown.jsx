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
      document.cookie = "isRegComplete=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      router.push('/login')
      router.refresh()
    }

    if (error) {
      console.log(error)
    }
  }

  return (
    <div className={`absolute left-4 top-[306px] flex flex-col  w-52 mt-4 p-1 z-40 bg-midnightSlate rounded-sm`}>
      {user && (
        <LoggedInMenu 
          handleLogout={handleLogout}
          handleCloseMenu={handleCloseMenu}  
        />
      )}
    </div>
  )
}

export default Dropdown
