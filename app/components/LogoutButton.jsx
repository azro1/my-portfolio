"use client"

import { FaSignOutAlt } from 'react-icons/fa';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation';


 const LogoutButton = () => {
  const router = useRouter()


  const handleLogout = async () => {
    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signOut()

    if (!error) {
      router.push('/login')
    }

    if (error) {
      console.log(error)
    }
  }

  return (
    <div onClick={handleLogout} className="hidden lg:block tooltip group">
      <FaSignOutAlt className="group-hover:text-hint transition duration-300 text-secondary cursor-pointer" size={31} />
      <span className="tooltiptext -left-4">Logout</span>
    </div>
  )
}

export default LogoutButton
